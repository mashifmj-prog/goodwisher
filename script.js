/* GoodWisher - full rebuild (EN/ES/AF manual messages; HI/ZH fallback to EN) */

const $ = id => document.getElementById(id);

// --- Messages data (EN, ES, AF). HI and ZH fall back to EN.
const MESSAGES = {
  en: {
    birthday: [
      "Happy Birthday! 🎉 Wishing you a fantastic day filled with joy.",
      "May your birthday be full of love and laughter! 🥳",
      "Another year older, another year wiser — happy birthday! 🎂",
      "Wishing you a birthday as amazing as you are! 🎈",
      "Celebrate today and enjoy every moment! 🎁",
      "Cheers to your health and happiness! 🥂",
      "Sending birthday hugs and smiles your way! 😊",
      "May all your dreams come true this year! ✨",
      "Have a magical birthday full of smiles! 🪄",
      "Enjoy your special day to the fullest! 🎊"
    ],
    anniversary: [
      "Happy Anniversary! 💕 Wishing you many more years of love.",
      "Cheers to another year together — enjoy the celebration! 🥂",
      "Celebrating your love and commitment today! ❤️",
      "May your bond grow stronger with each passing year! 🌹",
      "Wishing you a joyful anniversary and many happy memories. 🎉",
      "Love and happiness always — congratulations! 💖",
      "Here's to love that lasts forever — happy anniversary! 🕊️",
      "May your anniversary be full of special memories! ✨",
      "Together is a wonderful place to be — happy anniversary. 👫",
      "Happy Anniversary to a beautiful couple — many blessings. 💑"
    ],
    "get-well": [
      "Sending healing thoughts and a little sunshine your way. 🌻",
      "Wishing you a speedy recovery — rest and take care.",
      "Sending strength and warm wishes for a quick recovery.",
      "Hope each new day brings you closer to a full recovery.",
      "Thinking of you and hoping you feel better every day.",
      "May you be back on your feet and smiling again soon.",
      "Sending gentle hugs and get-well wishes your way.",
      "Rest, recover, and remember you’re in our thoughts.",
      "Hoping you feel better with each passing day — take it easy.",
      "Warm wishes for your health and a fast recovery."
    ],
    congrats: [
      "Huge congratulations on your achievement — so well deserved!",
      "Well done! Your hard work truly paid off — congrats!",
      "Celebrating your success with pride — congratulations!",
      "Your dedication is inspiring — congratulations on this milestone.",
      "So proud of you — enjoy this success, you earned it!",
      "This is just the beginning — congrats and onward!",
      "Bravo! Your accomplishment deserves a big celebration.",
      "Sending congratulations and best wishes for what's next.",
      "Well-earned success — congratulations and enjoy the moment!",
      "Celebrating you and your bright success — congrats!"
    ],
    "thank-you": [
      "Thank you for your kindness and support — it means the world.",
      "Your help made a difference — thank you sincerely.",
      "Grateful for all you do — thank you so much.",
      "Thank you for being so thoughtful and generous.",
      "I truly appreciate your time and effort — many thanks.",
      "Thanks for going above and beyond — I’m very grateful.",
      "Your support was invaluable — thank you for everything.",
      "Thank you for your kindness — you brightened my day.",
      "Sincere thanks for your help and thoughtfulness.",
      "I appreciate you more than words can say — thank you."
    ],
    "good-luck": [
      "Wishing you the best of luck — you’ve got this! 🍀",
      "Good luck on your new journey — believe in yourself.",
      "Sending positive vibes and all the luck in the world.",
      "May luck and opportunity follow you everywhere — good luck!",
      "Best of luck — trust yourself and you’ll do great.",
      "Go get ’em! Wishing you success and good fortune.",
      "Rooting for you — best of luck with everything ahead.",
      "May fortune smile on you — good luck!",
      "You’re ready — sending luck and confidence your way.",
      "Best wishes and good luck — make it happen!"
    ],
    motivation: [
      "Keep going — small steps every day lead to big results. 🚀",
      "Believe in yourself — your potential is limitless.",
      "Stay strong, stay focused — greatness is within reach.",
      "Every effort counts — keep moving forward and don’t give up.",
      "You are capable of amazing things — trust the process.",
      "Take a breath, start again — progress is progress.",
      "Your dedication will pay off — keep pushing forward.",
      "Keep your head up and your heart brave — you’re doing great.",
      "One step at a time — your consistency will win the day.",
      "Stay motivated — your future self will thank you."
    ],
    appreciation: [
      "Just wanted to say how much I appreciate you — thank you.",
      "Your kindness doesn’t go unnoticed — you are appreciated.",
      "Thank you for everything you do — you make a difference.",
      "I truly appreciate your support and thoughtfulness.",
      "You bring so much value — thank you for being you.",
      "Grateful for your help and the way you show up.",
      "Your efforts mean a lot to me — thank you sincerely.",
      "Appreciation and respect for all that you do.",
      "Thank you for your reliability and warmth — you’re valued.",
      "I’m grateful for you — appreciate all you do."
    ],
    farewell: [
      "Wishing you all the best in your next chapter — farewell!",
      "It’s been a pleasure — best wishes on your new journey.",
      "Farewell! May your path ahead be full of success and joy.",
      "Goodbye and good luck — you’ll be missed.",
      "Thanks for everything — wishing you nothing but the best.",
      "Farewell — may your future be bright and fulfilling.",
      "Wishing you success and happiness in what’s next.",
      "Saying goodbye with gratitude and warm wishes for your future.",
      "You’ll be missed — go thrive and enjoy the next step.",
      "All the best on your new adventure — farewell!"
    ],
    encouragement: [
      "You’ve got this — I believe in you. Keep going! 💪",
      "When things get tough, remember how far you’ve come.",
      "Keep your head up — brighter days are coming.",
      "You are stronger than you think — keep moving forward.",
      "Believe in your abilities — you’ll overcome this challenge.",
      "Stand tall and keep trying — progress is on the way.",
      "You’re not alone — support and strength are with you.",
      "Have faith in yourself — good things are ahead.",
      "Stay resilient — this moment will pass and you’ll grow.",
      "Hold on to hope — you’re capable of great things."
    ],
    love: [
      "You light up my life — I love you with all my heart. ❤️",
      "Every day with you is a wonderful addition to my life.",
      "My love for you grows stronger every day.",
      "You are my favorite person — love you endlessly.",
      "Forever grateful for your love and presence in my life.",
      "Being with you makes every day better — I love you.",
      "Your smile is my sunshine — love you more each day.",
      "With all my heart, I cherish and love you always.",
      "You are my rock and my joy — I love you dearly.",
      "Holding you close in my heart — love you now and always."
    ],
    condolences: [
      "Sending heartfelt condolences to you and your family during this difficult time. 🕊️",
      "My deepest sympathies — may you find comfort and peace.",
      "Thinking of you and sending strength and love during your loss.",
      "Holding you close in my thoughts and prayers at this sad time.",
      "May cherished memories bring you comfort in the days ahead.",
      "Sharing in your sorrow and wishing you moments of peace.",
      "With sympathy and caring thoughts for you and your loved ones.",
      "Please accept my sincere condolences and warm thoughts for you.",
      "Wishing you strength and comfort as you remember your loved one.",
      "My heart goes out to you — sincere condolences and compassion."
    ],
    vacation: [
      "Have the most relaxing and joyful vacation — you deserve it! 🌴",
      "Enjoy every moment of your time away — rest and recharge.",
      "Wishing you sunshine, new memories and a peaceful break.",
      "Safe travels and happy adventures on your vacation!",
      "Hope your vacation brings you joy, rest and little surprises.",
      "Take time to relax and enjoy — have a wonderful trip!",
      "Here’s to lazy mornings and fun memories — enjoy your vacation.",
      "Make the most of your break — come back refreshed and happy.",
      "Wishing you a wonderful getaway filled with smiles.",
      "Have an amazing vacation — see you recharged and smiling!"
    ]
  },

  es: {
    birthday: [
      "¡Feliz cumpleaños! 🎉 Que tengas un día lleno de alegría.",
      "Que tu cumpleaños esté lleno de amor y risas. 🥳",
      "Un año más viejo, un año más sabio — ¡feliz cumpleaños! 🎂",
      "Deseándote un cumpleaños tan increíble como tú. 🎈",
      "¡Celebra hoy y disfruta cada momento! 🎁",
      "Salud y felicidad en tu día. 🥂",
      "Enviándote abrazos y sonrisas en tu cumpleaños. 😊",
      "Que todos tus sueños se hagan realidad este año. ✨",
      "Que tengas un cumpleaños mágico y brillante. 🪄",
      "Disfruta tu día especial al máximo. 🎊"
    ],
    anniversary: [
      "¡Feliz aniversario! 💕 Que su amor crezca siempre.",
      "Brindemos por otro año juntos. 🥂",
      "Celebrando su amor y compromiso hoy. ❤️",
      "Que su vínculo se fortalezca con cada año que pase. 🌹",
      "Les deseo un aniversario lleno de alegría. 🎉",
      "Amor y felicidad siempre — ¡felicidades! 💖",
      "Por un amor que dure para siempre — ¡feliz aniversario! 🕊️",
      "Que su aniversario esté lleno de recuerdos especiales. ✨",
      "Juntos es un lugar maravilloso para estar. 👫",
      "Feliz aniversario a una hermosa pareja. 💑"
    ],
    "get-well": [
      "Te envío fuerza y una pronta recuperación. 🌻",
      "Que cada día te acerque más a sentirte mejor.",
      "Pensando en ti y deseando que pronto estés bien.",
      "Descansa y recupérate — te mando buenas vibras.",
      "Que la recuperación sea rápida y tranquila.",
      "Te envío un abrazo sanador y deseos de mejoría.",
      "Vuelve pronto con salud y energía renovada.",
      "Recupérate con calma — estamos pensando en ti.",
      "Que cada día traiga mejoría — ánimo y fuerzas.",
      "Mis mejores deseos para tu pronta recuperación."
    ],
    congrats: [
      "¡Enhorabuena por tu logro! Te lo mereces.",
      "¡Felicitaciones! Tu esfuerzo dio frutos.",
      "Celebrando tu éxito — ¡sigue brillando!",
      "Tu dedicación es admirable — felicidades.",
      "Muy orgulloso/a de ti — ¡felicidades!",
      "Esto es solo el comienzo — adelante y felicidades.",
      "¡Bravo! Disfruta este gran logro.",
      "Te envío felicitaciones y los mejores deseos.",
      "Éxito merecido — celebra este momento.",
      "Celebramos contigo — ¡enhorabuena!"
    ],
    "thank-you": [
      "Gracias por tu amabilidad y apoyo — significa mucho.",
      "Tu ayuda marcó la diferencia — muchas gracias.",
      "Agradecido/a por todo lo que haces — gracias.",
      "Gracias por ser tan generoso/a y atento/a.",
      "Valoro mucho tu tiempo y esfuerzo — gracias.",
      "Gracias por ir más allá — te lo agradezco.",
      "Tu apoyo fue invaluable — gracias por todo.",
      "Gracias por tu amabilidad — alegraste mi día.",
      "Sinceras gracias por tu ayuda y consideración.",
      "Te agradezco más de lo que las palabras pueden decir."
    ],
    "good-luck": [
      "¡Mucho éxito! Confío en que lo harás genial. 🍀",
      "Buena suerte en esta nueva etapa — tienes mi apoyo.",
      "Te envío toda la buena vibra y suerte.",
      "Que la fortuna te acompañe siempre — buena suerte.",
      "Confía en ti y verás que todo saldrá bien.",
      "A por todas — te deseo mucha suerte y confianza.",
      "Estoy contigo — ¡mucha suerte!",
      "Que el éxito y la suerte te sigan en el camino.",
      "Vas a lograrlo — te envío suerte y ánimo.",
      "Mucha suerte y los mejores deseos para ti."
    ],
    motivation: [
      "Sigue adelante — los pequeños pasos llevan a grandes cambios. 🚀",
      "Cree en ti — tu potencial es enorme.",
      "Mantente fuerte y enfocado — lo lograrás.",
      "Cada esfuerzo cuenta — no te rindas.",
      "Eres capaz de cosas increíbles — confía en el proceso.",
      "Respira, comienza de nuevo — el progreso es progreso.",
      "Tu dedicación dará frutos — sigue adelante.",
      "Mantén la cabeza en alto y el corazón valiente.",
      "Paso a paso, llegarás lejos.",
      "Sigue motivado/a — tu futuro te lo agradecerá."
    ],
    appreciation: [
      "Solo quería decir cuánto te aprecio — gracias.",
      "Tu amabilidad no pasa desapercibida — eres valioso/a.",
      "Gracias por todo lo que haces — haces la diferencia.",
      "Aprecio tu apoyo y tu generosidad.",
      "Traes mucho valor — gracias por ser tú.",
      "Agradecido/a por tu ayuda y apoyo constantes.",
      "Tus esfuerzos significan mucho para mí — gracias.",
      "Gracias por tu calidez y por estar ahí.",
      "Te valoro y aprecio tu amistad y ayuda.",
      "Mil gracias por todo — te lo agradezco."
    ],
    farewell: [
      "Te deseo lo mejor en tu próximo capítulo — ¡adiós y éxito!",
      "Fue un placer — que te vaya muy bien.",
      "Buen viaje en tu nueva aventura — éxitos.",
      "Te extrañaremos — mucha suerte y felicidad.",
      "Gracias por todo — los mejores deseos.",
      "Adiós y que la vida te sonría siempre.",
      "Que tu futuro esté lleno de alegría y triunfos.",
      "Nos despedimos con gratitud y buenos deseos.",
      "Que tu próximo capítulo sea brillante y feliz.",
      "Mucha suerte en lo próximo — ¡a triunfar!"
    ],
    encouragement: [
      "Tú puedes — confío en ti. ¡Adelante! 💪",
      "Recuerda lo lejos que has llegado — sigue avanzando.",
      "Ánimo — días mejores están por venir.",
      "Eres más fuerte de lo que crees — no te rindas.",
      "Cree en tus capacidades — vencerás esto.",
      "Sigue intentando — la constancia trae resultados.",
      "No estás solo/a — tienes apoyo y fuerza.",
      "Ten fe en ti mismo/a — cosas buenas vienen.",
      "Sé resiliente — crecerás con este desafío.",
      "Mantén la esperanza — eres capaz de grandes cosas."
    ],
    love: [
      "Iluminas mi vida — te amo con todo mi corazón. ❤️",
      "Cada día a tu lado es un regalo — te amo.",
      "Mi amor por ti crece cada día.",
      "Eres mi persona favorita — te amo infinitamente.",
      "Agradezco tu amor y compañía siempre.",
      "Estar contigo hace cada día mejor — te amo.",
      "Tu sonrisa es mi alegría — te quiero mucho.",
      "Con todo mi corazón, te amo hoy y siempre.",
      "Eres mi roca y mi alegría — te amo.",
      "Te guardo en mi corazón — amor eterno."
    ],
    condolences: [
      "Te envío mi más sentido pésame y un abrazo. 🕊️",
      "Siento mucho tu pérdida — te acompaño en el dolor.",
      "Que los recuerdos te traigan consuelo y paz.",
      "Te envío fuerza y cariño en este momento difícil.",
      "Acepta mi más sincero pésame y condolencias.",
      "Que la paz y el amor te rodeen en estos días.",
      "Mis pensamientos y oraciones están contigo y tu familia.",
      "Te acompaño en tu tristeza y te envío apoyo.",
      "Que encuentres consuelo rodeado/a de quienes te quieren.",
      "Recibe mi más sentido pésame y un cálido abrazo."
    ],
    vacation: [
      "Que tengas unas vacaciones relajantes y maravillosas. 🌴",
      "Disfruta cada momento de tu descanso — te lo mereces.",
      "Que tu viaje esté lleno de buenos recuerdos y risas.",
      "Buen viaje y que regreses con energías renovadas.",
      "Espero que tus vacaciones traigan paz y alegría.",
      "Tómate tiempo para descansar y recargar energías.",
      "Disfruta del sol, la calma y nuevas aventuras.",
      "Haz recuerdos inolvidables y vuelve con una sonrisa.",
      "Que tu descanso sea lleno de momentos felices.",
      "Felices vacaciones — disfruta y vuelve recargado/a."
    ]
  },

  af: {
    birthday: [
      "Gelukkige verjaarsdag! 🎉 Mag jou dag vol liefde en lag wees.",
      "Baie geluk met jou verjaarsdag — geniet elke oomblik.",
      "Nog ’n jaar ouer, nog ’n jaar wyser — gelukkige verjaarsdag!",
      "Ek wens jou ’n fantastiese verjaarsdag vol vreugde. 🎈",
      "Vier vandag en maak lekker herinneringe! 🎁",
      "Gesondheid en geluk vir die jaar wat kom. 🥂",
      "Stuur verjaarsdagdrukkies en ’n groot glimlag. 😊",
      "Mag al jou drome die jaar waar word. ✨",
      "Geniet ’n wonderlike en spesiale verjaarsdag! 🪄",
      "Vier groot — dit is jou dag! 🎊"
    ],
    anniversary: [
      "Gelukkige herdenking! 💕 Mag julle liefde altyd groei.",
      "Brink op nog ’n jaar saam — baie geluk! 🥂",
      "Vier julle liefde en verbintenis vandag. ❤️",
      "Mag julle band met elke jaar sterker word. 🌹",
      "Wense vir ’n vreugdevolle herdenking. 🎉",
      "Liefde en geluk vir julle albei — geluk! 💖",
      "Hier’s op ’n liefde wat vir altyd duur. 🕊️",
      "Mag hierdie dag vol herinneringe wees. ✨",
      "Saam is ’n pragtige plek om te wees. 👫",
      "Gelukkige herdenking aan ’n mooi paartjie. 💑"
    ],
    "get-well": [
      "Baie sterkte — ek hoop jy voel gou beter. 🌻",
      "Stuur genesingsgroete en positiewe gedagtes aan jou.",
      "Mag jy vinnig herstel en gou weer sterk wees.",
      "Rus en herstel — ons dink aan jou.",
      "Hersiening en baie beterskapwense!",
      "Stuur liefde en hoop vir ’n spoedige herstel.",
      "Neem tyd en kom gou weer terug na krag.",
      "Ons stuur jou warm reset en beste wense.",
      "Mag elke dag verbetering bring — sterkte!",
      "Beste wense vir jou gesondheid en spoedige herstel."
    ],
    congrats: [
      "Baie geluk met jou prestasie — so trots op jou!",
      "Goed gedaan! Jou harde werk het gevier.",
      "Vier jou sukses — geniet hierdie oomblik!",
      "Jou toewyding is bewonderenswaardig — geluk!",
      "Ek is so trots op jou — baie geluk!",
      "Dit is net die begin — hou aan skitter!",
      "Bravo! Hierdie sukses is welverdiend.",
      "Stuur gelukwense en beste wense vooruit.",
      "Geniet die oorwinning — jy het dit verdien!",
      "Vier groot — jou prestasie inspireer."
    ],
    "thank-you": [
      "Dankie vir jou vriendelikheid en hulp — dit beteken baie.",
      "Jou ondersteuning het ’n verskil gemaak — baie dankie.",
      "Ek waardeer alles wat jy doen — dankie.",
      "Dankie dat jy so geduldig en behulpsaam was.",
      "Ek waardeer jou tyd en moeite — baie dankie.",
      "Dankie dat jy altyd uithelp — ek waardeer dit.",
      "Jou hulp was onskatbaar — baie dankie vir alles.",
      "Dankie vir jou vriendelikheid — jy het my dag gemaak.",
      "Sincere dank vir jou ondersteuning en sorg.",
      "Ek is opreg dankbaar — baie dankie."
    ],
    "good-luck": [
      "Sterkte en voorspoed — jy gaan dit doen! 🍀",
      "Baie sukses op jou nuwe avontuur — ek glo in jou.",
      "Stuur al die goeie wense en geluk na jou toe.",
      "Mag geluk altyd met jou wees — sterkte!",
      "Glo in jouself — jy is gereed vir dit.",
      "Op na sukses — veel geluk en moed!",
      "Ek juig vir jou — baie geluk!",
      "Mag die toekoms jou mooi geleenthede bring.",
      "Jy is gereed — sterkte en sukses!",
      "Beste wense en geluk op jou pad."
    ],
    motivation: [
      "Hou aan — klein stappe bou groot veranderinge. 🚀",
      "Glo in jou self — jou potensiaal is groot.",
      "Hou moed en fokus — jy sal slaag.",
      "Elke poging bring jou nader — hou aan beweeg.",
      "Jou vasbyt sal vrugte dra — vertrou die proses.",
      "Neem ’n asem en begin weer — elke stap tel.",
      "Jou harde werk sal beloon word — hou aan.",
      "Hou jou kop hoog en jou hart dapper.",
      "Een tree op ’n slag — jy sal ver gaan.",
      "Blijven volharden — jou toekoms is blink."
    ],
    appreciation: [
      "Net ’n dankie — ek waardeer jou opreg.",
      "Jy is so gewaardeer — dankie vir alles.",
      "Dankie dat jy altyd daar is — ek waardeer dit.",
      "Jou hulp beteken baie — baie dankie.",
      "Dankie dat jy ’n verskil maak in my lewe.",
      "Ek waardeer jou vriendelikheid en ondersteuning.",
      "Dankie dat jy altyd ’n hand toesteek — waardeer dit.",
      "Jou pogings beteken die wêreld — baie dankie.",
      "Ek is opreg dankbaar vir jou hulp.",
      "Dankie — ek waardeer jou meer as woorde."
    ],
    farewell: [
      "Baie voorspoed in jou volgende hoofstuk — totsiens!",
      "Dit was ’n plesier — sterkte in jou nuwe avontuur.",
      "Totsiens en baie sukses op jou pad.",
      "Ons gaan jou mis — alles van die beste.",
      "Dankie vir alles — beste wense vir die toekoms.",
      "Totsiens — mag jou lewe vol voorspoed wees.",
      "Gaan met geluk en maak die beste van alles.",
      "Ons sê totsiens met liefde en dankbaarheid.",
      "Mag jou volgende hoofstuk vol vreugde wees.",
      "Veel sukses — totsiens en seëninge!"
    ],
    encouragement: [
      "Jy kan dit doen — ek glo in jou. Hou aan! 💪",
      "Onthou hoe ver jy al gekom het — hou aan.",
      "Hou moed — beter dae is op pad.",
      "Jy is sterker as wat jy dink — hou vol.",
      "Glo in jou vaardighede — jy sal dit oorwin.",
      "Hou aan probeer — deursettingsvermoë sal wen.",
      "Jy staan nie alleen nie — ons is by jou.",
      "Wees veerkragtig — dit sal verbygaan en jy sal groei.",
      "Hou vas aan hoop — goeie dinge kom nader.",
      "Glo in jouself — jy is in staat tot grootsheid."
    ],
    love: [
      "Jy lig my lewe op — ek is mal oor jou. ❤️",
      "Elke dag saam met jou is ’n seën — ek is lief vir jou.",
      "My liefde vir jou groei elke dag.",
      "Jy is my persoon — liefde vir altyd.",
      "Dankbaar vir jou liefde en geesdrif.",
      "Ek is lief vir jou — jy maak alles beter.",
      "Jou lag is my vreugde — ek is lief vir jou.",
      "Met my hele hart — ek sal altyd liefhê.",
      "Jy is my anker — ek is lief vir jou.",
      "Ek koester jou — liefde vir altyd."
    ],
    condolences: [
      "Ek stuur my innige simpatie en ’n warm drukkie. 🕊️",
      "Ek is diep bedroef oor julle verlies — my simpatie.",
      "Mag die herinneringe vir jou troos bring.",
      "Ek dink aan jou en stuur liefde en krag.",
      "Aanvaar asseblief my opregte meegevoel.",
      "Mag vrede en vertroosting jou omring in hierdie tyd.",
      "My gedagtes en gebede is by jou en jou familie.",
      "Ek deel in jou hartseer en stuur warmte.",
      "Mag jy troos vind by familie en vriende.",
      "Aanvaar my opregte innige simpatie en steun."
    ],
    vacation: [
      "Geniet ’n wonderlike en rustige vakansie — jy verdien dit! 🌴",
      "Neem tyd om te ontspan en energie te herwin.",
      "Mag jou reis vol gelukkige herinneringe wees.",
      "Veilige reis en genot in jou vakansie!",
      "Mag jou dae vol son en vreugde wees.",
      "Ontspan en geniet — kom terug verfris en gelukkig.",
      "Maak mooi herinneringe en kom terug met stories.",
      "Mag hierdie breek vir jou vrede en vreugde bring.",
      "Geniet die rustigheid en die klein oomblikke.",
      "Gelukkige vakansie — geniet en ontspan voluit!"
    ]
  }
};

// languages hi & zh fall back to 'en'
const LANG_FALLBACK = { hi: 'en', zh: 'en' };

// --- App state
let currentLang = 'en';
let currentOccasion = '';
let currentList = [];
let currentIndex = -1;
let lastIndex = null;

// --- Theme
function setThemeIcon(){
  const p = $('themeIconPath');
  const isDark = document.body.dataset.theme === 'dark';
  p.setAttribute('d', isDark
    ? 'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z'
    : 'M12 2a10 10 0 100 20 10 10 0 000-20z');
}
function toggleTheme(){
  document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('gw_theme', document.body.dataset.theme);
  setThemeIcon();
}

// --- Utilities
function getEffectiveLang(lang){
  if (MESSAGES[lang]) return lang;
  return LANG_FALLBACK[lang] || 'en';
}
function pickRandom(list){
  if(!list || list.length===0) return -1;
  if(list.length===1) return 0;
  let idx;
  do { idx = Math.floor(Math.random()*list.length); } while(idx===lastIndex);
  lastIndex = idx;
  return idx;
}

// --- Message handling
function loadCurrentMessages(){
  currentLang = $('language').value;
  currentOccasion = $('occasion').value;
  if(!currentOccasion) {
    $('customMessage').value = '';
    currentList = [];
    return;
  }
  const effective = getEffectiveLang(currentLang);
  currentList = (MESSAGES[effective] && MESSAGES[effective][currentOccasion]) || (MESSAGES['en'] && MESSAGES['en'][currentOccasion]) || [];
  if(currentList.length===0){
    $('customMessage').value = '';
    return;
  }
  currentIndex = pickRandom(currentList);
  renderMessageByIndex(currentIndex);
}

function renderMessageByIndex(idx){
  if(idx<0 || !currentList.length) return;
  const base = currentList[idx];
  // apply names if present (but don't store signature)
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let text = base;
  if(r) text = `To: ${r}\n\n${text}`;
  if(s) text = `${text}\n\nFrom: ${s}`;
  $('customMessage').value = text;
}

function nextRandomMessage(){
  if(!currentList.length) { loadCurrentMessages(); return; }
  const idx = pickRandom(currentList);
  currentIndex = idx;
  renderMessageByIndex(idx);
}

function updateMessageWithName(){
  // keep current base message if possible
  if(!currentList.length) return;
  // If currentIndex set, use that base; otherwise pick random
  if(currentIndex<0) currentIndex = 0;
  renderMessageByIndex(currentIndex);
}

// --- Emoji picker
const EMOJIS = ['😊','😂','😍','👍','🎉','💖','🌟','🍀','💪','🌻','🕊️','🙏'];
function openEmojiPicker(){
  closeEmojiPicker(); // ensure single
  const picker = document.createElement('div');
  picker.id = 'emojiPicker';
  picker.style.position = 'absolute';
  picker.style.background = 'var(--card)';
  picker.style.border = '1px solid var(--border)';
  picker.style.padding = '8px';
  picker.style.borderRadius = '8px';
  picker.style.display = 'grid';
  picker.style.gridTemplateColumns = 'repeat(6, 1fr)';
  picker.style.gap = '6px';
  picker.style.zIndex = '1200';
  EMOJIS.forEach(e => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = e;
    b.style.fontSize = '18px';
    b.style.border = 'none';
    b.style.background = 'none';
    b.style.cursor = 'pointer';
    b.addEventListener('click', () => {
      const ta = $('customMessage');
      const start = ta.selectionStart || ta.value.length;
      const end = ta.selectionEnd || ta.value.length;
      ta.value = ta.value.slice(0,start) + e + ta.value.slice(end);
      ta.focus();
      closeEmojiPicker();
    });
    picker.appendChild(b);
  });
  document.body.appendChild(picker);
  const rect = $('emojiButton').getBoundingClientRect();
  picker.style.top = (rect.top + window.scrollY + 28) + 'px';
  picker.style.left = Math.max(8, rect.left + window.scrollX - 200) + 'px';
  setTimeout(()=>document.addEventListener('click', clickOutsideEmoji), 0);
}
function clickOutsideEmoji(e){
  const p = document.getElementById('emojiPicker');
  if(!p) return;
  if(!p.contains(e.target) && e.target !== $('emojiButton')) closeEmojiPicker();
}
function closeEmojiPicker(){ const p=document.getElementById('emojiPicker'); if(p) p.remove(); document.removeEventListener('click', clickOutsideEmoji); }

// --- Clear content
function clearContent(){ $('customMessage').value = ''; }

// --- Copy / signature behavior
function getMessageForShare(){
  let text = $('customMessage').value.trim();
  const s = $('senderName').value.trim();
  if(!text) return '';
  if(s){
    text += `\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
  }
  return text;
}

function copyMessage(){
  const txt = getMessageForShare();
  if(!txt) { alert('Please generate or write a message first.'); return; }
  navigator.clipboard.writeText(txt).then(()=> alert('Copied to clipboard'), ()=> alert('Copy failed'));
}

// --- Share handlers
function openShareModal(){ $('shareModal').classList.remove('hidden'); $('shareModal').setAttribute('aria-hidden','false'); }
function closeShareModal(){ $('shareModal').classList.add('hidden'); $('shareModal').setAttribute('aria-hidden','true'); }

function openWindowShare(urlBase){
  const msg = getMessageForShare();
  if(!msg){ alert('Please generate or write a message first.'); return; }
  window.open(urlBase + encodeURIComponent(msg), '_blank');
}
function shareWhatsApp(){ openWindowShare('https://wa.me/?text='); }
function shareFacebook(){ openWindowShare('https://www.facebook.com/sharer/sharer.php?u=https://mashifmj-prog.github.io/goodwisher/&quote='); }
function shareTwitter(){ openWindowShare('https://x.com/intent/tweet?text='); }
function shareTelegram(){ openWindowShare('https://t.me/share/url?url=https://mashifmj-prog.github.io/goodwisher/&text='); }
function shareEmail(){
  const msg = getMessageForShare();
  if(!msg){ alert('Please generate or write a message first.'); return; }
  const subject = encodeURIComponent('A Special Message from GoodWisher');
  const body = encodeURIComponent(msg.replace(/\n/g, '%0A'));
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
function shareDevice(){
  const text = getMessageForShare();
  if(!text){ alert('Please generate or write a message first.'); return; }
  if(navigator.share){ navigator.share({ text }).catch(()=>{}); }
  else alert('Device share not supported on this device.');
}

// --- Templates & saved messages (localStorage)
function loadSavedTemplates(){
  const raw = localStorage.getItem('gw_templates') || '[]';
  const arr = JSON.parse(raw);
  const sel = $('templateSelect');
  // clear
  while(sel.options.length>1) sel.remove(1);
  arr.forEach((t,i)=>{
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = t.title || (`Template ${i+1} (${new Date(t.date).toLocaleString()})`);
    sel.appendChild(opt);
  });
  // also load saved messages list in memory when needed
}

function saveAsTemplate(){
  const txt = $('customMessage').value.trim();
  if(!txt) return alert('Nothing to save as template.');
  const title = prompt('Template title (optional):','My template');
  const raw = localStorage.getItem('gw_templates') || '[]';
  const arr = JSON.parse(raw);
  arr.unshift({title: title||'Template', text: txt, date: new Date().toISOString()});
  localStorage.setItem('gw_templates', JSON.stringify(arr.slice(0,100)));
  loadSavedTemplates();
  alert('Saved as template locally.');
}

function loadTemplate(){
  const sel = $('templateSelect');
  const idx = sel.value;
  if(!idx) return;
  const arr = JSON.parse(localStorage.getItem('gw_templates') || '[]');
  const t = arr[idx];
  if(t) $('customMessage').value = t.text;
}

// save normal (saved messages)
function saveMessageLocally(){
  const txt = $('customMessage').value.trim();
  if(!txt) return alert('Nothing to save.');
  const arr = JSON.parse(localStorage.getItem('gw_saved') || '[]');
  arr.unshift({text: txt, date: new Date().toISOString()});
  localStorage.setItem('gw_saved', JSON.stringify(arr.slice(0,200)));
  alert('Message saved locally.');
}

function exportSaved(){
  const arr = JSON.parse(localStorage.getItem('gw_saved') || '[]');
  if(!arr.length) return alert('No saved messages to export.');
  const blob = new Blob([JSON.stringify(arr, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'goodwisher-saved-messages.json';
  a.click();
  URL.revokeObjectURL(url);
}

// --- Feedback
let rating = 0;
function openFeedback(){ $('feedbackModal').classList.remove('hidden'); $('feedbackModal').setAttribute('aria-hidden','false'); }
function closeFeedback(){ $('feedbackModal').classList.add('hidden'); $('feedbackModal').setAttribute('aria-hidden','true'); document.getElementById('feedbackText').value = ''; rating = 0; document.querySelectorAll('.star').forEach(s=>s.classList.remove('selected')); document.getElementById('ratingScore').textContent='Score: 0%'; }
function setRating(r){
  rating = r;
  document.querySelectorAll('.star').forEach(s=> s.classList.toggle('selected', Number(s.dataset.star) <= r));
  document.getElementById('ratingScore').textContent = `Score: ${r*20}%`;
}
function submitFeedback(){
  const txt = document.getElementById('feedbackText').value.trim();
  if(!txt && rating===0) return alert('Please rate or comment!');
  alert('Thanks for your feedback!');
  closeFeedback();
}

// --- Init wiring
window.addEventListener('DOMContentLoaded', ()=>{
  // theme
  document.body.dataset.theme = localStorage.getItem('gw_theme') || 'light';
  setThemeIcon();
  $('themeToggle').addEventListener('click', toggleTheme);

  // message controls
  $('occasion').addEventListener('change', loadCurrentMessages);
  $('language').addEventListener('change', loadCurrentMessages);
  $('nextMessage').addEventListener('click', nextRandomMessage);
  $('recipientName').addEventListener('input', updateMessageWithName);
  $('senderName').addEventListener('input', updateMessageWithName);

  // emoji & clear
  $('emojiButton').addEventListener('click', openEmojiPicker);
  $('clearButton').addEventListener('click', clearContent);

  // copy/share/save
  $('copyBtn').addEventListener('click', copyMessage);
  $('shareBtn').addEventListener('click', openShareModal);
  $('closeShare').addEventListener('click', closeShareModal);
  $('shareWhatsApp').addEventListener('click', shareWhatsApp);
  $('shareFacebook').addEventListener('click', shareFacebook);
  $('shareTwitter').addEventListener('click', shareTwitter);
  $('shareTelegram').addEventListener('click', shareTelegram);
  $('shareEmail').addEventListener('click', shareEmail);
  $('shareDevice').addEventListener('click', shareDevice);

  // templates & saves
  $('saveTemplateBtn').addEventListener('click', saveAsTemplate);
  $('saveBtn').addEventListener('click', saveMessageLocally);
  $('exportBtn').addEventListener('click', exportSaved);
  $('templateSelect').addEventListener('change', loadTemplate);

  // feedback wiring
  $('feedbackBtn').addEventListener('click', openFeedback);
  $('cancelFeedback').addEventListener('click', closeFeedback);
  $('submitFeedback').addEventListener('click', submitFeedback);
  document.querySelectorAll('.star').forEach(s => s.addEventListener('click', ()=> setRating(Number(s.dataset.star))));

  // clear-name buttons
  document.querySelectorAll('.clear-name').forEach(b => b.addEventListener('click', (e) => {
    const t = e.currentTarget.dataset.target;
    if(t) $(t).value = '';
    else {
      // data-target not set in markup for older buttons — handle manually
      const target = e.currentTarget.getAttribute('data-target');
      if(target) $(target).value = '';
    }
    updateMessageWithName();
  }));

  // load templates list
  loadSavedTemplates();

  // initial state (if occasion preselected)
  if($('occasion').value) loadCurrentMessages();
});
