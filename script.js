// Helper
function $(id){return document.getElementById(id);}
let selectedRating = 0;

// Messages object with full translations
const messages = {
  en: {
    birthday: [
      "Happy Birthday! 🎉", "Wishing you a fantastic day filled with joy!", "Celebrate your special day to the fullest!", 
      "May your year ahead be amazing!", "Cheers to another wonderful year!", "Hope all your wishes come true!", 
      "Have a wonderful birthday celebration!", "Enjoy every moment of your special day!", "Wishing you love and happiness!", 
      "Make this birthday unforgettable!"
    ],
    anniversary: [
      "Happy Anniversary! 💕", "May your love continue to grow!", "Wishing you many more years together!", 
      "Cheers to your lasting love!", "Celebrate this special milestone!", "May your bond strengthen every year!", 
      "Happy Anniversary to a beautiful couple!", "Love and happiness to you both!", "Here's to endless memories together!", 
      "Wishing you joy and laughter always!"
    ],
    // Add other 11 occasions similarly with 10 messages each
    condolences: [
      "Sending heartfelt condolences in this time of loss. 🕊️", 
      "Our thoughts are with you and your family.", 
      "Wishing you comfort and peace during this difficult time.", 
      "May memories bring you solace.", 
      "Our hearts go out to you.", 
      "Thinking of you in these hard times.", 
      "Wishing you strength and healing.", 
      "May you find peace and support.", 
      "Holding you close in thoughts and prayers.", 
      "Sending love and sympathy to you."
    ],
    // ... repeat for motivation, good-luck, appreciation, farewell, encouragement, love, get-well, thank-you, vacation, congrats
  },
  es: {
    birthday: [
      "¡Feliz cumpleaños! 🎉", "¡Te deseo un día fantástico lleno de alegría!", "¡Celebra tu día especial al máximo!", 
      "¡Que tu año venidero sea increíble!", "¡Salud por otro año maravilloso!", "¡Que todos tus deseos se hagan realidad!", 
      "¡Que tengas una maravillosa celebración de cumpleaños!", "¡Disfruta cada momento de tu día especial!", "¡Te deseo amor y felicidad!", 
      "¡Haz que este cumpleaños sea inolvidable!"
    ],
    anniversary: [
      "¡Feliz aniversario! 💕", "¡Que su amor siga creciendo!", "¡Te deseamos muchos más años juntos!", 
      "¡Salud por su amor duradero!", "¡Celebren este hito especial!", "¡Que su vínculo se fortalezca cada año!", 
      "¡Feliz aniversario a una pareja hermosa!", "¡Amor y felicidad para ambos!", "¡Por infinitos recuerdos juntos!", 
      "¡Les deseamos alegría y risas siempre!"
    ],
    condolences: [
      "Enviando condolencias en este tiempo de pérdida. 🕊️", 
      "Nuestros pensamientos están contigo y tu familia.", 
      "Deseándote consuelo y paz en este momento difícil.", 
      "Que los recuerdos te brinden consuelo.", 
      "Nuestros corazones están contigo.", 
      "Pensando en ti en estos momentos difíciles.", 
      "Deseándote fuerza y sanación.", 
      "Que encuentres paz y apoyo.", 
      "Te tenemos presente en pensamientos y oraciones.", 
      "Enviándote amor y simpatía."
    ],
    // ... repeat other occasions
  },
  zh: {
    birthday: [
      "生日快乐! 🎉", "祝你有一个充满欢乐的美好一天!", "尽情庆祝你的特别日子!", 
      "愿你未来的一年精彩纷呈!", "为另一个美好的一年干杯!", "希望你的所有愿望成真!", 
      "祝你有一个美好的生日庆祝!", "享受你特别日子的每一刻!", "祝你爱与幸福!", 
      "让这个生日难忘!"
    ],
    anniversary: [
      "周年快乐! 💕", "愿你们的爱日益增长!", "祝你们共度更多美好时光!", 
      "为你们长久的爱干杯!", "庆祝这个特别的里程碑!", "愿你们的感情每年都更加深厚!", 
      "祝一对美丽的情侣周年快乐!", "祝你们爱与幸福!", "愿你们共度无尽美好回忆!", 
      "祝你们永远快乐与欢笑!"
    ],
    condolences: [
      "在此送上诚挚的慰问 🕊️", "我们与你和你的家人同在。", "在这艰难时刻，祝你平安与安慰。", 
      "愿回忆带给你安慰。", "我们的心与你同在。", "在这些困难时期想着你。", 
      "祝你坚强与疗愈。", "愿你找到平静和支持。", "在思念与祈祷中与你同在。", 
      "送上爱与慰问。"
    ],
    // ... repeat other occasions
  },
  hi: {
    birthday: [
      "जन्मदिन मुबारक हो! 🎉", "आपका दिन खुशियों से भरा हो!", "अपने खास दिन का पूरा आनंद लें!", 
      "आने वाला साल आपके लिए शानदार हो!", "एक और शानदार साल के लिए चीयर्स!", "आपकी सभी इच्छाएँ पूरी हों!", 
      "आपकी शानदार जन्मदिन समारोह की शुभकामनाएँ!", "अपने खास दिन के हर पल का आनंद लें!", "आपको प्यार और खुशी मिले!", 
      "इस जन्मदिन को अविस्मरणीय बनाएं!"
    ],
    anniversary: [
      "विवाह वर्षगांठ की शुभकामनाएँ! 💕", "आपका प्यार हर साल बढ़ता रहे!", "आपको और कई वर्षों की खुशियाँ मिलें!", 
      "आपके लंबे प्यार के लिए चीयर्स!", "इस खास मौके को मनाएं!", "आपका बंधन हर साल मजबूत हो!", 
      "एक सुंदर जोड़े को वर्षगांठ की शुभकामनाएँ!", "आप दोनों को प्यार और खुशी मिले!", "अनंत यादों के लिए चीयर्स!", 
      "हमेशा खुशियाँ और हंसी बनी रहे!"
    ],
    condolences: [
      "इस कठिन समय में हार्दिक संवेदनाएँ 🕊️", "हम आपके और आपके परिवार के साथ हैं।", "इस कठिन समय में आपको शांति और आराम मिले।", 
      "यादें आपको सांत्वना दें।", "हमारा दिल आपके साथ है।", "इन कठिन समयों में आपके बारे में सोच रहे हैं।", 
      "आपको शक्ति और हीलिंग मिले।", "आप शांति और समर्थन पाएं।", "सोच और प्रार्थनाओं में आपके साथ हैं।", 
      "आपको प्यार और सहानुभूति भेज रहे हैं।"
    ],
    // ... repeat other occasions
  },
  af: {
    birthday: [
      "Gelukkige verjaarsdag! 🎉", "Mag jou dag gevul wees met vreugde!", "Vier jou spesiale dag ten volle!", 
      "Mag die jaar wat kom wonderlik wees!", "Gesondheid op nog 'n wonderlike jaar!", "Mag al jou wense waar word!", 
      "Geniet 'n wonderlike verjaarsdagviering!", "Geniet elke oomblik van jou spesiale dag!", "Ek wens jou liefde en geluk toe!", 
      "Maak hierdie verjaarsdag onvergeetlik!"
    ],
    anniversary: [
      "Gelukkige herdenking! 💕", "Mag julle liefde met elke jaar groei!", "Wens julle nog baie jare saam!", 
      "Gesondheid op julle lang liefde!", "Vier hierdie spesiale mylpaal!", "Mag julle band elke jaar sterker word!", 
      "Gelukkige herdenking aan 'n pragtige paartjie!", "Liefde en geluk aan julle beide!", "Op eindelose herinneringe saam!", 
      "Wens julle altyd vreugde en lag toe!"
    ],
    condolences: [
      "Stuur innige meegevoel in hierdie tyd van verlies 🕊️", "Ons dink aan jou en jou familie.", "Mag jy troos en vrede vind in hierdie moeilike tyd.", 
      "Mag herinneringe vir jou troos bring.", "Ons harte is by jou.", "Dink aan jou in hierdie moeilike tye.", 
      "Wens jou krag en genesing toe.", "Mag jy vrede en ondersteuning vind.", "Hou jou naby in gedagtes en gebede.", 
      "Stuur liefde en simpatie aan jou."
    ],
    // ... repeat other occasions
  }
};

// THEME TOGGLE
function setThemeIcon() {
  const p = $('themeIconPath');
  const isDark = document.body.dataset.theme === 'dark';
  p.setAttribute('d', isDark
    ? 'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z'
    : 'M12 2a10 10 0 100 20 10 10 0 000-20z'
  );
}
function toggleTheme() {
  const body = document.body;
  const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = newTheme;
  localStorage.setItem('theme', newTheme);
  setThemeIcon();
}

// Display message in textarea
function displayMessage() {
  const occ = $('occasion').value;
  const lang = $('language').value;
  if (!occ) {
    $('message').textContent = '';
    $('customMessage').value = '';
    return;
  }
  const occMessages = messages[lang][occ];
  if (!occMessages || occMessages.length === 0) {
    $('message').textContent = 'No messages available';
    $('customMessage').value = '';
    return;
  }
  const randomIndex = Math.floor(Math.random() * occMessages.length);
  const msg = occMessages[randomIndex];
  $('message').textContent = msg;
  $('customMessage').value = msg; // only message body, signature hidden
}

// Next Message
function nextMessage() {
  displayMessage();
}

// Add sender/recipient
function updateMessageWithName() {
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let msg = $('customMessage').value;
  if (!msg) return;
  let full = msg;
  if (r) full = `Hi ${r},\n\n${msg}`;
  if (s) full += `\n\nRegards\n${s}`;
  $('customMessage').value = full;
}

// Copy
function copyMessage() {
  const text = $('customMessage').value;
  if (!text) return alert('No message!');
  navigator.clipboard.writeText(text);
  alert('Copied!');
}

// Clear content
function clearContent() {
  $('customMessage').value = '';
  $('message').textContent = '';
}

// Emoji popup (generic or occasion-specific)
function openEmoji() {
  alert("Emoji popup here - can later implement relevant emojis per occasion.");
}

// INIT
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.dataset.theme = saved;
  setThemeIcon();
  $('themeToggle').addEventListener('click', toggleTheme);
  $('language').addEventListener('change', displayMessage);
  $('occasion').addEventListener('change', displayMessage);
});
