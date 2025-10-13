function $(id){return document.getElementById(id);}
let selectedRating=0;
let currentOccasion='';
let currentIndex=0;

// THEME
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

// ----------------- MESSAGES -----------------
const occasions = {
  birthday:["Another year older, wiser! 🥳","Wishing you a day full of happiness and a year full of joy! 🎉"],
  anniversary:["Happy Anniversary! 💕","Celebrating another year of love and togetherness! ❤️"],
  condolence:["Sending heartfelt condolences in this time of loss. 🕊️","May you find comfort and peace during this difficult period."],
  congratulations:["Congratulations on your achievement! 🏆","Well done! Your hard work paid off! 🎖️"],
  get-well:["Get well soon! 🌻","Wishing you a speedy recovery! 💐"],
  thank-you:["Thank you for your kindness and support! 🙏","Your generosity is greatly appreciated! 🌟"],
  good-luck:["Good luck on your journey! 🍀","Wishing you success in all you do! 🌈"],
  appreciation:["You’re appreciated more than you know! 🌟","Thanks for all that you do! 🌼"],
  farewell:["Wishing you the best in your next adventure! 👋","Goodbye and good luck on your new journey! ✨"],
  encouragement:["You’ve got this! 💪","Keep pushing forward, success is near! 🚀"],
  love:["You make life beautiful! ❤️","Sending all my love your way! 💌"],
  vacation:["Enjoy your well-deserved vacation! 🌴","Relax, refresh, and enjoy every moment! 🏖️"]
};

const occasionEmojis = {
  birthday:["🥳","🎂","🎉"],
  anniversary:["💕","💖","❤️"],
  condolence:["🕊️","🖤","🌹"],
  congratulations:["🏆","🎖️","🎊"],
  get-well:["🌻","💐","🌸"],
  thank-you:["🙏","🌟","💛"],
  good-luck:["🍀","🌈","⭐"],
  appreciation:["🌟","🌼","👏"],
  farewell:["👋","✨","💌"],
  encouragement:["💪","🚀","🔥"],
  love:["❤️","💖","💌"],
  vacation:["🌴","🏖️","☀️"]
};

function displayMessage(){
  const occ=$('occasion').value;
  if(!occ){clearContent(); return;}
  currentOccasion=occ;
  currentIndex=0;
  updateMessage();
}

function nextMessage(){
  if(!currentOccasion) return;
  currentIndex = (currentIndex+1) % occasions[currentOccasion].length;
  updateMessage();
}

function updateMessage(){
  let occ=currentOccasion;
  if(!occ) return;
  const msg = occasions[occ][currentIndex];
  let r=$('recipientName').value.trim();
  let s=$('senderName').value.trim();
  let full=msg;
  if(r) full=`Hi ${r},\n\n${msg}`;
  if(s) full+=`\n\nRegards\n${s}`;
  $('customMessage').value=full;
}

function clearContent(){
  $('customMessage').value='';
  $('recipientName').value='';
  $('senderName').value='';
  currentOccasion='';
  currentIndex=0;
  $('occasion').value='';
}

// ----------------- EMOJI -----------------
$('emojiButton').addEventListener('click',()=>{
  let emojis=[];
  if(currentOccasion && occasionEmojis[currentOccasion]){
    emojis = occasionEmojis[currentOccasion];
  } else {
    emojis = ["😊","👍","🌟","💌","🎉"];
  }
  const choice = prompt("Select emoji:\n"+emojis.join(" "));
  if(choice && $('customMessage').value.length>0){
    $('customMessage').value += " "+choice;
  }
});

// ----------------- COPY -----------------
function copyMessage(){
  const text=$('customMessage').value;
  if(!text) return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

// ----------------- SHARE -----------------
function openShareModal(){ $('shareModal').classList.remove('hidden'); }
function closeShareModal(){ $('shareModal').classList.add('hidden'); }

function getMessageWithSignature(){
  let text=$('customMessage').value;
  if(!text) return '';
  return text+"\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/";
}

function shareWhatsApp(){ const msg=getMessageWithSignature(); if(msg) window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareFacebook(){ const msg=getMessageWithSignature(); if(msg) window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&quote=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTwitter(){ const msg=getMessageWithSignature(); if(msg) window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTelegram(){ const msg=getMessageWithSignature(); if(msg) window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareEmail(){ const msg=getMessageWithSignature(); if(msg){
  const subject=encodeURIComponent('A Special Message from GoodWisher');
  const body=encodeURIComponent(msg.replace(/\n/g,'%0A'));
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
  closeShareModal();
}}

// ----------------- FEEDBACK -----------------
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
  let stored = JSON.parse(localStorage.getItem('goodwisherFeedback')||'[]');
  stored.push({rating:selectedRating, feedback:fb, date:new Date().toISOString()});
  localStorage.setItem('goodwisherFeedback', JSON.stringify(stored));
  alert(`Thanks for your feedback!`);
  closeFeedbackModal();
}
