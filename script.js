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
window.addEventListener('DOMContentLoaded',()=>{
  const saved=localStorage.getItem('theme')||'light';
  document.body.dataset.theme=saved;
  setThemeIcon();
  $('themeToggle').addEventListener('click',toggleTheme);

  $('occasion').addEventListener('change', displayMessage);
  $('nextMessage').addEventListener('click', nextMessage);
  $('clearMessage').addEventListener('click', clearMessage);
  $('emojiButton').addEventListener('click', insertEmoji);
  $('recipientName').addEventListener('input', displayMessage);
  $('senderName').addEventListener('input', displayMessage);
});

// Messages
const messages = {
  birthday:["Happy Birthday! 🎉","Wishing you a joyful day!"],
  anniversary:["Happy Anniversary! 💕","Celebrating your love!"],
  "get-well":["Get well soon! 🌻","Wishing you a speedy recovery!"],
  congrats:["Congratulations! 🏆","Well done!"],
  "thank-you":["Thank you for your kindness! 🙏","Much appreciated!"],
  "good-luck":["Good luck on your journey! 🍀","Wishing you success!"],
  motivation:["Keep going — you can do this! 🚀","Believe in yourself!"],
  appreciation:["You’re appreciated more than you know! 🌟","Thanks for everything!"],
  farewell:["Wishing you the best in your next adventure! 👋","Goodbye and take care!"],
  encouragement:["You’ve got this! 💪","Stay strong!"],
  love:["You make life beautiful! ❤️","Sending love!"],
  condolences:["Sending my deepest condolences. 🕊️","Thinking of you in this time."],
  vacation:["Enjoy your well-deserved vacation! 🌴","Relax and have fun!"]
};

let currentIndex = 0;

function displayMessage(){
  const occ = $('occasion').value;
  if(!occ) { $('customMessage').value=''; return; }
  currentIndex = 0;
  updateTextarea(messages[occ][currentIndex]);
}

function updateTextarea(baseMsg){
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let full = '';
  if(r) full += `Hi ${r},\n\n`;
  full += baseMsg + '\n\n';
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

function clearMessage(){
  $('customMessage').value = '';
}

function copyMessage(){
  const text = $('customMessage').value.trim();
  if(!text) return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

function insertEmoji(){
  const emoji = prompt("Enter emoji to insert (or leave blank for 😊)","😊");
  if(emoji) $('customMessage').value += emoji;
}
