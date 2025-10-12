let currentBaseMessage = '';
let selectedRating = 0;
let user = null;

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

function initializeEmojiPicker() {
  try {
    const button = document.getElementById('emojiButton');
    const picker = new EmojiButton({
      position: 'bottom-start',
      theme: document.body.dataset.theme === 'dark' ? 'dark' : 'light',
      emojisPerRow: 8,
      rows: 5
    });
    picker.on('emoji', emoji => {
      const textarea = document.getElementById('customMessage');
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, startPos) + emoji + textarea.value.substring(endPos);
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
      gtag('event', 'emoji_selected', { 'event_category': 'Action', 'event_label': emoji });
    });
    button.addEventListener('click', () => {
      picker.togglePicker(button);
    });
  } catch (e) {
    console.error('Emoji picker initialization failed:', e);
  }
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.dataset.theme === 'dark';
  body.dataset.theme = isDark ? 'light' : 'dark';
  localStorage.setItem('theme', body.dataset.theme);
  initializeEmojiPicker();
  gtag('event', 'theme_toggle', { 'event_category': 'Action', 'event_label': body.dataset.theme });
}

function updateClock() {
  try {
    const now = new Date();
    const hours = now.getHours();
    const clockText = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    document.getElementById('clockText').textContent = clockText || 'Clock unavailable';
    
    const timeIcon = document.getElementById('timeIcon');
    if (hours >= 0 && hours < 12) {
      timeIcon.innerHTML = '<span style="color: #FF4500;">🧡</span>'; // Sunrise (Morning)
    } else if (hours >= 12 && hours < 15) {
      timeIcon.innerHTML = '<span style="color: #FFD700;">☀️</span>'; // Sun (Day)
    } else if (hours >= 15 && hours < 18) {
      timeIcon.innerHTML = '<span style="color: #FFA500;">🌤️</span>'; // Sun with clouds (Afternoon)
    } else {
      timeIcon.innerHTML = '<span style="color: #4169E1;">🌙</span>'; // Moon with stars (Evening)
    }
  } catch (e) {
    console.error('Clock update failed:', e);
    document.getElementById('clockText').textContent = 'Clock unavailable';
  }
}

function getTimeGreeting(language) {
  const now = new Date();
  const hours = now.getHours();
  const greetings = {
    en: { morning: 'Good Morning', day: 'Good Day', afternoon: 'Good Afternoon', evening: 'Good Evening' },
    zh: { morning: '早上好', day: '日安', afternoon: '下午好', evening: '晚上好' },
    hi: { morning: 'सुप्रभात', day: 'शुभ दिन', afternoon: 'शुभ दोपहर', evening: 'शुभ संध्या' },
    es: { morning: 'Buenos días', day: 'Buen día', afternoon: 'Buenas tardes', evening: 'Buenas noches' },
    fr: { morning: 'Bonjour', day: 'Bon jour', afternoon: 'Bon après-midi', evening: 'Bonsoir' },
    ar: { morning: 'صباح الخير', day: 'يوم جيد', afternoon: 'مساء الخير', evening: 'مساء الخير' },
    bn: { morning: 'সুপ্রভাত', day: 'শুভ দিন', afternoon: 'শুভ বিকেল', evening: 'শুভ সন্ধ্যা' },
    pt: { morning: 'Bom dia', day: 'Bom dia', afternoon: 'Boa tarde', evening: 'Boa noite' },
    ru: { morning: 'Доброе утро', day: 'Добрый день', afternoon: 'Добрый день', evening: 'Добрый вечер' },
    ur: { morning: 'صبح بخیر', day: 'اچھا دن', afternoon: 'دوپہر بخیر', evening: 'شام بخیر' },
    af: { morning: 'Goeie môre', day: 'Goeie dag', afternoon: 'Goeie middag', evening: 'Goeie aand' },
    zu: { morning: 'Sawubona ekuseni', day: 'Usuku oluhle', afternoon: 'Ntambama omuhle', evening: 'Kusihlwa okumnandi' },
    sn: { morning: 'Mhoro mangwanani', day: 'Mhoro zuva', afternoon: 'Mhoro masikati', evening: 'Mhoro manheru' },
    nso: { morning: 'Thobela mmoro', day: 'Letsatsi le lekaone', afternoon: 'Thobela motshegare', evening: 'Thobela mabo' }
  };
  if (hours >= 0 && hours < 12) return greetings[language].morning;
  if (hours >= 12 && hours < 15) return greetings[language].day;
  if (hours >= 15 && hours < 18) return greetings[language].afternoon;
  return greetings[language].evening;
}

function updateMessageWithName() {
  const recipientName = document.getElementById('recipientName').value.trim();
  const senderName = document.getElementById('senderName').value.trim();
  const language = document.getElementById('language').value;
  const customMessage = document.getElementById('customMessage');
  let message = currentBaseMessage;
  if (recipientName) {
    const greeting = getTimeGreeting(language);
    message = `${greeting}, ${recipientName}\n\n${currentBaseMessage}`;
  }
  if (senderName) {
    message = `${message}\n\nRegards\n${senderName}`;
  }
  customMessage.value = message || currentBaseMessage;
}

function displayMessage() {
  const occasion = document.getElementById('occasion').value;
  const language = document.getElementById('language').value;
  const messageDiv = document.getElementById('message');
  const messages = {
    en: {
      birthday: [
        'Wishing you a fantastic birthday filled with joy! 🎉',
        'Happy birthday! May your day be full of laughter and love! 🎂',
        'Celebrating you today! Have an amazing birthday! 🥳',
        'Here’s to a year of happiness and fun! Happy birthday! 🎈',
        'May your birthday be as special as you are! 🌟',
        'Cheers to another trip around the sun! Happy birthday! ☀️',
        'Wishing you endless smiles on your special day! 😊',
        'Happy birthday! Let’s make unforgettable memories! 🎁',
        'Your day, your way—have a spectacular birthday! 🥂',
        'Sending you love and joy for your birthday! ❤️'
      ],
      anniversary: [
        'Cheers to your love and another year together! 💕',
        'Happy anniversary! Here’s to many more shared moments! 💑',
        'Congratulations on your milestone! Love grows stronger! 💖',
        'To a love that shines brighter every year! Happy anniversary! ✨',
        'Wishing you endless happiness in your journey together! 🥂',
        'Another year of love and laughter—congrats! 😊',
        'Your love story inspires us all! Happy anniversary! 🌹',
        'Here’s to celebrating your beautiful bond! 💞',
        'May your love continue to bloom! Happy anniversary! 🌸',
        'Together forever—cheers to your special day! 🥳'
      ],
      'get-well': [
        'Sending you warm wishes for a speedy recovery! 🌻',
        'Get well soon! Thinking of you with care and warmth! 💊',
        'Wishing you strength and health in no time! 🌿',
        'Rest and recover, you’ll be back stronger! 💪',
        'Sending healing vibes your way! Get well soon! 🌈',
        'May you feel better with each passing day! 😊',
        'Wishing you a quick return to health and happiness! 🌟',
        'You’re in our thoughts—get well soon! 🙏',
        'Here’s to a speedy recovery and brighter days! ☀️',
        'Sending love and strength for your healing journey! ❤️'
      ],
      congrats: [
        'Big congrats on your amazing achievement! 🏆',
        'Well done! Your success is truly inspiring! 🎈',
        'Congratulations! Keep shining bright! 🌟',
        'You nailed it! So proud of your accomplishment! 👏',
        'Here’s to celebrating your fantastic success! 🥂',
        'Your hard work paid off—congratulations! 🎉',
        'Amazing job! The sky’s the limit for you! 🚀',
        'Cheers to your victory and bright future! 🥳',
        'You’re a star—congratulations on your win! ✨',
        'Incredible achievement! Keep up the great work! 😊'
      ],
      'thank-you': [
        'Thank you for your amazing support and kindness! 🙏',
        'Grateful for you! Your help means the world! 😊',
        'Thank you from the heart for all you do! 💝',
        'Your generosity is truly appreciated! 🌟',
        'Thanks for being there when it mattered most! 🤗',
        'Your kindness makes all the difference—thank you! 💖',
        'So grateful for your support and care! 🌸',
        'Thank you for making things better! 😊',
        'Your help is a blessing—thank you!
