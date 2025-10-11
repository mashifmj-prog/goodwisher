const categories = {
  Birthday: ["Happy Birthday! Wishing you joy and laughter all day long.","May your birthday be as wonderful as you are!"],
  Condolences: ["Sending love and strength during this difficult time.","My deepest sympathy for your loss."],
  Congratulations: ["You did it! Congratulations on your amazing achievement!","Proud of you! Keep shining bright."],
  Love: ["You are loved beyond measure.","My heart beats happiest when you’re near."],
  GetWell: ["Wishing you speedy recovery and brighter days ahead.","Get well soon — the world needs your smile back!"],
  Anniversary: ["Happy Anniversary! Wishing you endless love and happiness.","Cheers to another year of beautiful memories together."],
  Motivation: ["Believe in yourself and all that you are.","Every sunrise brings new hope and possibilities."],
  Appreciation: ["Thank you for your kindness and support!","You make a difference every day — thank you!"],
  Farewell: ["Goodbyes are not forever, they’re just new beginnings.","Wishing you success and happiness in your next journey!"],
  Encouragement: ["Keep going — you’re stronger than you think!","Every challenge is a step toward growth."]
};

const categoryButtons = document.getElementById('category-buttons');
const messageSection = document.getElementById('message-section');
const categoryTitle = document.getElementById('category-title');
const messagesDiv = document.getElementById('messages');
const recipientInput = document.getElementById('recipient');
const themeToggle = document.getElementById('theme-toggle');

let currentMessage = ""; // For share popup

// Generate category buttons
Object.keys(categories).forEach(cat => {
  const btn = document.createElement('button');
  btn.textContent = cat;
  btn.onclick = () => showMessages(cat);
  categoryButtons.appendChild(btn);
});

// Personalize message
function personalize(text){
  const name = recipientInput.value.trim();
  return name ? name+', '+text : text;
}

// Display messages
function showMessages(cat){
  messageSection.classList.remove('hidden');
  categoryTitle.textContent = cat+' Wishes';
  messagesDiv.innerHTML = '';
  categories[cat].forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = `
      <p>${personalize(msg)}</p>
      <div class='btns'>
        <button onclick="share('${msg.replace(/'/g,"\\\\'")}')">Share (Device)</button>
        <button onclick="copyMsg('${msg.replace(/'/g,"\\\\'")}')">Copy</button>
        <button onclick="openSharePopup('${msg.replace(/'/g,"\\\\'")}')">More</button>
      </div>`;
    messagesDiv.appendChild(div);
  });
}

// Device share
function share(text){
  const message = personalize(text);
  if(navigator.share){ navigator.share({text: message}); }
  else { window.open(`https://wa.me/?text=${encodeURIComponent(message)}`,'_blank'); }
  confetti();
}

// Copy
function copyMsg(text){
  const message = personalize(text);
  navigator.clipboard.writeText(message);
  alert('Message copied!');
  confetti();
}

// Confetti animation
function confetti(){
  const confettiDiv = document.createElement('div');
  confettiDiv.className='confetti';
  for(let i=0;i<25;i++){
    const span=document.createElement('span');
    span.textContent=['🎉','✨','🥳','🎂','🌟'][Math.floor(Math.random()*5)];
    span.style.left=Math.random()*100+'%';
    span.style.animationDelay=(Math.random()*0.5)+'s';
    confettiDiv.appendChild(span);
  }
  document.body.appendChild(confettiDiv);
  setTimeout(()=>confettiDiv.remove(),2500);
}

// Light/Dark mode
function setTheme(theme){
  if(theme==='dark'){ document.body.classList.add('dark-mode'); themeToggle.textContent='🌜'; }
  else { document.body.classList.remove('dark-mode'); themeToggle.textContent='🌞'; }
}

const savedTheme = localStorage.getItem('theme');
if(savedTheme) setTheme(savedTheme);

themeToggle.addEventListener('click',()=>{
  if(document.body.classList.contains('dark-mode')){
    setTheme('light'); localStorage.setItem('theme','light');
  } else {
    setTheme('dark'); localStorage.setItem('theme','dark');
  }
});

// Share popup functions
function openSharePopup(msg){
  currentMessage = personalize(msg);
  document.getElementById('share-popup').classList.remove('hidden');
}

document.getElementById('close-btn').addEventListener('click',()=>{
  document.getElementById('share-popup').classList.add('hidden');
});

document.getElementById('whatsapp-btn').addEventListener('click',()=>{
  window.open(`https://wa.me/?text=${encodeURIComponent(currentMessage)}`,'_blank');
});
document.getElementById('twitter-btn').addEventListener('click',()=>{
  window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentMessage)}`,'_blank');
});
document.getElementById('facebook-btn').addEventListener('click',()=>{
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentMessage)}`,'_blank');
});
document.getElementById('tiktok-btn').addEventListener('click',()=>{
  alert("TikTok sharing is not direct. Copy the message to share there.");
});
document.getElementById('copy-btn').addEventListener('click',()=>{
  navigator.clipboard.writeText(currentMessage);
  alert('Message copied!');
  confetti();
});
