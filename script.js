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
  $('language').addEventListener('change', displayMessage);
  $('nextMessage').addEventListener('click', nextMessage);
  $('clearMessage').addEventListener('click', clearMessage);
  $('emojiButton').addEventListener('click', insertEmoji);
});

// Sample multilingual messages (2 per occasion)
const messages = {
  en:{ birthday:["Happy Birthday! 🎉","Wishing you a joyful day!"], anniversary:["Happy Anniversary! 💕","Celebrating your love!"], "get-well":["Get well soon! 🌻","Wishing you speedy recovery!"], congrats:["Congratulations! 🏆","Well done!"], "thank-you":["Thank you! 🙏","Much appreciated!"], "good-luck":["Good luck! 🍀","Wishing you success!"], motivation:["Keep going! 🚀","Believe in yourself!"], appreciation:["You are appreciated! 🌟","Thanks for everything!"], farewell:["Wishing you the best! 👋","Goodbye and take care!"], encouragement:["You got this! 💪","Stay strong!"], love:["You make life beautiful! ❤️","Sending love!"], condolences:["My deepest condolences. 🕊️","Thinking of you in this time."], vacation:["Enjoy your vacation! 🌴","Relax and have fun!"] },
  es:{ birthday:["¡Feliz cumpleaños! 🎉","¡Que tengas un día lleno de alegría!"], anniversary:["¡Feliz aniversario! 💕","¡Celebrando su amor!"], "get-well":["¡Recupérate pronto! 🌻","¡Deseándote una pronta recuperación!"], congrats:["¡Felicidades! 🏆","¡Bien hecho!"], "thank-you":["¡Gracias! 🙏","¡Muy agradecido!"], "good-luck":["¡Buena suerte! 🍀","¡Te deseo éxito!"], motivation:["¡Sigue adelante! 🚀","¡Cree en ti mismo!"], appreciation:["¡Eres apreciado! 🌟","¡Gracias por todo!"], farewell:["¡Te deseo lo mejor! 👋","¡Adiós y cuídate!"], encouragement:["¡Tú puedes! 💪","¡Mantente fuerte!"], love:["¡Haces la vida hermosa! ❤️","¡Enviando amor!"], condolences:["Mis más profundas condolencias. 🕊️","Pensando en ti en este momento."], vacation:["¡Disfruta tus vacaciones! 🌴","¡Relájate y diviértete!"] },
  zh:{ birthday:["生日快乐！🎉","祝你有一个充满欢乐的一天！"], anniversary:["周年快乐！💕","庆祝你们的爱情！"], "get-well":["早日康复！🌻","祝你快速恢复！"], congrats:["恭喜！🏆","干得好！"], "thank-you":["谢谢你！🙏","非常感激！"], "good-luck":["祝你好运！🍀","愿你成功！"], motivation:["继续努力！🚀","相信自己！"], appreciation:["你很受人欢迎！🌟","谢谢你的一切！"], farewell:["祝你一切顺利！👋","再见并保重！"], encouragement:["你可以的！💪","保持坚强！"], love:["你让生活更美好！❤️","送上爱意！"], condolences:["深表哀悼 🕊️","此时此刻思念你。"], vacation:["享受你的假期！🌴","放松并玩得开心！"] },
  hi:{ birthday:["जन्मदिन मुबारक! 🎉","आपका दिन खुशियों भरा हो!"], anniversary:["शुभ सालगिरह! 💕","आपके प्यार का जश्न!"], "get-well":["जल्दी ठीक हो जाओ! 🌻","आपकी शीघ्र स्वास्थ्य लाभ की कामना!"], congrats:["बधाई हो! 🏆","शाबाश!"], "thank-you":["धन्यवाद! 🙏","बहुत आभारी!"], "good-luck":["शुभकामनाएँ! 🍀","आपको सफलता मिले!"], motivation:["आगे बढ़ते रहो! 🚀","खुद पर विश्वास करो!"], appreciation:["आपकी सराहना की जाती है! 🌟","सब कुछ के लिए धन्यवाद!"], farewell:["आपको शुभकामनाएँ! 👋","अलविदा और ध्यान रखें!"], encouragement:["आप कर सकते हैं! 💪","मजबूत रहें!"], love:["आप जीवन को सुंदर बनाते हैं! ❤️","प्यार भेज रहे हैं!"], condolences:["गहरी संवेदनाएँ 🕊️","इस समय आपके बारे में सोच रहा हूँ।"], vacation:["अपनी छुट्टियों का आनंद लें! 🌴","आराम करें और मज़े करें!"] },
  af:{ birthday:["Gelukkige verjaarsdag! 🎉","Mag jou dag vol vreugde wees!"], anniversary:["Gelukkige herdenking! 💕","Vier julle liefde!"], "get-well":["Word gou beter! 🌻","Ek wens jou spoedige herstel!"], congrats:["Baie geluk! 🏆","Goed gedoen!"], "thank-you":["Dankie! 🙏","Baie waardeer!"], "good-luck":["Sterkte! 🍀","Ek wens jou sukses!"], motivation:["Hou aan! 🚀","Glo in jouself!"], appreciation:["Jy word waardeer! 🌟","Dankie vir alles!"], farewell:["Ek wens jou die beste! 👋","Totsiens en sorg vir jouself!"], encouragement:["Jy kan dit! 💪","Bly sterk!"], love:["Jy maak die lewe mooi! ❤️","Stuur liefde!"], condolences:["My innige meegevoel 🕊️","Dink aan jou in hierdie tyd."], vacation:["Geniet jou vakansie! 🌴","Ontspan en geniet!"] }
};

let currentIndex = 0;

function displayMessage(){
  const occ = $('occasion').value;
  const lang = $('language').value;
  if(!occ || !messages[lang][occ]) {
    $('customMessage').value = '';
    return;
  }
  currentIndex = 0;
  const msg = messages[lang][occ][currentIndex];
  updateTextarea(msg);
}

function updateTextarea(baseMsg){
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let full = '';
  if(r) full += `Hi ${r},\n\n`;
  full += baseMsg + '\n\n';
  if(s) full += `Regards\n${s}\n\n`;
  full += `Generated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
  $('customMessage').value = full;
}

function nextMessage(){
  const occ = $('occasion').value;
  const lang = $('language').value;
  if(!occ || !messages[lang][occ]) return;
  currentIndex = (currentIndex + 1) % messages[lang][occ].length;
  updateTextarea(messages[lang][occ][currentIndex]);
}

function clearMessage(){
  $('customMessage').value = '';
}

function copyMessage(){
  const text = $('customMessage').value.trim();
  if(!text) return alert('No message!');
  navigator
