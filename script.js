function $(id){return document.getElementById(id);}
let selectedRating=0;
let currentMessageIndex=0;
let currentOccasionMessages=[];

/* THEME */
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

  $('nextMessage').addEventListener('click', displayNextMessage);
  $('clearContent').addEventListener('click', ()=>{$('customMessage').value='';});
  $('emojiButton').addEventListener('click', showEmojiPicker);
});

/* MESSAGES DATA EXAMPLE: Only birthday shown fully, other occasions placeholders */
const messagesData = {
  birthday: {
    en:["Happy Birthday! 🎉","Wishing you a fantastic birthday! 🥳","Hope your birthday is full of joy! 🎂","Many happy returns! 🎈","Celebrate your special day! 🎊","Cheers to another year! 🍰","Happy B-day! 🎁","May your birthday be amazing! 🌟","Have a wonderful birthday! 🎉","Birthday hugs and smiles! 😊"],
    es:["¡Feliz cumpleaños! 🎉","¡Te deseo un cumpleaños fantástico! 🥳","¡Espero que tu cumpleaños esté lleno de alegría! 🎂","¡Muchas felicidades! 🎈","¡Celebra tu día especial! 🎊","¡Salud por otro año! 🍰","¡Feliz cumple! 🎁","¡Que tu cumpleaños sea increíble! 🌟","¡Ten un cumpleaños maravilloso! 🎉","¡Abrazos y sonrisas! 😊"],
    hi:["जन्मदिन मुबारक हो! 🎉","आपको शानदार जन्मदिन की शुभकामनाएँ! 🥳","आशा है आपका जन्मदिन खुशी से भरा हो! 🎂","आपको जन्मदिन की बधाई! 🎈","अपने खास दिन को सेलिब्रेट करें! 🎊","एक और साल के लिए चीयर्स! 🍰","हैप्पी बर्थडे! 🎁","आपका जन्मदिन अद्भुत हो! 🌟","शानदार जन्मदिन! 🎉","जन्मदिन की हँसी और मुस्कान! 😊"],
    zh:["生日快乐！🎉","祝你生日愉快！🥳","希望你的生日充满快乐！🎂","生日快乐！🎈","庆祝你的特别日子！🎊","为新的一年干杯！🍰","生日快乐！🎁","愿你的生日精彩！🌟","祝你有个美好的生日！🎉","生日拥抱和微笑！😊"],
    af:["Gelukkige Verjaarsdag! 🎉","Ek wens jou 'n fantastiese verjaarsdag toe! 🥳","Hoop jou verjaarsdag is vol vreugde! 🎂","Baie geluk met jou dag! 🎈","Vier jou spesiale dag! 🎊","Cheers op nog 'n jaar! 🍰","Gelukkige B-dag! 🎁","Mag jou verjaarsdag wonderlik wees! 🌟","Geniet jou verjaarsdag! 🎉","Verjaarsdag drukkies en glimlagte! 😊"]
  }
  // TODO: Add other 12 occasions here with same structure
};

const emojiSets = {
  birthday:["🎉","🎂","🥳","🎈","🎁"],
  anniversary:["💖","🥂","🌹","💑","💕"],
  "get-well":["🌻","💊","🤗","🛌","💙"],
  congrats:["🏆","🎉","👏","🥳","🌟"],
  "thank-you":["🙏","🤝","💛","🌸","💐"],
  "good-luck":["🍀","🤞","✨","🎯","🌟"],
  motivation:["🚀","💪","🔥","🌟","🏋️"],
  appreciation:["🌟","👏","💐","❤️","💖"],
  farewell:["👋","✈️","💌","🌅","💛"],
  encouragement:["💪","🌈","🤗","🔥","⭐"],
  love:["❤️","💌","💕","💖","🌹"],
  condolences:["🕊️","💐","🙏","💛","🌹"],
  vacation:["🌴","🏖️","🛶","🍹","☀️"]
};

function displayMessage(){
  const occ = $('occasion').value;
  const lang = $('language').value;

  if(lang === 'exit'){ $('language').value='en'; return; }
  if(occ === 'exit'){ $('occasion').selectedIndex=0; $('customMessage').value=''; return; }
  if(!occ || !lang) return;

  currentOccasionMessages = messagesData[occ][lang] || messagesData[occ]['en'];
  currentMessageIndex = 0;
  $('customMessage').value = currentOccasionMessages[currentMessageIndex];
  updateMessageWithName();
}

function displayNextMessage(){
  if(!currentOccasionMessages.length) return;
  currentMessageIndex = (currentMessageIndex + 1) % currentOccasionMessages.length;
  $('customMessage').value = currentOccasionMessages[currentMessageIndex];
  updateMessageWithName();
}

function updateMessageWithName(){
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let msg = $('customMessage').value;
  if(!msg) return;
  let full = msg;
  if(r) full=`Hi ${r},\n\n${msg}`;
  if(s) full=`${full}\n\nFrom:\n${s}`;
  $('customMessage').value = full;
}

function clearSender(){ $('senderName').value=''; updateMessageWithName(); }
function clearRecipient(){ $('recipientName').value=''; updateMessageWithName(); }

/* EMOJI PICKER */
function showEmojiPicker(){
  const occ = $('occasion').value;
  let emojis = occ && emojiSets[occ] ? emojiSets[occ] : ["😊","👍","💖","🎉","💡"];

  let picker = document.getElementById('emojiPicker');
  if(picker) picker.remove();

  picker = document.createElement('div');
  picker.id = 'emojiPicker';
  picker.className = 'emoji-picker';

  emojis.forEach(e=>{
    const btn=document.createElement('button');
    btn.type='button';
    btn.className='emoji-btn';
    btn.textContent=e;
    btn.onclick=()=> insertEmoji(e);
    picker.appendChild(btn);
  });

  const textarea = $('customMessage');
  textarea.parentNode.insertBefore(picker, textarea);
}

function insertEmoji(e){
  const textarea = $('customMessage');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  textarea.value = text.slice(0,start) + e + text.slice(end);
  textarea.focus();
  textarea.selectionStart = textarea.selectionEnd = start + e.length;
}

/* COPY / SAVE / SHARE / FEEDBACK etc. can remain as before */
