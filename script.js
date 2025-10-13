// Helper
function $(id){return document.getElementById(id);}
let selectedRating = 0;
let currentMsgIndex = 0;

// THEME
function setThemeIcon(){
  const p = $('themeIconPath');
  const isDark = document.body.dataset.theme==='dark';
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
const messages = {
  birthday: [
    "Happy Birthday! 🎉","Wishing you joy on your birthday! 🎂",
    "Another year older, wiser and happier! 🥳","Have a fantastic birthday! 🎈",
    "Cheers to you on your special day! 🍰","Birthday hugs and wishes! 🤗",
    "May your birthday be full of smiles! 😄","Celebrate your day with love! 💖",
    "Happy Birthday! Keep shining! ✨","Hope your birthday is amazing! 🌟"
  ],
  anniversary:[
    "Happy Anniversary! 💕","Wishing you endless love! ❤️","Another year together! 🥂",
    "Cheers to your love! 💖","May your bond grow stronger! 🌹","Celebrating your love today! 💘",
    "Sending warm wishes on your anniversary! 💝","Love and happiness forever! 💑","Happy Anniversary! Enjoy your day! 🎉",
    "Together forever! 💕"
  ],
  'get-well':[...Array(10)].map((_,i)=>`Get well soon message ${i+1} 🌻`),
  congrats:[...Array(10)].map((_,i)=>`Congratulations message ${i+1} 🏆`),
  'thank-you':[...Array(10)].map((_,i)=>`Thank you message ${i+1} 🙏`),
  'good-luck':[...Array(10)].map((_,i)=>`Good luck message ${i+1} 🍀`),
  motivation:[...Array(10)].map((_,i)=>`Motivation message ${i+1} 🚀`),
  appreciation:[...Array(10)].map((_,i)=>`Appreciation message ${i+1} 🌟`),
  farewell:[...Array(10)].map((_,i)=>`Farewell message ${i+1} 👋`),
  encouragement:[...Array(10)].map((_,i)=>`Encouragement message ${i+1} 💪`),
  love:[...Array(10)].map((_,i)=>`Love message ${i+1} ❤️`),
  condolences:[...Array(10)].map((_,i)=>`Condolences message ${i+1} 🕊️`),
  vacation:[...Array(10)].map((_,i)=>`Vacation message ${i+1} 🌴`)
};

const emojiSets = {
  birthday:["🎉","🎂","🎈","🥳"],
  anniversary:["💕","❤️","💑","💖"],
  'get-well':["🌻","💊","🛌","🤕"],
  congrats:["🏆","🎖️","🎊","👏"],
  'thank-you':["🙏","💌","🤝","🌸"],
  'good-luck':["🍀","🎯","⭐","🤞"],
  motivation:["🚀","💪","🔥","✨"],
  appreciation:["🌟","💐","🙌","👏"],
  farewell:["👋","💌","🌅","✈️"],
  encouragement:["💪","🔥","🌈","👍"],
  love:["❤️","💖","💘","💕"],
  condolences:["🕊️","🌹","🙏","🖤"],
  vacation:["🌴","☀️","🏖️","✈️"]
};

function displayMessage(){
  const occ=$('occasion').value;
  const lang=$('language').value;
  if(lang==="exit") {$('language').value='en'; return;}
  if(occ==="exit") {$('occasion').value=''; $('customMessage').value=''; return;}
  if(!occ){$('customMessage').value=''; return;}
  currentMsgIndex = Math.floor(Math.random()*messages[occ].length);
  updateMessage();
}

function updateMessage(){
  const occ=$('occasion').value;
  if(!occ) return;
  const baseMsg = messages[occ][currentMsgIndex];
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  let msg = baseMsg;
  if(r) msg = `Hi ${r},\n\n${msg}`;
  if(s) msg += `\n\nFrom:\n${s}`;
  $('customMessage').value = msg;
  renderEmoji();
}

function nextMessage(){
  const occ=$('occasion').value;
  if(!occ) return;
  currentMsgIndex = (currentMsgIndex+1)%messages[occ].length;
  updateMessage();
}

function clearContent(){
  $('customMessage').value='';
}

// NAMES
function updateMessageWithName(){ updateMessage(); }
function clearSender(){$('senderName').value=''; updateMessage();}
function clearRecipient(){$('recipientName').value=''; updateMessage();}

// EMOJI
function renderEmoji(){
  const occ=$('occasion').value;
  const emojiBtn = $('emojiButton');
  let set = occ && emojiSets[occ]? emojiSets[occ]: ["😊","👍","❤️","✨"];
  emojiBtn.onclick = ()=>showEmojiPicker(set);
}
function showEmojiPicker(set){
  const picker = document.createElement('div');
  picker.className='emoji-picker';
  set.forEach(e=>{
    const b = document.createElement('button');
    b.textContent = e;
    b.className='emoji-btn';
    b.onclick = ()=>{ $('customMessage').value += e; picker.remove();}
    picker.appendChild(b);
  });
  document.body.appendChild(picker);
  const rect = $('emojiButton').getBoundingClientRect();
  picker.style.position='absolute';
  picker.style.top=(rect.bottom+window.scrollY+4)+'px';
  picker.style.left=(rect.left+window.scrollX)+'px';
  document.addEventListener('click',function removePicker(ev){
    if(!picker.contains(ev.target) && ev.target!==$('emojiButton')){
      picker.remove();
      document.removeEventListener('click',removePicker);
    }
  });
}

// COPY
function copyMessage(){navigator.clipboard.writeText($('customMessage').value); alert('Copied!');}

// FEEDBACK
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
  if(!fb&&selectedRating===0) return alert('Please rate or comment!');
  alert(`Thanks for rating ${selectedRating}/5 (${selectedRating*20}%)!`);
  closeFeedbackModal();
}

// SHARE
function openShareModal(){$('shareModal').classList.remove('hidden');}
function closeShareModal(){$('shareModal').classList.add('hidden');}
function getMessageForShare(){return $('customMessage').value.trim();}
function shareWhatsApp(){window.open(`https://wa.me/?text=${encodeURIComponent(getMessageForShare())}`,'_blank'); closeShareModal();}
function shareFacebook(){const url=encodeURIComponent(location.href); window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${encodeURIComponent(getMessageForShare())}`,'_blank'); closeShareModal();}
function shareTwitter(){window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(getMessageForShare())}`,'_blank'); closeShareModal();}
function shareTelegram(){window.open(`https://t.me/share/url?url=${encodeURIComponent(location.href)}&text=${encodeURIComponent(getMessageForShare())}`,'_blank'); closeShareModal();}
function shareEmail(){window.location.href=`mailto:?subject=${encodeURIComponent('A Special Message')}&body=${encodeURIComponent(getMessageForShare())}`; closeShareModal();}

// BUTTON EVENTS
window.addEventListener('DOMContentLoaded',()=>{
  $('nextMessage').addEventListener('click',nextMessage);
  $('clearContent').addEventListener('click',clearContent);
  renderEmoji();
});
