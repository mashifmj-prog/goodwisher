// script.js
let currentBaseMessage = '';

function updateMessageWithName() {
  const name = document.getElementById('recipientName').value.trim();
  const customMessage = document.getElementById('customMessage');
  if (currentBaseMessage && name) {
    const personalized = `${currentBaseMessage.replace(/^[A-Z][a-z]+ you/, `${name}, you`)}`; // Simple personalization
    customMessage.value = personalized;
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
  updateMessageWithName(); // Apply name if entered
}

function copyMessage() {
  const customMessage = document.getElementById('customMessage');
  customMessage.select();
  navigator.clipboard.writeText(customMessage.value)
    .then(() => {
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
  displaySavedMessages();
}

function deleteMessage(index) {
  let saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  saved.splice(index, 1);
  localStorage.setItem('savedMessages', JSON.stringify(saved));
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

function shareWhatsApp() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}&app_absent=1`;
    window.open(url, '_blank', 'width=600,height=800');
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
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'width=600,height=400');
    console.log('Twitter/X share opened:', url);
  } catch (e) {
    console.error('Twitter/X share failed:', e);
    alert('Failed to open Twitter/X. Try copying the message instead.');
  }
}

function shareEmail() {
  const message = getMessageWithPromo();
  if (!message) return alert('Please generate a message first!');
  try {
    const subject = encodeURIComponent('A Special Message from GoodWisher');
    const body = encodeURIComponent(message.replace(/\n/g, '%0A')); // Ensure line breaks
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = url;
    console.log('Email share initiated:', url);
  } catch (e) {
    console.error('Email share failed:', e);
    alert('Failed to open email client. Try copying the message instead.');
  }
}

// Load saved messages on page load
window.onload = displaySavedMessages;
