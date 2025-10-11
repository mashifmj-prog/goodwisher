/* ========== GoodWisher Script ========== */

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
    div.innerHTML = `<p>${personalize(msg)}</p><div class='btns'><button onclick="share('${msg.replace(/'/g,\"\\\\'\")}')">Share</button><button onclick="copyMsg('${msg.replace(/'/g,\"\\\\'\")}')">Copy</button></div>`;
    messagesDiv.appendChild(div);
  });
}

// Share
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

// Conf
