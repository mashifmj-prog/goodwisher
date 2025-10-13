function $(id){return document.getElementById(id);}
let selectedRating=0;
let currentMessageIndex=0;

// Theme
function setThemeIcon(){
  const p=$('themeIconPath');
  const isDark=document.body.dataset.theme==='dark';
  p.setAttribute('d',isDark
    ? 'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z'
    : 'M12 2a10 10 0 100 20 10 10 0 000-20z'
  );
}
function toggleTheme(){
  const body=document.body;
  const newTheme=body.dataset.theme==='dark'?'light':'dark';
  body.dataset.theme=newTheme;
  localStorage.setItem('theme',newTheme);
  setThemeIcon();
}
window.addEventListener('DOMContentLoaded',()=>{
  const saved=localStorage.getItem('theme')||'light';
  document.body.dataset.theme=saved;
  setThemeIcon();
  $('themeToggle').addEventListener('click',toggleTheme);
});

// Messages
const messages = {
  'birthday': {
    'en': [
      "Happy Birthday! 🎉 Wishing you a fantastic day filled with joy.",
      "May your birthday be full of love and laughter! 🥳",
      "Another year older, another year wiser! Happy Birthday! 🎂",
      "Wishing you a birthday as amazing as you are! 🎈",
      "Celebrate today and enjoy every moment! 🎁",
      "Cheers to your health and happiness! 🥂",
      "Sending birthday hugs and smiles your way! 😊",
      "May all your dreams come true this year! ✨",
      "Have a magical birthday! 🪄",
      "Enjoy your special day to the fullest! 🎊"
    ],
    'es': [
      "¡Feliz cumpleaños! 🎉 Que tengas un día lleno de alegría.",
      "¡Que tu cumpleaños esté lleno de amor y risas! 🥳",
      "¡Un año más viejo, un año más sabio! ¡Feliz cumpleaños! 🎂",
      "¡Deseándote un cumpleaños tan increíble como tú! 🎈",
      "¡Celebra hoy y disfruta cada momento! 🎁",
      "¡Salud y felicidad en tu día! 🥂",
      "¡Enviándote abrazos y sonrisas en tu cumpleaños! 😊",
      "¡Que todos tus sueños se hagan realidad este año! ✨",
      "¡Que tengas un cumpleaños mágico! 🪄",
      "¡Disfruta tu día especial al máximo! 🎊"
    ]
  },
  'anniversary': {
    'en': [
      "Happy Anniversary! 💕 Wishing you many more years of love.",
      "Cheers to another year together! 🥂",
      "Celebrating your love and commitment today! ❤️",
      "May your bond grow stronger each year! 🌹",
      "Wishing you a joyful anniversary! 🎉",
      "Love and happiness always! 💖",
      "Here's to love that lasts forever! 🕊️",
      "May your anniversary be full of special memories! ✨",
      "Together is a wonderful place to be! 👫",
      "Happy Anniversary to a beautiful couple! 💑"
    ],
    'es': [
      "¡Feliz aniversario! 💕 Que tengan muchos años más de amor.",
      "¡Salud por otro año juntos! 🥂",
      "¡Celebrando su amor y compromiso hoy! ❤️",
      "¡Que su vínculo se fortalezca cada año! 🌹",
      "¡Les deseo un aniversario lleno de alegría! 🎉",
      "¡Amor y felicidad siempre! 💖",
      "¡Por un amor que dure para siempre! 🕊️",
      "¡Que su aniversario esté lleno de recuerdos especiales! ✨",
      "¡Juntos es un lugar maravilloso para estar! 👫",
      "¡Feliz aniversario a una hermosa pareja! 💑"
    ]
  }
};

// (Other occasions will follow the same pattern)

// Selected occasion & language
let currentOccasion = '';
let currentLang = 'en';
let currentMessages = [];

function displayMessage() {
  const occ = $('occasion').value;
  const lang = $('language').value;
  currentOccasion = occ;
  currentLang = lang;
  if(!occ){ $('customMessage').value=''; return; }
  currentMessages = messages[occ][lang] || ["Best wishes!"];
  currentMessageIndex = 0;
  updateMessage();
}

function updateMessage() {
  if(!currentMessages.length) return;
  const msg = currentMessages[currentMessageIndex];
  $('customMessage').value = msg;
  updateMessageWithName();
}

function nextRandomMessage() {
  if(!currentMessages.length) return;
  let nextIndex = Math.floor(Math.random() * currentMessages.length);
  while(nextIndex === currentMessageIndex && currentMessages.length>1){
    nextIndex = Math.floor(Math.random() * currentMessages.length);
  }
  currentMessageIndex = nextIndex;
  updateMessage();
}

// Names
function updateMessageWithName() {
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  let msg = $('customMessage').value.split("\n")[0]; // keep only main text
  let full = msg;
  if(r) full = `To: ${r}\n\n${msg}`;
  if(s) full += `\n\nFrom: ${s}`;
  $('customMessage').value = full;
}
function clearName(id){
  $(id).value='';
  updateMessageWithName();
}

// Clear content
$('clearButton').addEventListener('click',()=>{
  $('customMessage').value='';
});

// Copy
function copyMessage(){
  const text=$('customMessage').value;
  if(!text)return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

// Feedback Modal
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
  document.query
