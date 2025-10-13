// GoodWisher: English Only
function $(id){return document.getElementById(id);}
let selectedRating=0;
let currentOccasion='';
let currentIndex=0;

// Theme Toggle
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

// Messages
const messagesData = {
  'birthday':[ 
    "Wishing you a day filled with love and cheer! 🥳",
    "Another year older, wiser! 🎂",
    "Hope your birthday is as wonderful as you are! 🎉",
    "Celebrate big and smile always! 🎈",
    "May all your wishes come true today! 🍰",
    "Cheers to you and your special day! 🥂",
    "Have a fantastic birthday full of joy! 🎁",
    "Happy Birthday! Keep shining bright! ✨",
    "Enjoy every moment of your birthday! 🎊",
    "Sending birthday happiness your way! 🌟",
    "Hope your birthday sparkles with fun! 🎇",
    "To another amazing year ahead! 🏆",
    "Happy Birthday! Celebrate every little thing! 🎉",
    "Wishing you laughter and joy today! 😄",
    "May your day be filled with sunshine and smiles! 🌞"
  ],
  'anniversary':[ 
    "Happy Anniversary! 💕 May love always surround you.",
    "Cheers to another year of togetherness! 🥂",
    "Wishing you a lifetime of love and joy! 🌹",
    "Celebrate the love that grows every year! ❤️",
    "May your bond grow stronger with each passing day! 💖",
    "Happy Anniversary! Keep creating memories! 🌟",
    "Love and laughter for many years to come! 💑",
    "Another beautiful year together! 🌷",
    "Wishing you endless happiness! 🌺",
    "To a love that keeps shining brighter! ✨",
    "Happy Anniversary! Enjoy every moment! 🥰",
    "May your hearts always beat as one! 💞",
    "A toast to love, laughter, and memories! 🍷",
    "Happy Anniversary! Keep cherishing each other! 🌸",
    "Sending love and best wishes your way! 💌"
  ],
  'condolence':[ 
    "Sending heartfelt condolences in this time of loss. 🕊️",
    "Thinking of you and wishing you comfort. 🌹",
    "May you find peace and strength during this difficult time. 🙏",
    "Holding you in my thoughts and prayers. 🕯️",
    "Wishing you moments of peace and reflection. 🌿",
    "Deepest sympathies for your loss. 💐",
    "May cherished memories bring you comfort. 🕊️",
    "Keeping you close in heart and mind. 🖤",
    "May love and support surround you now. 💌",
    "Sending gentle hugs and prayers your way. 🤍",
    "Wishing you solace in every memory. 🌾",
    "Thinking of you with care and compassion. 🌼",
    "May hope and love bring you peace. 🌟",
    "Holding you close in thought and spirit. 🕊️",
    "Deepest condolences and warm thoughts to you. 🌹"
  ],
  'congratulations':[ 
    "Congratulations on your wonderful achievement! 🏆",
    "You did it! So proud of you! 🎉",
    "Wishing you continued success in all you do! 🌟",
    "Bravo! Your hard work paid off! 🎖️",
    "Cheers to your fantastic accomplishment! 🥂",
    "May this success bring more joy ahead! 🌈",
    "Amazing job! Keep reaching higher! 🚀",
    "Celebrating your remarkable achievement! 🎊",
    "You’re an inspiration to everyone around! ✨",
    "Congrats! Keep shining and growing! 💫",
    "Way to go! Your dedication is admirable! 👏",
    "Congratulations! Enjoy your well-earned success! 🌟",
    "Hats off to your excellent work! 🎩",
    "So happy for your achievement! 🌷",
    "Cheers to your bright future! 🍀"
  ],
  'get-well':[ 
    "Wishing you a speedy recovery! 🌻",
    "Hope you feel better very soon! 💐",
    "Sending healing thoughts your way. 🕊️",
    "Take care and get well quickly! 🌼",
    "Wishing you strength and comfort. 🌟",
    "May each day bring renewed health. 🌞",
    "Sending warm wishes for your recovery! 💌",
    "Hoping you’re back on your feet soon! 🍀",
    "Feel better and stay strong! 💪",
    "Get well soon! Thinking of you. 🌸",
    "Sending love and health your way! 🌷",
    "Take time to rest and heal fully! 🛌",
    "Wishing you brighter days ahead! 🌈",
    "Hope you regain your energy and smile soon! 😄",
    "Thinking of you and wishing wellness! 🌹"
  ],
  'thank-you':[ 
    "Thank you for your kindness and support! 🙏",
    "Grateful for everything you do! 🌟",
    "Appreciate your help and generosity! 💐",
    "Thanks a ton! You’re amazing! 🎉",
    "Many thanks for your thoughtfulness! 🌼",
    "Heartfelt thanks for all you do! 💌",
    "Your support means the world! 🌷",
    "Thanks! You make a difference! ✨",
    "Deeply appreciate your guidance and care! 🌹",
    "Thank you for always being there! 🤝",
    "Much gratitude for your help! 🌟",
    "Thanks for brightening my day! 😄",
    "Appreciate your effort and dedication! 💖",
    "Thanks for going the extra mile! 🌈",
    "Thank you for your generosity! 🌸"
  ],
  'good-luck':[ 
    "Good luck on your journey! 🍀",
    "Wishing you all the best in your endeavors! 🌟",
    "May success follow you everywhere! ✨",
    "Fingers crossed for your big day! 🤞",
    "Wishing you smooth sailing ahead! ⛵",
    "Good luck! Shine bright and confident! 🌈",
    "May fortune smile upon you! 💫",
    "Sending positive vibes your way! 🌞",
    "All the best! You’ve got this! 💪",
    "Good luck! Keep believing in yourself! 🌟",
    "Wishing you success at every turn! 🏆",
    "Go forth and conquer! 🎖️",
    "May luck be your faithful companion! 🍀",
    "Good luck! Enjoy every moment! 🎉",
    "Wishing you triumph and happiness! 🌸"
  ],
  'appreciation':[ 
    "You’re appreciated more than you know! 🌟",
    "Thanks for being so wonderful! 💐",
    "Your kindness doesn’t go unnoticed! 🌹",
    "Truly grateful for you! 🙏",
    "Appreciate all that you do! 🌼",
    "You make a positive difference! ✨",
    "Thanks for your effort and heart! 💖",
    "Your support is invaluable! 🌷",
    "You’re amazing! Keep shining! 🎉",
    "Deep appreciation for your help! 💌",
    "Grateful for your dedication! 🌟",
    "Thanks for always caring! 🤍",
    "Appreciate your thoughtfulness! 🌸",
    "You’re a wonderful person! 💫",
    "Thanks for being you! 🌈"
  ],
  'farewell':[ 
    "Wishing you the best in your next adventure! 👋",
    "Goodbye and good luck ahead! 🌟",
    "Farewell! Stay happy and successful! 🎉",
    "Best wishes for your journey! 🌈",
    "It’s been great knowing you! 💖",
    "Wishing you joy in new beginnings! 🌷",
    "Take care and keep smiling! 😄",
    "Goodbye! May happiness follow you! 🌸",
    "Farewell! Your presence will be missed! 💐",
    "Wishing you memorable days ahead! 🌹",
    "All the best in everything you do! 🍀",
    "Good luck on new horizons! 🚀",
    "Farewell! Keep inspiring others! 🌟",
    "Best wishes always! 🎁",
    "Take the next step confidently! 💪"
  ],
  'encouragement':[ 
    "You’ve got this! 💪",
    "Keep pushing forward! 🚀",
    "Believe in yourself! ✨",
    "Stay strong and positive! 🌟",
    "Never give up on your dreams! 🌈",
    "Keep aiming high! 🏹",
    "Courage will guide you! 🦁",
    "You can achieve anything! 🌞",
    "Stay motivated and focused! 🎯",
    "Keep striving for excellence! 🌹",
    "Trust your instincts! 💡",
    "Persevere and succeed! 🏆",
    "You are capable and strong! 💖",
    "Keep shining bright! 🌸",
    "Stay determined and fearless! 🌟"
  ],
  'love':[ 
    "You make life beautiful! ❤️",
    "Love and joy always surround you! 💕",
    "Thinking of you with love! 🌹",
    "You’re cherished and adored! 💖",
    "Sending hugs and kisses! 😘",
    "Your love inspires me! 💫",
    "Always in my heart! 💌",
    "Forever grateful for you! 🌸",
    "Love you more each day! ❤️",
    "Wishing endless happiness together! 🌟",
    "You are my sunshine! 🌞",
    "Love knows no bounds! 💕",
    "Together is our favorite place! 🏡",
    "You’re my everything! 💖",
    "With all my heart, always! 💘"
  ],
  'vacation':[ 
    "Enjoy your well-deserved vacation! 🌴",
    "Relax and recharge fully! 🏖️",
    "May your trip be amazing! ✨",
    "Wishing you fun and adventure! 🌟",
    "Have a fantastic holiday! 🌞",
    "Take time to unwind and smile! 😄",
    "Make memories that last forever! 📸",
    "Enjoy every moment of your break! 🎉",
    "Rest, relax, and rejuvenate! 🌷",
    "Vacation vibes only! 🌴",
    "Travel safely and happily! 🚗",
    "Have a refreshing getaway! 🌊",
    "Enjoy sunshine and good times! ☀️",
    "Take pleasure in every experience! 🌟",
    "Make your vacation unforgettable! 🎊"
  ]
};

// Display Message
function displayMessage(){
  const occ=$('occasion').value;
  if(!occ){$('customMessage').value='';currentOccasion='';return;}
  currentOccasion=occ;
  currentIndex=Math.floor(Math.random()*messagesData[occ].length);
  const msg = messagesData[occ][currentIndex];
  $('customMessage').value=msg;
}

// Next Random Message
function nextMessage(){
  if(!currentOccasion)return alert("Select an occasion first!");
  let nextIndex=Math.floor(Math.random()*messagesData[currentOccasion].length);
  while(nextIndex===currentIndex) nextIndex=Math.floor(Math.random()*messagesData[currentOccasion].length);
  currentIndex=nextIndex;
  $('customMessage').value=messagesData[currentOccasion][currentIndex];
}

// Clear Content
function clearContent(){
  $('customMessage').value='';
}

// Emoji Button
const emojiSets = {
  generic:["😊","😂","😍","👍","🎉"],
  birthday:["🎂","🎈","🥳","🎁","🎊"],
  anniversary:["💖","🥂","🌹","💑","🌟"],
  condolence:["🕊️","🌹","💐","🖤","🕯️"],
  congratulations:["🏆","🎉","🎖️","✨","🌟"],
  get-well:["🌻","🌼","💌","🍀","🌞"],
  "thank-you":["🙏","🌟","💐","💌","🌹"],
  "good-luck":["🍀","🌈","💪","🎯","🌟"],
  appreciation:["🌟","💐","🌹","✨","💖"],
  farewell:["👋","🌷","🌸","💐","🍀"],
  encouragement:["💪","🚀","✨","🌟","🌈"],
  love:["❤️","💕","💫","💌","🌸"],
  vacation:["🌴","🏖️","🌊","☀️","🎊"]
};

function showEmojis(){
  const occ = currentOccasion || 'generic';
  const set = emojiSets[occ];
  const emojiList=set.join(' ');
  alert("Emoji Picker:\n"+emojiList+"\nClick to copy manually!");
}

// Copy
function copyMessage(){
  const text=$('customMessage').value;
  if(!text)return alert('No message!');
  navigator.clipboard.writeText(text+'\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/');
  alert('Copied!');
}

// Feedback
function openFeedbackModal(){$('feedbackModal').classList.remove('hidden');}
function closeFeedbackModal(){
  $('feedbackModal').classList.add('hidden');
  $('feedbackText').value=''; selectedRating=0;
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
  if(!fb && selectedRating===0)return alert('Please rate or comment!');
  let stored=JSON.parse(localStorage.getItem('feedbacks')||'[]');
  stored.push({rating:selectedRating,feedback:fb,date:new Date().toLocaleString()});
  localStorage.setItem('feedbacks',JSON.stringify(stored));
  alert(`Thanks for your feedback!`);
  closeFeedbackModal();
}
function viewFeedbacks(){
  const stored=JSON.parse(localStorage.getItem('feedbacks')||'[]');
  if(!stored.length)return alert('No feedback yet.');
  let msgs=stored.map(f=>`[${f.date}] ⭐${f.rating} - ${f.feedback}`).join('\n\n');
  alert(msgs);
}

// Share (Generic)
function shareMessage(){
  const text=$('customMessage').value;
  if(!text)return alert('Generate a message first!');
  const fullMsg=text+'\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/';
  if(navigator.share){
    navigator.share({text:fullMsg}).catch(err=>console.log(err));
  } else {
    alert("Sharing not supported. Copy instead.");
  }
}

// Init Event Listeners
window.addEventListener('DOMContentLoaded',()=>{
  $('occasion').addEventListener('change',displayMessage);
  $('nextMessage').addEventListener('click',nextMessage);
  $('clearContent').addEventListener('click',clearContent);
  $('emojiButton').addEventListener('click',showEmojis);
  $('copyBtn').addEventListener('click',copyMessage);
  $('shareBtn').addEventListener('click',shareMessage);
  $('feedbackBtn').addEventListener('click',openFeedbackModal);
  $('submitFeedbackBtn').addEventListener('click',submitFeedback);
  $('viewFeedbackBtn').addEventListener('click',viewFeedbacks);
});
