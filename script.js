function $(id){return document.getElementById(id);}
let selectedRating = 0;
let currentMessageIndex = 0;

// ----- Theme Toggle -----
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
  $('emojiButton').addEventListener('click', toggleEmojiPopup);
  document.addEventListener('click', e => {
    if(!e.target.closest('#emojiButton') && !e.target.closest('#emojiPopup')){
      $('emojiPopup').classList.add('hidden');
    }
  });
});

// ----- Emoji -----
const emojiSets = {
  generic: ['😊','😂','👍','❤️','🌟','🎉','☀️','🙏','✨','🌈'],
  birthday: ['🎂','🎉','🥳','🎁','🧁','🎈','🍰','🍾','🍬','🎊'],
  anniversary: ['💖','💑','🌹','🥂','💍','🎉','💕','💐','🍷','✨'],
  'get-well': ['🌻','💊','🤗','🩹','☀️','🌼','💖','🍵','🧸','🙏'],
  congrats: ['🏆','🎉','🥳','🎖️','👏','🎊','💪','🎯','🍾','🌟'],
  'thank-you': ['🙏','💐','😊','💖','🌸','🤝','✨','🫶','💛','🌷'],
  'good-luck': ['🍀','🌟','🤞','👍','✨','🌈','🏹','🏁','💪','🌹'],
  motivation: ['🚀','🔥','💪','🌟','🏆','✨','💡','🧗‍♂️','🎯','🌈'],
  appreciation: ['🌟','💖','👏','💛','✨','💐','🎖️','🥇','🫶','💌'],
  farewell: ['👋','🌅','✈️','💼','💌','🫶','💖','🌟','💐','🌸'],
  encouragement: ['💪','🌟','🚀','🎯','✨','🔥','🌈','👍','🏆','😊'],
  love: ['❤️','💖','💕','💌','🌹','🥰','💞','✨','😍','💓'],
  condolences: ['🕊️','🌹','🙏','💔','🕯️','💐','💛','🌸','🤍','✨'],
  vacation: ['🌴','☀️','🏖️','🍹','🌊','🛶','🧳','😎','🏝️','🛳️']
};

function toggleEmojiPopup(e){
  e.stopPropagation();
  const popup = $('emojiPopup');
  const occ = $('occasion').value;
  const emojis = occ && emojiSets[occ] ? emojiSets[occ] : emojiSets.generic;
  popup.innerHTML = '';
  emojis.forEach(em => {
    const btn = document.createElement('button');
    btn.textContent = em;
    btn.onclick = () => {
      insertAtCursor($('customMessage'), em);
      popup.classList.add('hidden');
    };
    popup.appendChild(btn);
  });
  popup.classList.toggle('hidden');
}
function insertAtCursor(field, value){
  const start = field.selectionStart;
  const end = field.selectionEnd;
  field.value = field.value.slice(0,start)+value+field.value.slice(end);
  field.selectionStart = field.selectionEnd = start+value.length;
  field.focus();
}

// ----- Messages -----
const messages = {
  birthday: {
    en: ["Happy Birthday! 🎉","Wishing you joy!","Many happy returns!","Cheers to your day!","Have a blast!","Celebrate big!","Party time!","Happiness always!","Birthday hugs!","Cake & smiles!"],
    es: ["¡Feliz Cumpleaños! 🎉","¡Deseándote alegría!","¡Muchos años felices!","¡Salud por tu día!","¡Pásalo genial!","¡Celebra en grande!","¡Hora de fiesta!","¡Felicidad siempre!","¡Abrazos de cumpleaños!","¡Pastel y sonrisas!"],
    hi: ["जन्मदिन की शुभकामनाएँ! 🎉","आपको खुशी मिले!","आपको जन्मदिन की बधाई!","आपके दिन के लिए शुभकामनाएँ!","मज़ा करें!","बड़ी धूमधाम से जश्न मनाएँ!","पार्टी टाइम!","हमेशा खुश रहें!","जन्मदिन की गले!","केक और मुस्कान!"],
    zh: ["生日快乐！🎉","祝你快乐！","祝你生辰快乐！","为你的一天干杯！","玩得开心！","盛大庆祝！","派对时间！","永远快乐！","生日拥抱！","蛋糕和微笑！"],
    af: ["Gelukkige Verjaarsdag! 🎉","Sterkte en vreugde!","Baie gelukkige terugkoms!","Gesondheid op jou dag!","Geniet jou dag!","Vier groot!","Partytjie tyd!","Geluk altyd!","Verjaarsdag drukkies!","Koek en glimlagte!"]
  },
  // ... repeat similar structure for
