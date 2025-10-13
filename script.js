function $(id){return document.getElementById(id);}

// Theme toggle
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

// Messages (English only)
const messages = {
  birthday:["Happy Birthday! 🎉","Wishing you a joyful day! 🎂"],
  anniversary:["Happy Anniversary! 💕","Celebrating your love! ❤️"],
  "get-well":["Get well soon! 🌻","Wishing you a speedy recovery! 🌟"],
  congrats:["Congratulations! 🏆","Well done! 🎖️"],
  "thank-you":["Thank you for your kindness! 🙏","Much appreciated! 😊"],
  "good-luck":["Good luck on your journey! 🍀","Wishing you success! 🌈"],
  motivation:["Keep going — you can do this! 🚀","Believe in yourself! 💪"],
  appreciation:["You’re appreciated more than you know! 🌟","Thanks for everything! 🙌"],
  farewell:["Wishing you the best in your next adventure! 👋","Goodbye and take care! 🌸"],
  encouragement:["You’ve got this! 💪","Stay strong! 🌼"],
  love:["You make life beautiful! ❤️","Sending love! 💌"],
  condolences:["Sending my deepest condolences. 🕊️","Thinking of you in this time. 🌹"],
  vacation:["Enjoy your well-deserved vacation! 🌴","Relax and have fun! 🏖️"]
};

let currentIndex = 0;

// Init
window.addEventListener('DOMContentLoaded',()=>{
  document.body.dataset.theme=localStorage.getItem('theme')||'light';
  setThemeIcon();
  $('themeToggle').addEventListener('click',toggleTheme);

  $('occasion').addEventListener('change', displayMessage);
  $('nextMessage').addEventListener('click', nextMessage);
  $('clearMessage').addEventListener('click', clearMessage);
  $('emojiButton').addEventListener('click', showEmojiPopup);

  $('copyBtn').addEventListener('click', copyMessage);
  $('shareBtn').addEventListener('click', openShareModal);
  $('saveBtn').addEventListener('click', saveMessage);
  $('saveTemplateBtn').addEventListener('click', saveTemplate);
  $('feedbackBtn').addEventListener('click', openFeedbackModal);
});

// Textarea functions
function displayMessage(){
  const occ = $('occasion').value;
  if(!occ) return;
  currentIndex = 0;
  updateTextarea(messages[occ][currentIndex]);
}

function updateTextarea(msg){
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let full = '';
  if(r) full += `Hi ${r},\n\n`;
  full += msg + '\n\n';
  if(s) full += `Regards\n${s}\n\n`;
  full += "Generated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/";
  $('customMessage').value = full;
}

function nextMessage(){
  const occ = $('occasion').value;
  if(!occ) return;
  currentIndex = (currentIndex + 1) % messages[occ].length;
  updateTextarea(messages[occ][currentIndex]);
}

function clearMessage(){ $('customMessage').value=''; }

function showEmojiPopup(){ alert('Emoji popup here!'); /* placeholder */ }

function copyMessage(){
  const txt=$('customMessage').value;
  if(!txt) return alert('No message!');
  navigator.clipboard.writeText(txt);
  alert('Copied!');
}

// Share modal
function openShareModal(){$('shareModal').classList.remove('hidden');}
function closeShareModal(){$('shareModal').classList.add('hidden');}

function shareWhatsApp(){let msg=$('customMessage').value; if(!msg)return; window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTwitter(){let msg=$('customMessage').value; if(!msg)return; window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTelegram(){let msg=$('customMessage').value; if(!msg)return; window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareEmail(){let msg=$('customMessage').value; if(!msg)return; window.location.href=`mailto:?subject=GoodWisher&body=${encodeURIComponent(msg)}`; closeShareModal();}
function shareDevice(){alert('Device share popup (native)'); closeShareModal();}

// Feedback modal
function openFeedbackModal(){$('feedbackModal').classList.remove('hidden');}
function closeFeedbackModal(){$('feedbackModal').classList.add('hidden');}
function submitFeedback(){const fb=$('feedbackText').value.trim(); alert('Feedback submitted!'); closeFeedbackModal();}

// Placeholder functions
function saveMessage(){alert('Message saved!');}
function saveTemplate(){alert('Template saved!');}
