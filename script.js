function $(id) { return document.getElementById(id); }
let currentBaseMessage = '';
let selectedRating = 0;
let emojiPickerInitialized = false;
let confettiLoaded = false;

/* Theme toggle */
function setThemeIcon() {
  const p = $('themeIconPath');
  if (!p) return;
  const isDark = document.body.dataset.theme === 'dark';
  p.setAttribute('d', isDark ? 'M12 4.5a1 1 0 010-2 1 1 0 010 2z' : 'M12 2a10 10 0 100 20 10 10 0 000-20z');
}

function toggleTheme() {
  const b = document.body;
  b.dataset.theme = b.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', b.dataset.theme);
  setThemeIcon();
}

/* Messages definitions */
const messages = {
  en: {
    birthday: ['Wishing you a fantastic birthday filled with joy! 🎉', 'Happy birthday! May your day be full of laughter and love! 🎂'],
    anniversary: ['Happy anniversary! Wishing you love and joy! 💕'],
    'get-well': ['Get well soon! Sending healing thoughts. 🌻'],
    congrats: ['Big congrats on your amazing achievement! 🏆'],
    'thank-you': ['Thank you for your amazing support and kindness! 🙏'],
    'good-luck': ['Wishing you the best of luck in your next adventure! 🍀'],
    motivation: ['Keep shining — you’ve got this! 🚀'],
    appreciation: ['Your efforts are truly appreciated! 🌟'],
    farewell: ['Wishing you all the best in your new journey! 👋'],
    encouragement: ['You’re stronger than you know — keep going! 💪'],
    love: ['You make every moment special with your love! ❤️'],
    condolences: ['Sending heartfelt condolences in this time of loss. 🕊️'],
    vacation: ['Have a fantastic vacation filled with joy! 🌴']
  },
  zh: {
    birthday: ['祝你生日快乐，幸福美满！🎉', '生日快乐！愿你笑口常开！🎂'],
    anniversary: ['结婚纪念日快乐！愿你们永远幸福！💕'],
    'get-well': ['早日康复，健康快乐！🌻'],
    congrats: ['恭喜你取得巨大成就！🏆'],
    'thank-you': ['感谢你的支持与善意！🙏'],
    'good-luck': ['祝你好运连连！🍀'],
    motivation: ['加油，你一定行的！🚀'],
    appreciation: ['非常感谢你的努力与贡献！🌟'],
    farewell: ['祝你前程似锦，再见！👋'],
    encouragement: ['别放弃，你比自己想象的更强！💪'],
    love: ['你让生活充满爱与美好！❤️'],
    condolences: ['在这艰难时刻，致以诚挚慰问。🕊️'],
    vacation: ['假期愉快，好好休息！🌴']
  },
  hi: {
    birthday: ['जन्मदिन मुबारक हो! खुश रहो और मुस्कुराते रहो! 🎉', 'आपका दिन हँसी और प्यार से भरा रहे! 🎂'],
    anniversary: ['सालगिरह की हार्दिक शुभकामनाएँ! 💕'],
    'get-well': ['जल्दी स्वस्थ हो जाओ! 🌻'],
    congrats: ['बधाई हो! आपने शानदार काम किया है! 🏆'],
    'thank-you': ['आपके सहयोग के लिए धन्यवाद! 🙏'],
    'good-luck': ['आपको ढेर सारी शुभकामनाएँ! 🍀'],
    motivation: ['आगे बढ़ते रहो, तुम कर सकते हो! 🚀'],
    appreciation: ['आपके प्रयास सराहनीय हैं! 🌟'],
    farewell: ['आपके नए सफर के लिए शुभकामनाएँ! 👋'],
    encouragement: ['हार मत मानो, तुम मजबूत हो! 💪'],
    love: ['तुम मेरे जीवन को खास बनाते हो! ❤️'],
    condolences: ['इस कठिन समय में संवेदनाएँ। 🕊️'],
    vacation: ['छुट्टियाँ मुबारक! आनंद लो! 🌴']
  },
  es: {
    birthday: ['¡Feliz cumpleaños! Que tu día esté lleno de alegría! 🎉', '¡Que tengas un cumpleaños maravilloso! 🎂'],
    anniversary: ['¡Feliz aniversario! ¡Mucho amor y felicidad! 💕'],
    'get-well': ['¡Recupérate pronto! 🌻'],
    congrats: ['¡Felicitaciones por tu gran logro! 🏆'],
    'thank-you': ['¡Gracias por tu apoyo y amabilidad! 🙏'],
    'good-luck': ['¡Buena suerte en tu nueva aventura! 🍀'],
    motivation: ['¡Sigue adelante, tú puedes! 🚀'],
    appreciation: ['¡Tus esfuerzos son apreciados! 🌟'],
    farewell: ['¡Te deseamos lo mejor! 👋'],
    encouragement: ['¡Eres más fuerte de lo que crees! 💪'],
    love: ['¡Tu amor hace todo especial! ❤️'],
    condolences: ['Mis condolencias sinceras. 🕊️'],
    vacation: ['¡Disfruta tus vacaciones! 🌴']
  },
  af: {
    birthday: ['Baie geluk met jou verjaarsdag! 🎉', 'Mag jou dag vol liefde en lag wees! 🎂'],
    anniversary: ['Gelukkige herdenking! 💕'],
    'get-well': ['Word gou gesond! 🌻'],
    congrats: ['Baie geluk met jou prestasie! 🏆'],
    'thank-you': ['Dankie vir jou ondersteuning en goedhartigheid! 🙏'],
    'good-luck': ['Sterkte met jou nuwe avontuur! 🍀'],
    motivation: ['Hou aan glo, jy kan dit doen! 🚀'],
    appreciation: ['Ons waardeer jou harde werk! 🌟'],
    farewell: ['Beste wense vir jou pad vorentoe! 👋'],
    encouragement: ['Jy is sterker as wat jy dink! 💪'],
    love: ['Jy maak elke oomblik spesiaal! ❤️'],
    condolences: ['Innige meegevoel in hierdie tyd van verlies. 🕊️'],
    vacation: ['Geniet jou vakansie! 🌴']
  }
};

/* Simple greeting prefix per language */
const greetings = {
  en: 'Hi',
  zh: '你好',
  hi: 'नमस्ते',
  es: 'Hola',
  af: 'Hallo'
};

/* Display the message for current settings */
function displayMessage() {
  const occ = $('occasion').value;
  const lang = $('language').value || 'en';
  const msgDiv = $('message');

  if (!occ) {
    msgDiv.textContent = '';
    currentBaseMessage = '';
    $('customMessage').value = '';
    return;
  }

  const list = (messages[lang] && messages[lang][occ]) || (messages.en && messages.en[occ]) || [''];
  currentBaseMessage = list[Math.floor(Math.random() * list.length)];
  msgDiv.textContent = currentBaseMessage;

  updateMessageWithName();
}

/* Update the customMessage including name prefixes */
function updateMessageWithName() {
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  const lang = $('language').value || 'en';
  let msg = currentBaseMessage || '';

  if (r) {
    msg = `${greetings[lang]} ${r},\n\n${currentBaseMessage}`;
  }
  if (s) {
    msg = `${msg}\n\nRegards,\n${s}`;
  }
  $('customMessage').value = msg || currentBaseMessage;
}

/* Copy + confetti (lazy) */
function loadScript(url, cb) {
  const s = document.createElement('script');
  s.src = url;
  s.onload = () => cb && cb();
  s.onerror = () => console.warn('Failed load', url);
  document.body.appendChild(s);
}

function copyMessage() {
  const text = $('customMessage').value;
  if (!text) {
    alert('Please generate a message first!');
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    alert('Message copied!');
    if (!confettiLoaded) {
      confettiLoaded = true;
      loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js', () => {
        try { confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } }); }
        catch (e) { }
      });
    } else {
      try { confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } }); }
      catch (e) { }
    }
  }).catch(() => {
    alert('Copy failed — please try manually.');
  });
}

/* Save / templates */
function saveMessage() {
  const text = $('customMessage').value;
  if (!text) {
    alert('Please generate a message first!');
    return;
  }
  const arr = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  arr.push(text);
  localStorage.setItem('savedMessages', JSON.stringify(arr));
  displaySavedMessages();
}

function saveTemplate() {
  const text = $('customMessage').value;
  if (!text) {
    alert('Please generate a message first!');
    return;
  }
  const occ = $('occasion').value || 'Custom';
  const autoName = `${text.slice(0, 20)}... (${occ})`;
  const name = prompt('Template name (optional):', autoName) || autoName;
  const tpl = JSON.parse(localStorage.getItem('templates') || '[]');
  tpl.push({ name, content: text });
  localStorage.setItem('templates', JSON.stringify(tpl));

  if ($('deleteAfterTemplate') && $('deleteAfterTemplate').checked) {
    const saved = JSON.parse(localStorage.getItem('savedMessages') || '[]');
    const idx = saved.indexOf(text);
    if (idx >= 0) {
      saved.splice(idx, 1);
      localStorage.setItem('savedMessages', JSON.stringify(saved));
    }
  }
  updateTemplateSelect();
}

function updateTemplateSelect() {
  const sel = $('templateSelect');
  const tpl = JSON.parse(localStorage.getItem('templates') || '[]');
  const opts = tpl.map((t, i) => `<option value="${i}">${t.name}</option>`).join('');
  sel.innerHTML = `<option value="" disabled selected>Load a Template (optional)</option>${opts}`;
}

function loadTemplate() {
  const idx = $('templateSelect').value;
  if (idx === '' || idx === null) return;
  const tpl = JSON.parse(localStorage.getItem('templates') || '[]');
  if (tpl[idx]) {
    $('customMessage').value = tpl[idx].content;
  }
}

function displaySavedMessages() {
  const container = $('savedMessages');
  const arr = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  if (!arr.length) {
    container.innerHTML = `<button onclick="exportSavedMessages()" class="btn small">Export Saved Messages</button>`;
    return;
  }
  const html = arr.map((msg, i) => `
    <div class="saved-item">
      <div class="saved-text">${escapeHtml(msg)}</div>
      <div class="saved-actions">
        <button onclick="editMessage(${i})" class="btn small">Edit</button>
        <button onclick="deleteMessage(${i})" class="btn small light">Delete</button>
      </div>
    </div>
  `).join('');
  container.innerHTML = html + `<div style="margin-top:8px"><button onclick="exportSavedMessages()" class="btn small">Export Saved Messages</button></div>`;
}

function editMessage(i) {
  const arr = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  if (arr[i]) {
    $('customMessage').value = arr[i];
    $('recipientName').value = '';
    $('senderName').value = '';
    $('occasion').value = '';
    $('message').textContent = '';
    currentBaseMessage = '';
  }
}

function deleteMessage(i) {
  const arr = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  arr.splice(i, 1);
  localStorage.setItem('savedMessages', JSON.stringify(arr));
  displaySavedMessages();
}

function exportSavedMessages() {
  const arr = JSON.parse(localStorage.getItem('savedMessages') || '[]');
  if (!arr.length) {
    alert('No messages to export');
    return;
  }
  const blob = new Blob([JSON.stringify(arr, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'saved_messages.json';
  a.click();
  URL.revokeObjectURL(url);
}

/* Share functions */
function getMessageWithPromo() {
  const text = $('customMessage').value;
  if (!text) return '';
  return `${text}\n\nGenerated with GoodWisher`;
}

function openShareModal() {
  $('shareModal').classList.remove('hidden');
}

function closeShareModal() {
  $('shareModal').classList.add('hidden');
}

function shareWhatsApp() {
  const m = getMessageWithPromo();
  if (!m) { alert('Generate a message first!'); return; }
  window.open(`https://wa.me/?text=${encodeURIComponent(m)}`, '_blank');
}

function shareFacebook() {
  const m = getMessageWithPromo();
  if (!m) { alert('Generate a message first!'); return; }
  const url = encodeURIComponent(location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(m)}`, '_blank');
}

function shareTwitter() {
  const m = getMessageWithPromo();
  if (!m) { alert('Generate a message first!'); return; }
  const msg = m.length > 280 ? m.slice(0, 277) + '...' : m;
  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`, '_blank');
}

function shareTelegram() {
  const m = getMessageWithPromo();
  if (!m) { alert('Generate a message first!'); return; }
  window.open(`https://t.me/share/url?text=${encodeURIComponent(m)}`, '_blank');
}

function shareEmail() {
  const m = getMessageWithPromo();
  if (!m) { alert('Generate a message first!'); return; }
  const subject = encodeURIComponent('A Special Message');
  const body = encodeURIComponent(m.replace(/\n/g, '%0A'));
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}

/* Feedback */
function openFeedbackModal() {
  $('feedbackModal').classList.remove('hidden');
}

function closeFeedbackModal() {
  $('feedbackModal').classList.add('hidden');
  if ($('feedbackText')) $('feedbackText').value = '';
  selectedRating = 0;
  document.querySelectorAll('#starRating .star').forEach(s => s.classList.remove('selected'));
}

function setRating(r) {
  selectedRating = r;
  document.querySelectorAll('#starRating .star').forEach((s, idx) => s.classList.toggle('selected', idx < r));
}

function submitFeedback() {
  const fb = $('feedbackText').value.trim();
  if (!fb && selectedRating === 0) {
    alert('Provide feedback or rating');
    return;
  }
  const subject = encodeURIComponent('GoodWisher Feedback');
  const body = encodeURIComponent(`Rating: ${selectedRating}/5\n\n${fb}`);
  window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
  closeFeedbackModal();
  alert('Thanks for feedback! 😊');
}

/* HTML escape */
function escapeHtml(str) {
  return ('' + str).replace(/[&<>"'`=\/]/g, s => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  })[s]);
}

/* Initialize on load */
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.dataset.theme = 'dark';
  }
  setThemeIcon();
  updateTemplateSelect();
  displaySavedMessages();

  $('themeToggle').addEventListener('click', toggleTheme);
  $('emojiButton').addEventListener('click', () => {
    if (!emojiPickerInitialized) initEmojiLazy();
  });
});

/* Lazy init emoji */
function initEmojiLazy() {
  emojiPickerInitialized = true;
  loadScript('https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@4.6.4/dist/index.min.js', () => {
    if (!window.EmojiButton) return;
    const picker = new EmojiButton({ theme: document.body.dataset.theme === 'dark' ? 'dark' : 'light' });
    picker.on('emoji', emoji => {
      const ta = $('customMessage');
      const start = ta.selectionStart || 0;
      const end = ta.selectionEnd || start;
      ta.value = ta.value.substring(0, start) + emoji + ta.value.substring(end);
      ta.focus();
      ta.selectionStart = ta.selectionEnd = start + emoji.length;
    });
    const btn = $('emojiButton');
    btn.addEventListener('click', () => picker.togglePicker(btn));
  });
}
