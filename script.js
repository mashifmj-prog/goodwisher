let currentBaseMessage = '';
let selectedRating = 0;

function updateMessageWithName() {
  const recipientName = document.getElementById('recipientName').value.trim();
  const senderName = document.getElementById('senderName').value.trim();
  const customMessage = document.getElementById('customMessage');
  if (currentBaseMessage && recipientName && senderName) {
    customMessage.value = `${recipientName}\n\n${currentBaseMessage}\n\nRegards\n${senderName}`;
  } else if (currentBaseMessage && recipientName) {
    customMessage.value = `${recipientName}\n\n${currentBaseMessage}`;
  } else if (currentBaseMessage && senderName) {
    customMessage.value = `${currentBaseMessage}\n\nRegards\n${senderName}`;
  } else if (currentBaseMessage) {
    customMessage.value = currentBaseMessage;
  }
}

function displayMessage() {
  const occasion = document.getElementById('occasion').value;
  const language = document.getElementById('language').value;
  const messageDiv = document.getElementById('message');
  const messages = {
    en: {
      birthday: [
        'Wishing you a fantastic birthday filled with joy! 🎉',
        'Happy birthday! May your day be full of laughter and love! 🎂',
        'Celebrating you today! Have an amazing birthday! 🥳'
      ],
      anniversary: [
        'Cheers to your love and another year together! 💕',
        'Happy anniversary! Here’s to many more shared moments! 💑',
        'Congratulations on your milestone! Love grows stronger! 💖'
      ],
      'get-well': [
        'Sending you warm wishes for a speedy recovery! 🌻',
        'Get well soon! Thinking of you with care and warmth! 💊',
        'Wishing you strength and health in no time! 🌿'
      ],
      congrats: [
        'Big congrats on your amazing achievement! 🏆',
        'Well done! Your success is truly inspiring! 🎈',
        'Congratulations! Keep shining bright! 🌟'
      ],
      'thank-you': [
        'Thank you for your amazing support and kindness! 🙏',
        'Grateful for you! Your help means the world! 😊',
        'Thank you from the heart for all you do! 💝'
      ],
      'good-luck': [
        'Wishing you the best of luck in your next adventure! 🍀',
        'Good luck! You’re going to do great things! 🌈',
        'All the best for your journey ahead! 🚪'
      ],
      motivation: [
        'Keep shining, you’ve got this! 🚀',
        'You’re unstoppable! Keep pushing forward! 💥',
        'Believe in yourself, you’re on the right path! 🌟'
      ],
      appreciation: [
        'Your efforts are truly appreciated! 🌟',
        'Thank you for your incredible work and dedication! 👏',
        'You make a difference, and it’s noticed! 💛'
      ],
      farewell: [
        'Wishing you all the best on your new journey! 👋',
        'Farewell, but not goodbye! Shine in your next chapter! 🌍',
        'Best wishes as you embark on new adventures! 🚶'
      ],
      encouragement: [
        'You’re stronger than you know, keep pushing forward! 💪',
        'You’ve got this! Keep going with courage! 🦁',
        'Stay strong, you’re capable of amazing things! 🌼'
      ],
      love: [
        'You make every moment special with your love! ❤️',
        'My heart is yours, always and forever! 💞',
        'Your love lights up my world! 🌹'
      ],
      condolences: [
        'Sending heartfelt condolences in this time of loss. 🕊️',
        'With you in spirit, offering deepest sympathy. 🌹',
        'May love and memories bring you comfort. 🙏'
      ]
    },
    zh: {
      birthday: [
        '祝你生日快乐，充满欢乐！🎉',
        '生日快乐！愿你今天充满笑声和爱！🎂',
        '今天为你庆祝！祝你生日精彩！🥳'
      ],
      anniversary: [
        '为你们的爱和又一年共同生活喝彩！💕',
        '周年快乐！愿未来有更多美好时光！💑',
        '祝贺你们的里程碑！爱更加坚固！💖'
      ],
      'get-well': [
        '送上温馨的祝愿，愿你早日康复！🌻',
        '早日康复！带着关怀和温暖思念你！💊',
        '祝你早日恢复力量与健康！🌿'
      ],
      congrats: [
        '祝贺你的伟大成就！🏆',
        '干得好！你的成功真激励人心！🎈',
        '恭喜！继续闪耀光芒！🌟'
      ],
      'thank-you': [
        '感谢你的支持和善良！🙏',
        '为你感恩！你的帮助意义重大！😊',
        '衷心感谢你所做的一切！💝'
      ],
      'good-luck': [
        '祝你下个冒险好运！🍀',
        '好运！你要做大事！🌈',
        '祝你未来旅程一切顺利！🚪'
      ],
      motivation: [
        '继续闪耀，你能行！🚀',
        '你是不可阻挡的！继续前进！💥',
        '相信自己，你在正确路上！🌟'
      ],
      appreciation: [
        '你的努力非常值得赞赏！🌟',
        '感谢你的出色工作和奉献！👏',
        '你的贡献被看到，意义非凡！💛'
      ],
      farewell: [
        '祝你新旅程一切顺利！👋',
        '告别，但不是永别！在下一章闪耀！🌍',
        '祝你新冒险好运！🚶'
      ],
      encouragement: [
        '你比你想的更坚强，继续前进！💪',
        '你能行！勇敢继续！🦁',
        '保持坚强，你能做到大事！🌼'
      ],
      love: [
        '你的爱让每刻都特别！❤️',
        '我的心永远属于你！💞',
        '你的爱照亮我的世界！🌹'
      ],
      condolences: [
        '在这个失去的时刻送上衷心慰问。🕊️',
        '精神上与你同在，献上最深切的同情。🌹',
        '愿爱与回忆给你安慰。🙏'
      ]
    },
    hi: {
      birthday: [
        'आपको जन्मदिन की खुशी और आनंद की शुभकामनाएं! 🎉',
        'जन्मदिन मुबारक! आपका दिन हंसी और प्यार से भरा हो! 🎂',
        'आज आपको सेलिब्रेट कर रहे हैं! शानदार जन्मदिन हो! 🥳'
      ],
      anniversary: [
        'आपके प्यार और एक और साल के लिए शुभकामनाएं! 💕',
        'हैप्पी एनिवर्सरी! और भी कई साझा पलों के लिए! 💑',
        'आपके मील के पत्थर पर बधाई! प्यार और मजबूत हो! 💖'
      ],
      'get-well': [
        'जल्दी ठीक होने की गर्मजोशी भरी शुभकामनाएं! 🌻',
        'जल्द ठीक हो जाइए! आपके लिए देखभाल और गर्मजोशी! 💊',
        'आपको जल्दी ताकत और स्वास्थ्य की कामना! 🌿'
      ],
      congrats: [
        'आपकी शानदार उपलब्धि पर बड़ी बधाई! 🏆',
        'शाबाश! आपकी सफलता प्रेरणादायक है! 🎈',
        'बधाई हो! चमकते रहें! 🌟'
      ],
      'thank-you': [
        'आपके शानदार समर्थन और दयालुता के लिए धन्यवाद! 🙏',
        'आपके लिए आभारी! आपकी मदद बहुत मायने रखती है! 😊',
        'दिल से धन्यवाद आपके सब कुछ के लिए! 💝'
      ],
      'good-luck': [
        'आपके अगले साहसिक कार्य के लिए शुभकामनाएं! 🍀',
        'शुभकामनाएं! आप बड़े काम करेंगे! 🌈',
        'आपके भविष्य के सफर के लिए शुभकामनाएं! 🚪'
      ],
      motivation: [
        'चमकते रहें, आप कर सकते हैं! 🚀',
        'आप अजेय हैं! आगे बढ़ते रहें! 💥',
        'खुद पर विश्वास करें, आप सही रास्ते पर हैं! 🌟'
      ],
      appreciation: [
        'आपके प्रयासों की बहुत सराहना की जाती है! 🌟',
        'आपके शानदार काम और समर्पण के लिए धन्यवाद! 👏',
        'आप बदलाव लाते हैं, और यह दिखता है! 💛'
      ],
      farewell: [
        'आपके नए सफर के लिए शुभकामनाएं! 👋',
        'अलविदा, लेकिन हमेशा के लिए नहीं! अगले अध्याय में चमकें! 🌍',
        'नए साहसिक कार्यों के लिए शुभकामनाएं! 🚶'
      ],
      encouragement: [
        'आप जितना सोचते हैं उससे ज्यादा मजबूत हैं, आगे बढ़ें! 💪',
        'आप कर सकते हैं! साहस के साथ आगे बढ़ें! 🦁',
        'मजबूत रहें, आप अद्भुत चीजें कर सकते हैं! 🌼'
      ],
      love: [
        'आपके प्यार से हर पल खास बनता है! ❤️',
        'मेरा दिल हमेशा आपका है! 💞',
        'आपका प्यार मेरी दुनिया को रोशन करता है! 🌹'
      ],
      condolences: [
        'इस नुकसान के समय में हार्दिक संवेदनाएं। 🕊️',
        'आपके साथ हृदय से, गहरी संवेदना व्यक्त करते हैं। 🌹',
        'प्यार और यादें आपको सांत्वना दें। 🙏'
      ]
    },
    es: {
      birthday: [
        '¡Te deseo un cumpleaños fantástico lleno de alegría! 🎉',
        '¡Feliz cumpleaños! ¡Que tu día esté lleno de risas y amor! 🎂',
        '¡Celebrándote hoy! ¡Que tengas un cumpleaños increíble! 🥳'
      ],
      anniversary: [
        '¡Salud por su amor y otro año juntos! 💕',
        '¡Feliz aniversario! ¡Por muchos más momentos compartidos! 💑',
        '¡Felicidades por su hito! ¡El amor crece más fuerte! 💖'
      ],
      'get-well': [
        'Te envío cálidos deseos de una pronta recuperación! 🌻',
        '¡Mejorate pronto! ¡Pensando en ti con cuidado y calidez! 💊',
        '¡Te deseo fuerza y salud en poco tiempo! 🌿'
      ],
      congrats: [
        '¡Felicidades por tu increíble logro! 🏆',
        '¡Bien hecho! ¡Tu éxito es realmente inspirador! 🎈',
        '¡Felicidades! ¡Sigue brillando! 🌟'
      ],
      'thank-you': [
        '¡Gracias por tu increíble apoyo y amabilidad! 🙏',
        '¡Agradecido por ti! ¡Tu ayuda significa el mundo! 😊',
        '¡Gracias desde el corazón por todo lo que haces! 💝'
      ],
      'good-luck': [
        '¡Te deseo lo mejor de la suerte en tu próxima aventura! 🍀',
        '¡Buena suerte! ¡Vas a hacer grandes cosas! 🌈',
        '¡Todo lo mejor para tu viaje adelante! 🚪'
      ],
      motivation: [
        '¡Sigue brillando, tú puedes! 🚀',
        '¡Eres imparable! ¡Sigue adelante! 💥',
        '¡Cree en ti mismo, estás en el camino correcto! 🌟'
      ],
      appreciation: [
        '¡Tus esfuerzos son verdaderamente apreciados! 🌟',
        '¡Gracias por tu increíble trabajo y dedicación! 👏',
        '¡Haces una diferencia, y se nota! 💛'
      ],
      farewell: [
        '¡Te deseo lo mejor en tu nuevo viaje! 👋',
        '¡Despedida, pero no adiós! ¡Brilla en tu próximo capítulo! 🌍',
        '¡Mejores deseos mientras embarcas en nuevas aventuras! 🚶'
      ],
      encouragement: [
        '¡Eres más fuerte de lo que sabes, sigue adelante! 💪',
        '¡Tú puedes! ¡Sigue con coraje! 🦁',
        '¡Mantente fuerte, eres capaz de cosas increíbles! 🌼'
      ],
      love: [
        '¡Haces cada momento especial con tu amor! ❤️',
        '¡Mi corazón es tuyo, siempre y para siempre! 💞',
        '¡Tu amor ilumina mi mundo! 🌹'
      ],
      condolences: [
        'Envío condolencias de corazón en este tiempo de pérdida. 🕊️',
        'Contigo en espíritu, ofreciendo la más profunda simpatía. 🌹',
        'Que el amor y los recuerdos te traigan consuelo. 🙏'
      ]
    },
    fr: {
      birthday: [
        'Je te souhaite un anniversaire fantastique rempli de joie ! 🎉',
        'Joyeux anniversaire ! Que ta journée soit pleine de rires et d’amour ! 🎂',
        'On te célèbre aujourd’hui ! Passe un anniversaire incroyable ! 🥳'
      ],
      anniversary: [
        'À votre amour et une autre année ensemble ! 💕',
        'Joyeux anniversaire de mariage ! À de nombreux moments partagés ! 💑',
        'Félicitations pour votre étape ! L’amour grandit plus fort ! 💖'
      ],
      'get-well': [
        'Je t’envoie des vœux chaleureux pour un prompt rétablissement ! 🌻',
        'Remets-toi vite ! Je pense à toi avec soin et chaleur ! 💊',
        'Je te souhaite force et santé en un rien de temps ! 🌿'
      ],
      congrats: [
        'Félicitations pour ton incroyable réussite ! 🏆',
        'Bravo ! Ton succès est vraiment inspirant ! 🎈',
        'Félicitations ! Continue de briller ! 🌟'
      ],
      'thank-you': [
        'Merci pour ton soutien et ta gentillesse incroyables ! 🙏',
        'Reconnaissant pour toi ! Ton aide compte énormément ! 😊',
        'Merci du fond du cœur pour tout ce que tu fais ! 💝'
      ],
      'good-luck': [
        'Je te souhaite la meilleure des chances dans ta prochaine aventure ! 🍀',
        'Bonne chance ! Tu vas accomplir de grandes choses ! 🌈',
        'Tous mes vœux pour ton voyage à venir ! 🚪'
      ],
      motivation: [
        'Continue de briller, tu peux le faire ! 🚀',
        'Tu es inarrêtable ! Continue d’avancer ! 💥',
        'Crois en toi, tu es sur la bonne voie ! 🌟'
      ],
      appreciation: [
        'Tes efforts sont vraiment appréciés ! 🌟',
        'Merci pour ton travail et ton dévouement incroyables ! 👏',
        'Tu fais une différence, et ça se voit ! 💛'
      ],
      farewell: [
        'Je te souhaite le meilleur dans ton nouveau voyage ! 👋',
        'Adieu, mais pas pour toujours ! Brille dans ton prochain chapitre ! 🌍',
        'Meilleurs vœux pour tes nouvelles aventures ! 🚶'
      ],
      encouragement: [
        'Tu es plus fort que tu ne le penses, continue ! 💪',
        'Tu peux le faire ! Avance avec courage ! 🦁',
        'Reste fort, tu es capable de grandes choses ! 🌼'
      ],
      love: [
        'Tu rends chaque moment spécial avec ton amour ! ❤️',
        'Mon cœur est à toi, pour toujours ! 💞',
        'Ton amour illumine mon monde ! 🌹'
      ],
      condolences: [
        'Mes sincères condoléances dans ce moment de perte. 🕊️',
        'Avec toi en esprit, mes plus profondes sympathies. 🌹',
        'Que l’amour et les souvenirs t’apportent du réconfort. 🙏'
      ]
    },
    ar: {
      birthday: [
        'أتمنى لك عيد ميلاد رائع مليء بالفرح! 🎉',
        'عيد ميلاد سعيد! أتمنى أن يكون يومك مليئًا بالضحك والحب! 🎂',
        'نحتفل بك اليوم! أتمنى لك عيد ميلاد مذهل! 🥳'
      ],
      anniversary: [
        'تحية لمحبتكم وسنة أخرى معًا! 💕',
        'ذكرى سنوية سعيدة! إلى المزيد من اللحظات المشتركة! 💑',
        'تهانينا على معلمكم! الحب يزداد قوة! 💖'
      ],
      'get-well': [
        'أرسل لك تمنيات دافئة بالشفاء العاجل! 🌻',
        'تعافى قريبًا! أفكر بك بعناية ودفء! 💊',
        'أتمنى لك القوة والصحة في أقرب وقت! 🌿'
      ],
      congrats: [
        'تهانينا الكبيرة على إنجازك الرائع! 🏆',
        'أحسنت! نجاحك ملهم حقًا! 🎈',
        'تهانينا! استمر في التألق! 🌟'
      ],
      'thank-you': [
        'شكرًا على دعمك وطيبتك الرائعة! 🙏',
        'ممتن لك! مساعدتك تعني الكثير! 😊',
        'شكرًا من القلب على كل ما تفعله! 💝'
      ],
      'good-luck': [
        'أتمنى لك أفضل الحظ في مغامرتك القادمة! 🍀',
        'حظًا سعيدًا! ستفعل أشياء عظيمة! 🌈',
        'كل التوفيق لرحلتك القادمة! 🚪'
      ],
      motivation: [
        'استمر في التألق، أنت قادر على ذلك! 🚀',
        'أنت لا تُوقف! استمر في التقدم! 💥',
        'آمن بنفسك، أنت على الطريق الصحيح! 🌟'
      ],
      appreciation: [
        'جهودك محل تقدير كبير! 🌟',
        'شكرًا على عملك وتفانيك الرائع! 👏',
        'أنت تصنع فرقًا، وهذا ملحوظ! 💛'
      ],
      farewell: [
        'أتمنى لك الأفضل في رحلتك الجديدة! 👋',
        'وداعًا، لكن ليس إلى الأبد! تألق في الفصل التالي! 🌍',
        'أطيب التمنيات لبدء مغامرات جديدة! 🚶'
      ],
      encouragement: [
        'أنت أقوى مما تعتقد، استمر في التقدم! 💪',
        'أنت قادر على ذلك! واصل بجرأة! 🦁',
        'ابق قويًا، أنت قادر على أشياء عظيمة! 🌼'
      ],
      love: [
        'أنت تجعل كل لحظة مميزة بحبك! ❤️',
        'قلبي لك، إلى الأبد! 💞',
        'حبك يضيء عالمي! 🌹'
      ],
      condolences: [
        'أرسل تعازيّ الحارة في هذا الوقت من الخسارة. 🕊️',
        'معك بالروح، أقدم أعمق التعازي. 🌹',
        'ليمنحك الحب والذكريات العزاء. 🙏'
      ]
    },
    bn: {
      birthday: [
        'আপনার জন্মদিন আনন্দে ভরে উঠুক! 🎉',
        'জন্মদিনের শুভেচ্ছা! আপনার দিন হাসি আর ভালোবাসায় ভরে উঠুক! 🎂',
        'আজ আপনাকে উদযাপন করছি! অসাধারণ জন্মদিন হোক! 🥳'
      ],
      anniversary: [
        'আপনার ভালোবাসা এবং আরেকটি বছরের জন্য শুভেচ্ছা! 💕',
        'বিবাহবার্ষিকীর শুভেচ্ছা! আরও অনেক ভাগ করা মুহূর্তের জন্য! 💑',
        'আপনার মাইলফলকের জন্য অভিনন্দন! ভালোবাসা আরও শক্তিশালী হোক! 💖'
      ],
      'get-well': [
        'শীঘ্রই সুস্থ হওয়ার জন্য উষ্ণ শুভেচ্ছা! 🌻',
        'শীঘ্র সুস্থ হোন! আপনার জন্য যত্ন ও উষ্ণতার সাথে ভাবছি! 💊',
        'আপনার জন্য শক্তি ও স্বাস্থ্য কামনা করি! 🌿'
      ],
      congrats: [
        'আপনার অসাধারণ সাফল্যের জন্য বড় অভিনন্দন! 🏆',
        'ভালো করেছেন! আপনার সাফল্য সত্যিই অনুপ্রেরণাদায়ক! 🎈',
        'অভিনন্দন! উজ্জ্বল থাকুন! 🌟'
      ],
      'thank-you': [
        'আপনার অসাধারণ সমর্থন ও দয়ার জন্য ধন্যবাদ! 🙏',
        'আপনার জন্য কৃতজ্ঞ! আপনার সাহায্য অত্যন্ত মূল্যবান! 😊',
        'হৃদয় থেকে ধন্যবাদ আপনার সবকিছুর জন্য! 💝'
      ],
      'good-luck': [
        'আপনার পরবর্তী দুঃসাহসিক কাজে শুভকামনা! 🍀',
        'শুভকামনা! আপনি বড় কিছু করবেন! 🌈',
        'আপনার ভবিষ্যৎ যাত্রার জন্য শুভকামনা! 🚪'
      ],
      motivation: [
        'ঝকঝকে থাকুন, আপনি এটা করতে পারেন! 🚀',
        'আপনি অপ্রতিরোধ্য! এগিয়ে চলুন! 💥',
        'নিজের উপর ভরসা করুন, আপনি সঠিক পথে আছেন! 🌟'
      ],
      appreciation: [
        'আপনার প্রচেষ্টা সত্যিই প্রশংসনীয়! 🌟',
        'আপনার অসাধারণ কাজ ও নিষ্ঠার জন্য ধন্যবাদ! 👏',
        'আপনি পরিবর্তন আনেন, এবং তা লক্ষ্য করা যায়! 💛'
      ],
      farewell: [
        'আপনার নতুন যাত্রায় শুভকামনা! 👋',
        'বিদায়, কিন্তু চিরকালের জন্য নয়! পরবর্তী অধ্যায়ে ঝকঝকে থাকুন! 🌍',
        'নতুন দুঃসাহসিক কাজে শুভকামনা! 🚶'
      ],
      encouragement: [
        'আপনি যা ভাবেন তার চেয়ে শক্তিশালী, এগিয়ে চলুন! 💪',
        'আপনি এটা করতে পারেন! সাহসের সাথে এগিয়ে চলুন! 🦁',
        'মজবুত থাকুন, আপনি অসাধারণ কিছু করতে পারেন! 🌼'
      ],
      love: [
        'আপনার ভালোবাসা প্রতিটি মুহূর্তকে বিশেষ করে! ❤️',
        'আমার হৃদয় চিরকাল আপনার! 💞',
        'আপনার ভালোবাসা আমার পৃথিবীকে আলোকিত করে! 🌹'
      ],
      condolences: [
        'এই ক্ষতির সময়ে হৃদয় থেকে সমবেদনা। 🕊️',
