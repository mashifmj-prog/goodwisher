const $ = id => document.getElementById(id);

// THEME
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

// MESSAGES
const messages = {
  en: {
    birthday: 'Happy Birthday! 🎉',
    anniversary: 'Happy Anniversary! 💕',
    'get-well': 'Get well soon! 🌻',
    congrats: 'Congratulations on your achievement! 🏆',
    'thank-you': 'Thank you for your kindness and support! 🙏',
    'good-luck': 'Good luck on your journey! 🍀',
    motivation: 'Keep going — you can do this! 🚀',
    appreciation: 'You’re appreciated more than you know! 🌟',
    farewell: 'Wishing you the best in your next adventure! 👋',
    encouragement: 'You’ve got this! 💪',
    love: 'You make life beautiful! ❤️',
    condolences: 'Sending my deepest condolences. 🕊️',
    vacation: 'Enjoy your well-deserved vacation! 🌴'
  },
  // TODO: Add other languages (zh, hi, es, af)
};

function generateMessage() {
  const occ = $('occasion').value;
  const lang = $('language').value || 'en';
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  if (!occ) return $('previewMessage').textContent = '';

  let msg = messages[lang]?.[occ] || `Best wishes for your ${occ}!`;
  if (r) msg = `Hi ${r},\n\n${msg}`;
  if (s) msg += `\n\nRegards,\n${s}`;
  msg += `\n\nGenerated with love using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
  $('previewMessage').textContent = msg;
  return msg;
}

// COPY
function copyMessage() {
  const text = $('previewMessage').textContent;
  if (!text) return alert('No message to copy!');
  navigator.clipboard.writeText(text);
  alert('Message copied!');
}

// EMOJI
const emojiList = ['😊','😂','😍','👍','🎉','💖','🌟','🍀','💪','🌻','❤️','🙏'];
function toggleEmojiPicker() {
  const picker = $('emojiPicker');
  picker.classList.toggle('hidden');
  picker.style.top = '200px';
  picker.style.left = 'calc(50% - 120px)';
}
function insertEmoji(e) {
  let msg = $('previewMessage').textContent;
  // Insert emoji above signature, before link
  const parts = msg.split('Generated with love using GoodWisher');
  msg = parts[0] + e + '\n\nGenerated with love using GoodWisher' + (parts[1] || '');
  $('previewMessage').textContent = msg;
  $('emojiPicker').classList.add('hidden');
}

// TEMPLATE
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
  templates.forEach((t,i)=>{
    const opt=document.createElement('option');
    opt.value=i;
    opt.textContent=t.split('\n')[0].slice(0,30)+'...';
    sel.appendChild(opt);
  });
}
function loadTemplate() {
  const idx = $('templateSelect').value;
  if (idx === null) return;
  $('previewMessage').textContent = templates[idx];
}

// SHARE
function toggleShareOptions() {
  $('shareOptions').classList.toggle('hidden');
}
function shareWhatsApp(){ shareGeneric(`https://wa.me/?text=`); }
function shareFacebook(){ shareGeneric(`https://www.facebook.com/sharer/sharer.php?u=https://mashifmj-prog.github.io/goodwisher/&quote=`); }
function shareX(){ shareGeneric(`https://x.com/intent/tweet?text=`); }
function shareTelegram(){ shareGeneric(`https://t.me/share/url?url=https://mashifmj-prog.github.io/goodwisher/&text=`); }
function shareEmail(){ 
  const msg = $('previewMessage').textContent;
  if(!msg) return alert('No message to share!');
  const subject=encodeURIComponent('A Special Message from GoodWisher');
  const body=encodeURIComponent(msg.replace(/\n/g,'%0A'));
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
}
function shareGeneric(baseUrl){
  const msg = $('previewMessage').textContent;
  if(!msg) return alert('No message to share!');
  window.open(baseUrl + encodeURIComponent(msg), '_blank');
}

// FEEDBACK
let selectedRating=0;
function openFeedbackModal(){$('feedbackModal').classList.remove('hidden');}
function closeFeedbackModal(){
  $('feedbackModal').classList.add('hidden');
  $('feedbackText').value='';
  selectedRating=0;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('selected'));
  $('ratingScore').textContent='Score: 0%';
}
function setRating(r){
  selectedRating=r;
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('selected',i<r));
  $('ratingScore').textContent=`Score: ${r*20}%`;
}
function submitFeedback(){
  const fb=$('feedbackText').value.trim();
  if(!fb && selectedRating===0) return alert('Please rate or comment!');
  alert(`Thanks for rating ${selectedRating}/5!`);
  closeFeedbackModal();
}

// INIT
window.addEventListener('DOMContentLoaded', ()=>{
  // Theme
  const saved=localStorage.getItem('theme')||'light';
  document.body.dataset.theme=saved;
  setThemeIcon();
  $('themeToggle').addEventListener('click',toggleTheme);

  // Message generation
  ['occasion','recipientName','senderName','language'].forEach(id=>{
    $(id).addEventListener('input', generateMessage);
    $(id).addEventListener('change', generateMessage);
  });

  // Copy / Emoji
  $('copyBtn').addEventListener('click', copyMessage);
  $('emojiBtn').addEventListener('click', toggleEmojiPicker);

  // Emoji picker
  const picker = $('emojiPicker');
  emojiList.forEach(e=>{
    const btn=document.createElement('button');
    btn.textContent=e;
    btn.addEventListener('click', ()=>insertEmoji(e));
    picker.appendChild(btn);
  });

  // Templates
  $('saveTemplateBtn').addEventListener('click', saveTemplate);
  $('templateSelect').addEventListener('change', loadTemplate);
  updateTemplateDropdown();

  // Share
  $('shareBtn').addEventListener('click', toggleShareOptions);
  $('shareWhatsApp').addEventListener('click', shareWhatsApp);
  $('shareFacebook').addEventListener('click', shareFacebook);
  $('shareX').addEventListener('click', shareX);
  $('shareTelegram').addEventListener('click', shareTelegram);
  $('shareEmail').addEventListener('click', shareEmail);

  // Feedback
  $('feedbackBtn').addEventListener('click', openFeedbackModal);

  // Clear buttons for name inputs
  document.querySelectorAll('.clear-btn').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const target=$(btn.dataset.target);
      target.value='';
      generateMessage();
    });
  });
});
