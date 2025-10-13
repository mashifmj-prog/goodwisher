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
});

// Multilingual messages (2 per occasion)
const messages = {
  en:{ birthday:["Happy Birthday! 🎉","Wishing you a joyful day!"], anniversary:["Happy Anniversary! 💕","Celebrating your love!"], "get-well":["Get well soon! 🌻","Wishing you speedy recovery!"], congrats:["Congratulations! 🏆","Well done!"], "thank-you":["Thank you! 🙏","Much appreciated!"], "good-luck":["Good luck! 🍀","Wishing you success!"], motivation:["Keep going! 🚀","Believe in yourself!"], appreciation:["You are appreciated! 🌟","Thanks for everything!"], farewell:["Wishing you the best! 👋","Goodbye and take care!"], encouragement:["You got this! 💪","Stay strong!"], love:["You make life beautiful! ❤️","Sending love!"], condolences:["My deepest condolences. 🕊️","Thinking of you in this time."], vacation:["Enjoy your vacation! 🌴","Relax and have fun!"] },
  es:{ birthday:["¡Feliz cumpleaños! 🎉","¡Que tengas un día lleno de alegría!"], anniversary:["¡Feliz aniversario! 💕","¡Celebrando su amor!"], "get-well":["¡Recupérate pronto! 🌻","¡Deseándote una pronta recuperación!"], congrats:["¡Felicidades! 🏆","¡Bien hecho!"], "thank-you":["¡Gracias! 🙏","¡Muy agradecido!"], "good-luck":["¡Buena suerte! 🍀","¡Te deseo éxito!"], motivation:["¡Sigue adelante! 🚀","¡Cree en ti mismo!"], appreciation:["¡Eres apreciado! 🌟","¡Gracias por todo!"], farewell:["¡Te deseo lo mejor! 👋","¡Adiós y cuídate!"], encouragement:["¡Tú puedes! 💪","¡Mantente fuerte!"], love:["¡Haces la vida hermosa! ❤️","¡Enviando amor!"], condolences:["Mis más profundas condolencias. 🕊️","Pensando en ti en este momento."], vacation:["¡Disfruta tus vacaciones! 🌴","¡Relájate y diviértete!"] },
  zh:{ birthday:["生日快乐！🎉","祝你有一个充满欢乐
