const $ = id => document.getElementById(id);
let selectedRating = 0;

// Theme toggle
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
  body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', body.dataset.theme);
  setThemeIcon();
}

// Clear name input
function clearNameInput(e) {
  const targetId = e.target.dataset.target;
  $(targetId).value = '';
}

// Message generation (simple template, can extend with multilingual)
function generateMessage() {
  const occ = $('occasion').value;
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  const messages = {
    'birthday':'Happy Birthday! 🎉',
    'anniversary':'Happy Anniversary! 💕',
    'get-well':'Get well soon! 🌻',
    'congrats':'Congratulations on your achievement! 🏆',
    'thank-you':'Thank you for your kindness and support! 🙏',
    'good-luck':'Good luck on your journey! 🍀',
    'motivation':'Keep going — you can do this! 🚀',
    'appreciation':'You’re appreciated more than you know! 🌟',
    'farewell':'Wishing you the best in your next adventure! 👋',
    'encouragement':'You’ve got this! 💪',
    'love':'You make life beautiful! ❤️',
    'condolences':'Sending my deepest condolences. 🕊️',
    'vacation':'Enjoy your well-deserved vacation! 🌴'
  };
  if(!occ) return;
  let msg = messages[occ] || `Best wishes for your ${occ}!`;
  if(r) msg = `Hi ${r},\n\n${msg}`;
  if(s) msg += `\n\nRegards,\n${s}`;
  $('customMessage').value = msg;
}

// Feedback modal
function openFeedbackModal() { $('feedbackModal').classList.remove('hidden'); }
function closeFeedbackModal() {
  $('feedbackModal').classList.add('hidden');
  $('feedbackText').value = '';
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
  $('ratingScore').textContent = 'Score: 0%';
}
function setRating(r) {
  selectedRating = r;
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('selected', i<r));
  $('ratingScore').textContent = `Score: ${r*20}%`;
}
function submitFeedback(){
  const fb = $('feedbackText').value.trim();
  if(!fb && selectedRating===0) return alert('Please rate or comment!');
  alert(`Thanks for rating ${selectedRating}/5 (${selectedRating*20}%)!`);
  closeFeedbackModal();
}

// Share functionality
function toggleShareOptions() { $('shareOptions').classList.toggle('hidden'); }
function getMessageForShare() {
  const msg = $('customMessage').value.trim();
  return msg + "\n\nGenerated with love using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/";
}
function shareGeneric(urlBase) {
  const msg = getMessageForShare();
  window.open(urlBase + encodeURIComponent(msg), '_blank');
}
function shareDevice() {
  const text = getMessageForShare();
  if (navigator.share) {
    navigator.share({ text }).catch(err => console.log('Share canceled or failed', err));
  } else {
    alert('Device share not supported. Copy the message manually.');
  }
}

// Initialize events
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = savedTheme;
  setThemeIcon();
  $('themeToggle').addEventListener('click', toggleTheme);
  $('occasion').addEventListener('change', generateMessage);
  $('language').addEventListener('change', generateMessage);
  $('senderName').addEventListener('input', generateMessage);
  $('recipientName').addEventListener('input', generateMessage);

  document.querySelectorAll('.clear-btn').forEach(btn => btn.addEventListener('click', clearNameInput));

  $('shareBtn').addEventListener('click', toggleShareOptions);
  $('shareWhatsApp').addEventListener('click', ()=>shareGeneric('https://wa.me/?text='));
  $('shareFacebook').addEventListener('click', ()=>shareGeneric('https://www.facebook.com/sharer/sharer.php?u=https://mashifmj-prog.github.io/goodwisher/&quote='));
  $('shareX').addEventListener('click', ()=>shareGeneric('https://x.com/intent/tweet?text='));
  $('shareTelegram').addEventListener('click', ()=>shareGeneric('https://t.me/share/url?url=https://mashifmj-prog.github.io/goodwisher/&text='));
  $('shareEmail').addEventListener('click', ()=>{
    const msg = getMessageForShare();
    const subject = encodeURIComponent('A Special Message from GoodWisher');
    const body = encodeURIComponent(msg.replace(/\n/g,'%0A'));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  $('shareDevice').addEventListener('click', shareDevice);

  $('feedbackBtn').addEventListener('click', openFeedbackModal);
});
