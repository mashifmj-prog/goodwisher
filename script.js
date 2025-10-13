// Helper
function $(id){ return document.getElementById(id); }

// ----------------- THEME -----------------
function setThemeIcon() {
  const p = $('themeIconPath');
  const isDark = document.body.dataset.theme === 'dark';
  p.setAttribute('d', isDark
    ? 'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z'
    : 'M12 2a10 10 0 100 20 10 10 0 000-20z'
  );
}

function toggleTheme() {
  const body = document.body;
  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  setThemeIcon();
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = saved;
  setThemeIcon();
  $('themeToggle').addEventListener('click', toggleTheme);
});

// ----------------- MESSAGES -----------------
const occasions = {
  'birthday': [
    "Another year older, wiser! 🥳",
    "Wishing you a day full of happiness and a year full of joy! 🎉",
    "Celebrate your day with laughter and love! 🎂",
    "Cheers to you on your special day! 🥂",
    "Hope your birthday is as amazing as you are! 🎁",
    "Have a fantastic birthday full of smiles! 😄",
    "Birthdays are the universe’s way of celebrating you! 🌟",
    "May your birthday bring you sweet moments! 🍰",
    "Enjoy every moment of your special day! 🎈",
    "Happy Birthday! Keep shining always! ✨",
    "A day to celebrate the wonderful you! 🥳",
    "May your day be bright and full of joy! 🌞",
    "Birthday blessings to you! 🎂",
    "Another fabulous year ahead! 🎉",
    "Cheers to your happiness and health! 🥂"
  ],
  'anniversary': [
    "Happy Anniversary! 💕",
    "Celebrating another year of love and togetherness! ❤️",
    "Wishing you both endless joy and love! 🌹",
    "May your love grow stronger each year! 💖",
    "Happy moments today, forever and always! 🥂",
    "Cheers to a beautiful journey together! 💞",
    "Another year, another wonderful reason to celebrate love! 🎉",
    "Wishing your bond keeps getting stronger! 💑",
    "Happy Anniversary to a lovely couple! 🌸",
    "May your love story never end! ❤️",
    "Celebrating love that inspires! 💕",
    "Together is a beautiful place to be! 🌹",
    "To many more happy years ahead! 🥂",
    "Love and laughter forever! 💖",
    "A toast to your amazing love! 🎉"
  ],
  'condolence': [
    "Sending heartfelt condolences in this time of loss. 🕊️",
    "May you find comfort and peace during this difficult time. 🌿",
    "Our thoughts are with you in your sorrow. 🕊️",
    "Wishing you strength and peace. 🌸",
    "With deepest sympathy and caring thoughts. 🌷",
    "May fond memories bring you comfort. 🕊️",
    "Thinking of you and sending love. 💛",
    "Holding you close in thoughts and prayers. 🌿",
    "Our hearts go out to you in sympathy. 🕊️",
    "Wishing you moments of peace and comfort. 🌼",
    "May memories of joy lighten your heart. 💐",
    "Sending warm thoughts and prayers. 🌸",
    "May time ease the pain of loss. 🕊️",
    "With caring thoughts at this sad time. 🌿",
    "Hoping you find solace in loving memories. 💛"
  ],
  'congratulations': [
    "Congratulations on your achievement! 🏆",
    "Well done! Keep up the great work! 🎉",
    "Your hard work paid off! Congratulations! 🌟",
    "Cheers to your success! 🥂",
    "So proud of you! Well deserved! 💐",
    "Your dedication is inspiring! 👏",
    "Hats off to your accomplishments! 🎓",
    "Celebrating your outstanding achievement! 🌟",
    "May success continue to follow you! 🚀",
    "Kudos! You did it! 🎉",
    "Excited for your amazing success! 🏆",
    "Your efforts are truly commendable! 👏",
    "Wishing you even greater achievements ahead! 🌟",
    "A big cheer for your success! 🎊",
    "You’ve earned every bit of this! 🥂"
  ],
  'get-well': [
    "Get well soon! 🌻",
    "Wishing you a speedy recovery! 💛",
    "Hope you feel better each day! 🌸",
    "Sending healing thoughts your way! 🌿",
    "Take care and get better soon! 💐",
    "May you regain your strength quickly! 🌞",
    "Thinking of you and wishing wellness! 🍀",
    "Hoping for your fast recovery! 🌷",
    "Feel better soon! 🕊️",
    "Sending warm wishes for healing! 💖",
    "Take time to rest and heal! 🌼",
    "Hope you’re back on your feet soon! 💛",
    "Wishing you comfort and care! 🌸",
    "Sending positive vibes for recovery! 🌿",
    "Get well wishes and warm thoughts! 💐"
  ],
  'thank-you': [
    "Thank you for your kindness and support! 🙏",
    "Grateful for everything you do! 💛",
    "Thanks for always being there! 🌸",
    "Appreciate your generosity and help! 🌿",
    "Many thanks for your thoughtfulness! 💐",
    "Grateful for your time and effort! 🌞",
    "Thanks for being amazing! 🌟",
    "Appreciate your kindness! 💛",
    "Your help means a lot! 🙏",
    "Thank you for making a difference! 🌷",
    "Thanks a million for your support! 💐",
    "Truly grateful for your guidance! 🌸",
    "Appreciate all you do! 🌿",
    "Thanks for being a wonderful friend! 💛",
    "Grateful for your generosity and heart! 💖"
  ],
  'good-luck': [
    "Good luck on your journey! 🍀",
    "Wishing you all the best! 🌟",
    "May success follow you everywhere! 🚀",
    "Best wishes for your new adventure! 🌞",
    "Hope everything goes perfectly! 💛",
    "Fingers crossed for you! 🤞",
    "Wishing you triumph and joy! 🎉",
    "All the best in your endeavors! 🌿",
    "Good fortune is on your side! 🌟",
    "Sending luck and positive vibes! 💐",
    "Wishing you great success ahead! 🏆",
    "Hope your efforts shine brightly! 🌞",
    "Good luck and happiness always! 🌸",
    "Wishing you victory in all you do! 🏅",
    "Best wishes for an amazing outcome! 🌟"
  ],
  'appreciation': [
    "You’re appreciated more than you know! 🌟",
    "Thanks for all that you do! 💛",
    "Your effort does not go unnoticed! 🌸",
    "Grateful for your dedication! 🌿",
    "Appreciate your support and care! 💐",
    "You make a difference! 🌞",
    "Thanks for being amazing! 🌟",
    "Your work is valued greatly! 💛",
    "Much appreciation for your kindness! 🌷",
    "We are grateful for you! 💖",
    "Your contributions are appreciated! 🌸",
    "Thank you for your constant effort! 🌿",
    "You are truly valued! 💛",
    "Thanks for being a star! 🌟",
    "Appreciation for all your hard work! 💐"
  ],
  'farewell': [
    "Wishing you the best in your next adventure! 👋",
    "Goodbye and good luck! 🌟",
    "All the best for your new journey! 🍀",
    "Farewell! Stay amazing! 🌸",
    "Wishing you success in what lies ahead! 💛",
    "Hope your new path is full of joy! 🌿",
    "Good luck in all your endeavors! 🌞",
    "You’ll be missed! Take care! 💐",
    "May your future be bright and happy! 🌟",
    "Best wishes for the road ahead! 🌷",
    "Farewell and happy adventures! 🌸",
    "Wishing you joy and success! 💛",
    "All the best for tomorrow! 🌞",
    "Goodbye and stay blessed! 🌿",
    "Farewell with love and warmth! 💐"
  ],
  'encouragement': [
    "You’ve got this! 💪",
    "Keep going — you can do it! 🚀",
    "Believe in yourself! 🌟",
    "Stay strong and positive! 🌿",
    "You’re capable of amazing things! 💛",
    "Keep pushing forward! 🌸",
    "Your effort is worthwhile! 💐",
    "Never give up! 💪",
    "Stay determined and confident! 🌞",
    "You can achieve your dreams! 🌟",
    "Courage and strength will guide you! 🌿",
    "Keep believing in your potential! 💛",
    "You are stronger than you know! 💪",
    "Keep fighting and shining! 🌸",
    "Your persistence pays off! 💐"
  ],
  'love': [
    "You make life beautiful! ❤️",
    "Sending love and warm thoughts! 💕",
    "You’re cherished and loved! 🌹",
    "Love and happiness always! 💖",
    "You brighten my world! 🌟",
    "With all my heart! ❤️",
    "Love and joy to you always! 💛",
    "You are truly special! 💕",
    "Forever in my heart! 🌹",
    "Sending hugs and love! 💖",
    "May love surround you! 🌸",
    "You are adored and cherished! ❤️",
    "Love and light always! 🌟",
    "Thinking of you with love! 💛",
    "Love that lasts forever! 💕"
  ],
  'vacation': [
    "Enjoy your well-deserved vacation! 🌴",
    "Relax and recharge! ☀️",
    "Have a fun and memorable trip! 🌊",
    "Wishing you sunny days and happy times! 🏖️",
    "Take a break and enjoy every moment! 🍹",
    "Hope your vacation is amazing! 🌸",
    "Time to unwind and enjoy life! 🌞",
    "Make beautiful memories! 🌿",
    "Have a refreshing and joyful holiday! 🌺",
    "Enjoy adventures and relaxation! 🌴",
    "Relax and let your worries go! ☀️",
    "Vacation vibes only! 🌊",
    "Have a fantastic getaway! 🏖️",
    "Savor the fun and sunshine! 🍹",
    "Rest, recharge, and enjoy! 🌞"
  ]
};

let currentOccasion = '';
let currentIndex = 0;

// ----------------- DISPLAY MESSAGE -----------------
function displayMessage() {
  const occSelect = $('occasion');
  currentOccasion = occSelect.value;
  if (!currentOccasion) {
    $('customMessage').value = '';
    return;
  }
  currentIndex = Math.floor(Math.random() * occasions[currentOccasion].length);
  updateMessage();
}

function updateMessage() {
  let msg = occasions[currentOccasion][currentIndex];
  const recipient = $('recipientName').value.trim();
  const sender = $('senderName').value.trim();

  if (recipient) msg = `Hi ${recipient},\n\n${msg}`;
  if (sender) msg += `\n\nRegards\n${sender}`;

  $('customMessage').value = msg;
}

function nextMessage() {
  if (!currentOccasion) return alert("Please select an occasion first!");
  currentIndex = (currentIndex + 1) % occasions[currentOccasion].length;
  updateMessage();
}

function clearContent() {
  $('customMessage').value = '';
  $('recipientName').value = '';
  $('senderName').value = '';
}

// ----------------- EMOJI -----------------
const genericEmojis = ["😊","🎉","🌟","❤️","👍"];
const occasionEmojis = {
  'birthday': ["🎂","🥳","🎁","🎈"],
  'anniversary': ["💕","💖","🌹"],
  'condolence': ["🕊️","🌿","💛"],
  'congratulations': ["🏆","🎉","🌟"],
  'get-well': ["🌻","🌼","🌸"],
  'thank-you': ["🙏","💐","🌸"],
  'good-luck': ["🍀","🌟","🚀"],
  'appreciation': ["🌟","💛","🌸"],
  'farewell':
