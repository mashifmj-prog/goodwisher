// Helper function
function $(id){return document.getElementById(id);}

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

// LANGUAGE & MESSAGES
const messages = {
  en:{
    birthday:["Happy Birthday! 🎉","Wishing you a joyful day!"],
    anniversary:["Happy Anniversary! 💕","Celebrating your love!"],
    "get-well":["Get well soon! 🌻","Wishing you speedy recovery!"],
    congrats:["Congratulations! 🏆","Well done!"],
    "thank-you":["Thank you! 🙏","Much appreciated!"],
    "good-luck":["Good luck! 🍀","Wishing you success!"],
    motivation:["Keep going! 🚀","Believe in yourself!"],
    appreciation:["You are appreciated! 🌟","Thanks for everything!"],
    farewell:["Wishing you the best! 👋","Goodbye and take care!"],
    encouragement:["You got this! 💪","Stay strong!"],
    love:["You make life beautiful! ❤️","Sending love!"],
    condolences:["My deepest condolences. 🕊️","Thinking of you in this time."],
    vacation:["Enjoy your vacation! 🌴","Relax and have fun!"]
  },
  es:{
    birthday:["¡Feliz cumpleaños! 🎉","¡Que tengas un día lleno de alegría!"],
    anniversary:["¡Feliz aniversario! 💕","¡Celebrando su amor!"],
    "get-well":["¡Recupérate pronto! 🌻","¡Deseándote una pronta recuperación!"],
    congrats:["¡Felicidades! 🏆","¡Bien hecho!"],
    "thank-you":["¡Gracias! 🙏","¡Muy agradecido!"],
    "good-luck":["¡Buena suerte! 🍀","¡Te deseo éxito!"],
    motivation:["¡Sigue adelante! 🚀","¡Cree en ti mismo!"],
    appreciation:["¡Eres apreciado! 🌟","¡Gracias por todo!"],
    farewell:["¡Te deseo lo mejor! 👋","¡Adiós y cuídate!"],
    encouragement:["¡Tú puedes! 💪","¡Mantente fuerte!"],
    love:["¡Haces la vida hermosa! ❤️","¡Enviando amor!"],
    condolences:["Mis más profundas condolencias. 🕊️","Pensando en ti en este momento."],
    vacation:["¡Disfruta tus vacaciones! 🌴","¡Relájate y diviértete!"]
  },
  zh:{
    birthday:["生日快乐！🎉","祝你有一个充满欢乐的美好一天！"],
    anniversary:["结婚周年快乐！💕","祝你们爱情长长久久！"],
    "get-well":["早日康复！🌻","祝你快速恢复健康！"],
    congrats:["祝贺！🏆","干得漂亮！"],
    "thank-you":["谢谢！🙏","非常感谢！"],
    "good-luck":["祝你好运！🍀","祝你成功！"],
    motivation:["坚持下去！🚀","相信自己！"],
    appreciation:["你很受欢迎！🌟","感谢你所做的一切！"],
    farewell:["祝你一切顺利！👋","再见，保重！"],
    encouragement:["你可以的！💪","保持坚强！"],
    love:["你让生活更美好！❤️","送上爱意！"],
    condolences:["致以最深切的哀悼。🕊️","在这段时间想着你。"],
    vacation:["享受你的假期！🌴","放松并尽情玩乐！"]
  },
  hi:{
    birthday:["जन्मदिन मुबारक! 🎉","आपका दिन खुशियों से भरा हो!"],
    anniversary:["शादी की सालगिरह मुबारक! 💕","आपके प्यार को और वर्षों तक बढ़ता रहे!"],
    "get-well":["जल्दी स्वस्थ हों! 🌻","आपकी जल्दी से ठीक होने की कामना करता हूँ!"],
    congrats:["बधाई! 🏆","शाबाश!"],
    "thank-you":["धन्यवाद! 🙏","बहुत धन्यवाद!"],
    "good-luck":["शुभकामनाएँ! 🍀","आपके प्रयास सफल हों!"],
    motivation:["आगे बढ़ते रहें! 🚀","खुद पर विश्वास करें!"],
    appreciation:["आपकी सराहना की जाती है! 🌟","आपके किए गए सभी कामों के लिए धन्यवाद!"],
    farewell:["आपको शुभकामनाएँ! 👋","अलविदा और ध्यान रखें!"],
    encouragement:["आप यह कर सकते हैं! 💪","मजबूत रहें!"],
    love:["आप जीवन को सुंदर बनाते हैं! ❤️","प्यार भेज रहा हूँ!"],
    condolences:["मेरी गहरी संवेदनाएँ। 🕊️","इस समय में आपके बारे में सोच रहा हूँ।"],
    vacation:["आपकी अवकाश का आनंद लें! 🌴","आराम करें और मज़े करें!"]
  },
  af:{
    birthday:["Gelukkige verjaarsdag! 🎉","Ek hoop jy het ’n fantastiese dag!"],
    anniversary:["Gelukkige herdenking! 💕","Vier julle liefde!"],
    "get-well":["Word gou beter! 🌻","Ek wens jou vinnige herstel toe!"],
    congrats:["Baie geluk! 🏆","Goed gedoen!"],
    "thank-you":["Dankie! 🙏","Baie waardeer!"],
    "good-luck":["Sterkte! 🍀","Ek wens jou sukses!"],
    motivation:["Hou aan! 🚀","Glo in jouself!"],
    appreciation:["Jy word waardeer! 🌟","Dankie vir alles!"],
    farewell:["Alles van die beste! 👋","Totsiens en sorg goed!"],
    encouragement:["Jy kan dit doen! 💪","Bly sterk!"],
    love:["Jy maak die lewe mooi! ❤️","Stuur liefde!"],
    condolences:["Innige meegevoel. 🕊️","Dink aan jou in hierdie tyd."],
    vacation:["Geniet jou vakansie! 🌴","Ontspan en geniet!"]
  }
};

// Get selected language and occasion
function displayMessage(){
  const lang = $('language').value || 'en';
  const occ = $('occasion').value;
  if(!occ){ $('message').textContent=''; $('customMessage').value=''; return; }
  const msgs = messages[lang][occ];
  const msg = msgs[Math.floor(Math.random()*msgs.length)];
  $('message').textContent = msg;
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let full = msg;
  if(r) full = `Hi ${r},\n\n${full}`;
  if(s) full = `${full}\n\nRegards\n${s}`;
  $('customMessage').value = full + `\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
}

// Event listeners
$('language').addEventListener('change', displayMessage);
$('occasion').addEventListener('change', displayMessage);
$('recipientName').addEventListener('input', displayMessage);
$('senderName').addEventListener('input', displayMessage);

// COPY
function copyMessage(){
  const text=$('customMessage').value;
  if(!text) return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}
