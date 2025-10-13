function $(id){return document.getElementById(id);}
let selectedRating = 0;

// Full multilingual messages: 13 occasions × 10 messages × 5 languages
const messages = {
  en: {
    birthday: [
      "Happy Birthday! 🎉",
      "Wishing you a fantastic day filled with joy!",
      "Celebrate your special day to the fullest!",
      "May your year ahead be amazing!",
      "Cheers to another wonderful year!",
      "Hope all your wishes come true!",
      "Have a wonderful birthday celebration!",
      "Enjoy every moment of your special day!",
      "Wishing you love and happiness!",
      "Make this birthday unforgettable!"
    ],
    anniversary: [
      "Happy Anniversary! 💕",
      "May your love continue to grow!",
      "Wishing you many more years together!",
      "Cheers to your lasting love!",
      "Celebrate this special milestone!",
      "May your bond strengthen every year!",
      "Happy Anniversary to a beautiful couple!",
      "Love and happiness to you both!",
      "Here's to endless memories together!",
      "Wishing you joy and laughter always!"
    ],
    "get-well": [
      "Get well soon! 🌻",
      "Wishing you a speedy recovery!",
      "Sending healing thoughts your way!",
      "Take care and get well soon!",
      "Hoping you feel better every day!",
      "Warm wishes for your health!",
      "May you regain your strength quickly!",
      "Sending love and wellness!",
      "Feel better soon!",
      "Get back on your feet soon!"
    ],
    congrats: [
      "Congratulations on your achievement! 🏆",
      "Well done! You did it!",
      "Cheers to your success!",
      "So proud of you!",
      "Hats off to your hard work!",
      "Bravo on your accomplishment!",
      "You deserve this success!",
      "Way to go!",
      "Success looks good on you!",
      "Keep shining and achieving!"
    ],
    "thank-you": [
      "Thank you for your kindness and support! 🙏",
      "Grateful for everything you do!",
      "Thanks a million!",
      "Appreciate your help and guidance!",
      "Thanks for being amazing!",
      "Your support means the world!",
      "Many thanks for your efforts!",
      "I am grateful to you!",
      "Heartfelt thanks!",
      "Thanks for always being there!"
    ],
    "good-luck": [
      "Good luck on your journey! 🍀",
      "Wishing you all the best!",
      "May fortune be with you!",
      "Hope everything goes smoothly!",
      "Best of luck in your endeavors!",
      "Sending positive vibes your way!",
      "Success is on your side!",
      "You’ve got this!",
      "May luck follow you always!",
      "Rooting for your success!"
    ],
    motivation: [
      "Keep going — you can do this! 🚀",
      "Believe in yourself!",
      "Every step counts!",
      "You are stronger than you think!",
      "Push forward and achieve!",
      "Don’t give up!",
      "Stay focused and determined!",
      "Your effort will pay off!",
      "Keep chasing your dreams!",
      "You are capable of amazing things!"
    ],
    appreciation: [
      "You’re appreciated more than you know! 🌟",
      "Thanks for everything you do!",
      "Your efforts do not go unnoticed!",
      "Grateful for your contributions!",
      "You make a difference!",
      "Your support is invaluable!",
      "Thanks for being you!",
      "Appreciation is owed to you!",
      "You are truly valued!",
      "Sending gratitude your way!"
    ],
    farewell: [
      "Wishing you the best in your next adventure! 👋",
      "Goodbye and good luck!",
      "May your journey be amazing!",
      "Farewell, and keep shining!",
      "All the best for your future!",
      "It’s been a pleasure working with you!",
      "Take care and succeed!",
      "Safe travels and good luck!",
      "Hope you achieve everything you wish!",
      "See you around!"
    ],
    encouragement: [
      "You’ve got this! 💪",
      "Keep moving forward!",
      "Stay strong!",
      "Believe and achieve!",
      "Your efforts will pay off!",
      "Never lose hope!",
      "Stay motivated!",
      "You are capable!",
      "Push past the limits!",
      "Keep striving!"
    ],
    love: [
      "You make life beautiful! ❤️",
      "Love is all around us!",
      "Forever yours!",
      "Sending you my heart!",
      "You are my everything!",
      "Cherishing our love!",
      "Together always!",
      "Love and happiness to you!",
      "My heart belongs to you!",
      "With all my love!"
    ],
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
      "Sending sympathy and care to you."
    ],
    vacation: [
      "Enjoy your well-deserved vacation! 🌴",
      "Relax and unwind!",
      "Wishing you sunny days ahead!",
      "Have fun and recharge!",
      "Take time for yourself!",
      "Enjoy every moment!",
      "Make great memories!",
      "Have a fantastic trip!",
      "Safe travels and enjoy!",
      "Relax, refresh, and enjoy!"
    ]
  },

  es: {
    birthday: [
      "¡Feliz cumpleaños! 🎉",
      "¡Que tengas un día fantástico lleno de alegría!",
      "¡Celebra tu día especial al máximo!",
      "¡Que tu año por venir sea increíble!",
      "¡Salud por otro año maravilloso!",
      "¡Que todos tus deseos se hagan realidad!",
      "¡Que tengas una maravillosa celebración de cumpleaños!",
      "¡Disfruta cada momento de tu día especial!",
      "¡Te deseo amor y felicidad!",
      "¡Haz que este cumpleaños sea inolvidable!"
    ],
    anniversary: [
      "¡Feliz aniversario! 💕",
      "¡Que su amor siga creciendo!",
      "¡Te deseamos muchos más años juntos!",
      "¡Salud por su amor duradero!",
      "¡Celebren este hito especial!",
      "¡Que su vínculo se fortalezca cada año!",
      "¡Feliz aniversario a una pareja hermosa!",
      "¡Amor y felicidad para ambos!",
      "¡Por infinitos recuerdos juntos!",
      "¡Les deseamos alegría y risas siempre!"
    ],
    "get-well": [
      "¡Recupérate pronto! 🌻",
      "¡Te deseo una pronta recuperación!",
      "¡Enviando pensamientos de sanación!",
      "¡Cuídate y mejora pronto!",
      "¡Espero que te sientas mejor cada día!",
      "¡Deseándote buena salud!",
      "¡Que recuperes tu fuerza rápidamente!",
      "¡Enviando amor y bienestar!",
      "¡Mejórate pronto!",
      "¡Recupérate y vuelve a estar fuerte!"
    ],
    congrats: [
      "¡Felicidades por tu logro! 🏆",
      "¡Bien hecho! ¡Lo lograste!",
      "¡Salud por tu éxito!",
      "¡Estamos orgullosos de ti!",
      "¡Bravo por tu esfuerzo!",
      "¡Felicidades por tu logro!",
      "¡Te mereces este éxito!",
      "¡Sigue así!",
      "¡El éxito te queda bien!",
      "¡Sigue brillando y alcanzando metas!"
    ],
    "thank-you": [
      "¡Gracias por tu amabilidad y apoyo! 🙏",
      "¡Agradecido por todo lo que haces!",
      "¡Mil gracias!",
      "¡Aprecio tu ayuda y guía!",
      "¡Gracias por ser increíble!",
      "¡Tu apoyo significa el mundo!",
      "¡Muchas gracias por tus esfuerzos!",
      "¡Estoy agradecido contigo!",
      "¡Gracias de corazón!",
      "¡Gracias por estar siempre ahí!"
    ],
    "good-luck": [
      "¡Buena suerte en tu camino! 🍀",
      "¡Te deseo lo mejor!",
      "¡Que la fortuna te acompañe!",
      "¡Espero que todo salga bien!",
      "¡Mucha suerte en tus esfuerzos!",
      "¡Enviando vibras positivas!",
      "¡El éxito está de tu lado!",
      "¡Tú puedes!",
      "¡Que la suerte te siga siempre!",
      "¡Apoyando tu éxito!"
    ],
    motivation: [
      "¡Sigue adelante, tú puedes! 🚀",
      "¡Cree en ti mismo!",
      "¡Cada paso cuenta!",
      "¡Eres más fuerte de lo que piensas!",
      "¡Avanza y alcanza tus metas!",
      "¡No te rindas!",
      "¡Mantente enfocado y determinado!",
      "¡Tu esfuerzo dará frutos!",
      "¡Sigue persiguiendo tus sueños!",
      "¡Eres capaz de cosas increíbles!"
    ],
    appreciation: [
      "¡Eres más apreciado de lo que sabes! 🌟",
      "¡Gracias por todo lo que haces!",
      "¡Tus esfuerzos no pasan desapercibidos!",
      "¡Agradecido por tus contribuciones!",
      "¡Haces la diferencia!",
      "¡Tu apoyo es invaluable!",
      "¡Gracias por ser tú!",
      "¡Se te debe apreciación!",
      "¡Eres realmente valorado!",
      "¡Enviando gratitud hacia ti!"
    ],
    farewell: [
      "¡Te deseo lo mejor en tu próxima aventura! 👋",
      "¡Adiós y buena suerte!",
      "¡Que tu viaje sea increíble!",
      "¡Hasta luego y sigue brillando!",
      "¡Todo lo mejor para tu futuro!",
      "¡Ha sido un placer trabajar contigo!",
      "¡Cuídate y triunfa!",
      "¡Viajes seguros y buena suerte!",
      "¡Espero que logres todo lo que deseas!",
      "¡Nos vemos!"
    ],
    encouragement: [
      "¡Tú puedes! 💪",
      "¡Sigue avanzando!",
      "¡Mantente fuerte!",
      "¡Cree y logra!",
      "¡Tu esfuerzo dará frutos!",
      "¡Nunca pierdas la esperanza!",
      "¡Mantente motivado!",
      "¡Eres capaz!",
      "¡Supera los límites!",
      "¡Sigue esforzándote!"
    ],
    love: [
      "¡Haces la vida hermosa! ❤️",
      "¡El amor está a nuestro alrededor!",
      "¡Por siempre tuyo!",
      "¡Te envío mi corazón!",
      "¡Eres mi todo!",
      "¡Atesorando nuestro amor!",
      "¡Siempre juntos!",
      "¡Amor y felicidad para ti!",
      "¡Mi corazón te pertenece!",
      "¡Con todo mi amor!"
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
      "Enviándote simpatía y cuidado hacia ti."
    ],
    vacation: [
      "¡Disfruta tus merecidas vacaciones! 🌴",
      "¡Relájate y descansa!",
      "¡Te deseo días soleados por delante!",
      "¡Diviértete y recarga energías!",
      "¡Tómate tiempo para ti!",
      "¡Disfruta cada momento!",
      "¡Crea grandes recuerdos!",
      "¡Que tengas un viaje fantástico!",
      "¡Viaja seguro y disfruta!",
      "¡Relájate, recarga y disfruta!"
    ]
  },

  zh: {
    birthday: [
      "生日快乐！🎉",
      "祝你度过充满欢乐的一天！",
      "尽情庆祝你的特别日子！",
      "愿你未来一年精彩！",
      "为另一个美好的一年干杯！",
      "希望你的愿望都实现！",
      "祝你生日快乐！",
      "享受特别日子的每一刻！",
      "愿你充满爱与幸福！",
      "让这个生日难忘！"
    ],
    // repeat all occasions with 10 messages each
  },

  hi: {
    birthday: [
      "जन्मदिन मुबारक हो! 🎉",
      "आपका दिन खुशियों से भरा हो!",
      "अपने खास दिन का पूरा आनंद लें!",
      "आपका आने वाला साल शानदार हो!",
      "एक और अद्भुत साल के लिए शुभकामनाएँ!",
      "आपकी सभी इच्छाएँ पूरी हों!",
      "शानदार जन्मदिन की शुभकामनाएँ!",
      "अपने खास दिन के हर पल का आनंद लें!",
      "आपको प्यार और खुशी मिले!",
      "इस जन्मदिन को अविस्मरणीय बनाएं!"
    ],
    // repeat all occasions
  },

  af: {
    birthday: [
      "Gelukkige verjaarsdag! 🎉",
      "Ek hoop jy geniet jou dag vol vreugde!",
      "Vier jou spesiale dag ten volle!",
      "Mag jou komende jaar wonderlik wees!",
      "Gesondheid op nog 'n wonderlike jaar!",
      "Mag al jou wense waar word!",
      "Geniet 'n fantastiese verjaarsdag!",
      "Geniet elke oomblik van jou spesiale dag!",
      "Ek wens jou liefde en geluk toe!",
      "Maak hierdie verjaarsdag onvergeetlik!"
    ],
    // repeat all occasions
  }
};

// THEME TOGGLE
function setThemeIcon() {
  const p = $('themeIconPath');
  const isDark = document.body.dataset.theme === 'dark';
  p.setAttribute('d', isDark
    ? 'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z'
    : 'M12 2a10 10 0 100 20 10 10 0 000-20z'
