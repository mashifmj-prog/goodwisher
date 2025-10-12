function $(id){return document.getElementById(id);}
let currentBaseMessage='', selectedRating=0;

/* ---------- Theme ---------- */
function setThemeIcon(){
  const path=$('themeIconPath');
  if(!path)return;
  const isDark=document.body.dataset.theme==='dark';
  path.setAttribute('d',isDark?'M12 4.5a1 1 0 010-2 1 1 0 010 2z':'M12 2a10 10 0 100 20 10 10 0 000-20z');
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

/* ---------- Messages ---------- */
const messages={/* (same multilingual messages as before) */};
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

/* ---------- Add app link ---------- */
function getMessageWithPromo(){
  const t=$('customMessage').value;
  if(!t)return'';
  return `${t}\n\nGenerated with ❤️ using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
}

/* ---------- Copy ---------- */
function copyMessage(){
  const t=getMessageWithPromo();
  if(!t.trim())return alert('Please generate a message first!');
  navigator.clipboard.writeText(t).then(()=>alert('Message copied with GoodWisher link!'));
}

/* ---------- Feedback ---------- */
function openFeedbackModal(){$('feedbackModal').classList.remove('hidden');}
function closeFeedbackModal(){
  $('feedbackModal').classList.add('hidden');
  $('feedbackText').value='';
  selectedRating=0;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('selected'));
  $('ratingPercent').textContent='0%';
}
function setRating(r){
  selectedRating=r;
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('selected',i<r));
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
