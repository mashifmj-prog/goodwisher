function $(id){return document.getElementById(id);}
let currentIndex=0;

// Multilingual messages (EN, ES, ZH, HI, AF)
const messages={
  en: {
    birthday:[
      "Happy Birthday! 🎉","Wishing you a fantastic day filled with joy!","Hope your birthday is as amazing as you!","Celebrate your day with laughter and love!","May your year ahead be full of blessings!","Another year older, another year wiser!","Cheers to your special day!","Enjoy every moment of your birthday!","Sending you birthday cheer!","May all your wishes come true today!"
    ],
    anniversary:[
      "Happy Anniversary! 💕","Wishing you many more years of love!","May your bond grow stronger each year!","Cheers to another year together!","Celebrating your love today!","Sending you love and happiness!","May your love story continue beautifully!","Happy Anniversary to a wonderful couple!","Warm wishes on your special day!","Congratulations on another year together!"
    ],
    "get-well":[
      "Get well soon! 🌻","Wishing you a speedy recovery!","Hope you feel better each day!","Sending healing thoughts your way!","Take care and get well soon!","Rest well and get stronger!","Thinking of you and hoping for quick recovery!","Wishing you comfort and wellness!","May you regain your strength soon!","Feel better and take it easy!"
    ],
    congrats:[
      "Congratulations on your achievement! 🏆","Well done! 🎉","Proud of your success!","Cheers to your accomplishment!","You did it!","Way to go!","Fantastic achievement!","Celebrating your success!","Hats off to you!","Keep shining and achieving!"
    ],
    "thank-you":[
      "Thank you for your kindness and support! 🙏","Grateful for all you do!","Thanks a lot!","Much appreciated!","Thank you sincerely!","Thanks for your help!","Heartfelt thanks!","Thank you for being wonderful!","Appreciate your efforts!","Thanks a million!"
    ],
    "good-luck":[
      "Good luck on your journey! 🍀","Wishing you all the best!","May success follow you!","Fingers crossed!","Wishing you a smooth path ahead!","Best wishes for your endeavors!","Hope everything goes well!","May fortune favor you!","Good luck and take care!","Sending you positive vibes!"
    ],
    motivation:[
      "Keep going — you can do this! 🚀","Believe in yourself!","Never give up!","Stay strong and keep pushing!","Your efforts will pay off!","Keep moving forward!","Stay motivated!","You are capable of greatness!","Persevere and succeed!","Dream big and work hard!"
    ],
    appreciation:[
      "You’re appreciated more than you know! 🌟","Thanks for everything you do!","Your effort means a lot!","Grateful for your hard work!","Appreciate your dedication!","Thank you for being amazing!","You make a difference!","Your support is invaluable!","Thanks for your commitment!","Appreciate all that you do!"
    ],
    farewell:[
      "Wishing you the best in your next adventure! 👋","Goodbye and good luck!","Farewell, take care!","Best wishes for your journey!","Will miss you!","Have a bright future!","Wishing you success ahead!","Good luck on your new path!","Safe travels!","Farewell and stay awesome!"
    ],
    encouragement:[
      "You’ve got this! 💪","Keep going!","Stay strong!","Believe in yourself!","You can do it!","Never lose hope!","Stay confident!","Push forward!","Stay motivated!","You’re capable!"
    ],
    love:[
      "You make life beautiful! ❤️","Thinking of you with love!","Sending love your way!","Love you always!","You mean so much to me!","My heart is yours!","Forever in love with you!","Love and hugs!","You are my everything!","Love conquers all!"
    ],
    condolences:[
      "Sending my deepest condolences. 🕊️","My thoughts are with you.","Wishing you peace and comfort.","I’m so sorry for your loss.","Thinking of you in this difficult time.","May memories bring you peace.","Heartfelt sympathy to you.","Sharing in your sorrow.","With deepest sympathy.","Wishing you strength and comfort."
    ],
    vacation:[
      "Enjoy your well-deserved vacation! 🌴","Relax and have fun!","Have a fantastic break!","Wish you a refreshing holiday!","Enjoy every moment!","Take time to unwind!","Have a great trip!","Safe travels and fun times!","Vacation vibes for you!","Relax, recharge, and enjoy!"
    ]
  },
  es:{/*Spanish translations*/},
  zh:{/*Mandarin translations*/},
  hi:{/*Hindi translations*/},
  af:{/*Afrikaans translations*/}
};

// DOM elements
const language=$("language");
const occasion=$("occasion");
const textarea=$("customMessage");
const nextBtn=$("nextMessage");
const clearBtn=$("clearContent");
const emojiBtn=$("emojiButton");
const recipient=$("recipientName");
const sender=$("senderName");

// Display message logic
function displayMessage(){
  let lang=language.value==='exit'?'en':language.value;
  let occ=occasion.value==='exit'?'':occasion.value;
  if(!occ){textarea.value=''; currentIndex=0; return;}
  const arr=messages[lang][occ]||["Best wishes!"];
  currentIndex=0;
  textarea.value=arr[currentIndex];
}

// Next message
nextBtn.addEventListener('click',()=>{
  let lang=language.value==='exit'?'en':language.value;
  let occ=occasion.value==='exit'?'':occasion.value;
  if(!occ) return;
  const arr=messages[lang][occ];
  currentIndex=(currentIndex+1)%arr.length;
  textarea.value=arr[currentIndex];
});

// Clear content
clearBtn.addEventListener('click',()=>{textarea.value='';});

// Emoji button
const genericEmojis=["😊","👍","💖","🌟","🎉","🙏"];
const occasionEmojis={
  birthday:["🎂","🎉","🎁"], anniversary:["💖","🥂"], /*... add for all occasions*/
};
emojiBtn.addEventListener('click',()=>{
  const occ=occasion.value;
  const emojis=occ&&occasionEmojis[occ]?occasionEmojis[occ]:genericEmojis;
  const emojiSelection=prompt("Select emoji (copy from list):\n"+emojis.join(" "));
  if(emojiSelection) textarea.value+=emojiSelection;
});

// Add sender/recipient names
function updateMessageWithName(){
  let txt=textarea.value.replace(/\n\nGenerated.*$/,"").trim();
  if(recipient.value) txt="Hi "+recipient.value+",\n\n"+txt;
  if(sender.value) txt+="\n\nRegards\n"+sender.value;
  if(recipient.value||sender.value) txt+="\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/";
  textarea.value=txt;
}
recipient.addEventListener('input',updateMessageWithName);
sender.addEventListener('input',updateMessageWithName);

// Copy
function copyMessage(){navigator.clipboard.writeText(textarea.value).then(()=>alert("Copied!"));}

// Share modal
function openShareModal(){$("shareModal").classList.remove("hidden");}
function closeShareModal(){$("shareModal").classList.add("hidden");}

// Sharing functions
function getMessage(){return textarea.value.trim();}
function shareWhatsApp(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareFacebook(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&quote=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTwitter(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTelegram(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareEmail(){let msg=getMessage(); if(!msg) return alert("No message!"); window.location.href=`mailto:?subject=${encodeURIComponent("A Special Message from GoodWisher")}&body=${encodeURIComponent(msg.replace(/\n/g,'%0A'))}`; closeShareModal();}

// Theme toggle
function setThemeIcon(){ const p=$('themeIconPath'); const isDark=document.body.dataset.theme==='dark'; p.setAttribute('d',isDark?'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z':'M12 2a10 10 0 100 20 10 10 0 000-20z');}
function toggleTheme(){ const body=document.body; const newTheme=body.dataset.theme==='dark'?'light':'dark'; body.dataset.theme=newTheme; localStorage.setItem('theme',newTheme); setThemeIcon();}
window.addEventListener('DOMContentLoaded',()=>{ const saved=localStorage.getItem('theme')||'light'; document.body.dataset.theme=saved; setThemeIcon(); $('themeToggle').addEventListener('click',toggleTheme);});
