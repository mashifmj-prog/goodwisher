function $(id){return document.getElementById(id);}
let selectedRating=0;

/* THEME */
function setThemeIcon(){
  const p=$('themeIconPath');
  const isDark=document.body.dataset.theme==='dark';
  p.setAttribute('d',isDark?'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z':'M12 2a10 10 0 100 20 10 10 0 000-20z');
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

/* MESSAGE */
function displayMessage(){
  const occ=$('occasion').value;
  if(!occ){$('message').textContent='';$('customMessage').value='';return;}
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
  const msg = messages[occ] || `Best wishes for your ${occ}!`;
  $('message').textContent = msg;
  $('customMessage').value = `${msg}\n\nGenerated with love using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
}

function updateMessageWithName(){
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  const msg=$('message').textContent;
  if(!msg)return;
  let full=msg;
  if(r)full=`Hi ${r},\n\n${msg}`;
  if(s)full=`${full}\n\nRegards,\n${s}`;
  const clean=full.replace(/Generated with love using GoodWisher[.\s\S]*/gi,'').trim();
  $('customMessage').value=`${clean}\n\nGenerated with love using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
}

/* COPY */
function copyMessage(){
  const text=$('customMessage').value;
  if(!text)return alert('No message!');
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
  if(!fb&&selectedRating===0)return alert('Please rate or comment!');
  alert(`Thanks for rating ${selectedRating}/5 (${selectedRating*20}%)!`);
  closeFeedbackModal();
}

/* SHARE */
function openShareModal(){ $('shareModal').classList.remove('hidden'); }
function closeShareModal(){ $('shareModal').classList.add('hidden'); }
function getMessageWithPromo(){
  const text=$('customMessage').value.trim();
  if(!text){alert('Please generate a message first!');return '';}
  return text.replace(/Generated with love using GoodWisher[.\s\S]*/gi,'').trim() +
         `\n\nGenerated with love using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
}
function shareWhatsApp(){
  const msg=getMessageWithPromo(); if(!msg)return;
  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank');
  closeShareModal();
}
function shareFacebook(){
  const msg=getMessageWithPromo(); if(!msg)return;
  const url=encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/');
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(msg)}`,'_blank');
  closeShareModal();
}
function shareTwitter(){
  const msg=getMessageWithPromo(); if(!msg)return;
  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`,'_blank');
  closeShareModal();
}
function shareTelegram(){
  const msg=getMessageWithPromo(); if(!msg)return;
  window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(msg)}`,'_blank');
  closeShareModal();
}
function shareEmail(){
  const msg=getMessageWithPromo(); if(!msg)return;
  const subject=encodeURIComponent('A Special Message from GoodWisher');
  const body=encodeURIComponent(msg.replace(/\n/g,'%0A'));
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
  closeShareModal();
}
