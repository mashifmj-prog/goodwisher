// script.js (updated with feedback functions and GA4 event)
let currentBaseMessage = '';

function updateMessageWithName() {
  const name = document.getElementById('recipientName').value.trim();
  const customMessage = document.getElementById('customMessage');
  if (currentBaseMessage && name) {
    customMessage.value = `${name}, ${currentBaseMessage}`;
  } else if (currentBaseMessage) {
    customMessage.value = currentBaseMessage;
  }
}

function displayMessage() {
  const occasion = document.getElementById('occasion').value;
  const messageDiv = document.getElementById('message');
  const customMessage = document.getElementById('customMessage');
  const messages = {
    birthday: 'Wishing you a fantastic birthday filled with joy! 🎉',
    anniversary: 'Cheers to your love and another year together! 💕',
    'get-well': 'Sending you warm wishes for a speedy recovery! 🌻',
    congrats: 'Big congrats on your amazing achievement! 🏆'
  };
  currentBaseMessage = messages[occasion] || '';
  messageDiv.textContent = currentBaseMessage;
  updateMessageWithName();
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
  if (!customMessage) return;
  let saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  saved.push(customMessage);
  localStorage.setItem('savedMessages', JSON.stringify(saved));
  gtag('event', 'save_message', { 'event_category': 'Action', 'event_label': 'Save Message' });
  displaySavedMessages();
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
          <button class="delete-btn" onclick="deleteMessage(${i})"><i class="fas fa-trash mr-1"></i>Delete</button>
        </div>`
      ).join('');
  } else {
    savedMessagesDiv.innerHTML = '';
  }
}

function getMessageWithPromo() {
  const customMessage = document.getElementById('customMessage').value;
  if (!customMessage) return '';
  return `${customMessage}\n\nCreated with GoodWisher! Make your own message: https://mashifmj-prog.github.io/goodwisher/`;
}

// Sharing functions (unchanged from previous)
function shareWhatsApp() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}&app_absent=1`;
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

// Feedback Modal Functions
function openFeedbackModal() {
  document.getElementById('feedbackModal').classList.remove('hidden');
  gtag('event', 'feedback_button_click', { 'event_category': 'Button', 'event_label': 'Feedback' });
}

function closeFeedbackModal() {
  document.getElementById('feedbackModal').classList.add('hidden');
  document.getElementById('feedbackText').value = '';
}

function submitFeedback() {
  const feedback = document.getElementById('feedbackText').value.trim();
  if (!feedback) return alert('Please share your thoughts!');
  gtag('event', 'feedback_submitted', { 
    'event_category': 'Action', 
    'event_label': 'Feedback', 
    'value': feedback.length  // Track length for sentiment analysis
  });
  const subject = encodeURIComponent('GoodWisher Feedback from User');
  const body = encodeURIComponent(`Comment: ${feedback}\n\nFrom: ${navigator.userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'} User`);
  const url = `mailto:your-email@example.com?subject=${subject}&body=${body}`;  // Replace with your email
  window.location.href = url;
  closeFeedbackModal();
  alert('Thanks for your feedback! It helps us improve. 😊');
}

// Load saved messages on page load
window.onload = displaySavedMessages;
