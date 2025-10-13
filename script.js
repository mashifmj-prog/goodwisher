function $(id){return document.getElementById(id);}
let selectedRating=0;

const occasions = {
  "birthday":["Happy Birthday! 🎉","Wishing you a fantastic birthday!","Enjoy your special day!","Many happy returns!","Celebrate with joy!","Have a blast!","Birthday hugs!","Cake & smiles!","Cheers to you!","Joyful birthday wishes!"],
  "anniversary":["Happy Anniversary! 💕","Celebrating your love!","Wishing you many more years!","Love always!","Cheers to your journey!","Anniversary hugs!","Together forever!","Joyful love day!","Heartfelt wishes!","Love & laughter!"],
  "get-well":["Get well soon! 🌻","Wishing you a speedy recovery!","Feel better soon!","Health & happiness!","Sending healing vibes!","Rest & recover!","Hugs & strength!","Better days ahead!","Take care!","Warm wishes!"],
  "congrats":["Congratulations! 🏆","Well done!","Cheers to your success!","Proud of you!","Keep shining!","Amazing achievement!","You did it!","Way to go!","Celebrate your win!","Kudos!"],
  "thank-you":["Thank you! 🙏","Much appreciated!","Thanks a ton!","Grateful for you!","Thanks sincerely!","Heartfelt thanks!","Many thanks!","Thanks kindly!","Appreciate it!","Thanks a lot!"],
  "good-luck":["Good luck! 🍀","Wishing you success!","All the best!","May fortune favor you!","Luck & success!","You got this!","Cheering for you!","Best wishes!","Fingers crossed!","Smooth journey!"],
  "motivation":["Keep going! 🚀","Never give up!","Believe in yourself!","You can do it!","Stay strong!","Chase your dreams!","Push forward!","Stay positive!","Keep moving!","Shine bright!"],
  "appreciation":["You’re appreciated! 🌟","Thanks for everything!","Grateful always!","Big thanks!","Appreciate your effort!","You rock!","Much respect!","Many thanks!","Thanks sincerely!","Warm appreciation!"],
  "farewell":["Farewell! 👋","All the best ahead!","Goodbye & good luck!","Wishing you well!","Parting wishes!","Safe journeys!","Best of luck!","Goodbye hugs!","Until next time!","Cheers & farewells!"],
  "encouragement":["You’ve got this! 💪","Keep your head up!","Stay strong!","Believe in yourself!","Push forward!","Cheer up!","Stay motivated!","Don’t give up!","You are amazing!","Keep shining!"],
  "love":["You make life beautiful! ❤️","Love always!","Heartfelt love!","With love!","Cherish every moment!","Endless love!","Sweet hugs!","Affection always!","Warm love!","Much love!"],
  "condolences":["My deepest condolences. 🕊️","Thinking of you","Sending sympathy","Heartfelt condolences","With sympathy","Peace & comfort","In thoughts with you","Warm condolences","Sincere sympathy","Comfort & prayers"],
  "vacation":["Enjoy your vacation! 🌴","Relax & unwind!","Have fun!","Safe travels!","Enjoy every moment!","Happy holidays!","Beach vibes!","Adventure awaits!","Travel safely!","Wonderful break!"]
};

const emojiSets = {
  "birthday":["🎂","🎉","🥳","🎈","🍰"],
  "anniversary":["💖","💑","💞","🥂","💕"],
  "get-well":["🌻","🌿","💊","🩹","🌸"],
  "congrats":["🏆","🎯","🎉","🥳","👏"],
  "thank-you":["🙏","🤝","💐","😊","🌹"],
  "good-luck":["🍀","🤞","🌟","💫","🎯"],
  "motivation":["🚀","💪","🔥","🌟","🌈"],
  "appreciation":["🌟","👏","💖","🎖️","🙏"],
  "farewell":["👋","✈️","💌","🎁","💐"],
  "encouragement":["💪","🌈","🌟","🔥","😊"],
  "love":["❤️","💌","💞","🌹","💖"],
  "condolences":["🕊️","🌹","🙏","💐","🕯️"],
  "vacation":["🌴","🏖️","☀️","✈️","🏝️"],
  "generic":["😊","🌟","👍","💖","✨"]
};

let currentMessageIndex = 0;

// THEME
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
  document.body.dataset.theme = localStorage.getItem('theme')||'light';
  setThemeIcon();
  $('themeToggle').addEventListener('click',toggleTheme);

  $('emojiButton').addEventListener('click',showEmojiPicker);
  $('clearContent').addEventListener('click',clearContent);
  displayMessage();
});

// MESSAGE
function displayMessage(){
  const occ=$('occasion').value;
  if(!occ){$('customMessage').value=''; return;}
  const msgs = occasions[occ];
  currentMessageIndex = Math.floor(Math.random()*msgs.length);
  $('customMessage').value = msgs[currentMessageIndex];
}

function nextMessage(){
  const occ=$('occasion').value;
  if(!occ)return;
  const msgs = occasions[occ];
  currentMessageIndex = (currentMessageIndex + 1) % msgs.length;
  $('customMessage').value = msgs[currentMessageIndex];
}

function updateMessageWithName(){
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  let msg = $('customMessage').value.split('\n')[0]; // keep only main message
  if(r) msg = `Hi ${r},\n\n${msg}`;
  if(s) msg = `${msg}\n\nFrom,\n${s}`;
  $('customMessage').value = msg;
}

function clearContent(){ $('customMessage').value = ''; }
function clearSender(){ $('senderName').value=''; update
