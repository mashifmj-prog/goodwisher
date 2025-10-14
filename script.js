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
  custom: []
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

const positiveWords = ['good', 'great', 'awesome', 'happy', 'excellent', 'wonderful', 'fantastic', 'amazing', 'love', 'like', 'nice', 'positive', 'super', 'best', 'cool', 'perfect', 'brilliant', 'outstanding', 'terrific', 'superb', 'fabulous', 'delightful', 'joyful', 'cheerful', 'vibrant', 'uplifting', 'inspiring', 'motivating', 'encouraging'];
const negativeWords = ['bad', 'hate', 'terrible', 'awful', 'horrible', 'sad', 'angry', 'disappointed', 'poor', 'worse', 'nasty', 'ugly', 'stupid', 'awful', 'horrible', 'terrible', 'disgusting', 'evil', 'gross', 'nasty', 'vile', 'miserable', 'depressing', 'frustrating', 'annoying', 'irritating', 'boring', 'dull', 'mediocre', 'subpar'];

let currentOccasion = '';
let currentIndex = 0;
let messageHistory = [];
let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
let archivedMessages = JSON.parse(localStorage.getItem('archivedMessages')) || [];
const MAX_ARCHIVES = 5;
let inactivityTimeout = null;
let countdownInterval = null;
let countdownSeconds = 60;
let currentRating = 0;
let isMyResults = false;

// Generate or retrieve device ID
let deviceId = localStorage.getItem('deviceId');
if (!deviceId) {
  deviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  localStorage.setItem('deviceId', deviceId);
}

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
    }, 120000);
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
      resetOccasion();
    }
  });

  // Reset occasion
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

  // Archive message
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
      archivedMessages.unshift(archiveItem);
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
    openArchiveModal();
    updateArchiveButton();
  };

  window.closeArchiveModal = () => {
    document.getElementById('archiveModal').classList.add('hidden');
    resetInactivityTimer();
  };

  updateArchiveButton();

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
      messageHistory.pop();
      currentIndex = messageHistory[messageHistory.length - 1];
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

  // Display message
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

  // Feedback modal
  window.openFeedbackModal = () => {
    const modal = document.getElementById('feedbackModal');
    const content = document.querySelector('#feedbackModal .modal-content');
    content.innerHTML = `
      <h2>Feedback</h2>
      <div class="rating-wrap">
        <div class="rating-col"><button onclick="setRating(1)" class="rating-btn" aria-label="Rate 1 star">⭐</button><span>20%</span></div>
        <div class="rating-col"><button onclick="setRating(2)" class="rating-btn" aria-label="Rate 2 stars">⭐</button><span>40%</span></div>
        <div class="rating-col"><button onclick="setRating(3)" class="rating-btn" aria-label="Rate 3 stars">⭐</button><span>60%</span></div>
        <div class="rating-col"><button onclick="setRating(4)" class="rating-btn" aria-label="Rate 4 stars">⭐</button><span>80%</span></div>
        <div class="rating-col"><button onclick="setRating(5)" class="rating-btn" aria-label="Rate 5 stars">⭐</button><span>100%</span></div>
      </div>
      <div id="ratingScore" class="rating-score">Score: 0%</div>
      <textarea id="feedbackText" rows="4" placeholder="Your feedback…" aria-label="Enter your feedback"></textarea>
      <div id="feedbackMessage" class="feedback-message hidden"></div>
      <div class="modal-actions">
        <button onclick="submitFeedback()" class="btn light" aria-label="Submit feedback">Send</button>
        <button onclick="viewPreviousFeedback()" class="btn light" aria-label="View previous feedback">View Previous</button>
        <button onclick="openAnalyticsModal()" class="btn light" aria-label="Open feedback analysis dashboard" data-watermark="View feedback analysis dashboard">View Analytics</button>
        <button onclick="closeFeedbackModal()" class="btn light" aria-label="Close feedback modal">Close</button>
      </div>
    `;
    modal.classList.remove('hidden');
    setRating(0);
    resetInactivityTimer();
  };

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
    const feedbackText = document.getElementById('feedbackText').value.trim();
    const feedbackMessage = document.getElementById('feedbackMessage');
    if (currentRating > 0) {
      const sentimentScore = calculateSentiment(feedbackText);
      const ratingScore = currentRating * 0.2;
      const blendedScore = (ratingScore + sentimentScore) / 2;
      const category = blendedScore < 0.4 ? 'Negative' : blendedScore <= 0.6 ? 'Moderate' : 'Positive';
      const topWords = getTopWords(feedbackText);
      try {
        feedbackList.push({
          rating: currentRating,
          text: feedbackText,
          timestamp: new Date().toISOString(),
          sentiment: sentimentScore,
          category: category,
          deviceId: deviceId,
          topWords: topWords
        });
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
        feedbackMessage.textContent = 'Submitted';
        feedbackMessage.classList.remove('hidden');
        setTimeout(() => {
          feedbackMessage.textContent = 'Thank you';
          setTimeout(() => {
            closeFeedbackModal();
          }, 1000);
        }, 1500);
      } catch (error) {
        console.error('Error saving feedback:', error);
        alert('Failed to save feedback. Try clearing localStorage.');
      }
      resetInactivityTimer();
    } else {
      alert('Please select a rating.');
    }
  };

  function calculateSentiment(text) {
    if (!text) return 0.5;
    const words = text.toLowerCase().split(/\W+/).filter(w => w);
    const positiveCount = words.filter(w => positiveWords.includes(w)).length;
    const negativeCount = words.filter(w => negativeWords.includes(w)).length;
    const totalWords = words.length || 1;
    const rawScore = (positiveCount - negativeCount) / totalWords;
    return (rawScore + 1) / 2; // Normalize to 0-1
  }

  function getTopWords(text) {
    if (!text) return '';
    const words = text.toLowerCase().split(/\W+/).filter(w => w);
    const wordCounts = {};
    words.forEach(w => {
      if (positiveWords.includes(w) || negativeWords.includes(w)) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
    });
    return Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word, count]) => `${word} (${count})`)
      .join(', ');
  }

  window.viewPreviousFeedback = () => {
    const feedbackDisplay = feedbackList.length
      ? feedbackList.map(f => `
          <p>Rating: ${f.rating * 20}% (${f.rating} stars)<br>
          Text: ${f.text}<br>
          Category: ${f.category}<br>
          Time: ${new Date(f.timestamp).toLocaleString()}</p>
        `).join('')
      : '<p>No previous feedback.</p>';
    const modal = document.getElementById('feedbackModal');
    const content = document.querySelector('#feedbackModal .modal-content');
    content.innerHTML = `
      <h2>Previous Feedback</h2>
      ${feedbackDisplay}
      <div id="analyticsSummary"></div>
      <div id="analyticsGraphs">
        <canvas id="ratingChart" aria-label="Bar chart of rating distribution"></canvas>
        <canvas id="categoryChart" aria-label="Pie chart of feedback category distribution"></canvas>
        <canvas id="sentimentChart" aria-label="Bar chart of sentiment distribution"></canvas>
      </div>
      <div class="modal-actions">
        <button onclick="openFeedbackModal()" class="btn light" aria-label="Back to feedback form">Back</button>
        <button onclick="closeFeedbackModal()" class="btn light" aria-label="Close feedback modal">Close</button>
      </div>
    `;
    modal.classList.remove('hidden');
    renderAnalytics(feedbackList, false);
    resetInactivityTimer();
  };

  window.openAnalyticsModal = () => {
    const modal = document.getElementById('analyticsModal');
    modal.classList.remove('hidden');
    isMyResults = false;
    document.getElementById('myResultsBtn').classList.remove('hidden');
    document.getElementById('allEvaluationsBtn').classList.add('hidden');
    renderAnalytics(feedbackList, false);
    resetInactivityTimer();
  };

  window.toggleMyResults = () => {
    isMyResults = true;
    document.getElementById('myResultsBtn').classList.add('hidden');
    document.getElementById('allEvaluationsBtn').classList.remove('hidden');
    const filteredFeedback = feedbackList.filter(f => f.deviceId === deviceId);
    renderAnalytics(filteredFeedback, true);
    resetInactivityTimer();
  };

  window.toggleAllEvaluations = () => {
    isMyResults = false;
    document.getElementById('myResultsBtn').classList.remove('hidden');
    document.getElementById('allEvaluationsBtn').classList.add('hidden');
    renderAnalytics(feedbackList, false);
    resetInactivityTimer();
  };

  window.closeAnalyticsModal = () => {
    document.getElementById('analyticsModal').classList.add('hidden');
    resetInactivityTimer();
  };

  function renderAnalytics(feedbackData, isDeviceSpecific) {
    if (!feedbackData.length) {
      document.getElementById('analyticsSummary').innerHTML = '<p>No feedback available.</p>';
      document.getElementById('analyticsGraphs').style.display = 'none';
      document.getElementById('analyticsTable').style.display = 'none';
      return;
    }
    document.getElementById('analyticsGraphs').style.display = 'block';
    document.getElementById('analyticsTable').style.display = 'table';

    // Summary
    const avgRating = feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length;
    const avgSentiment = feedbackData.reduce((sum, f) => sum + f.sentiment, 0) / feedbackData.length;
    const categories = { Negative: 0, Moderate: 0, Positive: 0 };
    feedbackData.forEach(f => categories[f.category]++;
    const total = feedbackData.length;
    const categoryPercentages = {
      Negative: ((categories.Negative / total) * 100).toFixed(0),
      Moderate: ((categories.Moderate / total) * 100).toFixed(0),
      Positive: ((categories.Positive / total) * 100).toFixed(0)
    };
    const wordCounts = {};
    feedbackData.forEach(f => {
      if (f.topWords) {
        f.topWords.split(', ').forEach(w => {
          const [word, count] = w.split(' (');
          wordCounts[word] = (wordCounts[word] || 0) + (parseInt(count) || 0);
        });
      }
    });
    const topWords = Object.entries(wordCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([word, count]) => `${word} (${count})`)
      .join(', ');

    document.getElementById('analyticsSummary').innerHTML = `
      <h3>${isDeviceSpecific ? 'Your Device Evaluations' : 'All Evaluations'}</h3>
      <p>Average Rating: ${(avgRating * 20).toFixed(0)}% (${avgRating.toFixed(1)} stars)</p>
      <p>Average Sentiment: ${avgSentiment.toFixed(2)} (${avgSentiment < 0.4 ? 'Negative' : avgSentiment <= 0.6 ? 'Moderate' : 'Positive'})</p>
      <p>Categories: Negative ${categoryPercentages.Negative}%, Moderate ${categoryPercentages.Moderate}%, Positive ${categoryPercentages.Positive}%</p>
      <p>Common Words: ${topWords || 'None'}</p>
    `;

    // Rating Distribution
    const ratingCounts = Array(5).fill(0);
    feedbackData.forEach(f => ratingCounts[f.rating - 1]++;
    const ratingChart = new Chart(document.getElementById('ratingChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [{
          label: 'Rating Distribution',
          data: ratingCounts,
          backgroundColor: 'var(--accent)',
          borderColor: 'var(--accent-hover)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, title: { display: true, text: 'Count' } } },
        plugins: { legend: { display: false } }
      }
    });

    // Category Distribution
    const categoryChart = new Chart(document.getElementById('categoryChart').getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['Negative', 'Moderate', 'Positive'],
        datasets: [{
          data: [categories.Negative, categories.Moderate, categories.Positive],
          backgroundColor: ['#ef4444', '#facc15', '#22c55e']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } }
      }
    });

    // Sentiment Distribution
    const sentimentCounts = { Negative: 0, Moderate: 0, Positive: 0 };
    feedbackData.forEach(f => {
      const score = f.sentiment;
      sentimentCounts[score < 0.4 ? 'Negative' : score <= 0.6 ? 'Moderate' : 'Positive']++;
    });
    const sentimentChart = new Chart(document.getElementById('sentimentChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Negative', 'Moderate', 'Positive'],
        datasets: [{
          label: 'Sentiment Distribution',
          data: [sentimentCounts.Negative, sentimentCounts.Moderate, sentimentCounts.Positive],
          backgroundColor: ['#ef4444', '#facc15', '#22c55e'],
          borderColor: ['#dc2626', '#eab308', '#16a34a'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, title: { display: true, text: '
