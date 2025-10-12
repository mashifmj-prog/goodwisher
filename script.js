const $ = id => document.getElementById(id);
let selectedRating = 0;

// THEME
function setThemeIcon() {
  const path = $('themeIconPath');
  const isDark = document.body.dataset.theme === 'dark';
  path.setAttribute('d', isDark ?
    'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z' :
    'M12 2a10 10 0 100 20 10 10 0 000-20z');
}
function toggleTheme() {
  document.body.dataset.theme =
    document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', document.body.dataset.theme);
  setThemeIcon();
}

// CLEAR NAME
function clearNameInput(e) {
  $(e.target.dataset.target).value = '';
  generateMessage();
}

// MESSAGE
function generateMessage() {
  const occ = $('occasion').value;
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();

  const messages = {
    birthday: 'Happy Birthday! 🎉',
    anniversary: 'Happy Anniversary! 💕',
    condolences: 'Sending heartfelt condolences in this time of loss. 🕊️',
    congrats: 'Congratulations on your achievement! 🏆'
  };
  if (!occ) return;
  let msg = messages[occ] || `Best wishes for your ${occ}!`;
  if (r) msg = `Hi ${r},\n\n${msg}`;
  if (s) msg += `\n\nRegards,\n${s}`;
  $('customMessage').value = msg;
}

// FEEDBACK MODAL
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
  document.querySelectorAll('.star').forEach((s, i) => s.classList.toggle('selected', i < r));
  $('ratingScore').textContent = `Score: ${r * 20}%`;
}
function submitFeedback() {
  const fb = $('feedbackText').value.trim();
  if (!fb && selectedRating === 0) return alert('Please rate or comment!');
  alert(`Thanks for rating ${selectedRating}/5 (${selectedRating * 20}%)!`);
  closeFeedbackModal();
}

// SHARE
function toggleShareOptions() { $('shareOptions').classList.toggle('hidden'); }
function getMessageForShare() {
  let msg = $('customMessage').value.trim();
  const senderName = $('senderName').value.trim();
  if (senderName)
    msg += `\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
  return msg;
}
function shareGeneric(urlBase) { window.open(urlBase + encodeURIComponent(getMessageForShare()), '_blank'); }
function shareDevice() {
  const text = getMessageForShare();
  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
  } else alert('Device share not supported.');
}

// EMOJIS
const emojis = ['😊','😂','❤️','👍','🎉','🌟','💪','🥰','🙏','🌻','🕊️','🍀'];
function openEmojiPicker() {
  let picker = document.createElement('div');
  picker.id = 'emojiPicker';
  picker.style.position = 'absolute';
  picker.style.background = '#fff';
  picker.style.border = '1px solid #ccc';
  picker.style.padding = '6px';
  picker.style.borderRadius = '8px';
  picker.style.display = 'flex';
  picker.style.flexWrap = 'wrap';
  picker.style.gap = '4px';
  const rect = $('emojiButton').getBoundingClientRect();
  picker.style.top = (rect.bottom + window.scrollY) + 'px';
  picker.style.left = (rect.left + window.scrollX) + 'px';

  emojis.forEach(e => {
    let btn = document.createElement('button');
    btn.textContent = e;
    btn.style.border = 'none';
    btn.style.background = 'none';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '1.2rem';
    btn.addEventListener('click', () => {
      const textarea = $('customMessage');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + e + textarea.value.substring(end);
      textarea.focus();
      picker.remove();
    });
    picker.appendChild(btn);
  });

  document.body.appendChild(picker);
  const closePicker = ev => {
    if (!picker.contains(ev.target) && ev.target.id !== 'emojiButton') {
      picker.remove();
      document.removeEventListener('click', closePicker);
    }
  };
  document.addEventListener('click', closePicker);
}

// INIT
window.addEventListener('DOMContentLoaded', () => {
  document.body.dataset.theme = localStorage.getItem('theme') || 'light';
  setThemeIcon();

  $('themeToggle').addEventListener('click', toggleTheme);
  $('occasion').addEventListener('change', generateMessage);
  $('language').addEventListener('change', generateMessage);
  $('senderName').addEventListener('input', generateMessage);
  $('recipientName').addEventListener('input', generateMessage);
  document.querySelectorAll('.clear-btn').forEach(btn => btn.addEventListener('click', clearNameInput));

  $('shareBtn').addEventListener('click', toggleShareOptions);
  $('shareWhatsApp').addEventListener('click', () => shareGeneric('https://wa.me/?text='));
  $('shareFacebook').addEventListener('click', () => shareGeneric('https://www.facebook.com/sharer/sharer.php?u=https://mashifmj-prog.github.io/goodwisher/&quote='));
  $('shareX').addEventListener('click', () => shareGeneric('https://x.com/intent/tweet?text='));
  $('shareTelegram').addEventListener('click', () => shareGeneric('https://t.me/share/url?url=https://mashifmj-prog.github.io/goodwisher/&text='));
  $('shareEmail').addEventListener('click', () => {
    const msg = getMessageForShare();
    const subject = encodeURIComponent('A Special Message from GoodWisher');
    const body = encodeURIComponent(msg);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  $('shareDevice').addEventListener('click', shareDevice);
  $('emojiButton').addEventListener('click', openEmojiPicker);

  $('feedbackBtn').addEventListener('click', openFeedbackModal);
  $('cancelFeedback').addEventListener('click', closeFeedbackModal);
  $('submitFeedback').addEventListener('click', submitFeedback);
});
