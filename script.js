function $(id){return document.getElementById(id);}
let currentIndex=0;

// Multilingual messages (EN, ES, ZH, HI, AF)
const messages={
  en: {
    birthday:[
      "Happy Birthday! 🎉","Wishing you a fantastic day filled with joy!","Hope your birthday is as amazing as you!","Celebrate your day with laughter and love!","May your year ahead be full of blessings!","Another year older, another year wiser!","Cheers to your special day!","Enjoy every moment of your birthday!","Sending you birthday cheer!","May all your wishes come true today!"
    ],
    anniversary:[
      "Happy Anniversary! 💕","Wishing you many more years of love!","May your bond grow stronger each year!","Cheers to another year together!","Celebrating your love today!","Sending you love and happiness!","May your love story continue beautifully!","Happy Anniversary to a wonderful couple!","Warm wishes on your special day!","Congratulations on another year together!"
    ],
    "get-well":[
      "Get well soon! 🌻","Wishing you a speedy recovery!","Hope you feel better each day!","Sending healing thoughts your way!","Take care and get well soon!","Rest well and get stronger!","Thinking of you and hoping for quick recovery!","Wishing you comfort and wellness!","May you regain your strength soon!","Feel better and take it easy!"
    ],
    congrats:[
      "Congratulations on your achievement! 🏆","Well done! 🎉","Proud of your success!","Cheers to your accomplishment!","You did it!","Way to go!","Fantastic achievement!","Celebrating your success!","Hats off to you!","Keep shining and achieving!"
    ],
    "thank-you":[
      "Thank you for your kindness and support! 🙏","Grateful for all you do!","Thanks a lot!","Much appreciated!","Thank you sincerely!","Thanks for your help!","Heartfelt thanks!","Thank you for being wonderful!","Appreciate your efforts!","Thanks a million!"
    ],
    "good-luck":[
      "Good luck on your journey! 🍀","Wishing you all the best!","May success follow you!","Fingers crossed!","Wishing you a smooth path ahead!","Best wishes for your endeavors!","Hope everything goes well!","May fortune favor you!","Good luck and take care!","Sending you positive vibes!"
    ],
    motivation:[
      "Keep going — you can do this! 🚀","Believe in yourself!","Never give up!","Stay strong and keep pushing!","Your efforts will pay off!","Keep moving forward!","Stay motivated!","You are capable of greatness!","Persevere and succeed!","Dream big and work hard!"
    ],
    appreciation:[
      "You’re appreciated more than you know! 🌟","Thanks for everything you do!","Your effort means a lot!","Grateful for your hard work!","Appreciate your dedication!","Thank you for being amazing!","You make a difference!","Your support is invaluable!","Thanks for your commitment!","Appreciate all that you do!"
    ],
    farewell:[
      "Wishing you the best in your next adventure! 👋","Goodbye and good luck!","Farewell, take care!","Best wishes for your journey!","Will miss you!","Have a bright future!","Wishing you success ahead!","Good luck on your new path!","Safe travels!","Farewell and stay awesome!"
    ],
    encouragement:[
      "You’ve got this! 💪","Keep going!","Stay strong!","Believe in yourself!","You can do it!","Never lose hope!","Stay confident!","Push forward!","Stay motivated!","You’re capable!"
    ],
    love:[
      "You make life beautiful! ❤️","Thinking of you with love!","Sending love your way!","Love you always!","You mean so much to me!","My heart is yours!","Forever in love with you!","Love and hugs!","You are my everything!","Love conquers all!"
    ],
    condolences:[
      "Sending my deepest condolences. 🕊️","My thoughts are with you.","Wishing you peace and comfort.","I’m so sorry for your loss.","Thinking of you in this difficult time.","May memories bring you peace.","Heartfelt sympathy to you.","Sharing in your sorrow.","With deepest sympathy.","Wishing you strength and comfort."
    ],
    vacation:[
      "Enjoy your well-deserved vacation! 🌴","Relax and have fun!","Have a fantastic break!","Wish you a refreshing holiday!","Enjoy every moment!","Take time to unwind!","Have a great trip!","Safe travels and fun times!","Vacation vibes for you!","Relax, recharge, and enjoy!"
    ]
  },
  const messages_es = {
  birthday:[
    "¡Feliz cumpleaños! 🎉",
    "¡Te deseo un día fantástico lleno de alegría!",
    "¡Espero que tu cumpleaños sea tan increíble como tú!",
    "¡Celebra tu día con risas y amor!",
    "¡Que tu año esté lleno de bendiciones!",
    "¡Un año más viejo, un año más sabio!",
    "¡Salud por tu día especial!",
    "¡Disfruta cada momento de tu cumpleaños!",
    "¡Te envío alegría de cumpleaños!",
    "¡Que todos tus deseos se hagan realidad hoy!"
  ],
  anniversary:[
    "¡Feliz aniversario! 💕",
    "¡Te deseo muchos años más de amor!",
    "¡Que su vínculo se fortalezca cada año!",
    "¡Salud por otro año juntos!",
    "¡Celebrando tu amor hoy!",
    "¡Te envío amor y felicidad!",
    "¡Que tu historia de amor continúe hermosamente!",
    "¡Feliz aniversario a una pareja maravillosa!",
    "¡Deseos cálidos en tu día especial!",
    "¡Felicidades por otro año juntos!"
  ],
  "get-well":[
    "¡Recupérate pronto! 🌻",
    "¡Te deseo una pronta recuperación!",
    "¡Espero que te sientas mejor cada día!",
    "¡Envío pensamientos de sanación!",
    "¡Cuídate y mejora pronto!",
    "¡Descansa bien y recupérate!",
    "¡Pensando en ti y esperando tu pronta recuperación!",
    "¡Deseándote comodidad y bienestar!",
    "¡Que recuperes tu fuerza pronto!",
    "¡Mejórate y tómalo con calma!"
  ],
  congrats:[
    "¡Felicidades por tu logro! 🏆",
    "¡Bien hecho! 🎉",
    "¡Orgulloso de tu éxito!",
    "¡Salud por tu logro!",
    "¡Lo lograste!",
    "¡Muy bien!",
    "¡Logro fantástico!",
    "¡Celebrando tu éxito!",
    "¡Chapeau por ti!",
    "¡Sigue brillando y logrando!"
  ],
  "thank-you":[
    "¡Gracias por tu amabilidad y apoyo! 🙏",
    "¡Agradecido por todo lo que haces!",
    "¡Muchas gracias!",
    "¡Muy apreciado!",
    "¡Gracias sinceramente!",
    "¡Gracias por tu ayuda!",
    "¡Gracias de corazón!",
    "¡Gracias por ser increíble!",
    "¡Aprecio tus esfuerzos!",
    "¡Gracias infinitas!"
  ],
  "good-luck":[
    "¡Buena suerte en tu camino! 🍀",
    "¡Te deseo todo lo mejor!",
    "¡Que el éxito te siga!",
    "¡Dedos cruzados!",
    "¡Te deseo un camino sin problemas!",
    "¡Los mejores deseos para tus esfuerzos!",
    "¡Espero que todo salga bien!",
    "¡Que la fortuna te favorezca!",
    "¡Buena suerte y cuídate!",
    "¡Te envío buenas vibras!"
  ],
  motivation:[
    "¡Sigue adelante — puedes lograrlo! 🚀",
    "¡Cree en ti mismo!",
    "¡Nunca te rindas!",
    "¡Mantente fuerte y sigue adelante!",
    "¡Tus esfuerzos darán frutos!",
    "¡Sigue avanzando!",
    "¡Mantente motivado!",
    "¡Eres capaz de grandeza!",
    "¡Persevera y triunfa!",
    "¡Sueña en grande y trabaja duro!"
  ],
  appreciation:[
    "¡Eres más apreciado de lo que sabes! 🌟",
    "¡Gracias por todo lo que haces!",
    "¡Tu esfuerzo significa mucho!",
    "¡Agradecido por tu trabajo duro!",
    "¡Aprecio tu dedicación!",
    "¡Gracias por ser increíble!",
    "¡Haces la diferencia!",
    "¡Tu apoyo es invaluable!",
    "¡Gracias por tu compromiso!",
    "¡Aprecio todo lo que haces!"
  ],
  farewell:[
    "¡Te deseo lo mejor en tu próxima aventura! 👋",
    "¡Adiós y buena suerte!",
    "¡Despedida, cuídate!",
    "¡Los mejores deseos para tu viaje!",
    "¡Te extrañaré!",
    "¡Que tengas un futuro brillante!",
    "¡Deseándote éxito adelante!",
    "¡Buena suerte en tu nuevo camino!",
    "¡Viajes seguros!",
    "¡Despedida y mantente increíble!"
  ],
  encouragement:[
    "¡Tú puedes! 💪",
    "¡Sigue adelante!",
    "¡Mantente fuerte!",
    "¡Cree en ti!",
    "¡Puedes lograrlo!",
    "¡Nunca pierdas la esperanza!",
    "¡Mantente confiado!",
    "¡Avanza!",
    "¡Mantente motivado!",
    "¡Eres capaz!"
  ],
  love:[
    "¡Haces la vida hermosa! ❤️",
    "¡Pensando en ti con amor!",
    "¡Te envío amor!",
    "¡Te amo siempre!",
    "¡Significas mucho para mí!",
    "¡Mi corazón es tuyo!",
    "¡Siempre enamorado de ti!",
    "¡Amor y abrazos!",
    "¡Eres mi todo!",
    "¡El amor lo conquista todo!"
  ],
  condolences:[
    "Envío mis más profundas condolencias. 🕊️",
    "Mis pensamientos están contigo.",
    "Deseándote paz y consuelo.",
    "Lamento mucho tu pérdida.",
    "Pensando en ti en este tiempo difícil.",
    "Que los recuerdos te traigan paz.",
    "Sinceras condolencias para ti.",
    "Compartiendo tu dolor.",
    "Con la más profunda simpatía.",
    "Deseándote fuerza y consuelo."
  ],
  vacation:[
    "¡Disfruta de tus merecidas vacaciones! 🌴",
    "¡Relájate y diviértete!",
    "¡Que tengas un descanso fantástico!",
    "¡Te deseo unas vacaciones refrescantes!",
    "¡Disfruta cada momento!",
    "¡Tómate un tiempo para relajarte!",
    "¡Que tengas un gran viaje!",
    "¡Viaje seguro y momentos divertidos!",
    "¡Vibras de vacaciones para ti!",
    "¡Relájate, recarga y disfruta!"
  ]
};

  const messages_zh = {
  birthday:[
    "生日快乐！🎉",
    "祝你有一个充满欢乐的美好一天！",
    "希望你的生日像你一样精彩！",
    "用笑声和爱庆祝你的日子！",
    "愿你新的一年充满祝福！",
    "又长一岁，更智慧！",
    "为你的特别日子干杯！",
    "享受生日的每一刻！",
    "送上生日的祝福！",
    "愿你今天的所有愿望成真！"
  ],
  anniversary:[
    "结婚周年快乐！💕",
    "祝你们爱情长长久久！",
    "愿你们的感情一年比一年牢固！",
    "为你们的另一年干杯！",
    "今天一起庆祝你们的爱情！",
    "送上爱与幸福的祝福！",
    "愿你们的爱情故事美丽延续！",
    "祝一对美好的夫妻周年快乐！",
    "在你们特别的日子送上温暖的祝福！",
    "祝贺你们又度过了一年！"
  ],
  "get-well":[
    "早日康复！🌻",
    "祝你快速恢复健康！",
    "希望你每天都感觉更好！",
    "送上康复的祝福！",
    "保重身体，早日康复！",
    "好好休息，恢复体力！",
    "想着你，祝你早日康复！",
    "祝你舒适健康！",
    "愿你很快恢复力量！",
    "好好休息，慢慢恢复！"
  ],
  congrats:[
    "祝贺你的成就！🏆",
    "干得漂亮！🎉",
    "为你的成功感到骄傲！",
    "为你的成就干杯！",
    "你做到了！",
    "太棒了！",
    "了不起的成就！",
    "庆祝你的成功！",
    "向你致敬！",
    "继续闪耀，取得更多成就！"
  ],
  "thank-you":[
    "感谢你的善意和支持！🙏",
    "感激你所做的一切！",
    "非常感谢！",
    "衷心感谢！",
    "真诚的感谢！",
    "感谢你的帮助！",
    "衷心感谢你！",
    "谢谢你如此棒！",
    "感激你的付出！",
    "万分感谢！"
  ],
  "good-luck":[
    "祝你旅途顺利！🍀",
    "祝你一切顺利！",
    "愿成功伴随你！",
    "交叉手指！",
    "祝你前程顺利！",
    "祝你事事顺利！",
    "希望一切顺利！",
    "愿幸运之神眷顾你！",
    "祝你好运，保重！",
    "送上正能量给你！"
  ],
  motivation:[
    "坚持下去——你可以的！🚀",
    "相信自己！",
    "永不放弃！",
    "保持坚强，继续前进！",
    "努力会有回报！",
    "继续向前！",
    "保持动力！",
    "你有无限潜能！",
    "坚持并取得成功！",
    "敢于梦想，努力奋斗！"
  ],
  appreciation:[
    "你比你想象中更受欢迎！🌟",
    "感谢你所做的一切！",
    "你的努力意义重大！",
    "感激你的辛勤工作！",
    "感谢你的奉献！",
    "感谢你如此棒！",
    "你改变了世界！",
    "你的支持无价！",
    "感谢你的承诺！",
    "感谢你所做的一切！"
  ],
  farewell:[
    "祝你在新的旅程中一切顺利！👋",
    "再见，祝好运！",
    "告别，保重！",
    "祝你前程似锦！",
    "会想念你的！",
    "愿你未来光明！",
    "祝你成功！",
    "祝你在新路上一切顺利！",
    "旅途平安！",
    "告别并保持精彩！"
  ],
  encouragement:[
    "你可以的！💪",
    "继续努力！",
    "保持坚强！",
    "相信自己！",
    "你能做到！",
    "永不失去希望！",
    "保持自信！",
    "勇往直前！",
    "保持动力！",
    "你很有能力！"
  ],
  love:[
    "你让生活更美好！❤️",
    "想着你，充满爱意！",
    "送上我的爱！",
    "永远爱你！",
    "你对我意义重大！",
    "我的心属于你！",
    "永远爱你！",
    "爱与拥抱！",
    "你是我的一切！",
    "爱能征服一切！"
  ],
  condolences:[
    "致以最深切的哀悼。🕊️",
    "我的心与你同在。",
    "愿你获得平安与安慰。",
    "对你的失去深感遗憾。",
    "在这艰难时刻想着你。",
    "愿回忆带给你平静。",
    "向你致以衷心的慰问。",
    "与你分担哀痛。",
    "致以最深的同情。",
    "祝你坚强与安慰。"
  ],
  vacation:[
    "享受你应得的假期！🌴",
    "放松并尽情玩乐！",
    "祝你有一个美好的假期！",
    "愿你度过轻松愉快的假期！",
    "享受每一刻！",
    "好好休息，放松身心！",
    "祝你旅途愉快！",
    "安全出行，玩得开心！",
    "假期愉快！",
    "放松，充电并享受！"
  ]
};

  const messages_hi = {
  birthday:[
    "जन्मदिन मुबारक! 🎉",
    "आपका दिन खुशियों से भरा हो!",
    "आशा है आपका जन्मदिन उतना ही शानदार हो जितना आप हैं!",
    "अपने दिन का जश्न हंसी और प्यार के साथ मनाएँ!",
    "आपका नया साल आशीर्वादों से भरा हो!",
    "एक साल बड़ा, एक साल और बुद्धिमान!",
    "आपके खास दिन के लिए शुभकामनाएँ!",
    "जन्मदिन के हर पल का आनंद लें!",
    "आपको जन्मदिन की ढेरों शुभकामनाएँ!",
    "आपकी सभी इच्छाएँ आज पूरी हों!"
  ],
  anniversary:[
    "शादी की सालगिरह मुबारक! 💕",
    "आपके प्यार को और वर्षों तक बढ़ता रहे!",
    "आपका बंधन हर साल मजबूत हो!",
    "एक और साल के लिए जश्न मनाएँ!",
    "आज आपके प्यार का जश्न मनाएँ!",
    "आपको प्यार और खुशियों की शुभकामनाएँ!",
    "आपकी प्रेम कहानी खूबसूरती से जारी रहे!",
    "शानदार जोड़े को सालगिरह की शुभकामनाएँ!",
    "आपके खास दिन पर गर्मजोशी भरी शुभकामनाएँ!",
    "एक और साल साथ बिताने पर बधाई!"
  ],
  "get-well":[
    "जल्दी स्वस्थ हों! 🌻",
    "आपकी जल्दी से ठीक होने की कामना करता हूँ!",
    "आशा है कि आप हर दिन बेहतर महसूस करें!",
    "सुरक्षा और स्वास्थ्य की शुभकामनाएँ!",
    "खुद का ध्यान रखें और जल्दी ठीक हों!",
    "अच्छी तरह आराम करें और स्वस्थ हों!",
    "आपके जल्दी ठीक होने की कामना करता हूँ!",
    "आराम और स्वास्थ्य की शुभकामनाएँ!",
    "आप जल्दी ताकतवर बनें!",
    "आराम करें और धीरे-धीरे ठीक हों!"
  ],
  congrats:[
    "आपकी उपलब्धि के लिए बधाई! 🏆",
    "शाबाश! 🎉",
    "आपकी सफलता पर गर्व है!",
    "आपकी उपलब्धि के लिए जश्न मनाएँ!",
    "आपने कर दिखाया!",
    "बहुत अच्छा!",
    "शानदार उपलब्धि!",
    "आपकी सफलता का जश्न मनाएँ!",
    "आपको सलाम!",
    "ऐसी ही चमकते रहें और सफल हों!"
  ],
  "thank-you":[
    "आपकी दया और सहायता के लिए धन्यवाद! 🙏",
    "आपके किए गए सभी कार्यों के लिए आभारी हूँ!",
    "बहुत धन्यवाद!",
    "सच में आभारी!",
    "आपकी मदद के लिए धन्यवाद!",
    "आपके योगदान के लिए धन्यवाद!",
    "दिल से धन्यवाद!",
    "आप शानदार हैं, धन्यवाद!",
    "आपके प्रयासों की सराहना करता हूँ!",
    "असीम धन्यवाद!"
  ],
  "good-luck":[
    "आपके सफर के लिए शुभकामनाएँ! 🍀",
    "आपको सभी शुभकामनाएँ!",
    "सफलता आपके साथ हो!",
    "अच्छे भाग्य की कामना करता हूँ!",
    "आपके प्रयास सफल हों!",
    "आशा है कि सब कुछ सही जाए!",
    "आपके प्रयासों के लिए शुभकामनाएँ!",
    "भाग्य आपके साथ रहे!",
    "शुभकामनाएँ और ध्यान रखें!",
    "आपको शुभकामनाएँ!"
  ],
  motivation:[
    "आगे बढ़ते रहें — आप कर सकते हैं! 🚀",
    "खुद पर विश्वास करें!",
    "कभी हार न मानें!",
    "मजबूत रहें और आगे बढ़ते रहें!",
    "आपके प्रयास सफल होंगे!",
    "आगे बढ़ते रहें!",
    "प्रेरित रहें!",
    "आप महानता के काबिल हैं!",
    "सफलता पाने के लिए प्रयास करें!",
    "बड़े सपने देखें और मेहनत करें!"
  ],
  appreciation:[
    "आपकी सराहना आपके सोच से ज्यादा है! 🌟",
    "आपके किए गए सभी कामों के लिए धन्यवाद!",
    "आपका प्रयास बहुत मायने रखता है!",
    "आपकी मेहनत के लिए आभारी हूँ!",
    "आपकी समर्पण की सराहना करता हूँ!",
    "आप शानदार हैं, धन्यवाद!",
    "आप अंतर डालते हैं!",
    "आपका समर्थन अमूल्य है!",
    "आपके योगदान की सराहना करता हूँ!",
    "आपके किए गए सभी कामों के लिए धन्यवाद!"
  ],
  farewell:[
    "आपकी नई यात्रा के लिए शुभकामनाएँ! 👋",
    "विदा और शुभकामनाएँ!",
    "अलविदा, ध्यान रखें!",
    "आपकी नई राह के लिए शुभकामनाएँ!",
    "आपकी कमी खलेगी!",
    "आपका भविष्य उज्ज्वल हो!",
    "आपकी सफलता की कामना करता हूँ!",
    "नई यात्रा पर शुभकामनाएँ!",
    "सुरक्षित यात्रा करें!",
    "अलविदा और शानदार रहें!"
  ],
  encouragement:[
    "आप यह कर सकते हैं! 💪",
    "आगे बढ़ते रहें!",
    "मजबूत रहें!",
    "खुद पर विश्वास करें!",
    "आप सक्षम हैं!",
    "कभी आशा न खोएं!",
    "आत्मविश्वास बनाए रखें!",
    "आगे बढ़ें!",
    "प्रेरित रहें!",
    "आप सक्षम हैं!"
  ],
  love:[
    "आप जीवन को सुंदर बनाते हैं! ❤️",
    "आपके बारे में सोचते हुए प्यार भेज रहा हूँ!",
    "मैं आपको प्यार भेजता हूँ!",
    "हमेशा प्यार करता हूँ!",
    "आप मेरे लिए बहुत मायने रखते हैं!",
    "मेरा दिल आपका है!",
    "हमेशा प्यार करता हूँ!",
    "प्यार और आलिंगन!",
    "आप मेरी सबकुछ हैं!",
    "प्यार सब कुछ जीतता है!"
  ],
  condolences:[
    "मेरी गहरी संवेदनाएँ। 🕊️",
    "मेरे विचार आपके साथ हैं।",
    "शांति और सांत्वना की कामना करता हूँ।",
    "आपके नुकसान के लिए खेद है।",
    "इस कठिन समय में आपके बारे में सोच रहा हूँ।",
    "यादें आपको शांति दें।",
    "आपके लिए हार्दिक संवेदनाएँ।",
    "आपके दुख में साझेदारी कर रहा हूँ।",
    "गहरी सहानुभूति व्यक्त करता हूँ।",
    "शक्ति और सांत्वना की कामना करता हूँ।"
  ],
  vacation:[
    "आपकी अवकाश का आनंद लें! 🌴",
    "आराम करें और मज़े करें!",
    "आपके अवकाश के लिए शुभकामनाएँ!",
    "आपका अवकाश सुखद हो!",
    "हर पल का आनंद लें!",
    "आराम करें और तरोताजा हों!",
    "आपकी यात्रा शानदार हो!",
    "सुरक्षित यात्रा और मज़ेदार समय!",
    "अवकाश का आनंद लें!",
    "आराम करें, ऊर्जा भरें और मज़े करें!"
  ]
};

  const messages_af = {
  birthday:[
    "Gelukkige verjaarsdag! 🎉",
    "Ek hoop jy het ’n fantastiese dag vol vreugde!",
    "Mag jou verjaarsdag net so wonderlik wees soos jy!",
    "Vier jou dag met lag en liefde!",
    "Mag jou nuwe jaar vol seëninge wees!",
    "Nog ’n jaar ouer, nog ’n jaar wys!",
    "Gesondheid op jou spesiale dag!",
    "Geniet elke oomblik van jou verjaarsdag!",
    "Ek stuur verjaarsdaggroete!",
    "Mag al jou wense vandag waar word!"
  ],
  anniversary:[
    "Gelukkige herdenking! 💕",
    "Mag julle liefde nog vele jare groei!",
    "Mag julle band elke jaar sterker word!",
    "Gesondheid op nog ’n jaar saam!",
    "Vier julle liefde vandag!",
    "Ek stuur liefde en geluk!",
    "Mag julle liefdesverhaal pragtig voortduur!",
    "Gelukkige herdenking aan ’n wonderlike paartjie!",
    "Hartlike wense op julle spesiale dag!",
    "Gefeliciteerd met nog ’n jaar saam!"
  ],
  "get-well":[
    "Word gou beter! 🌻",
    "Ek wens jou ’n vinnige herstel toe!",
    "Mag jy elke dag beter voel!",
    "Ek stuur genesingsgedagtes!",
    "Sorg vir jouself en word gou beter!",
    "Rus goed en herstel!",
    "Dink aan jou en wens jou spoedige herstel toe!",
    "Ek wens jou gemak en welstand toe!",
    "Mag jy gou jou krag herwin!",
    "Word beter en neem jou tyd!"
  ],
  congrats:[
    "Baie geluk met jou prestasie! 🏆",
    "Goed gedoen! 🎉",
    "Trots op jou sukses!",
    "Gesondheid op jou prestasie!",
    "Jy het dit reggekry!",
    "Baie goed!",
    "Fantastiese prestasie!",
    "Vier jou sukses!",
    "Hoed af vir jou!",
    "Bly skitter en bereik meer!"
  ],
  "thank-you":[
    "Dankie vir jou goedhartigheid en ondersteuning! 🙏",
    "Ek waardeer alles wat jy doen!",
    "Baie dankie!",
    "Werklik waardeer!",
    "Dankie vir jou hulp!",
    "Dankie vir alles wat jy doen!",
    "Dankie van harte!",
    "Dankie dat jy so wonderlik is!",
    "Ek waardeer jou pogings!",
    "Oneindige dankie!"
  ],
  "good-luck":[
    "Sterkte op jou reis! 🍀",
    "Ek wens jou alles van die beste!",
    "Mag sukses jou volg!",
    "Ek hoop alles gaan goed!",
    "Ek wens jou ’n gladde pad toe!",
    "Beste wense vir jou pogings!",
    "Ek hoop alles werk uit!",
    "Mag geluk jou gunstig wees!",
    "Sterkte en sorg goed!",
    "Ek stuur goeie vibes!"
  ],
  motivation:[
    "Hou aan – jy kan dit doen! 🚀",
    "Glo in jouself!",
    "Moet nooit opgee nie!",
    "Bly sterk en hou aan!",
    "Jou harde werk sal vrugte dra!",
    "Hou aan beweeg!",
    "Bly gemotiveerd!",
    "Jy is tot grootsheid in staat!",
    "Volhard en slaag!",
    "Droom groot en werk hard!"
  ],
  appreciation:[
    "Jy word meer waardeer as wat jy weet! 🌟",
    "Dankie vir alles wat jy doen!",
    "Jou moeite beteken baie!",
    "Ek waardeer jou harde werk!",
    "Ek waardeer jou toewyding!",
    "Dankie dat jy so wonderlik is!",
    "Jy maak ’n verskil!",
    "Jou ondersteuning is kosbaar!",
    "Dankie vir jou toewyding!",
    "Ek waardeer alles wat jy doen!"
  ],
  farewell:[
    "Ek wens jou die beste in jou volgende avontuur! 👋",
    "Totsiens en sterkte!",
    "Afskeid, sorg goed!",
    "Beste wense vir jou reis!",
    "Ek sal jou mis!",
    "Mag jou toekoms helder wees!",
    "Ek wens jou sukses toe!",
    "Sterkte op jou nuwe pad!",
    "Veilige reis!",
    "Afskeid en bly wonderlik!"
  ],
  encouragement:[
    "Jy kan dit doen! 💪",
    "Hou aan!",
    "Bly sterk!",
    "Glo in jouself!",
    "Jy kan dit doen!",
    "Moet nooit hoop verloor nie!",
    "Bly selfversekerd!",
    "Gaan aan!",
    "Bly gemotiveerd!",
    "Jy is in staat!"
  ],
  love:[
    "Jy maak die lewe mooi! ❤️",
    "Dink aan jou met liefde!",
    "Ek stuur jou liefde!",
    "Ek sal jou altyd liefhê!",
    "Jy beteken baie vir my!",
    "My hart is joune!",
    "Ek is altyd verlief op jou!",
    "Liefde en drukkies!",
    "Jy is my alles!",
    "Liefde oorwin alles!"
  ],
  condolences:[
    "Stuur my innige meegevoel. 🕊️",
    "My gedagtes is by jou.",
    "Ek wens jou vrede en troos toe.",
    "Ek is jammer vir jou verlies.",
    "Dink aan jou in hierdie moeilike tyd.",
    "Mag herinneringe jou vrede bring.",
    "Innige meegevoel vir jou.",
    "Ek deel jou pyn.",
    "Met die diepste simpatie.",
    "Ek wens jou krag en troos toe."
  ],
  vacation:[
    "Geniet jou welverdiende vakansie! 🌴",
    "Ontspan en geniet!",
    "Mag jy ’n wonderlike vakansie hê!",
    "Ek wens jou ’n verfrissende vakansie toe!",
    "Geniet elke oomblik!",
    "Neem tyd om te ontspan!",
    "Mag jou reis wonderlik wees!",
    "Veilige reis en pret!",
    "Vakansie vibes vir jou!",
    "Ontspan, laai op en geniet!"
  ]
};

};

// DOM elements
const language=$("language");
const occasion=$("occasion");
const textarea=$("customMessage");
const nextBtn=$("nextMessage");
const clearBtn=$("clearContent");
const emojiBtn=$("emojiButton");
const recipient=$("recipientName");
const sender=$("senderName");

// Display message logic
function displayMessage(){
  let lang=language.value==='exit'?'en':language.value;
  let occ=occasion.value==='exit'?'':occasion.value;
  if(!occ){textarea.value=''; currentIndex=0; return;}
  const arr=messages[lang][occ]||["Best wishes!"];
  currentIndex=0;
  textarea.value=arr[currentIndex];
}

// Next message
nextBtn.addEventListener('click',()=>{
  let lang=language.value==='exit'?'en':language.value;
  let occ=occasion.value==='exit'?'':occasion.value;
  if(!occ) return;
  const arr=messages[lang][occ];
  currentIndex=(currentIndex+1)%arr.length;
  textarea.value=arr[currentIndex];
});

// Clear content
clearBtn.addEventListener('click',()=>{textarea.value='';});

// Emoji button
const genericEmojis=["😊","👍","💖","🌟","🎉","🙏"];
const occasionEmojis={
  birthday:["🎂","🎉","🎁"], anniversary:["💖","🥂"], /*... add for all occasions*/
};
emojiBtn.addEventListener('click',()=>{
  const occ=occasion.value;
  const emojis=occ&&occasionEmojis[occ]?occasionEmojis[occ]:genericEmojis;
  const emojiSelection=prompt("Select emoji (copy from list):\n"+emojis.join(" "));
  if(emojiSelection) textarea.value+=emojiSelection;
});

// Add sender/recipient names
function updateMessageWithName(){
  let txt=textarea.value.replace(/\n\nGenerated.*$/,"").trim();
  if(recipient.value) txt="Hi "+recipient.value+",\n\n"+txt;
  if(sender.value) txt+="\n\nRegards\n"+sender.value;
  if(recipient.value||sender.value) txt+="\n\nGenerated using GoodWisher\nhttps://mashifmj-prog.github.io/goodwisher/";
  textarea.value=txt;
}
recipient.addEventListener('input',updateMessageWithName);
sender.addEventListener('input',updateMessageWithName);

// Copy
function copyMessage(){navigator.clipboard.writeText(textarea.value).then(()=>alert("Copied!"));}

// Share modal
function openShareModal(){$("shareModal").classList.remove("hidden");}
function closeShareModal(){$("shareModal").classList.add("hidden");}

// Sharing functions
function getMessage(){return textarea.value.trim();}
function shareWhatsApp(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareFacebook(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&quote=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTwitter(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareTelegram(){let msg=getMessage(); if(!msg) return alert("No message!"); window.open(`https://t.me/share/url?url=${encodeURIComponent('https://mashifmj-prog.github.io/goodwisher/')}&text=${encodeURIComponent(msg)}`,'_blank'); closeShareModal();}
function shareEmail(){let msg=getMessage(); if(!msg) return alert("No message!"); window.location.href=`mailto:?subject=${encodeURIComponent("A Special Message from GoodWisher")}&body=${encodeURIComponent(msg.replace(/\n/g,'%0A'))}`; closeShareModal();}

// Theme toggle
function setThemeIcon(){ const p=$('themeIconPath'); const isDark=document.body.dataset.theme==='dark'; p.setAttribute('d',isDark?'M21.64 13a9 9 0 11-9-9c0 4.97 4.03 9 9 9z':'M12 2a10 10 0 100 20 10 10 0 000-20z');}
function toggleTheme(){ const body=document.body; const newTheme=body.dataset.theme==='dark'?'light':'dark'; body.dataset.theme=newTheme; localStorage.setItem('theme',newTheme); setThemeIcon();}
window.addEventListener('DOMContentLoaded',()=>{ const saved=localStorage.getItem('theme')||'light'; document.body.dataset.theme=saved; setThemeIcon(); $('themeToggle').addEventListener('click',toggleTheme);});

