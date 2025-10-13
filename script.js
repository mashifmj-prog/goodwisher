// Shortcut for getElementById
function $(id){return document.getElementById(id);}
let selectedRating=0;

// THEME TOGGLE
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

// =======================
// MULTILINGUAL MESSAGES
// =======================
const messages = {
  en: {
    birthday: [
      "Happy Birthday! 🎉 Wishing you a day full of love, laughter, and happiness.",
      "May your birthday be as amazing as you are! 🎂",
      "Another year older, wiser, and even more fabulous! 🥳",
      "Cheers to you on your special day! 🎈",
      "Happy Birthday! Celebrate with joy and lots of cake! 🍰",
      "Wishing you a birthday filled with hugs and smiles! 🤗",
      "May your birthday bring you endless happiness! 😄",
      "Celebrate your day with love and laughter! 💖",
      "Wishing you a bright and wonderful year ahead! ✨",
      "Happy Birthday! Hope your day is truly unforgettable! 🌟"
    ],
    anniversary: [
      "Happy Anniversary! 💕 Wishing you many more years of love and happiness.",
      "Cheers to another year of togetherness! 🥂",
      "May your bond grow stronger with each passing year! ❤️",
      "Happy Anniversary! Celebrating your love today and always! 💖",
      "Sending warm wishes for a lifetime of happiness together! 💘",
      "Another year of wonderful memories! 💝",
      "Happy Anniversary! Love and joy always surround you! 💑",
      "Celebrating the beautiful journey of your love! 🌹",
      "Wishing you endless love and laughter! 💕",
      "May your love story continue to shine brightly! ✨"
    ],
    "get-well": [
      "Wishing you a speedy recovery! 🌻 Take care and get well soon.",
      "Sending healing thoughts your way! 💊",
      "Get well soon! Your health is our priority. 🛌",
      "May each day bring you strength and comfort. 🤕",
      "Feel better soon! Thinking of you. 🌼",
      "Sending positive vibes for your recovery. 🌟",
      "Get well soon! Hope to see you smiling again. 😊",
      "Take your time to rest and heal. 💛",
      "Wishing you comfort and peace during your recovery. 🌸",
      "Hope you feel stronger and better each day! 💪"
    ],
    congrats: [
      "Congratulations on your amazing achievement! 🏆",
      "Well done! Your hard work paid off! 🎖️",
      "Hats off to your success! 🎊",
      "Cheers to your accomplishment! 🥂",
      "You did it! So proud of you! 👏",
      "Congratulations! Wishing you continued success! 🌟",
      "Your dedication has truly paid off! 💐",
      "Celebrate your success! 🎉",
      "Amazing job! Keep reaching for the stars! ✨",
      "Congrats! This is just the beginning of your success! 🚀"
    ],
    "thank-you": [
      "Thank you for your kindness and support! 🙏",
      "Grateful for everything you do! 💌",
      "Thanks for being such an amazing person! 🤝",
      "I truly appreciate your help and generosity! 🌸",
      "Thank you for making a difference! 💖",
      "Sending heartfelt thanks your way! 💛",
      "Thanks a lot for your support and care! 🌟",
      "I appreciate your efforts more than words can say! 💐",
      "Thank you for always being there for me! 🤗",
      "Grateful for your kindness and thoughtfulness! 💝"
    ],
    "good-luck": [
      "Good luck on your journey! 🍀 Wishing you all the best.",
      "May fortune favor you in everything you do! ⭐",
      "Wishing you success and happiness! 🎯",
      "Good luck! You’ve got this! 💪",
      "All the best for your upcoming endeavors! ✨",
      "May luck and success be always with you! 🌟",
      "Sending you positive vibes and good fortune! 🍀",
      "Wishing you the best of luck today and always! 🌈",
      "Go for it! Luck is on your side! 💫",
      "Good luck! Make your dreams come true! 🚀"
    ],
    motivation: [
      "Keep going — you can do this! 🚀",
      "Believe in yourself and all that you are! 💪",
      "Every step counts — stay motivated! ✨",
      "Push forward, success is near! 🌟",
      "Stay focused and never give up! 💥",
      "Your hard work will pay off! 🔥",
      "Keep striving for your dreams! 🌈",
      "Believe, achieve, and succeed! 💫",
      "Stay positive and keep moving forward! 🌻",
      "You have the power to make it happen! 💪"
    ],
    appreciation: [
      "You’re appreciated more than you know! 🌟",
      "Thank you for all that you do! 💐",
      "Your efforts do not go unnoticed! 🙌",
      "I truly value everything you contribute! 🌸",
      "Sending gratitude your way! 💖",
      "You make a positive difference! 🌈",
      "Appreciating all your hard work and dedication! 💪",
      "Thank you for your time and effort! 💛",
      "Your support is deeply appreciated! 🤗",
      "Grateful for your commitment and care! 💝"
    ],
    farewell: [
      "Wishing you the best in your next adventure! 👋",
      "Farewell! May your future be bright and successful! 🌟",
      "Goodbye and good luck on your journey! ✈️",
      "Sending warm wishes as you move on! 💌",
      "Farewell! Hoping your new path brings happiness! 🌼",
      "Best wishes for the exciting times ahead! 🎉",
      "Goodbye! Keep shining wherever you go! ✨",
      "Wishing you success in all your endeavors! 💐",
      "Farewell and take care! 🌈",
      "Wishing you joy and growth in your next chapter! 🌹"
    ],
    encouragement: [
      "You’ve got this! 💪 Keep going!",
      "Believe in yourself and keep pushing forward! 🌟",
      "Stay strong and never give up! 💥",
      "Your determination will lead you to success! 🚀",
      "Keep your head up and keep moving! 🌈",
      "Stay focused and positive! ✨",
      "You can overcome any challenge! 💪",
      "Believe, act, and achieve! 🌻",
      "Keep striving! The best is yet to come! 💖",
      "Don’t give up — you are capable of amazing things! 🌟"
    ],
    love: [
      "You make life beautiful! ❤️",
      "Sending love and warmth your way! 💖",
      "You are cherished and adored! 💘",
      "My heart is always with you! 💕",
      "Love you endlessly! 💝",
      "You bring joy to my life! 🌹",
      "Forever yours! 💌",
      "With all my love and affection! 💞",
      "You are my everything! ❤️",
      "Love always surrounds us! 💖"
    ],
    condolences: [
      "Sending heartfelt condolences in this time of loss. 🕊️",
      "May your memories bring you comfort and peace. 🌹",
      "Thinking of you and your family during this difficult time. 💛",
      "My deepest sympathy to you and your loved ones. 🖤",
      "Wishing you strength and comfort in the days ahead. 🌸",
      "Holding you close in my thoughts. 🤍",
      "May you find solace in the love around you. 🌼",
      "Sharing in your sorrow and sending support. 💌",
      "Sending prayers and condolences to you. 🙏",
      "May peace and comfort find you during this time. 🕊️"
    ],
    vacation: [
      "Enjoy your well-deserved vacation! 🌴",
      "Relax and soak up the sun! ☀️",
      "Wishing you fun and adventure on your trip! 🏖️",
      "Have a fantastic holiday! ✈️",
      "Enjoy every moment of your getaway! 🌺",
      "Time to unwind and recharge! 🌊",
      "Have a memorable vacation full of joy! 🏝️",
      "Sending travel wishes and sunshine! 🌞",
      "Relax, explore, and enjoy your break! 🌴",
      "Safe travels and happy adventures! ✈️"
    ]
  },
  // =================================
  // Spanish
  es: {
    birthday: [
      "¡Feliz cumpleaños! 🎉 Que tengas un día lleno de amor, risas y felicidad.",
      "¡Que tu cumpleaños sea tan increíble como tú! 🎂",
      "¡Un año más, más sabio y más fabuloso! 🥳",
      "¡Salud por ti en tu día especial! 🎈",
      "¡Feliz cumpleaños! ¡Celebra con alegría y mucho pastel! 🍰",
      "Deseándote un cumpleaños lleno de abrazos y sonrisas! 🤗",
      "¡Que tu cumpleaños te traiga felicidad sin fin! 😄",
      "¡Celebra tu día con amor y risas! 💖",
      "Deseándote un año brillante y maravilloso por delante! ✨",
      "¡Feliz cumpleaños! ¡Espero que tu día sea inolvidable! 🌟"
    ],
    anniversary: [
      "¡Feliz aniversario! 💕 Que tengas muchos años más de amor y felicidad.",
      "¡Salud por otro año juntos! 🥂",
      "¡Que su vínculo se fortalezca con cada año que pasa! ❤️",
      "¡Feliz aniversario! ¡Celebrando tu amor hoy y siempre! 💖",
      "¡Enviando cálidos deseos para una vida de felicidad juntos! 💘",
      "¡Otro año de recuerdos maravillosos! 💝",
      "¡Feliz aniversario! ¡El amor y la alegría siempre te rodeen! 💑",
      "¡Celebrando el hermoso viaje de su amor! 🌹",
      "¡Deseándote amor y risas infinitas! 💕",
      "¡Que tu historia de amor continúe brillando! ✨"
    ],
    "get-well": [
      "¡Deseándote una pronta recuperación! 🌻 Cuídate y mejora pronto.",
      "¡Enviando pensamientos de sanación! 💊",
      "¡Mejórate pronto! Tu salud es nuestra prioridad. 🛌",
      "Que cada día te traiga fuerza y confort. 🤕",
      "¡Siéntete mejor pronto! Pensando en ti. 🌼",
      "Enviando vibras positivas para tu recuperación. 🌟",
      "¡Mejórate pronto! Espero verte sonreír otra vez. 😊",
      "Tómate tu tiempo para descansar y sanar. 💛",
      "Deseándote confort y paz durante tu recuperación. 🌸",
      "¡Espero que te sientas más fuerte y mejor cada día! 💪"
    ],
    // ... and so on for all occasions
  },

  // =================================
  // Mandarin
  zh: {
    birthday: [
      "生日快乐！🎉 祝你充满爱、欢笑和幸福的一天。",
      "愿你的生日和你一样精彩！🎂",
      "又长一岁，更聪明、更棒！🥳",
      "祝你在特别的日子里开心！🎈",
      "生日快乐！尽情庆祝，享受蛋糕！🍰",
      "祝你生日充满拥抱和笑容！🤗",
      "愿你的生日带来无尽的快乐！😄",
      "用爱和笑声庆祝你的一天！💖",
      "祝你未来一年光明而美好！✨",
      "生日快乐！希望你度过难忘的一天！🌟"
    ],
    // ... all other occasions similarly translated
  },

  // =================================
  // Hindi
  hi: {
    birthday: [
      "जन्मदिन मुबारक हो! 🎉 आपका दिन प्यार, हंसी और खुशियों से भरा हो।",
      "आपका जन्मदिन आपके जितना ही अद्भुत हो! 🎂",
      "एक साल बड़ा, समझदार और और भी शानदार! 🥳",
      "आपके विशेष दिन पर Cheers! 🎈",
      "जन्मदिन मुबारक! आनंद और केक के साथ जश्न मनाएँ! 🍰",
      "आपका जन्मदिन गले और मुस्कानों से भरा हो! 🤗",
      "आपका जन्मदिन असीम खुशी लाए! 😄",
      "प्यार और हंसी के साथ अपने दिन का जश्न मनाएँ! 💖",
      "आगामी वर्ष उज्ज्वल और अद्भुत हो! ✨",
      "जन्मदिन मुबारक! आशा है आपका दिन अविस्मरणीय हो! 🌟"
    ],
    // ... other occasions
  },

  // =================================
  // Afrikaans
  af: {
    birthday: [
      "Gelukkige verjaarsdag! 🎉 Ek wens jou 'n dag vol liefde, lag en geluk toe.",
      "Mag jou verjaarsdag so ongelooflik wees soos jy! 🎂",
      "Nog 'n jaar ouer, wyser en selfs meer fantasties! 🥳",
      "Gesondheid op jou spesiale dag! 🎈",
      "Gelukkige verjaarsdag! Vier met vreugde en baie koek! 🍰",
      "Ek wens jou 'n verjaarsdag vol drukkies en glimlagte toe! 🤗",
      "Mag jou verjaarsdag eindelose geluk bring! 😄",
      "Vier jou dag met liefde en lag! 💖",
      "Ek wens jou 'n helder en wonderlike jaar vorentoe toe! ✨",
      "Gelukkige verjaarsdag! Hoop jou dag is onvergeetlik! 🌟"
    ],
    // ... other occasions
  }
};

// =======================
// GLOBAL VARIABLES
// =======================
let currentOccasion = "";
let currentLanguage = "en";
let currentIndex = 0;

// =======================
// DISPLAY MESSAGE
// =======================
function displayMessage() {
  const occ = $('occasion').value;
  currentOccasion = occ;
  const msgs = messages[currentLanguage][occ] || ["Best wishes!"];
  currentIndex = Math.floor(Math.random() * msgs.length);
  const msg = msgs[currentIndex];
  $('message').textContent = msg;
  updateCustomMessage(msg);
}

// NEXT RANDOM MESSAGE
function nextMessage() {
  const msgs = messages[currentLanguage][currentOccasion];
  if(!msgs) return;
  currentIndex = (currentIndex + 1) % msgs.length;
  const msg = msgs[currentIndex];
  $('message').textContent = msg;
  updateCustomMessage(msg);
}

// UPDATE TEXTAREA WITH NAME + SIGNATURE
function updateCustomMessage(msg) {
  const r=$('recipientName').value.trim();
  const s=$('senderName').value.trim();
  let full = msg;
  if(r) full = `Hi ${r},\n\n${full}`;
  if(s) full = `${full}\n\nRegards\n${s}`;
  // add signature only if sender filled
  $('customMessage').value = full;
}

// =======================
// COPY MESSAGE
// =======================
function copyMessage(){
  const text=$('customMessage').value;
  if(!text) return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

// =======================
// FEEDBACK MODAL
// =======================
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

// =======================
// SHARE MODAL
// =======================
function openShareModal(){ $('shareModal').classList.remove('hidden'); }
function closeShareModal(){ $('shareModal').classList.add('hidden'); }

function getMessageWithPromo(){
  const text=$('customMessage').value.trim();
  if(!text){alert('Please generate a message first!');return '';}
  return text + `\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
}

function shareWhatsApp(){
  const msg=getMessageWithPromo(); if(!msg)return;
  window.open(`https://wa.me/?text
