function $(id){return document.getElementById(id);}
let selectedRating=0;
let currentOccasion='';
let currentIndex=0;
let feedbacks=[];

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

// MESSAGES
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
  get-well:["🌻","💐","🤗"],
  thank-you:["🙏","🌟","💝"],
  good-luck:["🍀","🌈","🎯"],
  appreciation:["🌟","🌼","💛"],
  farewell:["👋","✨","🎁"],
  encouragement:["💪","🚀","🔥"],
  love:["❤️","💌","💖"],
  vacation:["🌴","🏖️","🛶"]
};

function displayMessage(){
  const occ=$('occasion').value;
  currentOccasion=occ;
  currentIndex=0;
  if(!occ){$('customMessage').value=''; return;}
  updateMessage();
}

function nextMessage(){
  if(!currentOccasion) return;
  const msgs=occasions[currentOccasion];
  currentIndex=(currentIndex+1)%msgs.length;
  updateMessage();
}

function updateMessage(){
  const occ=currentOccasion;
  if(!occ) return;
  const msgs=occasions[occ];
  const msg=msgs[currentIndex];
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  let fullMsg=msg;
  if(r) fullMsg=`Hi ${r},\n\n${msg}`;
  if(s) fullMsg+=`\n\nRegards\n${s}`;
  $('customMessage').value=fullMsg;
}

// CLEAR CONTENT
function clearContent(){
  $('customMessage').value='';
  $('recipientName').value='';
  $('senderName').value='';
}

// EMOJI PICKER
$('emojiButton').addEventListener('click',()=>{
  let emojis=['😀','😃','😄','😊','😉']; // generic
  if(currentOccasion && occasionEmojis[currentOccasion]) emojis=occasionEmojis[currentOccasion];
  const choice=prompt("Choose emoji to insert:\n"+emojis.join(' '));
  if(choice) $('customMessage').value += ' '+choice;
});

// COPY
function copyMessage(){
  const text=$('customMessage').value;
  if(!text)return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

// SHARE MODAL
function openShareModal(){ $('shareModal').classList.remove('hidden'); }
function closeShareModal(){ $('shareModal').classList.add('hidden'); }

function getMessage(){ return $('customMessage').value.trim(); }
function shareWhatsApp(){ const msg=getMessage(); if(!msg)return; window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareFacebook(){ const msg=getMessage(); if(!msg)return; const url=encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/'); window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTwitter(){ const msg=getMessage(); if(!msg)return; window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTelegram(){ const msg=getMessage(); if(!msg)return; window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareEmail(){ const msg=getMessage(); if(!msg)return; const subject=encodeURIComponent('A Special Message from GoodWisher'); const body=encodeURIComponent(msg.replace(/\n/g,'%0A')); window.location.href=`mailto:?subject=${subject}&body=${body}`; closeShareModal();}

// FEEDBACK
function openFeedbackModal(){$('feedbackModal').classList.remove('hidden');}
function closeFeedbackModal(){ $('feedbackModal').classList.add('hidden'); $('feedbackText').value=''; selectedRating=0; document.querySelectorAll('.star').forEach(s=>s.classList.remove('selected')); $('ratingScore').textContent='Score: 0%';}
function setRating(r){ selectedRating=r; document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('selected',i<r)); $('ratingScore').textContent=`Score: ${r*20}%`;}
function submitFeedback(){
  const fb=$('feedbackText').value.trim();
  if(!fb&&selectedRating===0)return alert('Please rate or comment!');
  const entry={rating:selectedRating, feedback:fb, date:new Date().toLocaleString()};
  feedbacks.push(entry); localStorage.setItem('feedbacks',JSON.stringify(feedbacks));
  alert('Thank you for your feedback!');
  closeFeedbackModal();
}
function viewFeedback(){
  const saved=JSON.parse(localStorage.getItem('feedbacks')||'[]');
  if(saved.length===0)return alert('No previous feedback found.');
  let msg='Previous Feedbacks:\n\n';
  saved.forEach(f=>{ msg+=`${f.date}\nRating: ${f.rating*20}%\n${f.feedback}\n\n`;});
  alert(msg);
}

// SAVE/COPY
function saveMessage(){ alert('Message saved locally.'); }
function saveTemplate(){ alert('Message saved as template.'); }
