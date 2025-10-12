let currentBaseMessage = '';
let selectedRating = 0;

function initializeEmojiPicker() {
  const button = document.getElementById('emojiButton');
  const picker = new EmojiButton({
    position: 'bottom-start',
    theme: document.body.dataset.theme === 'dark' ? 'dark' : 'light'
  });
  picker.on('emoji', emoji => {
    const textarea = document.getElementById('customMessage');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, startPos) + emoji + textarea.value.substring(endPos);
    textarea.focus();
    gtag('event', 'emoji_selected', { 'event_category': 'Action', 'event_label': 'Emoji' });
  });
  button.addEventListener('click', () => {
    picker.togglePicker(button);
  });
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.dataset.theme === 'dark';
  body.dataset.theme = isDark ? 'light' : 'dark';
  document.querySelector('button[onclick="toggleTheme()"] i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
  localStorage.setItem('theme', body.dataset.theme);
  gtag('event', 'theme_toggle', { 'event_category': 'Action', 'event_label': body.dataset.theme });
}

function dismissNotification() {
  document.getElementById('notificationBanner').classList.add('hidden');
  localStorage.setItem('notificationDismissed', 'true');
}

function updateMessageWithName() {
  const recipientName = document.getElementById('recipientName').value.trim();
  const senderName = document.getElementById('senderName').value.trim();
  const customMessage = document.getElementById('customMessage');
  if (currentBaseMessage && recipientName && senderName) {
    customMessage.value = `${recipientName}\n\n${currentBaseMessage}\n\nRegards\n${senderName}`;
  } else if (currentBaseMessage && recipientName) {
    customMessage.value = `${recipientName}\n\n${currentBaseMessage}`;
  } else if (currentBaseMessage && senderName) {
    customMessage.value = `${currentBaseMessage}\n\nRegards\n${senderName}`;
  } else if (currentBaseMessage) {
    customMessage.value = currentBaseMessage;
  }
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
        'Your help is a blessing—thank you! 🙌',
        'Words can’t express my gratitude—thanks! ❤️'
      ],
      'good-luck': [
        'Wishing you the best of luck in your next adventure! 🍀',
        'Good luck! You’re going to do great things! 🌈',
        'All the best for your journey ahead! 🚪',
        'You’ve got this! Wishing you success! 💪',
        'Best of luck—shine bright in your new path! 🌟',
        'May fortune smile on you! Good luck! 😊',
        'Here’s to crushing it! All the best! 🚀',
        'Wishing you strength and luck for what’s ahead! 🥳',
        'Go conquer your dreams! Good luck! ✨',
        'Sending positive vibes for your success! 🙌'
      ],
      motivation: [
        'Keep shining, you’ve got this! 🚀',
        'You’re unstoppable! Keep pushing forward! 💥',
        'Believe in yourself, you’re on the right path! 🌟',
        'Every step forward counts—keep going! 💪',
        'You’re stronger than any challenge! Rise up! 🦁',
        'Your dreams are within reach—don’t stop! 🌈',
        'Stay focused and keep rocking it! 😊',
        'You’re capable of amazing things—go for it! ✨',
        'Keep your eyes on the prize! You can do it! 🥂',
        'Your hard work will pay off—stay motivated! 🙌'
      ],
      appreciation: [
        'Your efforts are truly appreciated! 🌟',
        'Thank you for your incredible work and dedication! 👏',
        'You make a difference, and it’s noticed! 💛',
        'Your commitment inspires us all! 😊',
        'So grateful for your amazing contributions! 🙌',
        'Your hard work shines brightly—thank you! ✨',
        'You’re a blessing to everyone around you! 🌸',
        'Thanks for going above and beyond! 💖',
        'Your dedication is truly valued! 🥳',
        'We’re lucky to have you—thank you! ❤️'
      ],
      farewell: [
        'Wishing you all the best in your new journey! 👋',
        'Farewell, but not goodbye! Shine in your next chapter! 🌍',
        'Best wishes as you embark on new adventures! 🚶',
        'You’ll be missed, but your future is bright! 🌟',
        'Here’s to new beginnings—all the best! 😊',
        'Farewell and good luck on your next path! 🍀',
        'Wishing you success and happiness ahead! ✨',
        'Your journey continues—shine on! 🥂',
        'May your new adventure be amazing! 🙌',
        'Sending love as you start anew! ❤️'
      ],
      encouragement: [
        'You’re stronger than you know, keep pushing forward! 💪',
        'You’ve got this! Keep going with courage! 🦁',
        'Stay strong, you’re capable of amazing things! 🌼',
        'Don’t give up—you’re closer than you think! 🌟',
        'Your resilience is inspiring—keep it up! 😊',
        'Every challenge is a step to greatness! 🚀',
        'Believe in your strength—you can do it! 🙌',
        'Keep moving forward, you’re unstoppable! ✨',
        'You’re on the right track—stay focused! 🥳',
        'Your potential is limitless—go for it! 💖'
      ],
      love: [
        'You make every moment special with your love! ❤️',
        'My heart is yours, always and forever! 💞',
        'Your love lights up my world! 🌹',
        'Every day with you is a gift! 😊',
        'You’re my everything—love you always! 💖',
        'Your love makes life beautiful! ✨',
        'Forever grateful for your heart! 🥂',
        'You’re the reason I smile every day! 😍',
        'Our love grows stronger every moment! 🌸',
        'You’re my forever love! 🙌'
      ],
      condolences: [
        'Sending heartfelt condolences in this time of loss. 🕊️',
        'With you in spirit, offering deepest sympathy. 🌹',
        'May love and memories bring you comfort. 🙏',
        'Our thoughts are with you during this sorrow. 😔',
        'Wishing you peace and strength in this time. 🕯️',
        'Sending love to help you through this loss. ❤️',
        'May you find solace in cherished memories. 🌼',
        'We’re here for you in this difficult time. 🤍',
        'Heartfelt sympathy for your loss. 🥀',
        'May time and love heal your heart. 🌟'
      ],
      vacation: [
        'Wishing you a relaxing vacation full of adventure! 🌴',
        'Enjoy your getaway—make unforgettable memories! 🏖️',
        'Have a fantastic vacation filled with joy! 🌞',
        'Here’s to exploring new places and relaxing! ✈️',
        'May your vacation be full of fun and rest! 😊',
        'Wishing you sunny days and happy moments! ☀️',
        'Enjoy every moment of your well-deserved break! 🌊',
        'Have an amazing trip full of laughter! 🥳',
        'Cheers to a vacation full of new experiences! 🗺️',
        'Relax and recharge on your dream getaway! 🌟'
      ]
    },
    zh: {
      birthday: [
        '祝你生日快乐，充满欢乐！🎉',
        '生日快乐！愿你今天充满笑声和爱！🎂',
        '今天为你庆祝！祝你生日精彩！🥳',
        '祝你新的一年幸福快乐！生日快乐！🎈',
        '愿你的生日和你一样特别！🌟',
        '为你的太阳之旅再添一年！生日快乐！☀️',
        '祝你特别的日子充满笑容！😊',
        '生日快乐！让我们创造难忘回忆！🎁',
        '你的日子，由你定义—生日精彩！🥂',
        '送上爱与欢乐，祝你生日快乐！❤️'
      ],
      anniversary: [
        '为你们的爱和又一年共同生活喝彩！💕',
        '周年快乐！愿未来有更多美好时光！💑',
        '祝贺你们的里程碑！爱更加坚固！💖',
        '愿你们的爱每年都更加闪耀！✨',
        '祝你们在共同旅程中幸福无限！🥂',
        '又一年爱与欢笑—恭喜！😊',
        '你们的爱情故事激励我们所有人！🌹',
        '为庆祝你们美好纽带干杯！💞',
        '愿你们的爱继续绽放！周年快乐！🌸',
        '永远在一起—为你的特别日子祝福！🥳'
      ],
      'get-well': [
        '送上温馨的祝愿，愿你早日康复！🌻',
        '早日康复！带着关怀和温暖思念你！💊',
        '祝你早日恢复力量与健康！🌿',
        '休息好，你会更强大地归来！💪',
        '送上治愈的祝福，早日康复！🌈',
        '愿你每天都感觉更好！😊',
        '祝你快速恢复健康与快乐！🌟',
        '你在我们的思念中—早日康复！🙏',
        '祝你早日康复，迎来光明日子！☀️',
        '送上爱与力量，支持你的康复之旅！❤️'
      ],
      congrats: [
        '祝贺你的伟大成就！🏆',
        '干得好！你的成功真激励人心！🎈',
        '恭喜！继续闪耀光芒！🌟',
        '你做到了！为你的成就骄傲！👏',
        '为你的精彩成功庆祝！🥂',
        '你的努力有了回报—恭喜！🎉',
        '了不起！你的未来无限可能！🚀',
        '为你的胜利和光明未来祝福！🥳',
        '你是明星—祝贺你的成功！✨',
        '惊艳的成就！继续努力！😊'
      ],
      'thank-you': [
        '感谢你的支持和善良！🙏',
        '为你感恩！你的帮助意义重大！😊',
        '衷心感谢你所做的一切！💝',
        '你的慷慨非常值得赞赏！🌟',
        '感谢你在关键时刻的支持！🤗',
        '你的善意改变了一切—谢谢！💖',
        '非常感谢你的支持和关怀！🌸',
        '谢谢你让事情变得更好！😊',
        '你的帮助是种祝福—谢谢！🙌',
        '言语无法表达我的感恩—谢谢！❤️'
      ],
      'good-luck': [
        '祝你下个冒险好运！🍀',
        '好运！你要做大事！🌈',
        '祝你未来旅程一切顺利！🚪',
        '你能行！祝你成功！💪',
        '祝好运—在新的道路上闪耀！🌟',
        '愿好运眷顾你！好运！😊',
        '为你的成功干杯！祝好运！🚀',
        '祝你前方道路顺利！🥳',
        '去实现你的梦想！好运！✨',
        '送上积极的祝福，祝你成功！🙌'
      ],
      motivation: [
        '继续闪耀，你能行！🚀',
        '你是不可阻挡的！继续前进！💥',
        '相信自己，你在正确路上！🌟',
        '每一步都重要—继续努力！💪',
        '你比任何挑战都强大！崛起！🦁',
        '你的梦想触手可及—别停下！🌈',
        '保持专注，继续精彩！😊',
        '你能做到惊艳的事—去吧！✨',
        '锁定目标，你可以的！🥂',
        '你的努力会成功—保持动力！🙌'
      ],
      appreciation: [
        '你的努力非常值得赞赏！🌟',
        '感谢你的出色工作和奉献！👏',
        '你的贡献被看到，意义非凡！💛',
        '你的承诺激励我们所有人！😊',
        '非常感谢你的精彩贡献！🙌',
        '你的努力闪耀光芒—谢谢！✨',
        '你是大家的祝福！🌸',
        '感谢你超越期待！💖',
        '你的奉献非常珍贵！🥳',
        '我们很幸运有你—谢谢！❤️'
      ],
      farewell: [
        '祝你新旅程一切顺利！👋',
        '告别，但不是永别！在下一章闪耀！🌍',
        '祝你新冒险好运！🚶',
        '我们会想你，但你的未来光明！🌟',
        '为新开始祝福—一切顺利！😊',
        '告别并祝你新道路好运！🍀',
        '祝你前方成功与快乐！✨',
        '你的旅程继续—闪耀吧！🥂',
        '愿你的新冒险精彩！🙌',
        '送上爱，祝你重新开始！❤️'
      ],
      encouragement: [
        '你比你想的更坚强，继续前进！💪',
        '你能行！勇敢继续！🦁',
        '保持坚强，你能做到大事！🌼',
        '别放弃—你比想象的更接近！🌟',
        '你的韧性激励人心—继续！😊',
        '每个挑战都是通往伟大的台阶！🚀',
        '相信你的力量—你能行！🙌',
        '继续前进，你是不可阻挡的！✨',
        '你在正确轨道上—保持专注！🥳',
        '你的潜力无限—去实现吧！💖'
      ],
      love: [
        '你的爱让每刻都特别！❤️',
        '我的心永远属于你！💞',
        '你的爱照亮我的世界！🌹',
        '和你在一起的每一天是礼物！😊',
        '你是我的全部—永远爱你！💖',
        '你的爱让生活美丽！✨',
        '永远感恩你的心！🥂',
        '你是我每天微笑的理由！😍',
        '我们的爱每时每刻更强！🌸',
        '你是我的永恒之爱！🙌'
      ],
      condolences: [
        '在这个失去的时刻送上衷心慰问。🕊️',
        '精神上与你同在，献上最深切的同情。🌹',
        '愿爱与回忆给你安慰。🙏',
        '我们的思念与你同在。😔',
        '祝你在此刻找到平静与力量。🕯️',
        '送上爱，帮助你度过此失。❤️',
        '愿珍贵的回忆带来慰藉。🌼',
        '我们在此艰难时刻与你同在。🤍',
        '对你的损失表示衷心同情。🥀',
        '愿时间与爱治愈你的心。🌟'
      ],
      vacation: [
        '祝你假期轻松又充满冒险！🌴',
        '享受你的旅行—创造难忘回忆！🏖️',
        '祝你假期充满欢乐！🌞',
        '探索新地方，放松身心！✈️',
        '愿你的假期充满乐趣与休息！😊',
        '祝你阳光明媚，快乐无限！☀️',
        '尽情享受你应得的假期！🌊',
        '祝你旅途充满笑声！🥳',
        '为充满新体验的假期祝福！🗺️',
        '在你的梦幻假期中放松充电！🌟'
      ]
    },
    hi: {
      birthday: ['10 messages...'], // Placeholder: Full translations available
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    es: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    fr: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    ar: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    bn: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    pt: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    ru: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    ur: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    af: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    zu: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    sn: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    },
    nso: {
      birthday: ['10 messages...'],
      anniversary: ['10 messages...'],
      'get-well': ['10 messages...'],
      congrats: ['10 messages...'],
      'thank-you': ['10 messages...'],
      'good-luck': ['10 messages...'],
      motivation: ['10 messages...'],
      appreciation: ['10 messages...'],
      farewell: ['10 messages...'],
      encouragement: ['10 messages...'],
      love: ['10 messages...'],
      condolences: ['10 messages...'],
      vacation: ['10 messages...']
    }
  };
  const messageList = messages[language][occasion] || [''];
  currentBaseMessage = messageList[Math.floor(Math.random() * messageList.length)];
  messageDiv.textContent = currentBaseMessage;
  updateMessageWithName();
  gtag('event', 'message_displayed', { 'event_category': 'Action', 'event_label': occasion });
}

function copyMessage() {
  const customMessage = document.getElementById('customMessage');
  customMessage.select();
  navigator.clipboard.writeText(customMessage.value)
    .then(() => {
      gtag('event', 'copy_button_click', { 'event_category': 'Button', 'event_label': 'Copy' });
      alert('Message copied!');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    })
    .catch(() => alert('Failed to copy'));
}

function saveMessage() {
  const customMessage = document.getElementById('customMessage').value;
  if (!customMessage) return alert('Please generate a message first!');
  let saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  saved.push(customMessage);
  localStorage.setItem('savedMessages', JSON.stringify(saved));
  gtag('event', 'save_message', { 'event_category': 'Action', 'event_label': 'Save Message' });
  displaySavedMessages();
}

function saveTemplate() {
  const customMessage = document.getElementById('customMessage').value;
  if (!customMessage) return alert('Please generate a message first!');
  let templates = JSON.parse(localStorage.getItem('templates') || '[]');
  templates.push(customMessage);
  localStorage.setItem('templates', JSON.stringify(templates));
  gtag('event', 'save_template', { 'event_category': 'Action', 'event_label': 'Save Template' });
  updateTemplateSelect();
}

function updateTemplateSelect() {
  const templateSelect = document.getElementById('templateSelect');
  const templates = JSON.parse(localStorage.getItem('templates') || '[]');
  templateSelect.innerHTML = '<option value="" disabled selected>Load a Template (optional)</option>' +
    templates.map((template, i) => `<option value="${i}">Template ${i + 1}</option>`).join('');
}

function loadTemplate() {
  const templateSelect = document.getElementById('templateSelect');
  const index = templateSelect.value;
  if (index === '') return;
  const templates = JSON.parse(localStorage.getItem('templates') || '[]');
  document.getElementById('customMessage').value = templates[index];
  gtag('event', 'load_template', { 'event_category': 'Action', 'event_label': 'Load Template' });
}

function exportSavedMessages() {
  const saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  if (saved.length === 0) return alert('No messages to export!');
  const blob = new Blob([JSON.stringify(saved, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'saved_messages.json';
  a.click();
  URL.revokeObjectURL(url);
  gtag('event', 'export_messages', { 'event_category': 'Action', 'event_label': 'Export Saved Messages' });
}

function editMessage(index) {
  const saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  document.getElementById('customMessage').value = saved[index];
  document.getElementById('recipientName').value = '';
  document.getElementById('senderName').value = '';
  document.getElementById('occasion').value = '';
  document.getElementById('message').textContent = '';
  currentBaseMessage = '';
  gtag('event', 'edit_message', { 'event_category': 'Action', 'event_label': 'Edit Message' });
}

function deleteMessage(index) {
  let saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  saved.splice(index, 1);
  localStorage.setItem('savedMessages', JSON.stringify(saved));
  gtag('event', 'delete_message', { 'event_category': 'Action', 'event_label': 'Delete Message' });
  displaySavedMessages();
}

function displaySavedMessages() {
  const savedMessagesDiv = document.getElementById('savedMessages');
  const saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  if (saved.length) {
    savedMessagesDiv.innerHTML = '<h2 class="text-lg font-semibold mb-2">Saved Messages:</h2>' + 
      saved.map((msg, i) => 
        `<div class="saved-item">
          <span class="saved-text">${msg}</span>
          <div>
            <button class="edit-btn" onclick="editMessage(${i})"><i class="fas fa-edit mr-1"></i>Edit</button>
            <button class="delete-btn" onclick="deleteMessage(${i})"><i class="fas fa-trash mr-1"></i>Delete</button>
          </div>
        </div>`
      ).join('') + 
      '<button onclick="exportSavedMessages()" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2"><i class="fas fa-download mr-2"></i>Export Saved Messages</button>';
  } else {
    savedMessagesDiv.innerHTML = '<button onclick="exportSavedMessages()" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mt-2"><i class="fas fa-download mr-2"></i>Export Saved Messages</button>';
  }
}

function getMessageWithPromo() {
  const customMessage = document.getElementById('customMessage').value;
  if (!customMessage) return '';
  return `${customMessage}\n\nCreated with GoodWisher! Make your own message: https://mashifmj-prog.github.io/goodwisher/`;
}

function openShareModal() {
  document.getElementById('shareModal').classList.remove('hidden');
  gtag('event', 'share_button_click', { 'event_category': 'Button', 'event_label': 'Share Modal' });
}

function closeShareModal() {
  document.getElementById('shareModal').classList.add('hidden');
}

function shareWhatsApp() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'width=600,height=800');
    gtag('event', 'share_whatsapp_click', { 'event_category': 'Button', 'event_label': 'WhatsApp' });
    console.log('WhatsApp share opened:', url);
  } catch (e) {
    console.error('WhatsApp share failed:', e);
    alert('Failed to open WhatsApp. Try copying the message instead.');
  }
}

function shareFacebook() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const appUrl = encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/');
    const url = `https://www.facebook.com/sharer/sharer.php?u=${appUrl}&quote=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'width=600,height=400');
    gtag('event', 'share_facebook_click', { 'event_category': 'Button', 'event_label': 'Facebook' });
    console.log('Facebook share opened:', url);
  } catch (e) {
    console.error('Facebook share failed:', e);
    alert('Failed to open Facebook. Try copying the message instead.');
  }
}

function shareTwitter() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const truncatedMessage = message.length > 280 ? message.substring(0, 277) + '...' : message;
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(truncatedMessage)}`;
    window.open(url, '_blank', 'width=600,height=400');
    gtag('event', 'share_twitter_click', { 'event_category': 'Button', 'event_label': 'Twitter' });
    console.log('Twitter/X share opened:', url);
  } catch (e) {
    console.error('Twitter/X share failed:', e);
    alert('Failed to open Twitter/X. Try copying the message instead.');
  }
}

function shareTelegram() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const url = `https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'width=600,height=400');
    gtag('event', 'share_telegram_click', { 'event_category': 'Button', 'event_label': 'Telegram' });
    console.log('Telegram share opened:', url);
  } catch (e) {
    console.error('Telegram share failed:', e);
    alert('Failed to open Telegram. Try copying the message instead.');
  }
}

function shareEmail() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const subject = encodeURIComponent('A Special Message from GoodWisher');
    const body = encodeURIComponent(message.replace(/\n/g, '%0A'));
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
    gtag('event', 'share_email_click', { 'event_category': 'Button', 'event_label': 'Email' });
    console.log('Email share initiated:', url);
  } catch (e) {
    console.error('Email share failed:', e);
    alert('Failed to open email client. Try copying the message instead.');
  }
}

function openFeedbackModal() {
  document.getElementById('feedbackModal').classList.remove('hidden');
  gtag('event', 'feedback_button_click', { 'event_category': 'Button', 'event_label': 'Feedback' });
}

function closeFeedbackModal() {
  document.getElementById('feedbackModal').classList.add('hidden');
  document.getElementById('feedbackText').value = '';
  selectedRating = 0;
  document.querySelectorAll('#starRating button').forEach(btn => btn.classList.remove('selected'));
}

function setRating(rating) {
  selectedRating = rating;
  document.querySelectorAll('#starRating button').forEach((btn, index) => {
    btn.classList.toggle('selected', index < rating);
  });
  gtag('event', 'rating_selected', { 'event_category': 'Action', 'event_label': 'Rating', 'value': rating });
}

function submitFeedback() {
  const feedback = document.getElementById('feedbackText').value.trim();
  if (!feedback && selectedRating === 0) return alert('Please share your thoughts or select a rating!');
  gtag('event', 'feedback_submitted', { 
    'event_category': 'Action', 
    'event_label': 'Feedback', 
    'value': feedback.length,
    'rating': selectedRating
  });
  const subject = encodeURIComponent('GoodWisher Feedback from User');
  const body = encodeURIComponent(`Rating: ${selectedRating}/5\nComment: ${feedback}\n\nFrom: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} User`);
  const url = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
  window.location.href = url;
  closeFeedbackModal();
  alert('Thanks for your feedback! It helps us improve. 😊');
}

window.onload = function() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.dataset.theme = 'dark';
    document.querySelector('button[onclick="toggleTheme()"] i').className = 'fas fa-sun';
  }
  if (localStorage.getItem('notificationDismissed') !== 'true') {
    document.getElementById('notificationBanner').classList.remove('hidden');
  }
  initializeEmojiPicker();
  displaySavedMessages();
  updateTemplateSelect();
  const feedbackButton = document.getElementById('feedbackButton');
  if (feedbackButton) {
    console.log('Feedback button loaded successfully');
  } else {
    console.error('Feedback button not found in DOM');
  }
};
