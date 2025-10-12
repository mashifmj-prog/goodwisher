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
  const msg=`Happy ${occ.replace('-', ' ')}! 😊`;
  $('message').textContent=msg;
  $('customMessage').value=`${msg}\n\nGenerated with ❤️ using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
}
function updateMessageWithName(){
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  const msg=$('message').textContent;
  if(!msg)return;
  let full=msg;
  if(r)full=`Hi ${r},\n\n${msg}`;
  if(s)full=`${full}\n\nRegards,\n${s}`;
  $('customMessage').value=`${full}\n\nGenerated with ❤️ using GoodWisher.\nhttps://mashifmj-prog.github.io/goodwisher/`;
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
