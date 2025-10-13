const messages = {
  birthday: [
    "Another year older, wiser! 🥳",
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
    if (occasionSelect.value === 'exit') {
      occasionSelect.value = '';
      currentOccasion = '';
      currentIndex = 0;
      displayMessage();
      updateEmojiPicker();
    } else if (occasionSelect.value === 'custom') {
      document.getElementById('customOccasionWrap').classList.remove('hidden');
      currentOccasion = 'custom';
      currentIndex = 0;
      displayMessage();
      updateEmojiPicker();
    } else {
      document.getElementById('customOccasionWrap').classList.add('hidden');
      currentOccasion = occasionSelect.value;
      currentIndex = 0;
      displayMessage();
      updateEmojiPicker();
    }
  });

  // Generate Suggestions for Custom Occasion
  document.getElementById('generateSuggestions').addEventListener('click', () => {
    const desc = document.getElementById('customOccasionDesc').value.trim();
    if (desc) {
      generateCustomSuggestions(desc);
    } else {
      alert('Please enter a description for the custom occasion.');
    }
  });

  async function generateCustomSuggestions(desc) {
    const textarea = document.getElementById('customMessage');
    textarea.value = 'Generating suggestions...';
    try {
      const response = await fetch(`https://api.duckduckgo.com/?q=good+wishes+for+${encodeURIComponent(desc)}&format=json&pretty=1`);
      const data = await response.json();
      const suggestions = data.RelatedTopics.map(topic => topic.Text).filter(text => text.includes('wish') || text.includes('message')).slice(0, 3);
      if (suggestions.length > 0) {
        textarea.value = suggestions.join('\n\n');
      } else {
        textarea.value = 'No suggestions found. Try a different description.';
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      textarea.value = 'Error generating suggestions. Please try again.';
    }
  }

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

  // Display message with full preview
  function displayMessage() {
    const textarea = document.getElementById('customMessage');
    const sender = document.getElementById('senderName').value.trim();
    const recipient = document.getElementById('recipientName').value.trim();
    let messageBody = '';
    if (currentOccasion && messages[currentOccasion]) {
      messageBody = messages[currentOccasion][currentIndex];
    } else if (textarea.value && !sender && !recipient) {
      messageBody = textarea.value;
    }
    const greeting = recipient ? `Hi ${recipient},\n\n` : '';
    const signature = sender ? `\n\nRegards\n${sender}` : '';
    textarea.value = `${greeting}${messageBody}${signature}`;
  }

  // Action buttons
  window.copyMessage = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to copy.');
      return;
    }
    navigator.clipboard.writeText(text).then(() => alert('Message copied!'));
  };

  window.saveMessage = () => {
    alert('Message saved (placeholder for local storage).');
  };

  window.saveTemplate = () => {
    alert('Template saved (placeholder for local storage).');
  };

  window.openShareModal = () => {
    document.getElementById('shareModal').classList.remove('hidden');
  };

  window.openFeedbackModal = () => {
    document.getElementById('feedbackModal').classList.remove('hidden');
    setRating(0); // Reset rating on open
  };

  // Helper function to get full shareable message
  function getShareableMessage() {
    const textarea = document.getElementById('customMessage');
    const messageText = textarea.value.trim();
    if (!messageText) return '';
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
      } else {
        alert('Please enter a valid phone number (e.g., +27 for South Africa).');
      }
    } else {
      const smsUrl = `sms:?body=${encodeURIComponent(text)}`;
      window.open(smsUrl, '_blank');
      closeShareModal();
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
  };

  window.shareFacebook = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://www.facebook.com/sharer/sharer.php?u=&quote=${encodeURIComponent(text)}`, '_blank');
    closeShareModal();
  };

  window.shareTwitter = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    closeShareModal();
  };

  window.shareTikTok = () => {
    const text = getShareableMessage();
    if (!text.trim()) {
      alert('Please enter or select a message to share.');
      return;
    }
    alert('To share on TikTok, copy the message and paste it into a TikTok post.');
    navigator.clipboard.writeText(text).then(() => {
      alert('Message copied! Paste it into TikTok.');
      closeShareModal();
    });
  };

  window.closeShareModal = () => {
    document.getElementById('shareModal').classList.add('hidden');
  };

  // Feedback modal
  let currentRating = 0;

  window.setRating = (rating) => {
    currentRating = rating;
    const buttons = document.querySelectorAll('.rating-btn');
    buttons.forEach((btn, index) => {
      btn.classList.toggle('selected', index < rating);
      btn.style.display = 'block'; // Ensure buttons are visible
    });
    document.getElementById('ratingScore').textContent = `Score: ${rating * 20}%`;
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
    } else {
      alert('Please select a rating.');
    }
  };

  window.closeFeedbackModal = () => {
    document.getElementById('feedbackModal').classList.add('hidden');
    document.getElementById('feedbackText').value = '';
    document.getElementById('feedbackMessage').classList.add('hidden');
    setRating(0);
  };

  // View previous feedback
  window.viewPreviousFeedback = () => {
    const feedbackDisplay = feedbackList.length
      ? feedbackList.map(f => `<p>Rating: ${f.rating} stars (${f.rating * 20}%), Text: ${f.text}, Time: ${f.timestamp}</p>`).join('')
      : '<p>No previous feedback.</p>';
    const modal = document.getElementById('feedbackModal');
    const content = document.querySelector('#feedbackModal .modal-content');
    content.innerHTML = `<h2>Previous Feedback</h2>${feedbackDisplay}<div class="modal-actions"><button onclick="closeFeedbackModal()" class="btn light">Close</button></div>`;
    modal.classList.remove('hidden');
  };
});
