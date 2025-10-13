const messages = {
  birthday: [
    "Wishing you a day filled with love and happiness.",
    "Happy Birthday! Enjoy your special day."
  ],
  anniversary: [
    "Happy Anniversary! Wishing you many more years of happiness.",
    "Here's to celebrating your love and commitment."
  ],
  'get-well': [
    "Wishing you a speedy recovery!",
    "Get well soon! Sending you lots of love and strength."
  ],
  congrats: [
    "Congratulations on your amazing achievement!",
    "Well done! Your hard work has paid off."
  ],
  'thank-you': [
    "Thank you for your kindness and support.",
    "I appreciate everything you've done for me."
  ],
  'good-luck': [
    "Best of luck in your new adventure!",
    "Wishing you success and good fortune!"
  ],
  motivation: [
    "Keep pushing forward; you've got this!",
    "Stay strong and keep chasing your dreams."
  ],
  appreciation: [
    "Your efforts are truly appreciated!",
    "Thank you for being so amazing."
  ],
  farewell: [
    "Wishing you all the best in your next chapter!",
    "You'll be missed, but your future is bright!"
  ],
  encouragement: [
    "You're stronger than you know—keep going!",
    "Believe in yourself; you're capable of great things."
  ],
  love: [
    "You mean the world to me.",
    "My heart is yours, always and forever."
  ],
  condolences: [
    "I'm so sorry for your loss.",
    "My deepest condolences to you and your family."
  ],
  vacation: [
    "Have an amazing vacation filled with fun!",
    "Enjoy your getaway and making new memories!"
  ]
};

const emojis = {
  birthday: ['🎉', '🎂', '🎈', '🥳'],
  anniversary: ['💑', '💍', '❤️', '🎊'],
  'get-well': ['🌼', '🙏', '💙', '🌟'],
  congrats: ['🎉', '🏆', '🥂', '🌟'],
  'thank-you': ['🙏', '💖', '🤗', '🌺'],
  'good-luck': ['🍀', '🤞', '🌈', '✨'],
  motivation: ['💪', '🔥', '🌟', '🚀'],
  appreciation: ['🙌', '💖', '🌹', '😊'],
  farewell: ['👋', '😢', '🌍', '💫'],
  encouragement: ['💪', '🌟', '🚀', '🙌'],
  love: ['❤️', '💕', '😘', '🌹'],
  condolences: ['🙏', '🕊️', '🌹', '💔'],
  vacation: ['🌴', '✈️', '🏖️', '☀️'],
  default: ['😊', '👍', '❤️', '🌟']
};

let currentOccasion = '';
let currentIndex = 0;
let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];

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
  });

  function updateThemeIcon(theme) {
    themeIconPath.setAttribute('d', theme === 'light' ? 
      'M12 3v1m0 16v1m9-9h-1m-16 0H3m15.364-6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 12.728l-.707-.707M6.343 17.657l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z' : 
      'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
  }

  // Occasion selection
  const occasionSelect = document.getElementById('occasion');
  occasionSelect.addEventListener('change', () => {
    currentOccasion = occasionSelect.value;
    currentIndex = 0;
    displayMessage();
    updateEmojiPicker();
  });

  // Next Message
  document.getElementById('nextMessage').addEventListener('click', () => {
    if (currentOccasion && messages[currentOccasion]) {
      currentIndex = (currentIndex + 1) % messages[currentOccasion].length;
      displayMessage();
    }
  });

  // Clear Content
  document.getElementById('clearContent').addEventListener('click', () => {
    document.getElementById('customMessage').value = '';
    document.getElementById('senderName').value = '';
    document.getElementById('recipientName').value = '';
    currentIndex = 0;
    occasionSelect.value = '';
    currentOccasion = '';
    updateEmojiPicker();
  });

  // Emoji Button and Picker
  const emojiButton = document.getElementById('emojiButton');
  let emojiPicker = null;

  emojiButton.addEventListener('click', (e) => {
    if (emojiPicker) {
      emojiPicker.remove();
      emojiPicker = null;
    } else {
      emojiPicker = document.createElement('div');
      emojiPicker.className = 'emoji-picker';
      const emojiList = currentOccasion ? emojis[currentOccasion] : emojis.default;
      emojiList.forEach(emoji => {
        const btn = document.createElement('button');
        btn.className = 'emoji-btn';
        btn.textContent = emoji;
        btn.addEventListener('click', () => {
          document.getElementById('customMessage').value += emoji;
          emojiPicker.remove();
          emojiPicker = null;
        });
        emojiPicker.appendChild(btn);
      });
      emojiButton.parentElement.appendChild(emojiPicker);
    }
  });

  function updateEmojiPicker() {
    if (emojiPicker) {
      emojiPicker.remove();
      emojiPicker = null;
    }
  }

  // Name inputs
  document.getElementById('senderName').addEventListener('input', updateMessageWithName);
  document.getElementById('recipientName').addEventListener('input', updateMessageWithName);

  function updateMessageWithName() {
    displayMessage();
  }

  // Clear name inputs
  window.clearSender = () => {
    document.getElementById('senderName').value = '';
    updateMessageWithName();
  };
  window.clearRecipient = () => {
    document.getElementById('recipientName').value = '';
    updateMessageWithName();
  };

  // Display message
  function displayMessage() {
    const textarea = document.getElementById('customMessage');
    if (currentOccasion && messages[currentOccasion]) {
      textarea.value = messages[currentOccasion][currentIndex];
    } else {
      textarea.value = '';
    }
  }

  // Action buttons
  window.copyMessage = () => {
    const textarea = document.getElementById('customMessage');
    const sender = document.getElementById('senderName').value;
    const recipient = document.getElementById('recipientName').value;
    const signature = sender ? `\n\nFrom: ${sender}` : '';
    const fullMessage = recipient ? `To: ${recipient}\n${textarea.value}${signature}` : `${textarea.value}${signature}`;
    if (!fullMessage.trim()) {
      alert('Please enter or select a message to copy.');
      return;
    }
    navigator.clipboard.writeText(fullMessage).then(() => alert('Message copied!'));
  };

  window.saveMessage = () => {
    alert('Message saved (placeholder for local storage).');
  };

  window.saveTemplate = () => {
    alert('Template saved (placeholder for local storage).');
  };

  window.openShareModal = () => {
    document.getElementById('shareModal').classList.remove('hidden');
    document.getElementById('phoneNumber').value = ''; // Clear phone number on modal open
  };

  window.openFeedbackModal = () => {
    document.getElementById('feedbackModal').classList.remove('hidden');
  };

  // Helper function to get full shareable message
  function getShareableMessage() {
    const textarea = document.getElementById('customMessage');
    const sender = document.getElementById('senderName').value;
    const recipient = document.getElementById('recipientName').value;
    const signature = sender ? `\n\nFrom: ${sender}` : '';
    return recipient ? `To: ${recipient}\n${textarea.value}${signature}` : `${textarea.value}${signature}`;
  }

  // Share modal functions
  window.shareWhatsApp = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  window.shareFacebook = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(text)}`, '_blank');
  };

  window.shareTwitter = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  window.shareTelegram = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(text)}`, '_blank');
  };

  window.shareEmail = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`mailto:?body=${encodeURIComponent(text)}`, '_blank');
  };

  // Share via Device (Web Share API for native SMS, etc.)
  window.shareDevice = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    if (navigator.share && !phoneNumber) { // Use Web Share API if no phone number
      navigator.share({
        title: 'GoodWisher Message',
        text: text
      }).then(() => {
        console.log('Shared successfully');
      }).catch((error) => {
        console.error('Error sharing:', error);
        fallbackToSMS(text, phoneNumber);
      });
    } else {
      // Use SMS URL if phone number provided or Web Share API unsupported
      fallbackToSMS(text, phoneNumber);
    }
  };

  // Fallback to SMS URL scheme
  function fallbackToSMS(text, phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/[^0-9+]/g, ''); // Clean phone number
    const smsUrl = cleanedNumber ? `sms:${cleanedNumber}?body=${encodeURIComponent(text)}` : `sms:?body=${encodeURIComponent(text)}`;
    try {
      window.open(smsUrl, '_blank');
    } catch (error) {
      console.error('Error opening SMS:', error);
      alert('Unable to open SMS app. Try copying the message instead.');
    }
  }

  window.closeShareModal = () => {
    document.getElementById('shareModal').classList.add('hidden');
    document.getElementById('phoneNumber').value = ''; // Clear phone number on close
  };

  // Feedback modal
  let currentRating = 0;

  window.setRating = (rating) => {
    currentRating = rating;
    document.querySelectorAll('.star').forEach((star, index) => {
      star.classList.toggle('selected', index < rating);
    });
    document.getElementById('ratingScore').textContent = `Score: ${rating * 20}%`;
  };

  window.submitFeedback = () => {
    const feedbackText = document.getElementById('feedbackText').value;
    if (currentRating > 0) {
      feedbackList.push({ rating: currentRating, text: feedbackText, timestamp: new Date().toISOString() });
      localStorage.setItem('feedbackList', JSON.stringify(feedbackList));
      alert('Feedback submitted!');
      closeFeedbackModal();
    } else {
      alert('Please select a rating.');
    }
  };

  window.closeFeedbackModal = () => {
    document.getElementById('feedbackModal').classList.add('hidden');
    document.getElementById('feedbackText').value = '';
    setRating(0);
  };

  // View previous feedback
  window.viewPreviousFeedback = () => {
    const feedbackDisplay = feedbackList.map(f => `Rating: ${f.rating} stars (${f.rating * 20}%), Text: ${f.text}, Time: ${f.timestamp}`).join('\n');
    alert(feedbackDisplay || 'No previous feedback.');
  };
});
