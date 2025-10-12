function $(id){return document.getElementById(id);}
let currentBaseMessage='', selectedRating=0, emojiPickerInitialized=false, confettiLoaded=false;

/* ---------- Theme ---------- */
function setThemeIcon(){
  const path=$('themeIconPath');
  if(!path)return;
  const isDark=document.body.dataset.theme==='dark';
  path.setAttribute('d',isDark?'M12 4.5a1 1 0 010-2 1 1 0 010 2z':'M12 2a10 10 0 100 20 10 10 0 000-20z');
}
function toggleTheme(){
  const b=document.body;
  b.dataset.theme=b.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('theme',b.dataset.theme);
  setThemeIcon();
}

/* ---------- Messages ---------- */
const messages={/* (same multilingual message set from previous version) */};
const greetings={en:'Hi',zh:'你好',hi:'नमस्ते',es:'Hola',af:'Hallo'};

function displayMessage(){
  const occ=$('occasion').value;
  const lang=$('language').value||'en';
  const msgDiv=$('message');
  if(!occ){msgDiv.textContent='';currentBaseMessage='';$('customMessage').value='';return;}
  const list=(messages[lang]&&messages[lang][occ])||(messages.en[occ])||[''];
  currentBaseMessage=list[Math.floor(Math.random()*list.length)];
  msgDiv.textContent=currentBaseMessage;
  updateMessageWithName();
}

function updateMessageWithName(){
  const r=$('recipientName').value.trim(),s=$('senderName').value.trim(),l=$('language').value||'en';
  let text=currentBaseMessage||'';
  if(r)text=`${greetings[l]} ${r},\n\n${currentBaseMessage}`;
  if(s)text=`${text}\n\nRegards,\n${s}`;
  $('customMessage').value=text||currentBaseMessage;
}

/* ---------- Copy + Confetti ---------- */
function loadScript(url,cb){const s=document.createElement('script');s.src=url;s.onload=()=>cb&&cb();document.body.appendChild(s);}
function copyMessage(){
  const t=$('customMessage').value;if(!t)return alert('Please generate a message first!');
  navigator.clipboard.writeText(t+"\n\nGenerated with ❤️ using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/").then(()=>{
    alert('Message copied!');
    if(!confettiLoaded){confettiLoaded=true;loadScript('https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js',()=>confetti({particleCount:80,spread:60,origin:{y:0.6}}));}
    else confetti({particleCount:80,spread:60,origin:{y:0.6}});
  });
}

/* ---------- Helper: add link to shared message ---------- */
function getMessageWithPromo(){
  const text=$('customMessage').value;
  if(!text)return'';
  return `${text}\n\nGenerated with ❤️ using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
}

/* ---------- (Save, Template, Share, Feedback functions identical to previous, 
   with updated feedback below) ---------- */

function openFeedbackModal(){$('feedbackModal').classList.remove('hidden');}
function closeFeedbackModal(){
  $('feedbackModal').classList.add('hidden');
  $('feedbackText').value='';
  selectedRating=0;
  document.querySelectorAll('#starRating .star').forEach(s=>s.classList.remove('selected'));
  $('ratingPercent').textContent='0%';
}
function setRating(r){
  selectedRating=r;
  document.querySelectorAll('#starRating .star').forEach((s,i)=>s.classList.toggle('selected',i<r));
  $('ratingPercent').textContent=`${r*20}%`;
}
function submitFeedback(){
  const fb=$('feedbackText').value.trim();
  if(!fb&&selectedRating===0)return alert('Please rate or comment!');
  const subject=encodeURIComponent('GoodWisher Feedback');
  const body=encodeURIComponent(`Rating: ${selectedRating}/5 (${selectedRating*20}%)\n\n${fb}`);
  window.location.href=`mailto:youremail@example.com?subject=${subject}&body=${body}`;
  closeFeedbackModal();
  alert('Thanks for your feedback! 😊');
}

/* ---------- Init ---------- */
window.addEventListener('DOMContentLoaded',()=>{
  if(localStorage.getItem('theme')==='dark')document.body.dataset.theme='dark';
  setThemeIcon();
  $('themeToggle').addEventListener('click',toggleTheme);
});
