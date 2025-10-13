/* GoodWisher main script
   - languages: en, es, af (manual)
   - hi, zh currently fall back to English
*/

const $ = id => document.getElementById(id);

let selectedRating = 0;
let lastIndex = null; // for avoiding same random choice twice in a row

// === Manual messages: 13 occasions x 10 messages for en/es/af ===
// For hi, zh we will fallback to en (quick deliver). If you want, I can add hi/zh manual translations later.
const MESSAGES = {
  en: {
    birthday: [
      "Wishing you a day filled with love, laughter and all your favorite things. Happy Birthday! 🎉",
      "May your birthday be the start of a year filled with good luck, good health and much happiness.",
      "Happy Birthday! Hope your day is as wonderful as you are.",
      "Wishing you joy and many happy returns on your special day.",
      "Another year older, another year wiser — celebrate every moment. Happy Birthday!",
      "May your year ahead be full of success and great memories. Happy Birthday! 🎂",
      "Cheers to you on your birthday — enjoy every slice of life today.",
      "Sending birthday hugs and best wishes for a fantastic year ahead.",
      "Hope your birthday sparkles and shines like you do. Celebrate big!",
      "Warmest wishes on your birthday — may all your dreams come true."
    ],
    anniversary: [
      "Wishing you both a lifetime of love and happiness. Happy Anniversary!",
      "Another year of wonderful memories together — congratulations on your anniversary.",
      "May your love continue to grow and bring you joy. Happy Anniversary!",
      "Celebrating your special bond today — cheers to many more years.",
      "You two are an inspiration. Happy Anniversary and many happy returns.",
      "Warm wishes on your anniversary — may your love always shine bright.",
      "A beautiful life together — congratulations on another year of love.",
      "To many more anniversaries filled with laughter and joy. Congratulations!",
      "Happy Anniversary! Thanks for showing what true love looks like.",
      "Wishing you continued love, laughter and happiness together."
    ],
    "get-well": [
      "Sending healing thoughts and a little sunshine your way. Get well soon! 🌻",
      "Wishing you a speedy recovery — take good care and rest well.",
      "Sending strength and warm wishes for a quick recovery.",
      "Hope each new day brings you closer to a full and speedy recovery.",
      "Thinking of you and hoping you feel better every day.",
      "May you be back on your feet and smiling again soon.",
      "Sending gentle hugs and get-well wishes your way.",
      "Rest, recover, and remember you’re in our thoughts. Get well soon.",
      "Hoping you feel better with each passing day — take it easy.",
      "Warm wishes for your health and a fast recovery."
    ],
    congrats: [
      "Huge congratulations on your achievement — so well deserved!",
      "Well done! Your hard work truly paid off — congratulations!",
      "Celebrating your success — congratulations and keep shining!",
      "Your dedication is inspiring — congratulations on this milestone.",
      "So proud of you — congratulations on your big achievement!",
      "This is just the beginning — congrats and on to the next!",
      "Bravo! Your accomplishment deserves a big celebration.",
      "Sending congratulations and best wishes for what's next.",
      "Well-earned success — congratulations and enjoy the moment!",
      "Celebrating you and your bright success — congratulations!"
    ],
    "thank-you": [
      "Thank you for your kindness and support — it means the world to me.",
      "Your help made a difference — thank you sincerely.",
      "Grateful for all you do — thank you so much.",
      "Thank you for being so thoughtful and generous.",
      "I truly appreciate your time and effort — many thanks.",
      "Thanks for going above and beyond — I’m very grateful.",
      "Your support was invaluable — thank you for everything.",
      "Thank you for your kindness — you made my day brighter.",
      "Sincere thanks for your help and thoughtfulness.",
      "I appreciate you more than words can say — thank you."
    ],
    "good-luck": [
      "Wishing you the best of luck — you’ve got this! 🍀",
      "Good luck on your new journey — I believe in you.",
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
      "Keep going — small steps every day lead to big results. You’ve got this! 🚀",
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
      "Wishing you all the best in your next chapter — farewell and good luck!",
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

  // Spanish (manually written)
  es: {
    birthday: [
      "¡Feliz cumpleaños! Que tu día esté lleno de alegría, amor y risas. 🎉",
      "Que este nuevo año te traiga salud, éxitos y momentos felices.",
      "Feliz cumpleaños — ¡espero que tu día sea tan especial como tú!",
      "Deseándote un día maravilloso y muchos recuerdos felices.",
      "Un año más de vida, un año más de bendiciones. ¡Felicidades!",
      "Que el próximo año esté lleno de éxitos y sorpresas agradables. 🎂",
      "Brindemos por ti en tu cumpleaños — disfruta mucho.",
      "Te envío abrazos y los mejores deseos en tu día especial.",
      "Que tu cumpleaños brille tanto como tú. ¡A celebrar!",
      "Mis mejores deseos en tu cumpleaños — que se cumplan tus sueños."
    ],
    anniversary: [
      "¡Feliz aniversario! Que su amor siga creciendo con los años.",
      "Celebrando otro año de recuerdos y amor — felicidades.",
      "Que su unión siga llenándoles de alegría. ¡Feliz aniversario!",
      "Brindamos por ustedes y por muchos años más de felicidad.",
      "Son una inspiración — feliz aniversario y bendiciones.",
      "Que el amor que comparten siga iluminando su camino.",
      "Felicidades por otro año juntos, que vengan muchos más.",
      "Deseándoles amor y risas en este día tan especial.",
      "Gracias por mostrarnos lo que es el verdadero amor. Felicidades.",
      "Que cada año les traiga más motivos para sonreír juntos."
    ],
    "get-well": [
      "Te envío fuerza y una pronta recuperación. ¡Recupérate pronto! 🌻",
      "Que cada día te acerque más a sentirte mejor. Cuídate.",
      "Pensando en ti y deseando que pronto estés de vuelta al 100%.",
      "Descansa y recupérate, te mando muchas buenas vibras.",
      "Que la recuperación sea rápida y tranquila — te deseo salud.",
      "Te envío un abrazo sanador y deseos de pronta mejoría.",
      "Vuelve pronto con salud y energía renovada.",
      "Recupérate con calma, estamos pensando en ti.",
      "Que cada día traiga mejoría — ánimo y fuerzas.",
      "Mis mejores deseos para tu pronta recuperación."
    ],
    congrats: [
      "¡Enhorabuena por tu logro! Te lo mereces.",
      "Felicitaciones — tu esfuerzo ha dado frutos.",
      "Celebrando tu éxito — ¡sigue brillando!",
      "Tu dedicación es admirable — felicidades por este hito.",
      "Muy orgulloso/a de ti — ¡felicidades!",
      "Esto es solo el comienzo — felicidades y adelante.",
      "¡Bravo! Disfruta este gran logro.",
      "Te envío felicitaciones y los mejores deseos para lo siguiente.",
      "Éxito merecido — ¡felicidades y a celebrarlo!",
      "Celebramos contigo este gran paso — enhorabuena."
    ],
    "thank-you": [
      "Gracias por tu amabilidad y apoyo — significa mucho para mí.",
      "Agradezco de corazón tu ayuda y tu tiempo.",
      "Gracias por estar siempre ahí, te lo agradezco.",
      "Tu gesto fue muy valioso — muchas gracias.",
      "Aprecio mucho tu generosidad y compromiso.",
      "Gracias por ir más allá — estoy muy agradecido/a.",
      "Tu apoyo fue fundamental — gracias por todo.",
      "Gracias por iluminar mi día con tu ayuda.",
      "Mi sincero agradecimiento por tu apoyo y cariño.",
      "No encuentro palabras suficientes para agradecerte — muchas gracias."
    ],
    "good-luck": [
      "¡Mucho éxito! Confío en que lo harás genial. 🍀",
      "Buena suerte en esta nueva etapa — tienes mi apoyo.",
      "Te envío toda la buena vibra y suerte.",
      "Que la fortuna te acompañe siempre — buena suerte.",
      "Confía en ti y verás que todo saldrá bien — suerte.",
      "A por todas — te deseo mucha suerte y confianza.",
      "Estoy contigo — ¡mucha suerte!",
      "Que el éxito y la suerte te sigan en el camino.",
      "Vas a lograrlo — te envío suerte y ánimo.",
      "Mucha suerte y los mejores deseos para ti."
    ],
    motivation: [
      "Sigue adelante — los pequeños pasos hacen grandes cambios. 🚀",
      "Cree en ti, tu potencial es enorme.",
      "Mantente fuerte y enfocado — lo lograrás.",
      "Cada esfuerzo cuenta, sigue adelante y no te rindas.",
      "Eres capaz de cosas increíbles — confía en el proceso.",
      "Respira, continúa — cada día es una oportunidad.",
      "Tu constancia dará frutos — mantente firme.",
      "Mantén la cabeza en alto y el corazón valiente.",
      "Paso a paso, tu esfuerzo te llevará lejos.",
      "Sigue motivado/a — tu futuro te lo agradecerá."
    ],
    appreciation: [
      "Solo quiero decir que te aprecio mucho — gracias.",
      "Tu amabilidad no pasa desapercibida — eres valioso/a.",
      "Gracias por todo lo que haces, te aprecio sinceramente.",
      "Aprecio tu apoyo y tu generosidad.",
      "Traes mucho valor a mi vida — gracias por ser tú.",
      "Estoy agradecido/a por tu ayuda y constancia.",
      "Tu esfuerzo significa mucho para mí — muchas gracias.",
      "Gracias por tu calidez y por estar siempre ahí.",
      "Te valoro y aprecio tu amistad y apoyo.",
      "Mil gracias por todo — te lo agradezco de corazón."
    ],
    farewell: [
      "Te deseo lo mejor en tu próxima etapa — ¡adiós y mucha suerte!",
      "Ha sido un placer — que te vaya muy bien en tu nuevo camino.",
      "Buen viaje en tu nueva aventura — éxitos siempre.",
      "Te vamos a extrañar — mucha suerte y éxito.",
      "Gracias por todo — te deseo lo mejor.",
      "Adiós y que la vida te sonría siempre.",
      "Que tu futuro esté lleno de alegría y éxitos.",
      "Nos despedimos con gratitud y buenos deseos.",
      "Que tu próximo capítulo sea brillante y feliz.",
      "Mucha suerte en lo próximo — ¡a triunfar!"
    ],
    encouragement: [
      "Tú puedes — confío en ti. ¡Adelante! 💪",
      "Recuerda lo lejos que has llegado, sigue avanzando.",
      "Ánimo — días mejores están por venir.",
      "Eres más fuerte de lo que crees, sigue adelante.",
      "Cree en tus capacidades — vencerás esto.",
      "Sigue intentando, la constancia trae resultados.",
      "No estás solo/a — tienes apoyo y fuerza.",
      "Ten fe en ti mismo/a — cosas buenas vienen.",
      "Sé resiliente — crecerás con este desafío.",
      "Mantén la esperanza — eres capaz de grandes cosas."
    ],
    love: [
      "Iluminas mi vida — te amo con todo mi corazón. ❤️",
      "Cada día a tu lado es un regalo, te amo.",
      "Mi amor por ti crece cada día más.",
      "Eres mi persona favorita — te amo infinitamente.",
      "Agradezco tu amor y compañía siempre.",
      "Estar contigo hace que todo sea mejor — te amo.",
      "Tu sonrisa es mi alegría — te quiero mucho.",
      "Con todo mi corazón, te amo hoy y siempre.",
      "Eres mi sostén y mi felicidad — te amo.",
      "Te guardo en mi corazón — amor eterno."
    ],
    condolences: [
      "Te envío mis más profundas condolencias y un abrazo. 🕊️",
      "Siento mucho tu pérdida — estoy contigo en este momento.",
      "Que los recuerdos te traigan consuelo y paz.",
      "Te acompaño en tu dolor y te envío fuerza.",
      "Con todo cariño, recibe mi más sincero pésame.",
      "Que la paz y el amor te rodeen en este tiempo difícil.",
      "Mis pensamientos y oraciones están contigo y tu familia.",
      "Te envío apoyo y cariño en este momento de pérdida.",
      "Que encuentres consuelo entre quienes te quieren.",
      "Recibe mi más sentido pésame y un abrazo cálido."
    ],
    vacation: [
      "Que tengas unas vacaciones maravillosas y muy relajantes. 🌴",
      "Disfruta cada momento de tu descanso — te lo mereces.",
      "Que tu viaje esté lleno de buenos recuerdos y sonrisas.",
      "Buen viaje y que regreses con energías renovadas.",
      "Relájate, disfruta y aprovecha cada instante.",
      "Deseo que tus días de descanso sean felices y tranquilos.",
      "Vive nuevas experiencias y vuelve con historias lindas.",
      "Que tu descanso te renueve y te haga sonreír.",
      "Disfruta del sol, la calma y los momentos especiales.",
      "Felices vacaciones — que regreses con el corazón contento."
    ]
  },

  // Afrikaans (manually written)
  af: {
    birthday: [
      "Gelukkige verjaarsdag! Mag jou dag vol liefde en lag wees. 🎉",
      "Baie geluk met jou verjaarsdag — geniet elke oomblik.",
      "Mag die jaar wat voorlê vol gesondheid en vreugde wees.",
      "Vier groot vandag — jy verdien dit!",
      "Sterkte en seëninge op jou spesiale dag.",
      "Voorspoed en vreugde in die nuwe jaar van jou lewe.",
      "Geniet koek, lag en die maatskaplikheid — gelukkige verjaarsdag!",
      "Stuur warm verjaarsdaggroete en beste wense.",
      "Mag jou dag skitter en vol vreugde wees.",
      "Beste wense op jou verjaarsdag — maak mooi herinneringe."
    ],
    anniversary: [
      "Gelukkige herdenking! Mag julle liefde elke dag groei.",
      "Baie geluk aan julle albei op jul huweliksherdenking.",
      "Vier jul liefde vandag — op na nog vele jare!",
      "Mag julle verhouding vol vreugde en geluk wees.",
      "Groete en beste wense op hierdie spesiale dag.",
      "Julle is ’n inspirasie — gelukkig herdenking.",
      "Dankie dat julle liefde so eglik is — geniet die dag.",
      "Seëninge en liefde op jul herdenking.",
      "Mag julle nog baie jare van geluk hê.",
      "Vier saam, lag baie en hou aan liefhê."
    ],
    "get-well": [
      "Baie sterkte — ek hoop jy voel gou beter. 🌻",
      "Stuur genesingsgroete en positiewe gedagtes aan jou.",
      "Mag jy vinnig herstel en gou weer sterk wees.",
      "Ontspan en rus — jou gesondheid kom eerste.",
      "Ons dink aan jou en wens jou spoedige herstel toe.",
      "Baie liefde en beste wense vir jou herstel.",
      "Mag elke dag beter bring — sterkte!",
      "Stuur ’n warm drukkie en wens vir goue genesing.",
      "Neem tyd om te herstel — ek hoop jy voel gou beter.",
      "Beste wense vir jou gesondheid en krag."
    ],
    congrats: [
      "Baie geluk met jou prestasie — so trots op jou!",
      "Goed gedaan! Jou harde werk het betaal.",
      "Vier jou sukses — geniet hierdie oomblik!",
      "Jou toewyding is bewonderenswaardig — geluk!",
      "Op na nog baie suksesse — baie geluk!",
      "Hierdie prestasie is welverdiend — geniet dit!",
      "Bravo! Hou aan skitter en bereik meer.",
      "Stuur gelukwense en beste wense vir die toekoms.",
      "Geniet die oomblik — jy het dit verdien!",
      "Vier groot — jou suksesse is inspirerend."
    ],
    "thank-you": [
      "Dankie vir jou vriendelikheid en hulp — ek waardeer dit.",
      "Jou ondersteuning beteken baie — baie dankie.",
      "Baie dankie vir alles wat jy doen.",
      "Jou hulp het ’n groot verskil gemaak — dankie.",
      "Ek waardeer jou tyd en moeite — dankie so baie.",
      "Dankie dat jy altyd daar is — ek is dankbaar.",
      "Jou vriendelikheid het my dag opgevrolik — dankie.",
      "Sincere dank vir jou ondersteuning en hulp.",
      "Dankie vir jou gedagtes en dade — dit beteken veel.",
      "Ek waardeer jou baie — baie dankie."
    ],
    "good-luck": [
      "Sterkte en voorspoed — jy gaan dit doen! 🍀",
      "Baie sukses op jou nuwe avontuur — ek glo in jou.",
      "Stuur goeie wense en geluk na jou toe.",
      "Mag geluk altyd aan jou kant staan — sterkte!",
      "Glo in jouself — jy het dit alles wat nodig is.",
      "Op na sukses — baie geluk en moed!",
      "Ek juig vir jou — veel geluk!",
      "Mag die toekoms jou goeie geleenthede bring.",
      "Jy is gereed — sterkte en sukses!",
      "Beste wense en geluk op jou pad."
    ],
    motivation: [
      "Hou aan toegaan — klein stappe bou groot veranderinge. 🚀",
      "Glo in jouself — jou potensiaal is groot.",
      "Hou moed en fokus — jy sal slaag.",
      "Elke poging bring jou nader — gaan voort.",
      "Jou vasbyt sal vrugte dra — hou aan beweeg.",
      "Neem ’n asem, begin weer — voortgang is voortgang.",
      "Jou toewyding sal beloon word — hou aan probeer.",
      "Hou jou kop hoog en jou hart dapper.",
      "Een tree op ’n slag — jy sal ver kom.",
      "Wees gemotiveerd — jou toekoms is vol beloning."
    ],
    appreciation: [
      "Net ’n woord om te sê ek waardeer jou — dankie.",
      "Jou vriendelikheid word gesien en waardeer.",
      "Dankie vir alles wat jy doen — dit beteken baie.",
      "Ek waardeer jou steun en genade opreg.",
      "Jy maak ’n groot verskil — baie dankie.",
      "Dankie vir jou bereidheid om te help — ek waardeer dit.",
      "Jou pogings beteken baie — opreg dankie.",
      "Dankie dat jy altyd ’n helpende hand bied.",
      "Ek waardeer jou saad van vriendelikheid.",
      "Baie dankie — ek waardeer jou innig."
    ],
    farewell: [
      "Baie sterkte op jou nuwe pad — totsiens en sukses!",
      "Dit was ’n plesier — alles van die beste op jou avontuur.",
      "Totsiens en baie voorspoed in alles wat jy doen.",
      "Ons gaan jou mis — sterkte op jou nuwe reis.",
      "Dankie vir alles — beste wense vir die toekoms.",
      "Totsiens — mag jou lewe gevul wees met sukses.",
      "Gaan voort en straal in alles wat jy aanpak.",
      "Ons sê totsiens met waardering en seëninge.",
      "Mag jou volgende hoofdstuk vol vreugde wees.",
      "Baie sukses en geluk — totsiens!"
    ],
    encouragement: [
      "Jy kan dit doen — ek glo in jou. Hou aan! 💪",
      "Onthou hoe ver jy al gekom het — hou aan vorentoe.",
      "Hou moed, daar kom beter dae.",
      "Jy is sterker as wat jy dink — hou aan probeer.",
      "Glo in jou vaardighede — jy sal oorwin.",
      "Volharding sal jou beloon — hou aan werk.",
      "Jy staan nie alleen nie — ons is by jou.",
      "Hou aan glo — goeie dinge kom nader.",
      "Wees veerkragtig — dit sal verbygaan en jy sal groei.",
      "Hou vas aan hoop — jy is in staat tot grootsheid."
    ],
    love: [
      "Jy lig my lewe op — ek is mal oor jou. ❤️",
      "Elke dag saam met jou is ’n seën — ek is lief vir jou.",
      "My liefde vir jou groei elke dag.",
      "Jy is my ontsettende vreugde — ek aanbid jou.",
      "Dankbaar vir jou liefde en ondersteuning.",
      "By jou voel alles beter — ek is lief vir jou.",
      "Jou lag maak my dag — ek is lief vir jou.",
      "Met my hele hart, ek sal jou altyd liefhê.",
      "Jy is my anker en my vreugde — ek is lief vir jou.",
      "Ek koester jou in my hart — liefde vir altyd."
    ],
    condolences: [
      "Ek stuur my innige simpatie en ’n sagte drukkie. 🕊️",
      "Ek is diep bedroef oor julle verlies — my simpatie.",
      "Mag die herinneringe vir jou ’n bron van troos wees.",
      "Ek dink aan jou en stuur jou krag en liefde.",
      "Aanvaar asseblief my opregte meegevoel en hartseer.",
      "Mag vrede en vertroosting jou omring in hierdie tyd.",
      "My gedagtes en gebede is met jou en jou familie.",
      "Ek deel in jou hartseer en stuur liefde.",
      "Mag jy troos vind onder diegene wat jou liefhet.",
      "Ek stuur my opregte meegevoel en ’n warm drukkie."
    ],
    vacation: [
      "Geniet ’n wonderlike en rustige vakansie — jy verdien dit. 🌴",
      "Neem tyd om te ontspan en nuwe energie te kry.",
      "Beste wense vir ’n reis vol vreugde en herinneringe.",
      "Veilige reis en lekker ontspanning — het fun!",
      "Mag jou dae vol son en sagte oomblikke wees.",
      "Geniet elke oomblik en keer terug verfris terug.",
      "Maak herinneringe en ontspan die siel.",
      "Ontspan en geniet — tot gou weer!",
      "Mag hierdie breek vir jou vreugde en rus bring.",
      "Gelukkige vakansie — kom terug met ’n glimlag."
    ]
  }
};

// If hi/zh not provided, fallback to English:
const LANG_FALLBACKS = { hi: 'en', zh: 'en' };

// === Theme helpers ===
function setThemeIcon() {
  const p = $('themeIconPath');
  const isDark = document.body.dataset.theme === 'dark';
  p.setAttribute('d', isDark
    ? 'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z'
    : 'M12 2a10 10 0 100 20 10 10 0 000-20z');
}

function toggleTheme() {
  document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', document.body.dataset.theme);
  setThemeIcon();
}

// === Message logic: pick random message for occasion+language ===
function getMessagesFor(lang, occasion) {
  // if requested lang exists use it; otherwise fallback
  const effectiveLang = MESSAGES[lang] ? lang : (LANG_FALLBACKS[lang] || 'en');
  return (MESSAGES[effectiveLang] && MESSAGES[effectiveLang][occasion]) || (MESSAGES['en'] && MESSAGES['en'][occasion]) || [];
}

function pickRandomDifferent(arr) {
  if (!arr || arr.length === 0) return null;
  if (arr.length === 1) return 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * arr.length);
  } while (idx === lastIndex);
  lastIndex = idx;
  return idx;
}

function applyRandomMessage() {
  const lang = $('language').value;
  const occ = $('occasion').value;
  if (!occ) return;
  const list = getMessagesFor(lang, occ);
  const idx = pickRandomDifferent(list);
  if (idx === null) return;
  const base = list[idx];
  // Prepend recipient and append regards if present (but don't append signature in editor)
  const r = $('recipientName').value.trim();
  const s = $('senderName').value.trim();
  let msg = base;
  if (r) msg = `Hi ${r},\n\n${msg}`;
  if (s) msg = `${msg}\n\nRegards,\n${s}`;
  $('customMessage').value = msg;
}

// === Emoji picker ===
const EMOJIS = ['😊','😂','😍','👍','🎉','💖','🌟','🍀','💪','🌻','🕊️','🙏'];
function openEmojiPicker() {
  // Remove existing if present
  const existing = document.getElementById('emojiPicker');
  if (existing) existing.remove();

  const picker = document.createElement('div');
  picker.id = 'emojiPicker';
  picker.style.position = 'absolute';
  picker.style.background = 'var(--card-bg)';
  picker.style.border = '1px solid var(--border)';
  picker.style.padding = '8px';
  picker.style.borderRadius = '8px';
  picker.style.display = 'grid';
  picker.style.gridTemplateColumns = 'repeat(6, 1fr)';
  picker.style.gap = '6px';
  picker.style.zIndex = 1200;

  EMOJIS.forEach(e => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = e;
    b.style.fontSize = '20px';
    b.style.border = 'none';
    b.style.background = 'none';
    b.style.cursor = 'pointer';
    b.addEventListener('click', () => {
      const ta = $('customMessage');
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      ta.value = ta.value.substring(0, start) + e + ta.value.substring(end);
      ta.focus();
      picker.remove();
    });
    picker.appendChild(b);
  });

  document.body.appendChild(picker);
  const rect = $('emojiButton').getBoundingClientRect();
  picker.style.top = (rect.top + window.scrollY + 36) + 'px';
  picker.style.left = (Math.min(window.innerWidth - 240, Math.max(8, rect.left + window.scrollX - 200))) + 'px';

  // close when clicking outside
  const onDocClick = (ev) => {
    if (!picker.contains(ev.target) && ev.target !== $('emojiButton')) {
      picker.remove();
      document.removeEventListener('click', onDocClick);
    }
  };
  setTimeout(()=>document.addEventListener('click', onDocClick), 0);
}

// === Signature + share/copy helpers ===
function getMessageForShareOrCopy() {
  let text = $('customMessage').value.trim();
  const s = $('senderName').value.trim();
  if (s) {
    text += `\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/`;
  }
  return text;
}

function copyMessageToClipboard() {
  const txt = getMessageForShareOrCopy();
  if (!txt) { alert('No message to copy'); return; }
  navigator.clipboard.writeText(txt).then(() => {
    alert('Message copied to clipboard');
  }).catch(()=> alert('Copy failed'));
}

// === Share handlers ===
function toggleShareOptions() {
  const box = $('shareOptions');
  box.classList.toggle('hidden');
  box.setAttribute('aria-hidden', box.classList.contains('hidden') ? 'true' : 'false');
}

function openWindowShare(urlBase) {
  const msg = getMessageForShareOrCopy();
  if (!msg) { alert('Please generate a message first'); return; }
  window.open(urlBase + encodeURIComponent(msg), '_blank');
}

function shareDevice() {
  const text = getMessageForShareOrCopy();
  if (!text) { alert('Please generate a message first'); return; }
  if (navigator.share) {
    navigator.share({ text }).catch(()=>{});
  } else {
    alert('Device share not supported on this device.');
  }
}

// === Feedback modal ===
function openFeedbackModal() {
  $('feedbackModal').classList.remove('hidden');
  $('feedbackModal').setAttribute('aria-hidden','false');
}
function closeFeedbackModal() {
  $('feedbackModal').classList.add('hidden');
  $('feedbackModal').setAttribute('aria-hidden','true');
  $('feedbackText').value = '';
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
  $('ratingScore').textContent = 'Score: 0%';
}
function setRating(r) {
  selectedRating = r;
  document.querySelectorAll('.star').forEach((s,i) => s.classList.toggle('selected', i < r));
  $('ratingScore').textContent = `Score: ${r * 20}%`;
}
function submitFeedback() {
  const fb = $('feedbackText').value.trim();
  if (!fb && selectedRating === 0) { alert('Please rate or comment'); return; }
  // for now just alert — in future persist to server/localStorage
  alert(`Thanks for your feedback — ${selectedRating}/5`);
  closeFeedbackModal();
}

// === Save simple local templates (optional small feature) ===
function saveMessageLocally(){
  const txt = $('customMessage').value.trim();
  if(!txt) return alert('Nothing to save');
  const saved = JSON.parse(localStorage.getItem('gw_saved')||'[]');
  saved.unshift({text: txt, date: new Date().toISOString()});
  localStorage.setItem('gw_saved', JSON.stringify(saved.slice(0,50)));
  alert('Saved locally');
}

// === Init and event wiring ===
window.addEventListener('DOMContentLoaded', () => {
  // theme
  document.body.dataset.theme = localStorage.getItem('theme') || 'light';
  setThemeIcon();
  $('themeToggle').addEventListener('click', () => { toggleTheme(); });

  // wiring
  $('occasion').addEventListener('change', () => { lastIndex = null; applyRandomMessage(); });
  $('language').addEventListener('change', () => { lastIndex = null; applyRandomMessage(); });
  $('senderName').addEventListener('input', () => { /* signature logic handled on share/copy */ });
  $('recipientName').addEventListener('input', () => { /* used when generating message */ });

  document.querySelectorAll('.clear-btn').forEach(b => b.addEventListener('click', (e) => {
    const t = e.currentTarget.dataset.target;
    $(t).value = '';
    applyRandomMessage();
  }));

  $('emojiButton').addEventListener('click', openEmojiPicker);
  $('refreshMsg').addEventListener('click', () => applyRandomMessage());
  $('copyBtn').addEventListener('click', copyMessageToClipboard);
  $('saveBtn').addEventListener('click', saveMessageLocally);

  $('shareBtn').addEventListener('click', () => toggleShareOptions());
  $('shareWhatsApp').addEventListener('click', () => openWindowShare('https://wa.me/?text='));
  $('shareFacebook').addEventListener('click', () => openWindowShare('https://www.facebook.com/sharer/sharer.php?u=https://mashifmj-prog.github.io/goodwisher/&quote='));
  $('shareX').addEventListener('click', () => openWindowShare('https://x.com/intent/tweet?text='));
  $('shareTelegram').addEventListener('click', () => openWindowShare('https://t.me/share/url?url=https://mashifmj-prog.github.io/goodwisher/&text='));
  $('shareEmail').addEventListener('click', () => {
    const msg = getMessageForShareOrCopy();
    if (!msg) { alert('Please generate a message first'); return; }
    const subject = encodeURIComponent('A Special Message from GoodWisher');
    const body = encodeURIComponent(msg.replace(/\n/g, '%0A'));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  });
  $('shareDevice').addEventListener('click', shareDevice);

  $('feedbackBtn').addEventListener('click', openFeedbackModal);
  $('cancelFeedback').addEventListener('click', closeFeedbackModal);
  $('submitFeedback').addEventListener('click', submitFeedback);

  // small UX: when clicking a new occasion, immediately pick a message
  // set initial message if occasion already set
  if ($('occasion').value) applyRandomMessage();
});
