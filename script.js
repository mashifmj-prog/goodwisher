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

/* MESSAGES */
const messagesData = {
  birthday: {
    en: [
      "Happy Birthday! 🎉","Wishing you a fantastic birthday! 🥳","Hope your birthday is full of joy! 🎂",
      "Many happy returns of the day! 🎈","Celebrate your special day! 🎊","Cheers to another year! 🍰",
      "Happy B-day! 🎁","May your birthday be amazing! 🌟","Have a wonderful birthday! 🎉","Birthday hugs and smiles! 😊"
    ],
    es: [
      "¡Feliz cumpleaños! 🎉","¡Te deseo un cumpleaños fantástico! 🥳","¡Espero que tu cumpleaños esté lleno de alegría! 🎂",
      "¡Muchas felicidades en tu día! 🎈","¡Celebra tu día especial! 🎊","¡Salud por otro año! 🍰",
      "¡Feliz cumple! 🎁","¡Que tu cumpleaños sea increíble! 🌟","¡Ten un cumpleaños maravilloso! 🎉","¡Abrazos y sonrisas en tu cumpleaños! 😊"
    ],
    zh: [
      "生日快乐！🎉","祝你生日愉快！🥳","希望你的生日充满快乐！🎂",
      "祝你生日快乐！🎈","庆祝你的特别日子！🎊","为新的一年干杯！🍰",
      "生日快乐！🎁","愿你的生日精彩！🌟","祝你有个美好的生日！🎉","生日拥抱和微笑！😊"
    ],
    hi: [
      "जन्मदिन मुबारक हो! 🎉","आपको शानदार जन्मदिन की शुभकामनाएँ! 🥳","आशा है आपका जन्मदिन खुशी से भरा हो! 🎂",
      "आपको जन्मदिन की बहुत बधाई! 🎈","अपने खास दिन को सेलिब्रेट करें! 🎊","एक और साल के लिए चीयर्स! 🍰",
      "हैप्पी बर्थडे! 🎁","आपका जन्मदिन अद्भुत हो! 🌟","शानदार जन्मदिन की शुभकामनाएँ! 🎉","जन्मदिन की हँसी और मुस्कान! 😊"
    ],
    af: [
      "Gelukkige Verjaarsdag! 🎉","Ek wens jou 'n fantastiese verjaarsdag toe! 🥳","Hoop jou verjaarsdag is vol vreugde! 🎂",
      "Baie geluk met jou dag! 🎈","Vier jou spesiale dag! 🎊","Cheers op nog 'n jaar! 🍰",
      "Gelukkige B-dag! 🎁","Mag jou verjaarsdag wonderlik wees! 🌟","Geniet jou verjaarsdag! 🎉","Verjaarsdag drukkies en glimlagte! 😊"
    ]
  },
  // ... add similar structure for all 13 occasions
};

const emojiSets = {
  birthday: ["🎉","🎂","🥳","🎈","🎁"],
  anniversary: ["💖","🥂","🌹","💑","💕"],
  "get-well": ["🌻","💊","🤗","🛌","💙"],
  congrats: ["🏆","🎉","👏","🥳","🌟"],
  "thank-you": ["🙏","🤝","💛","🌸","💐"],
  "good-luck": ["🍀","🤞","✨","🎯","🌟"],
  motivation: ["🚀","💪","🔥","🌟","🏋️"],
  appreciation: ["🌟","👏","💐","❤️","💖"],
  farewell: ["👋","✈️","💌","🌅","💛"],
  encouragement: ["💪","🌈","🤗","🔥","⭐"],
  love: ["❤️","💌","💕","🥰","💖"],
  condolences: ["🕊️","💙","🙏","🌹","🕯️"],
  vacation: ["🌴","☀️","🏖️","✈️","🍹"]
};

function displayMessage(){
  const occ = $('occasion').value;
  const lang = $('language').value;
  if(!occ) return;
  currentOccasionMessages = messagesData[occ][lang] || messagesData[occ]['en'];
  currentMessageIndex = 0;
  $('customMessage').value = currentOccasionMessages[currentMessageIndex];
  updateMessageWithName();
}

function displayNextMessage(){
  if(!currentOccasionMessages.length) return;
  currentMessageIndex = (currentMessageIndex+1)%currentOccasionMessages.length;
  $('customMessage').value = currentOccasionMessages[currentMessageIndex];
  updateMessageWithName();
}

function updateMessageWithName(){
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  let msg=$('customMessage').value.split('\n')[0]; // remove previous signature
  let full=msg;
  if(r) full=`Hi ${r},\n\n${msg}`;
  if(s) full=`${full}\n\nRegards\n${s}`;
  $('customMessage').value=full;
}

function clearRecipient(){ $('recipientName').value=''; updateMessageWithName(); }
function clearSender(){ $('senderName').value=''; updateMessageWithName(); }

/* COPY */
function copyMessage(){
  const text=$('customMessage').value;
  if(!text) return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

/* FEEDBACK */
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
  alert(`Thanks for rating ${selectedRating}/5 (${selectedRating*20}%)!`);
  closeFeedbackModal();
}

/* SHARE */
function openShareModal(){ $('shareModal').classList.remove('hidden'); }
function closeShareModal(){ $('shareModal').classList.add('hidden'); }

function shareWhatsApp(){ shareWithURL(`https://wa.me/?text=${encodeURIComponent(getMessage())}`); }
function shareFacebook(){ 
  const url=encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/');
  shareWithURL(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(getMessage())}`);
}
function shareTwitter(){ shareWithURL(`https://x.com/intent/tweet?text=${encodeURIComponent(getMessage())}`); }
function shareTelegram(){ shareWithURL(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(getMessage())}`); }
function shareEmail(){ 
  const subject=encodeURIComponent('A Special Message from GoodWisher');
  const body=encodeURIComponent(getMessage().replace(/\n/g,'%0A'));
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
}
function shareDevice(){
  if(navigator.share){
    navigator.share({text:getMessage()}).catch(()=>{});
  } else {
    alert('Share not supported on this device.');
  }
}
function shareWithURL(url){ window.open(url,'_blank'); closeShareModal(); }

function getMessage(){
  const text=$('customMessage').value.trim();
  if(!text) return '';
  return text; // signature already appended
}

/* EMOJI */
function showEmojiPicker(){
  const occ = $('occasion').value;
  let emojis = occ && emojiSets[occ] ? emojiSets[occ] : ["😊","👍","💖","🌟","🎉"];
  const chosen = prompt(`Choose emoji:\n${emojis.join(' ')}`);
  if(chosen) $('customMessage').value += ' ' + chosen;
}
