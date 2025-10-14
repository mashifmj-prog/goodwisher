const messages = {
  birthday: [
    "Another year older, wiser! 🥳",
    "Happy Birthday! Enjoy your special day.",
    "May your day be filled with laughter and joy.",
    "Wishing you endless happiness on your birthday.",
    "Celebrate this day with love and cheer.",
    "A year wiser and even more fabulous!",
    "Here's to another fantastic year!",
    "Happy Birthday! Make it memorable.",
    "Cheers to your health and happiness.",
    "Wishing you a year full of adventures."
  ],
  anniversary: [
    "Happy Anniversary! Wishing you many more years of happiness.",
    "Here's to celebrating your love and commitment.",
    "May your love continue to grow stronger.",
    "Another year of wonderful memories together.",
    "Cheers to your enduring love!",
    "Wishing you joy on your special day.",
    "Happy Anniversary! Keep the love alive.",
    "Celebrating your beautiful journey together.",
    "To many more years of happiness.",
    "Your love is an inspiration to us all."
  ],
  'get-well': [
    "Wishing you a speedy recovery!",
    "Get well soon! Sending you lots of love and strength.",
    "Hope you feel better soon.",
    "Sending healing thoughts your way.",
    "Take care and get well quickly.",
    "Wishing you good health and rest.",
    "You'll be back on your feet in no time.",
    "Sending positive vibes for your recovery.",
    "Get well soon! We miss you.",
    "Rest up and feel better soon."
  ],
  congrats: [
    "Congratulations on your amazing achievement!",
    "Well done! Your hard work has paid off.",
    "Proud of you! Great job.",
    "Congratulations! You deserve it.",
    "Way to go! Keep up the good work.",
    "Awesome achievement! Congrats.",
    "You did it! Congratulations.",
    "Huge congrats on your success.",
    "Celebrating your accomplishment!",
    "Kudos to you! Well deserved."
  ],
  'thank-you': [
    "Thank you for your kindness and support.",
    "I appreciate everything you've done for me.",
    "Your help means the world to me. Thank you.",
    "Thanks a million for your generosity.",
    "Grateful for your thoughtful gesture.",
    "Thank you from the bottom of my heart.",
    "Your support is greatly appreciated.",
    "Thanks for being there for me.",
    "Appreciate your kindness. Thank you.",
    "Your thoughtfulness is truly appreciated."
  ],
  'good-luck': [
    "Best of luck in your new adventure!",
    "Wishing you success and good fortune!",
    "Good luck! You've got this.",
    "All the best in your endeavors.",
    "Wishing you the best of luck.",
    "Break a leg! You'll do great.",
    "Good luck on your journey.",
    "Wishing you positive vibes and success.",
    "You can do it! Good luck.",
    "Best wishes for your future."
  ],
  motivation: [
    "Keep pushing forward; you've got this!",
    "Stay strong and keep chasing your dreams.",
    "Believe in yourself; you're capable of great things.",
    "Every step brings you closer to your goal.",
    "You have the power to make it happen.",
    "Rise and grind; success awaits.",
    "Your potential is limitless.",
    "Keep going; the best is yet to come.",
    "You are stronger than you think.",
    "Embrace the challenge; grow stronger."
  ],
  appreciation: [
    "Your efforts are truly appreciated!",
    "Thank you for being so amazing.",
    "I value your hard work and dedication.",
    "Your contributions make a difference.",
    "Appreciate all that you do.",
    "You're a star! Thank you.",
    "Grateful for your commitment.",
    "Your support is invaluable.",
    "Thanks for your outstanding effort.",
    "You make a positive impact."
  ],
  farewell: [
    "Wishing you all the best in your next chapter!",
    "You'll be missed, but your future is bright!",
    "Farewell and good luck on your new path.",
    "Thanks for the memories. Stay in touch.",
    "Wishing you success in your new adventure.",
    "Goodbye and best wishes.",
    "Farewell; keep achieving great things.",
    "All the best in your future endeavors.",
    "We'll miss you. Take care.",
    "Farewell; may your journey be fulfilling."
  ],
  encouragement: [
    "You're stronger than you know—keep going!",
    "Believe in yourself; you're capable of great things.",
    "You can overcome any obstacle.",
    "Keep believing; better days are ahead.",
    "You're doing great; don't give up.",
    "Your resilience is inspiring.",
    "Stay positive; you've got this.",
    "Encouraging you to reach new heights.",
    "You're on the right path; keep moving.",
    "Believe and achieve."
  ],
  love: [
    "You mean the world to me.",
    "My heart is yours, always and forever.",
    "I love you more than words can say.",
    "You're my everything.",
    "Forever in my heart.",
    "Love you to the moon and back.",
    "You're the light of my life.",
    "Our love is eternal.",
    "Cherishing you always.",
    "You complete me."
  ],
  condolences: [
    "I'm so sorry for your loss.",
    "My deepest condolences to you and your family.",
    "Sending thoughts and prayers during this difficult time.",
    "May you find comfort in your memories.",
    "Heartfelt sympathies for your loss.",
    "Wishing you peace and strength.",
    "Condolences on your loss.",
    "Thinking of you in this time of sorrow.",
    "May they rest in peace.",
    "Sharing in your sorrow."
  ],
  vacation: [
    "Have an amazing vacation filled with fun!",
    "Enjoy your getaway and making new memories!",
    "Relax and recharge on your vacation.",
    "Wishing you a wonderful trip.",
    "Safe travels and lots of adventures.",
    "Have a fantastic time away.",
    "Enjoy every moment of your vacation.",
    "Wishing you sunny skies and happy times.",
    "Take time to unwind and relax.",
    "Bon voyage! Have fun."
  ],
  custom: [] // Populated dynamically
};

const emojis = {
  birthday: ['🎉', '🎂', '🎈', '🥳'],
  anniversary: ['💑', '💍', '❤️', '🎊'],
  'get-well': ['🌼', '🙏', '💙', '⭐'],
  congrats: ['🎉', '🏆', '🥂', '⭐'],
  'thank-you': ['🙏', '💖', '🤗', '⭐'],
  'good-luck': ['🍀', '🤞', '🌈', '✨'],
  motivation: ['💪', '🔥', '⭐', '🚀'],
  appreciation: ['🙌', '💖', '🌹', '😊'],
  farewell: ['👋', '😢', '🌍', '💫'],
  encouragement: ['💪', '⭐', '🚀', '🙌'],
  love: ['❤️', '💕', '😘', '🌹'],
  condolences: ['🙏', '🕊️', '🌹', '💔'],
  vacation: ['🌴', '✈️', '🏖️', '☀️'],
  default: ['😊', '👍', '❤️', '⭐'],
  custom: ['🎉', '⭐', '🥳', '🙌']
};

let currentOccasion = '';
let currentIndex = 0;
let messageHistory = [];
let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
let archivedMessages = JSON.parse(localStorage.getItem('archivedMessages')) || [];
const MAX_ARCHIVES = 5;
let inactivityTimeout = null;
let countdownInterval = null;
let countdownSeconds = 60;

const positiveWords = ['good', 'great', 'awesome', 'happy', 'excellent', 'wonderful', 'fantastic', 'amazing', 'love', 'like', 'nice', 'positive', 'super', 'best', 'cool', 'perfect', 'brilliant', 'outstanding', 'terrific', 'superb', 'fabulous', 'delightful', 'joyful', 'cheerful', 'vibrant', 'uplifting', 'inspiring', 'motivating', 'encouraging'];

const negativeWords = ['bad', 'hate', 'terrible', 'awful', 'horrible', 'sad', 'angry', 'disappointed', 'poor', 'worse', 'nasty', 'ugly', 'stupid', 'awful', 'horrible', 'terrible', 'disgusting', 'evil', 'gross', 'nasty', 'vile', 'miserable', 'depressing', 'frustrating', 'annoying', 'irritating', 'boring', 'dull', 'mediocre', 'subpar'];

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIconPath = document.getElementById('themeIconPath');
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    resetInactivityTimer();
  });

  function updateThemeIcon(theme) {
    themeIconPath.setAttribute('d', theme === 'light' ? 
      'M12 3v1m0 16v1m9-9h-1m-16 0H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z' : 
      'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
  }

  // Inactivity timer
  function startInactivityTimer() {
    clearInactivityTimers();
    inactivityTimeout = setTimeout(() => {
      const timerDisplay = document.getElementById('inactivityTimer');
      timerDisplay.classList.remove('hidden');
      countdownSeconds = 60;
      timerDisplay.textContent = `Timeout: ${countdownSeconds}s`;
      countdownInterval = setInterval(() => {
        countdownSeconds--;
        timerDisplay.textContent = `Timeout: ${countdownSeconds}s`;
        if (countdownSeconds <= 0) {
          clearInterval(countdownInterval);
          timerDisplay.classList.add('hidden');
          const textarea = document.getElementById('customMessage');
          const currentMessage = textarea.value.trim();
          if (currentMessage && !textarea.classList.contains('announcement-text')) {
            archiveMessage();
            textarea.value = 'Your message has been archived. Click "Archived Messages" to retrieve it.';
            textarea.classList.add('announcement-text');
          } else {
            resetOccasion();
          }
        }
      }, 1000);
    }, 120000); // 120s delay before countdown starts
  }

  function resetInactivityTimer() {
    const timerDisplay = document.getElementById('inactivityTimer');
    timerDisplay.classList.add('hidden');
    clearInactivityTimers();
    startInactivityTimer();
  }

  function clearInactivityTimers() {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    if (countdownInterval) clearInterval(countdownInterval);
    countdownSeconds = 60;
  }

  // Textarea input handling
  const textarea = document.getElementById('customMessage');
  textarea.addEventListener('input', () => {
    const currentMessage = textarea.value.trim();
    if (currentMessage && textarea.classList.contains('announcement-text')) {
      textarea.classList.remove('announcement-text');
      messageHistory = [];
    }
    resetInactivityTimer();
  });

  textarea.addEventListener('focus', () => {
    if (textarea.classList.contains('announcement-text')) {
      textarea.value = '';
      textarea.classList.remove('announcement-text');
      messageHistory = [];
      resetOccasion(); // Optional: Reset occasion state on focus if needed
    }
  });

  // Reset occasion function
  function resetOccasion() {
    const textarea = document.getElementById('customMessage');
    const currentMessage = textarea.value.trim();
    if (currentMessage && !textarea.classList.contains('announcement-text')) {
      archiveMessage();
    }
    const occasionSelect = document.getElementById('occasion');
    occasionSelect.value = '';
    currentOccasion = '';
    currentIndex = 0;
    messageHistory = [];
    localStorage.removeItem('messageHistory');
    const customWrap = document.getElementById('customInputWrap');
    customWrap.classList.add('hidden');
    const closeButton = document.getElementById('closeOccasion');
    closeButton.classList.add('hidden');
    const timerDisplay = document.getElementById('inactivityTimer');
    timerDisplay.classList.add('hidden');
    document.getElementById('customOccasionDesc').value = '';
    textarea.value = '';
    document.getElementById('senderName').value = '';
    document.getElementById('recipientName').value = '';
    messages.custom = [];
    updateEmojiPicker();
    clearInactivityTimers();
  }

  // Archive message function
  function archiveMessage() {
    const textarea = document.getElementById('customMessage');
    const sender = document.getElementById('senderName').value.trim();
    const recipient = document.getElementById('recipientName').value.trim();
    const currentMessage = textarea.value.trim();
    if (currentMessage && !textarea.classList.contains('announcement-text')) {
      const archiveItem = {
        message: currentMessage,
        occasion: currentOccasion,
        sender: sender,
        recipient: recipient,
        timestamp: new Date().toISOString()
      };
      archivedMessages.unshift(archiveItem); // Add to beginning
      if (archivedMessages.length > MAX_ARCHIVES) {
        archivedMessages = archivedMessages.slice(0, MAX_ARCHIVES);
      }
      localStorage.setItem('archivedMessages', JSON.stringify(archivedMessages));
      updateArchiveButton();
    }
  }

  // Update archive button
  function updateArchiveButton() {
    const archiveButton = document.getElementById('archiveButton');
    const count = archivedMessages.length;
    archiveButton.textContent = `Archived Messages (${count})`;
    if (count > 0) {
      archiveButton.classList.remove('hidden');
    } else {
      archiveButton.classList.add('hidden');
    }
  }

  // Open archive modal
  window.openArchiveModal = () => {
    const modal = document.getElementById('archiveModal');
    const list = document.getElementById('archiveList');
    list.innerHTML = '';
    archivedMessages.forEach((item, index) => {
      const entry = document.createElement('div');
      entry.className = 'archive-entry';
      entry.innerHTML = `
        <p>${item.message}</p>
        <p>Occasion: ${item.occasion}</p>
        <p>Sender: ${item.sender || 'None'}</p>
        <p>Recipient: ${item.recipient || 'None'}</p>
        <p>Time: ${new Date(item.timestamp).toLocaleString()}</p>
        <button onclick="restoreArchivedMessage(${index})" class="btn light">Restore</button>
        <button onclick="deleteArchivedMessage(${index})" class="btn light">Delete</button>
      `;
      list.appendChild(entry);
    });
    modal.classList.remove('hidden');
    resetInactivityTimer();
  };

  window.restoreArchivedMessage = (index) => {
    const item = archivedMessages[index];
    const occasionSelect = document.getElementById('occasion');
    occasionSelect.value = item.occasion;
    currentOccasion = item.occasion;
    currentIndex = 0;
    messageHistory = [];
    document.getElementById('senderName').value = item.sender;
    document.getElementById('recipientName').value = item.recipient;
    document.getElementById('customMessage').value = item.message;
    if (item.occasion === 'custom') {
      document.getElementById('customInputWrap').classList.remove('hidden');
    }
    document.getElementById('closeOccasion').classList.remove('hidden');
    startInactivityTimer();
    closeArchiveModal();
  };

  window.deleteArchivedMessage = (index) => {
    archivedMessages.splice(index, 1);
    localStorage.setItem('archivedMessages', JSON.stringify(archivedMessages));
    openArchiveModal(); // Refresh list
    updateArchiveButton();
  };

  window.closeArchiveModal = () => {
    document.getElementById('archiveModal').classList.add('hidden');
    resetInactivityTimer();
  };

  updateArchiveButton(); // Initialize on load

  // Occasion selection
  const occasionSelect = document.getElementById('occasion');
  occasionSelect.addEventListener('change', () => {
    const customWrap = document.getElementById('customInputWrap');
    const closeButton = document.getElementById('closeOccasion');
    if (occasionSelect.value === 'exit') {
      resetOccasion();
    } else if (occasionSelect.value === 'custom') {
      customWrap.classList.remove('hidden');
      closeButton.classList.remove('hidden');
      currentOccasion = 'custom';
      currentIndex = 0;
      messageHistory = [];
      messages.custom = [];
      displayMessage();
      updateEmojiPicker();
      startInactivityTimer();
    } else {
      customWrap.classList.add('hidden');
      document.getElementById('customOccasionDesc').value = '';
      closeButton.classList.remove('hidden');
      currentOccasion = occasionSelect.value;
      currentIndex = 0;
      messageHistory = [];
      messages.custom = [];
      displayMessage();
      updateEmojiPicker();
      startInactivityTimer();
    }
  });

  // Close Occasion button
  document.getElementById('closeOccasion').addEventListener('click', () => {
    resetOccasion();
  });

  // Generate Suggestions for Custom Occasion
  document.getElementById('generateSuggestions').addEventListener('click', () => {
    const desc = document.getElementById('customOccasionDesc').value.trim();
    if (desc) {
      generateCustomSuggestions(desc);
      resetInactivityTimer();
    } else {
      alert('Please enter a description for the custom occasion (e.g., new job, recovery, prayer, encouragement).');
    }
  });

  async function generateCustomSuggestions(desc) {
    const textarea = document.getElementById('customMessage');
    textarea.value = 'Generating suggestions...';
    const negativeKeywords = ['hurt', 'loss', 'sorry', 'pain', 'grief', 'sad', 'discouraged', 'disappointed', 'struggle', 'challenge'];
    const neutralSpiritualKeywords = ['fasting', 'prayer', 'meditation', 'retreat', 'reflection', 'worship', 'spiritual'];
    const lowerDesc = desc.toLowerCase();
    const isNegative = negativeKeywords.some(keyword => lowerDesc.includes(keyword));
    const isNeutralSpiritual = neutralSpiritualKeywords.some(keyword => lowerDesc.includes(keyword));

    if (!navigator.onLine) {
      messages.custom = isNegative ? [
        `Wishing you strength during your ${desc}.`,
        `Sending you support for your ${desc}.`,
        `May you find peace through your ${desc}.`
      ] : isNeutralSpiritual ? [
        `May your ${desc} bring peace and clarity.`,
        `Wishing you focus in your ${desc}.`,
        `Blessings for your ${desc}.`
      ] : [
        `Congratulations on your ${desc}! Keep shining!`,
        `Wishing you joy in your ${desc}!`,
        `Best wishes for your ${desc}!`
      ];
      currentIndex = 0;
      messageHistory = [0];
      displayMessage();
      alert('Offline mode: Using default suggestions.');
      return;
    }

    try {
      const queries = [
        `supportive messages for ${desc}`,
        `kind wishes for ${desc}`,
        `positive messages for ${desc}`,
        `encouraging words for ${desc}`
      ];
      let suggestions = [];
      for (const query of queries) {
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&pretty=1`);
        const data = await response.json();
        if (data.AbstractText && data.AbstractText.length <= 100) {
          suggestions.push(data.AbstractText);
        }
        const related = data.RelatedTopics
          .map(topic => topic.Text)
          .filter(text => text && text.length <= 100 && /wish|message|support|blessing/i.test(text))
          .slice(0, 3 - suggestions.length);
        suggestions = [...suggestions, ...related];
        if (suggestions.length >= 3) break;
      }
      if (suggestions.length === 0) {
        suggestions = isNegative ? [
          `Wishing you strength during your ${desc}.`,
          `Sending you love and support for your ${desc}.`,
          `May you find peace and healing through your ${desc}.`
        ] : isNeutralSpiritual ? [
          `May your ${desc} bring you peace and clarity.`,
          `Wishing you strength and focus in your ${desc}.`,
          `Blessings for your ${desc}.`
        ] : [
          `Congratulations on your ${desc}! Keep shining!`,
          `Wishing you joy and success in your ${desc}!`,
          `Best wishes for your ${desc}! May it bring happiness.`
        ];
      }
      suggestions = suggestions
        .filter(text => text && text.length <= 100)
        .slice(0, 3);
      messages.custom = suggestions;
      currentIndex = 0;
      messageHistory = [0];
      displayMessage();
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      messages.custom = isNegative ? [
        `Wishing you strength during your ${desc}.`,
        `Sending you love and support for your ${desc}.`,
        `May you find peace and healing through your ${desc}.`
      ] : isNeutralSpiritual ? [
        `May your ${desc} bring you peace and clarity.`,
        `Wishing you strength and focus in your ${desc}.`,
        `Blessings for your ${desc}.`
      ] : [
        `Congratulations on your ${desc}! Keep shining!`,
        `Wishing you joy and success in your ${desc}!`,
        `Best wishes for your ${desc}! May it bring happiness.`
      ];
      currentIndex = 0;
      messageHistory = [0];
      displayMessage();
      alert('No suggestions found. Try a concise term like "new job," "recovery," "prayer," or "encouragement".');
    }
  }

  // Next Message
  document.getElementById('nextMessage').addEventListener('click', () => {
    if (currentOccasion && messages[currentOccasion] && messages[currentOccasion].length > 0) {
      let availableIndices = Array.from({ length: messages[currentOccasion].length }, (_, i) => i)
        .filter(i => !messageHistory.includes(i));
      if (availableIndices.length === 0) {
        availableIndices = Array.from({ length: messages[currentOccasion].length }, (_, i) => i);
        messageHistory = [];
      }
      currentIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      messageHistory.push(currentIndex);
      displayMessage();
      resetInactivityTimer();
    }
  });

  // Previous Message
  document.getElementById('prevMessage').addEventListener('click', () => {
    if (currentOccasion && messages[currentOccasion] && messages[currentOccasion].length > 0 && messageHistory.length > 1) {
      messageHistory.pop(); // Remove current message
      currentIndex = messageHistory[messageHistory.length - 1]; // Go to previous message
      displayMessage();
      resetInactivityTimer();
    }
  });

  // Clear Content
  document.getElementById('clearContent').addEventListener('click', () => {
    resetOccasion();
    resetInactivityTimer();
  });

  // Emoji Button and Picker
  const emojiButton = document.getElementById('emojiButton');
  let emojiPicker = null;

  emojiButton.addEventListener('click', () => {
    if (emojiPicker) {
      emojiPicker.remove();
      emojiPicker = null;
    } else {
      emojiPicker = document.createElement('div');
      emojiPicker.className = 'emoji-picker';
      const emojiList = currentOccasion && emojis[currentOccasion] ? emojis[currentOccasion] : emojis.default;
      emojiList.forEach(emoji => {
        const btn = document.createElement('button');
        btn.className = 'emoji-btn';
        btn.textContent = emoji;
        btn.addEventListener('click', () => {
          const textarea = document.getElementById('customMessage');
          const currentText = textarea.value.split('\n');
          const messageBodyIndex = currentText[0].startsWith('Hi ') ? 2 : 0;
          currentText[messageBodyIndex] = (currentText[messageBodyIndex] || '') + emoji;
          textarea.value = currentText.join('\n');
          emojiPicker.remove();
          emojiPicker = null;
          resetInactivityTimer();
        });
        emojiPicker.appendChild(btn);
      });
      emojiButton.parentElement.appendChild(emojiPicker);
    }
    resetInactivityTimer();
  });

  function updateEmojiPicker() {
    if (emojiPicker) {
      emojiPicker.remove();
      emojiPicker = null;
    }
  }

  // Name inputs
  document.getElementById('senderName').addEventListener('input', () => {
    updateMessageWithName();
    resetInactivityTimer();
  });
  document.getElementById('recipientName').addEventListener('input', () => {
    updateMessageWithName();
    resetInactivityTimer();
  });

  function updateMessageWithName() {
    displayMessage();
  }

  // Clear name inputs
  window.clearSender = () => {
    document.getElementById('senderName').value = '';
    updateMessageWithName();
    resetInactivityTimer();
  };
  window.clearRecipient = () => {
    document.getElementById('recipientName').value = '';
    updateMessageWithName();
    resetInactivityTimer();
  };

  // Display message with full preview
  function displayMessage() {
    const textarea = document.getElementById('customMessage');
    const sender = document.getElementById('senderName').value.trim();
    const recipient = document.getElementById('recipientName').value.trim();
    let messageBody = '';
    if (currentOccasion && messages[currentOccasion] && messages[currentOccasion].length > 0) {
      messageBody = messages[currentOccasion][currentIndex];
    } else if (textarea.value && !sender && !recipient && !textarea.classList.contains('announcement-text')) {
      messageBody = textarea.value;
    }
    const greeting = recipient ? `Hi ${recipient},\n\n` : '';
    const signature = sender ? `\n\nRegards\n${sender}` : '';
    if (!textarea.classList.contains('announcement-text')) {
      textarea.value = `${greeting}${messageBody}${signature}`;
    }
  }

  // Action buttons
  window.copyMessage = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to copy.');
      return;
    }
    navigator.clipboard.writeText(text).then(() => alert('Message copied!'));
    resetInactivityTimer();
  };

  window.saveMessage = () => {
    alert('Message saved (placeholder for local storage).');
    resetInactivityTimer();
  };

  window.saveTemplate = () => {
    alert('Template saved (placeholder for local storage).');
    resetInactivityTimer();
  };

  window.openShareModal = () => {
    document.getElementById('shareModal').classList.remove('hidden');
    resetInactivityTimer();
  };

  window.openFeedbackModal = () => {
    const modal = document.getElementById('feedbackModal');
    const content = document.querySelector('#feedbackModal .modal-content');
    content.innerHTML = `
      <h2>Feedback</h2>
      <div class="rating-wrap">
        <div class="rating-col"><button onclick="setRating(1)" class="rating-btn">⭐</button><span>20%</span></div>
        <div class="rating-col"><button onclick="setRating(2)" class="rating-btn">⭐</button><span>40%</span></div>
        <div class="rating-col"><button onclick="setRating(3)" class="rating-btn">⭐</button><span>60%</span></div>
        <div class="rating-col"><button onclick="setRating(4)" class="rating-btn">⭐</button><span>80%</span></div>
        <div class="rating-col"><button onclick="setRating(5)" class="rating-btn">⭐</button><span>100%</span></div>
      </div>
      <div id="ratingScore" class="rating-score">Score: 0%</div>
      <textarea id="feedbackText" rows="4" placeholder="Your feedback…"></textarea>
      <div id="feedbackMessage" class="feedback-message hidden"></div>
      <div class="modal-actions">
        <button onclick="submitFeedback()" class="btn light">Send</button>
        <button onclick="viewPreviousFeedback()" class="btn light">View Previous</button>
        <button onclick="closeFeedbackModal()" class="btn light">Close</button>
      </div>
    `;
    modal.classList.remove('hidden');
    setRating(0);
    resetInactivityTimer();
  };

  // Helper function to get full shareable message
  function getShareableMessage() {
    const textarea = document.getElementById('customMessage');
    const messageText = textarea.value.trim();
    if (!messageText || textarea.classList.contains('announcement-text')) return '';
    return `${messageText}\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
  }

  // Share modal functions
  window.shareDevice = async () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GoodWisher Message',
          text: text
        });
        closeShareModal();
        resetInactivityTimer();
      } catch (error) {
        console.error('Error sharing:', error);
        fallbackToSMS(text);
      }
    } else {
      fallbackToSMS(text);
    }
  };

  async function fallbackToSMS(text) {
    if ('contacts' in navigator && 'select' in navigator.contacts) {
      try {
        const contacts = await navigator.contacts.select(['tel'], { multiple: false });
        if (contacts.length > 0) {
          const phoneNumber = contacts[0].tel[0];
          const smsUrl = `sms:${phoneNumber}?body=${encodeURIComponent(text)}`;
          window.open(smsUrl, '_blank');
          closeShareModal();
          resetInactivityTimer();
        } else {
          promptForPhoneNumber(text);
        }
      } catch (error) {
        console.error('Error accessing contacts:', error);
        promptForPhoneNumber(text);
      }
    } else {
      promptForPhoneNumber(text);
    }
  }

  function promptForPhoneNumber(text) {
    const phoneNumber = prompt('Enter a phone number for SMS (e.g., +27123456789):');
    if (phoneNumber) {
      const cleanedNumber = phoneNumber.replace(/[^0-9+]/g, '');
      if (/^\+?[1-9]\d{1,14}$/.test(cleanedNumber)) {
        const smsUrl = `sms:${cleanedNumber}?body=${encodeURIComponent(text)}`;
        window.open(smsUrl, '_blank');
        closeShareModal();
        resetInactivityTimer();
      } else {
        alert('Please enter a valid phone number (e.g., +27 for South Africa).');
      }
    } else {
      const smsUrl = `sms:?body=${encodeURIComponent(text)}`;
      window.open(smsUrl, '_blank');
      closeShareModal();
      resetInactivityTimer();
    }
  }

  window.shareWhatsApp = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    closeShareModal();
    resetInactivityTimer();
  };

  window.shareFacebook = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      alert('Message copied! Paste it into a Facebook post.');
      window.open('https://www.facebook.com/', '_blank');
      closeShareModal();
      resetInactivityTimer();
    }).catch(() => {
      alert('Failed to copy message. Please copy it manually.');
    });
  };

  window.shareTwitter = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    closeShareModal();
    resetInactivityTimer();
  };

  window.shareTikTok = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      alert('Message copied! Paste it into a TikTok post.');
      closeShareModal();
      resetInactivityTimer();
    });
  };

  window.shareTelegram = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(text)}`, '_blank');
    closeShareModal();
    resetInactivityTimer();
  };

  window.closeShareModal = () => {
    document.getElementById('shareModal').classList.add('hidden');
    resetInactivityTimer();
  };

  // Feedback modal
  let currentRating = 0;

  window.setRating = (rating) => {
    currentRating = rating;
    const buttons = document.querySelectorAll('.rating-btn');
    buttons.forEach((btn, index) => {
      btn.classList.toggle('selected', index < rating);
      btn.style.display = 'block';
    });
    document.getElementById('ratingScore').textContent = `Score: ${rating * 20}%`;
    resetInactivityTimer();
  };

  window.submitFeedback = () => {
    const feedbackText = document.getElementById('feedbackText').value;
    const feedbackMessage = document.getElementById('feedbackMessage');
    if (currentRating > 0) {
      feedbackList.push({ rating: currentRating, text: feedbackText, timestamp: new Date().toISOString() });
      localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
      feedbackMessage.textContent = 'Submitted';
      feedbackMessage.classList.remove('hidden');
      setTimeout(() => {
        feedbackMessage.textContent = 'Thank you';
        setTimeout(() => {
          closeFeedbackModal();
        }, 1000);
      }, 1500);
      resetInactivityTimer();
    } else {
      alert('Please select a rating.');
    }
  };

  window.closeFeedbackModal = () => {
    document.getElementById('feedbackModal').classList.add('hidden');
    document.getElementById('feedbackText').value = '';
    document.getElementById('feedbackMessage').classList.add('hidden');
    setRating(0);
    resetInactivityTimer();
  };

  window.viewPreviousFeedback = () => {
    const feedbackDisplay = feedbackList.length
      ? feedbackList.map(f => `<p>Rating: ${f.rating * 20}% , Text: ${f.text}, Time: ${new Date(f.timestamp).toLocaleString()}</p>`).join('')
      : '<p>No previous feedback.</p>';
    const modal = document.getElementById('feedbackModal');
    const content = document.querySelector('#feedbackModal .modal-content');
    content.innerHTML = `<h2>Previous Feedback</h2>${feedbackDisplay}<div class="modal-actions"><button onclick="closeFeedbackModal()" class="btn light">Close</button></div>`;
    modal.classList.remove('hidden');
    resetInactivityTimer();
  };
});
