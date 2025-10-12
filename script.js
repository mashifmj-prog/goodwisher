// script.js
const $ = id => document.getElementById(id);

// 1️⃣ THEME
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
  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  setThemeIcon();
}

// 2️⃣ MESSAGES
const messages = {
  'birthday': 'Happy Birthday! 🎉',
  'anniversary': 'Happy Anniversary! 💕',
  'get-well': 'Get well soon! 🌻',
  'congrats': 'Congratulations on your achievement! 🏆',
  'thank-you': 'Thank you for your kindness and support! 🙏',
  'good-luck': 'Good luck on your journey! 🍀',
  'motivation': 'Keep going — you can do this! 🚀',
  'appreciation': 'You’re appreciated more than you know! 🌟',
  'farewell': 'Wishing you the best in your next adventure! 👋',
  'encouragement': 'You’ve got this! 💪',
  'love': 'You make life beautiful! ❤️',
  'condolences': 'Sending my deepest condolences. 🕊️',
  'vacation': 'Enjoy your well-deserved vacation! 🌴'
};

function generateMessage() {
  const occ = $('occasion').value;
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  if (!occ) return $('previewMessage').textContent = '';

  let msg = messages[occ] || `Best wishes for your ${occ}!`;
  if (r) msg = `Hi ${r},\n\n${msg}`;
  if (s) msg += `\n\nRegards,\n${s}`;
  msg += `\n\nGenerated with love using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;

  $('previewMessage').textContent = msg;
  return msg;
}

// 3️⃣ COPY
function copyMessage() {
  const text = $('previewMessage').textContent;
  if (!text) return alert('No message to copy!');
  navigator.clipboard.writeText(text);
  alert('Message copied!');
}

// 4️⃣ EMOJI PICKER
const emojiList = ['😊','😂','😍','👍','🎉','💖','🌟','🍀','💪','🌻','❤️','🙏'];
function toggleEmojiPicker() {
  const picker = $('emojiPicker');
  picker.classList.toggle('hidden');
  picker.style.top = '200px';
  picker.style.left = 'calc(50% - 120px)';
}
function insertEmoji(e) {
  const msg = $('previewMessage').textContent;
  $('previewMessage').textContent = msg + e;
  $('emojiPicker').classList.add('hidden');
}

// 5️⃣ TEMPLATE MANAGEMENT
let templates = JSON.parse(localStorage.getItem('gwTemplates') || '[]');
function saveTemplate() {
  const msg = $('previewMessage').textContent;
  if (!msg) return alert('No message to save!');
  templates.push(msg);
  localStorage.setItem('gwTemplates', JSON.stringify(templates));
  updateTemplateDropdown();
  alert('Template saved!');
}

function updateTemplateDropdown() {
  const sel = $('templateSelect');
  sel.innerHTML = '<option value="" disabled selected>Load a Template (optional)</option>';
  templates.forEach((t, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = t.split('\n')[0].slice(0, 30) + '...';
    sel.appendChild(opt);
  });
}

function loadTemplate() {
  const idx = $('templateSelect').value;
  if (idx === null) return;
  $('previewMessage').textContent = templates[idx];
}

// 6️⃣ SHARING
function shareMessage() {
  const msg = $('previewMessage').textContent;
  if (!msg) return alert('No message to share!');
  const url = encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/');
  const text = encodeURIComponent(msg);
  window.open(`https://wa.me/?text=${text}`, '_blank');
}

// 7️⃣ INIT
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = saved;
  setThemeIcon();

  $('themeToggle').addEventListener('click', toggleTheme);
  $('occasion').addEventListener('change', generateMessage);
  $('recipientName').addEventListener('input', generateMessage);
  $('senderName').addEventListener('input', generateMessage);
  $('copyBtn').addEventListener('click', copyMessage);
  $('emojiBtn').addEventListener('click', toggleEmojiPicker);
  $('saveTemplateBtn').addEventListener('click', saveTemplate);
  $('templateSelect').addEventListener('change', loadTemplate);
  $('shareBtn').addEventListener('click', shareMessage);

  // Populate emoji picker
  const picker = $('emojiPicker');
  emojiList.forEach(e => {
    const btn = document.createElement('button');
    btn.textContent = e;
    btn.addEventListener('click', () => insertEmoji(e));
    picker.appendChild(btn);
  });

  updateTemplateDropdown();
});
