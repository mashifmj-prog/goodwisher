function $(id){return document.getElementById(id);}
let currentBaseMessage='', selectedRating=0, emojiPickerInitialized=false, confettiLoaded=false;

/* ---------- Theme ---------- */
function setThemeIcon(){
  const path=$('themeIconPath');
  if(!path) return;
  const isDark=document.body.dataset.theme==='dark';
  path.setAttribute('d',isDark?'M12 4.5a1 1 0 010-2 1 1 0 010 2z':'M12 2a10 10 0 100 20 10 10 0 000-20z');
}
function toggleTheme(){
  const b=document.body;
  b.dataset.theme=b.dataset.theme==='dark'?'light':'dark';
  localStorage.setItem('theme',b.dataset.theme);
  setThemeIcon();
}

/* ---------- Messages ---------- */
const messages={
 en:{birthday:['Wishing you a fantastic birthday filled with joy! 🎉','Happy birthday! May your day be full of laughter and love! 🎂'],
     anniversary:['Happy anniversary! Wishing you love and joy! 💕'],
     'get-well':['Get well soon! Sending healing thoughts. 🌻'],
     congrats:['Big congrats on your amazing achievement! 🏆'],
     'thank-you':['Thank you for your amazing support and kindness! 🙏'],
     'good-luck':['Wishing you the best of luck in your next adventure! 🍀'],
     motivation:['Keep shining — you’ve got this! 🚀'],
     appreciation:['Your efforts are truly appreciated! 🌟'],
     farewell:['Wishing you all the best in your new journey! 👋'],
     encouragement:['You’re stronger than you know — keep going! 💪'],
     love:['You make every moment special with your love! ❤️'],
     condolences:['Sending heartfelt condolences in this time of loss. 🕊️'],
     vacation:['Have a fantastic vacation filled with joy! 🌴']},
 zh:{birthday:['祝你生日快乐，幸福美满！🎉','生日快乐！愿你笑口常开！🎂'],
     anniversary:['结婚纪念日快乐！愿你们永远幸福！💕'],
     'get-well':['早日康复，健康快乐！🌻'],
     congrats:['恭喜你取得巨大成就！🏆'],
     'thank-you':['感谢你的支持与善意！🙏'],
     'good-luck':['祝你好运连连！🍀'],
     motivation:['加油，你一定行的！🚀'],
     appreciation:['非常感谢你的努力与贡献！🌟'],
     farewell:['祝你前程似锦，再见！👋'],
     encouragement:['别放弃，你比自己想象的更强！💪'],
     love:['你让生活充满爱与美好！❤️'],
     condolences:['在这艰难时刻，致以诚挚慰问。🕊️'],
     vacation:['假期愉快，好好休息！🌴']},
 hi:{birthday:['जन्मदिन मुबारक हो! खुश रहो और मुस्कुराते रहो! 🎉','आपका दिन हँसी और प्यार से भरा रहे! 🎂'],
     anniversary:['सालगिरह की हार्दिक शुभकामनाएँ! 💕'],
     'get-well':['जल्दी स्वस्थ हो जाओ! 🌻'],
     congrats:['बधाई हो! आपने शानदार काम किया है! 🏆'],
     'thank-you':['आपके सहयोग के लिए धन्यवाद! 🙏'],
     'good-luck':['आपको ढेर सारी शुभकामनाएँ! 🍀'],
     motivation:['आगे बढ़ते रहो, तुम कर सकते हो! 🚀'],
     appreciation:['आपके प्रयास सराहनीय हैं! 🌟'],
     farewell:['आपके नए सफर के लिए शुभकामनाएँ! 👋'],
     encouragement:['हार मत मानो, तुम मजबूत हो! 💪'],
     love:['तुम मेरे जीवन को खास बनाते हो! ❤️'],
     condolences:['इस कठिन समय में संवेदनाएँ। 🕊️'],
     vacation:['छुट्टियाँ मुबारक! आनंद लो! 🌴']},
 es:{birthday:['¡Feliz cumpleaños! Que tu día esté lleno de alegría! 🎉','¡Que tengas un cumpleaños maravilloso! 🎂'],
     anniversary:['¡Feliz aniversario! ¡Mucho amor y felicidad! 💕'],
     'get-well':['¡Recupérate pronto! 🌻'],
     congrats:['¡Felicitaciones por tu gran logro! 🏆'],
     'thank-you':['¡Gracias por tu apoyo y amabilidad! 🙏'],
     'good-luck':['¡Buena suerte en tu nueva aventura! 🍀'],
     motivation:['¡Sigue adelante, tú puedes! 🚀'],
     appreciation:['¡Tus esfuerzos son apreciados! 🌟'],
     farewell:['¡Te deseamos lo mejor! 👋'],
     encouragement:['¡Eres más fuerte de lo que crees! 💪'],
     love:['¡Tu amor hace todo especial! ❤️'],
     condolences:['Mis condolencias sinceras. 🕊️'],
     vacation:['¡Disfruta tus vacaciones! 🌴']},
 af:{birthday:['Baie geluk met jou verjaarsdag! 🎉','Mag jou dag vol liefde en lag wees! 🎂'],
     anniversary:['Gelukkige herdenking! 💕'],
     'get-well':['Word gou gesond! 🌻'],
     congrats:['Baie geluk met jou prestasie! 🏆'],
     'thank-you':['Dankie vir jou ondersteuning en goedhartigheid! 🙏'],
     'good-luck':['Sterkte met jou nuwe avontuur! 🍀'],
     motivation:['Hou aan glo, jy kan dit doen! 🚀'],
     appreciation:['Ons waardeer jou harde werk! 🌟'],
     farewell:['Beste wense vir jou pad vorentoe! 👋'],
     encouragement:['Jy is sterker as wat jy dink! 💪'],
     love:['Jy maak elke oomblik spesiaal! ❤️'],
     condolences:['Innige meegevoel in hierdie tyd van verlies. 🕊️'],
     vacation:['Geniet jou vakansie! 🌴']}
};

/* Greetings (optional, just for personalization) */
const greetings={
 en:'Hi',
 zh:'你好',
 hi:'नमस्ते',
 es:'Hola',
 af:'Hallo'
};

function displayMessage(){
  const occasion=$('occasion').value, lang=$('language').value||'en', msg=$('message');
  const list=(messages[lang]&&messages[lang][occasion])||(messages.en[occasion]||['']);
  currentBaseMessage=list[Math.floor(Math.random()*list.length)];
  msg.textContent=currentBaseMessage;
  updateMessageWithName();
}

function updateMessageWithName(){
  const r=$('recipientName').value.trim(), s=$('senderName').value.trim(), l=$('language').value||'en';
  let text=currentBaseMessage||'';
  if(r){text=`${greetings[l]} ${r},\n\n${currentBaseMessage}`;}
  if(s){text=`${text}\n\nRegards,\n${s}`;}
  $('customMessage').value=text||currentBase
