// script.js
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
  const message = messages[occasion] || '';
  messageDiv.textContent = message;
  customMessage.value = message;
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

function displaySavedMessages() {
  const savedMessagesDiv = document.getElementById('savedMessages');
  const saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  savedMessagesDiv.innerHTML = saved.length ? '<h2 class="text-lg font-semibold mb-2">Saved Messages:</h2>' + saved.map((msg, i) => `<p class="text-gray-600 mb-1">${i + 1}. ${msg}</p>`).join('') : '';
}

// Load saved messages on page load
window.onload = displaySavedMessages;

