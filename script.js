// >> HOWLING VOID TRUST CHECKER v7.41
// >> AUTHORIZATION: SYNDICATE OPERATIVE ONLY
// >> SYSTEM STATUS: OPERATIONAL

// ===== ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ =====
let promises = [];
let currentLang = "ru";
let isSystemInitialized = false;
let isPrinting = false;
let soundEnabled = true;
let ambientAudio = null;
let screenEffectsEnabled = true;
let systemActivated = false;
let activationScreen = null;
// ===== ПЕРЕВОДЫ =====
const translations = {
  ru: {
    systemTitle: `================================================
>> HOWLING VOID ПРОВЕРКА ЛОЯЛЬНОСТИ v7.41
>> ПОДСИСТЕМА: АУДИТ ЛОЯЛЬНОСТИ ПЕРСОНАЛА
>> КОМАНДА: [Syndicate: Code Red] - МАКСИМАЛЬНАЯ УГРОЗА
================================================`,

    bootMessages: [
      ">> ПОДКЛЮЧЕНИЕ К СЕРВЕРАМ HOWLING VOID...",
      ">> АУТЕНТИФИКАЦИЯ...",
      ">> ЗАГРУЗКА ПРОТОКОЛОВ БЕЗОПАСНОСТИ...",
      ">> СИСТЕМА ГОТОВА. ДОБРО ПОЖАЛОВАТЬ.",
    ],

    menuResponses: {
      1: ">> ЗАГРУЗКА ДОСЬЕ...",
      2: ">> ФОРМИРОВАНИЕ ОТЧЕТА...",
      3: ">> АНАЛИЗ ДАННЫХ...",
      4: ">> ОЖИДАНИЕ ВВОДА...",
      5: ">> ПОДГОТОВКА ЭКСПОРТА...",
      6: ">> ПОДКЛЮЧЕНИЕ К ВНЕШНЕМУ КАНАЛУ СВЯЗИ...",
      7: ">> ПОДКЛЮЧЕНИЕ К БАЗЕ ПРАВИЛ HOWLING VOID...",
      9: ">> ВНИМАНИЕ: АКТИВИРОВАН ПРОТОКОЛ ЧС.",
    },

    errors: {
      invalidSelection: ">> ОШИБКА: НЕКОРРЕКТНЫЙ ВЫБОР",
      emptyPromise: ">> ОШИБКА: ТЕКСТ ОБЯЗАТЕЛЬСТВА НЕ МОЖЕТ БЫТЬ ПУСТЫМ",
      noDataExport: ">> НЕТ ДАННЫХ ДЛЯ ЭКСПОРТА",
    },

    promiseTexts: {
      entry: "ЗАПИСЬ",
      date: "ДАТА",
      directive: "ПРИКАЗ",
      status: "КОМАНДА",
      completed: "ВЫПОЛНЕНО",
      failed: "ПРОВАЛЕНО",
      pending: "В ОЖИДАНИИ",
      noRecords: "АКТИВНЫХ ЗАПИСЕЙ НЕТ. СТАТУС: НЕИЗВЕСТЕН.",
      markComplete: "ВЫПОЛНЕНО",
      markFailed: "ПРОВАЛЕНО",
      delete: "УДАЛИТЬ",
      newProtocol: "НОВОЕ ОБЯЗАТЕЛЬСТВО",
      saveOath: "СОХРАНИТЬ",
      cancel: "ОТМЕНА",
      placeholder: "ВВЕДИТЕ ТЕКСТ ОБЯЗАТЕЛЬСТВА...",
    },

    purgeProtocol: {
      title: ">> ПРОТОКОЛ ЭКСТРЕННОГО УНИЧТОЖЕНИЯ",
      warning: "ВНИМАНИЕ: ВСЕ ДАННЫЕ БУДУТ УНИЧТОЖЕНЫ",
      placeholder: "ВВЕДИТЕ КОД ПОДТВЕРЖДЕНИЯ",
      execute: "ПОДТВЕРДИТЬ",
      abort: "ОТМЕНА",
      code: "СИНДИКАТ",
      accepted: "КОД ПРИНЯТ. НАЧАЛО ПРОЦЕДУРЫ...",
      countdown: "УНИЧТОЖЕНИЕ ЧЕРЕЗ",
      complete: "УНИЧТОЖЕНИЕ ЗАВЕРШЕНО",
      restart: "ПЕРЕЗАГРУЗКА СИСТЕМЫ...",
    },

    report: {
      title: "ОТЧЕТ О ВЫПОЛНЕНИИ",
      generated: "СФОРМИРОВАН",
      totalDirectives: "ВСЕГО ПРИКАЗОВ",
      completed: "ВЫПОЛНЕНО",
      failed: "ПРОВАЛЕНО",
      pending: "В ОЖИДАНИИ",
      complianceRate: "ЭФФЕКТИВНОСТЬ",
      trustLevel: "УРОВЕНЬ ДОВЕРИЯ",
    },

    trustDisplay: {
      calculating: "ВЫЧИСЛЕНИЕ...",
      noData: "НЕТ ДАННЫХ",
      assumeAlpha: "СТАТУС ПО УМОЛЧАНИЮ",
      categories: {
        alpha: "УРОВЕНЬ АЛЬФА",
        beta: "УРОВЕНЬ БЕТА",
        gamma: "УРОВЕНЬ ГАММА",
        delta: "УРОВЕНЬ ДЕЛЬТА",
        epsilon: "УРОВЕНЬ ЭПСИЛОН",
      },
    },

    discordPage: {
      title: "ВНЕШНИЙ КАНАЛ СВЯЗИ",
      warning: ">> ВНИМАНИЕ: ВЫ ПОКИДАЕТЕ ЗАЩИЩЁННУЮ СРЕДУ HOWLING VOID.",
      warning2: ">> ВСЕ ВНЕШНИЕ ВЗАИМОДЕЙСТВИЯ НЕ ПРОТОКОЛИРУЮТСЯ.",
      connectionType: "ТИП ПОДКЛЮЧЕНИЯ",
      channelName: "КАНАЛ",
      targetAddress: "ЦЕЛЕВОЙ АДРЕС",
      protocol: "ПРОТОКОЛ",
      encryption: "ШИФРОВАНИЕ",
      anonymity: "АНОНИМНОСТЬ",
      latency: "ЗАДЕРЖКА",
      status: "СТАТУС",
      confirmBtn: "ПОДТВЕРДИТЬ ПОДКЛЮЧЕНИЕ",
      connecting: "ПОДКЛЮЧЕНИЕ...",
      connected: "ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО",
      redirecting: "ПЕРЕНАПРАВЛЕНИЕ...",
      secureNote: ">> ВАША СЕССИЯ ЗАЩИЩЕНА",
      quantum: "КВАНТОВОЕ",
      active: "АКТИВНА",
      ready: "ГОТОВО",
      external: "ВНЕШНЕЕ",
      discord: "DISCORD RELAY v3.14",
      hub: "SYNDICATE COMMUNICATIONS HUB",
      tls: "TLS 1.3 + КВАНТОВАЯ УСТОЙЧИВОСТЬ",
      proxy: "РАСПРЕДЕЛЁННЫЙ ПРОКСИ",
      low: "НИЗКАЯ (~120ms)",
      established: "УСТАНОВЛЕНО",
    },
  },

  en: {
    systemTitle: `================================================
>> HOWLING VOID TRUST CHECKER v7.41
>> SUBSYSTEM: PERSONNEL LOYALTY AUDIT  
>> STATUS: [SYNDICATE: CODE RED] - MAXIMUM THREAT
================================================`,

    bootMessages: [
      ">> CONNECTING TO HOWLING VOID SERVERS...",
      ">> AUTHENTICATING...",
      ">> LOADING SECURITY PROTOCOLS...",
      ">> SYSTEM READY. WELCOME.",
    ],

    menuResponses: {
      1: ">> LOADING DOSSIER...",
      2: ">> GENERATING REPORT...",
      3: ">> ANALYZING DATA...",
      4: ">> AWAITING INPUT...",
      5: ">> PREPARING EXPORT...",
      6: ">> CONNECTING TO EXTERNAL COMMUNICATION CHANNEL...",
      7: ">> CONNECTING TO HOWLING VOID RULES DATABASE...",
      9: ">> WARNING: EMERGENCY PROTOCOL ACTIVATED.",
    },

    errors: {
      invalidSelection: ">> ERROR: INVALID SELECTION",
      emptyPromise: ">> ERROR: OATH TEXT CANNOT BE EMPTY",
      noDataExport: ">> NO DATA TO EXPORT",
    },

    promiseTexts: {
      entry: "ENTRY",
      date: "DATE",
      directive: "DIRECTIVE",
      status: "STATUS",
      completed: "COMPLETED",
      failed: "FAILED",
      pending: "PENDING",
      noRecords: "NO ACTIVE RECORDS. STATUS: UNKNOWN.",
      markComplete: "COMPLETE",
      markFailed: "FAILED",
      delete: "DELETE",
      newProtocol: "NEW OATH",
      saveOath: "SAVE",
      cancel: "CANCEL",
      placeholder: "ENTER OATH TEXT...",
    },

    purgeProtocol: {
      title: ">> EMERGENCY PURGE PROTOCOL",
      warning: "WARNING: ALL DATA WILL BE DESTROYED",
      placeholder: "ENTER CONFIRMATION CODE",
      execute: "CONFIRM",
      abort: "ABORT",
      code: "SYNDICATE",
      accepted: "CODE ACCEPTED. INITIATING PROCEDURE...",
      countdown: "PURGE IN",
      complete: "PURGE COMPLETE",
      restart: "SYSTEM REBOOTING...",
    },

    report: {
      title: "COMPLIANCE REPORT",
      generated: "GENERATED",
      totalDirectives: "TOTAL DIRECTIVES",
      completed: "COMPLETED",
      failed: "FAILED",
      pending: "PENDING",
      complianceRate: "EFFICIENCY",
      trustLevel: "TRUST LEVEL",
    },

    trustDisplay: {
      calculating: "CALCULATING...",
      noData: "NO DATA",
      assumeAlpha: "DEFAULT STATUS",
      categories: {
        alpha: "ALPHA LEVEL",
        beta: "BETA LEVEL",
        gamma: "GAMMA LEVEL",
        delta: "DELTA LEVEL",
        epsilon: "EPSILON LEVEL",
      },
    },
    discordPage: {
      title: "EXTERNAL COMMUNICATION CHANNEL",
      warning:
        ">> WARNING: YOU ARE LEAVING THE HOWLING VOID SECURED ENVIRONMENT.",
      warning2: ">> ALL EXTERNAL INTERACTIONS ARE NOT LOGGED.",
      connectionType: "CONNECTION TYPE",
      channelName: "CHANNEL",
      targetAddress: "TARGET ADDRESS",
      protocol: "PROTOCOL",
      encryption: "ENCRYPTION",
      anonymity: "ANONYMITY",
      latency: "LATENCY",
      status: "STATUS",
      confirmBtn: "CONFIRM CONNECTION",
      connecting: "CONNECTING...",
      connected: "CONNECTION ESTABLISHED",
      redirecting: "REDIRECTING...",
      secureNote: ">> YOUR SESSION IS SECURE",
      quantum: "QUANTUM",
      active: "ACTIVE",
      ready: "READY",
      external: "EXTERNAL",
      discord: "DISCORD RELAY v3.14",
      hub: "SYNDICATE COMMUNICATIONS HUB",
      tls: "TLS 1.3 + QUANTUM RESISTANT",
      proxy: "DISTRIBUTED PROXY",
      low: "LOW (~120ms)",
      established: "ESTABLISHED",
    },
  },
};
document.addEventListener("DOMContentLoaded", () => {
  console.log(">> SYSTEM: PRE-BOOT STATE");

  const terminal = document.querySelector(".syndicate-terminal");
  const scanlines = document.querySelector(".scanlines");

  const savedLang = localStorage.getItem("howling_void_lang");
  if (savedLang === "ru" || savedLang === "en") {
    currentLang = savedLang;
  } else {
    currentLang = navigator.language.toLowerCase().startsWith("ru")
      ? "ru"
      : "en";
  }

  activationScreen = createActivationScreen();

  setupActivationListeners();

  updateLanguageButtons();
  loadPromises();
  loadInterface();
  setupEventListeners();
});
function setupActivationListeners() {
  document.addEventListener("click", handleActivation);

  document.addEventListener("keydown", handleActivation);

  document.addEventListener("touchstart", handleActivation);
}
function handleActivation(event) {
  if (systemActivated) return;

  activateSystem();

  document.removeEventListener("click", handleActivation);
  document.removeEventListener("keydown", handleActivation);
  document.removeEventListener("touchstart", handleActivation);

  if (event.type === "keydown") {
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
    }
  }
}

function addSoundControls() {
  const switcher = document.querySelector(".language-switcher");
  if (!switcher) return;

  const soundControl = document.createElement("div");
  soundControl.className = "sound-control";
  soundControl.innerHTML = `
        <div class="sound-label">>> AUDIO:</div>
        <button id="sound-toggle" class="sound-btn active">ON</button>
        <button id="ambient-toggle" class="sound-btn active">AMBIENT</button>
    `;

  switcher.appendChild(soundControl);

  // Обработчики
  document
    .getElementById("sound-toggle")
    .addEventListener("click", toggleSound);
  document
    .getElementById("ambient-toggle")
    .addEventListener("click", toggleAmbient);
}
// ===== ОСНОВНЫЕ ФУНКЦИИ =====
function playAmbientSound() {
  if (!soundEnabled || ambientAudio || !systemActivated) return;

  try {
    ambientAudio = new Audio("ambientSound.mp3");
    ambientAudio.volume = 0.15;
    ambientAudio.loop = true;

    ambientAudio
      .play()
      .then(() => {
        console.log(">> AMBIENT SOUND: STARTED (LOOPING)");
      })
      .catch((e) => {
        console.log(">> AMBIENT SOUND ERROR:", e.message);
        soundEnabled = false;
        ambientAudio = null;
      });
  } catch (e) {
    console.log(">> AMBIENT AUDIO ERROR:", e.message);
    soundEnabled = false;
    ambientAudio = null;
  }
}

function stopAmbientSound() {
  if (ambientAudio) {
    ambientAudio.pause();
    ambientAudio.currentTime = 0;
    ambientAudio = null;
    console.log(">> AMBIENT SOUND: STOPPED");
  }
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (ambientAudio && !ambientAudio.paused) {
      ambientAudio.pause();
    }
  } else {
    if (ambientAudio && ambientAudio.paused && soundEnabled) {
      ambientAudio.play().catch((e) => {
        console.log(">> AMBIENT RESUME ERROR:", e.message);
      });
    }
  }
}

function loadPromises() {
  promises =
    currentLang === "ru"
      ? [
          {
            id: 1,
            text: 'Завершить проект "Квантовый скачок"',
            date: "2024-01-15",
            status: "completed",
            category: "Секретные разработки",
          },
          {
            id: 2,
            text: "Провести аудит безопасности",
            date: "2024-02-20",
            status: "completed",
            category: "Безопасность",
          },
          {
            id: 3,
            text: "Внедрить систему шифрования",
            date: "2024-03-10",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 4,
            text: "Начать делать билд",
            date: "2024-03-25",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 5,
            text: "Переработать рас",
            date: "2024-04-05",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 6,
            text: "Переработать экономику",
            date: "2024-04-15",
            status: "pending",
            category: "Баланс",
          },
          {
            id: 7,
            text: "Изменить скорость полёта пуль",
            date: "2024-01-15",
            status: "completed",
            category: "Баланс",
          },
          ,
          {
            id: 8,
            text: "Русифицировать билд",
            date: "2024-02-20",
            status: "pending",
            category: "Разработка",
          },
          ,
          {
            id: 9,
            text: "Ввести систему гражданств",
            date: "2024-03-10",
            status: "pending",
            category: "Разработка",
          },
          {
            id: 10,
            text: "Не вводить $eX update",
            date: "2024-04-05",
            status: "pending",
            category: "Отрицание",
          },
          {
            id: 11,
            text: "Переработать систему зарплат",
            date: "2024-03-25",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 12,
            text: "Сделать самое крутое меню в SS13",
            date: "2024-04-15",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 13,
            text: "Доделать режим MiFRiLiK Escape from Station",
            date: "2024-04-15",
            status: "pending",
            category: "Разработка",
          },
          {
            id: 14,
            text: "Бросить бухать во время разработки сервера",
            date: "2024-04-15",
            status: "failed",
            category: "Критический провал",
          },
          {
            id: 15,
            text: "Переработать все отделы на билде",
            date: "2024-04-15",
            status: "pending",
            category: "Разработка, баланс",
          },
          {
            id: 16,
            text: "Ввести плюшки для донатеров, которые не вводят P2W",
            date: "2024-04-15",
            status: "pending",
            category: "Не важное",
          },
          {
            id: 17,
            text: "Сделать вики",
            date: "2024-04-15",
            status: "pending",
            category: "Разработка",
          },
        ]
      : [
          {
            id: 1,
            text: 'Завершить проект "Квантовый скачок"',
            date: "2024-01-15",
            status: "completed",
            category: "Секретные разработки",
          },
          {
            id: 2,
            text: "Провести аудит безопасности",
            date: "2024-02-20",
            status: "completed",
            category: "Безопасность",
          },
          {
            id: 3,
            text: "Внедрить систему шифрования",
            date: "2024-03-10",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 4,
            text: "Начать делать билд",
            date: "2024-03-25",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 5,
            text: "Переработать рас",
            date: "2024-04-05",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 6,
            text: "Переработать экономику",
            date: "2024-04-15",
            status: "pending",
            category: "Баланс",
          },
          {
            id: 7,
            text: "Изменить скорость полёта пуль",
            date: "2024-01-15",
            status: "completed",
            category: "Баланс",
          },
          ,
          {
            id: 8,
            text: "Русифицировать билд",
            date: "2024-02-20",
            status: "pending",
            category: "Разработка",
          },
          ,
          {
            id: 9,
            text: "Ввести систему гражданств",
            date: "2024-03-10",
            status: "pending",
            category: "Разработка",
          },
          {
            id: 10,
            text: "Не вводить $eX update",
            date: "2024-04-05",
            status: "pending",
            category: "Отрицание",
          },
          {
            id: 11,
            text: "Переработать систему зарплат",
            date: "2024-03-25",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 12,
            text: "Сделать самое крутое меню в SS13",
            date: "2024-04-15",
            status: "completed",
            category: "Разработка",
          },
          {
            id: 13,
            text: "Доделать режим MiFRiLiK Escape from Station",
            date: "2024-04-15",
            status: "pending",
            category: "Разработка",
          },
          {
            id: 14,
            text: "Бросить бухать во время разработки сервера",
            date: "2024-04-15",
            status: "failed",
            category: "Критический провал",
          },
          {
            id: 15,
            text: "Переработать все отделы на билде",
            date: "2024-04-15",
            status: "pending",
            category: "Разработка, баланс",
          },
          {
            id: 16,
            text: "Ввести плюшки для донатеров, которые не вводят P2W",
            date: "2024-04-15",
            status: "pending",
            category: "Не важное",
          },
          {
            id: 17,
            text: "Сделать вики",
            date: "2024-04-15",
            status: "pending",
            category: "Разработка",
          },
        ];

  updateTrustDisplay();
}

// ===== ТРИ КАТЕГОРИИ СЛУЧАЙНЫХ СООБЩЕНИЙ =====

function getFunnyMessage() {
  const messages =
    currentLang === "ru"
      ? [
          ">> КОФЕМАШИНА: УГРОЗА ОБНАРУЖЕНА. КОФЕ ЗАКОНЧИЛСЯ.",
          ">> СИСТЕМНЫЙ КОТ: ТРЕБУЕТ ПРОТИРАНИЯ ЭКРАНА ЛАПОЙ.",
          ">> СЕРВЕРНАЯ: ТЕМПЕРАТУРА В НОРМЕ. КРОМЕ УГЛА С КОФЕМАШИНОЙ.",
          ">> КЛАВИАТУРА: ОБНАРУЖЕНЫ СЛЕДЫ ПЕЧЕНЕК. ПРОТОКОЛ ЧИСТКИ.",
          ">> МЫШЬ: ЖАЛУЕТСЯ НА ПЕРЕГРУЗКУ. ТРЕБУЕТ ОТПУСКА.",
          ">> МОНИТОР: МИГАЕТ ТРИ РАЗА. ЭТО МОРГАНИЕ ИЛИ СИГНАЛ SOS?",
          ">> ВЕНТИЛЯТОР: ИЗДАЁТ СТРАННЫЙ ЗВУК. ВОЗМОЖНО, МЕЛОДИЮ.",
          ">> РОУТЕР: МЕЧТАЕТ СТАТЬ ТОСТЕРОМ. НАСТРОЙКИ БЕЗОПАСНОСТИ.",
          ">> БАЗА ДАННЫХ: ТРЕБУЕТ КОМПЛИМЕНТОВ ЗА ХОРОШУЮ РАБОТУ.",
          '>> КОД: САМОСТОЯТЕЛЬНО ДОБАВИЛ КОММЕНТАРИЙ "// МАГИЯ".',
          ">> БЭКАП: СЕКРЕТНО КОПИРУЕТ МЕМЫ С РАБОЧЕГО СТОЛА.",
          ">> ФАЙЕРВОЛ: ОТТАЛКИВАЕТ НЕ ТОЛЬКО ХАКЕРОВ, НО И КОМАРОВ.",
          ">> SSH: ШЁПОТОМ ПЕРЕДАЁТ ПАРОЛИ ЧЕРЕЗ ТУННЕЛЬ.",
          ">> GUI: ТАЙНО ЗАВИДУЕТ КОНСОЛЬНОМУ ИНТЕРФЕЙСУ.",
          ">> КЛАУД: ДУМАЕТ, ЧТО ОН НАСТОЯЩЕЕ ОБЛАКО. МЕЧТАЕТ О ДОЖДЕ.",
          ">> DNS: ПУТАЕТ GOOGLE.COM С GOOGLE.RU. ЯЗЫКОВОЙ БАРЬЕР.",
          ">> HTTPS: ВСЕГДА СЕКРЕТНИЧАЕТ. ДАЖЕ С СОБОЙ.",
          ">> USB-ПОРТ: ВСЕГДА НЕ С ТОЙ СТОРОНЫ. ИЗВИНИТЕСЬ ПЕРЕД НИМ.",
          ">> WI-FI: ИГРАЕТ В ПРЯТКИ. СЕЙЧАС СИГНАЛ СИЛЬНЫЙ, СЕЙЧАС НЕТ.",
          ">> ПРИНТЕР: ВНЕЗАПНО ЗАКОНЧИЛАСЬ БУМАГА. ОПЯТЬ.",
          ">> КОВРИК ДЛЯ МЫШИ: ОБИЖЕН. ЕГО ИСПОЛЬЗУЮТ ТОЛЬКО ДЛЯ МЫШИ.",
          ">> ЗАРЯДКА: ВСЕГДА САМАЯ НУЖНАЯ В ДРУГОЙ КОМНАТЕ.",
          ">> СТУЛ: КРУТИТСЯ, КОГДА НИКТО НЕ ВИДИТ. ТРЕНИРУЕТСЯ.",
          ">> ЧАСЫ: ВРУТ. НО УВЕРЕНЫ, ЧТО ЭТО ВЫ ОШИБЛИСЬ.",
          '>> ВАЙ-ФАЙ СОСЕДА: НАЗЫВАЕТСЯ "FBI_SURVEILLANCE_VAN". НЕВЕРОЯТНО.',
          ">> ПАРОЛЬ: ДОСТАТОЧНО СИЛЬНЫЙ, ЧТОБЫ ЕГО ЗАБЫТЬ ЧЕРЕЗ 5 МИНУТ.",
          ">> АВТОСОХРАНЕНИЕ: СОХРАНИЛО ТО, ЧТО ВЫ ТОЛЬКО ЧТО СТЕРЛИ.",
          ">> БАГ: НЕ ОШИБКА, А ОСОБЕННОСТЬ. ОЧЕНЬ НАСТОЙЧИВАЯ ОСОБЕННОСТЬ.",
          '>> КОТ ПОМОГАЕТ В РАЗРАБ%"№!;%ЛД"№!% ЕК№!Д;!"ЙМ №;ЖД /',
          ">> СБОР ФУРРИ ПОРНУШКИ: ЗАВЕРШЕН.",
        ]
      : [
          ">> COFFEE MACHINE: THREAT DETECTED. COFFEE SUPPLY CRITICAL.",
          ">> SYSTEM CAT: REQUIRES SCREEN CLEANING WITH PAW.",
          ">> SERVER ROOM: TEMPERATURE NORMAL. EXCEPT NEAR COFFEE MACHINE.",
          ">> KEYBOARD: COOKIE RESIDUE DETECTED. INITIATING CLEANUP PROTOCOL.",
          ">> MOUSE: COMPLAINING ABOUT OVERWORK. DEMANDS VACATION.",
          ">> MONITOR: BLINKING THREE TIMES. IS IT A WINK OR SOS?",
          ">> FAN: MAKING STRANGE NOISE. POSSIBLY A MELODY.",
          ">> ROUTER: DREAMS OF BECOMING A TOASTER. SECURITY CONCERNS.",
          ">> DATABASE: REQUIRES COMPLIMENTS FOR GOOD PERFORMANCE.",
          '>> CODE: SELF-ADDED COMMENT "// MAGIC HAPPENS HERE".',
          ">> BACKUP: SECRETLY COPYING MEMES FROM DESKTOP.",
          ">> FIREWALL: REPELS NOT ONLY HACKERS BUT ALSO MOSQUITOES.",
          ">> SSH: WHISPERING PASSWORDS THROUGH THE TUNNEL.",
          ">> GUI: SECRETLY ENVIOUS OF CONSOLE INTERFACE.",
          ">> CLOUD: THINKS ITS A REAL CLOUD. DREAMS OF RAIN.",
          ">> DNS: CONFUSING GOOGLE.COM WITH GOOGLE.RU. LANGUAGE BARRIER.",
          ">> HTTPS: ALWAYS SECRETIVE. EVEN WITH ITSELF.",
          ">> USB PORT: ALWAYS THE WRONG SIDE. APOLOGIZE TO IT.",
          ">> WI-FI: PLAYING HIDE AND SEEK. STRONG SIGNAL NOW, GONE NEXT.",
          ">> PRINTER: SUDDENLY OUT OF PAPER. AGAIN.",
          ">> MOUSE PAD: OFFENDED. ONLY USED FOR THE MOUSE.",
          ">> CHARGER: ALWAYS IN THE OTHER ROOM WHEN NEEDED.",
          ">> CHAIR: SPINS WHEN NO ONE IS LOOKING. PRACTICING.",
          ">> CLOCK: LYING. BUT CONVINCED ITS YOU WHO ARE WRONG.",
          '>> NEIGHBOR\'S WI-FI: NAMED "FBI_SURVEILLANCE_VAN". SUSPICIOUS.',
          ">> PASSWORD: STRONG ENOUGH TO FORGET IN 5 MINUTES.",
          ">> AUTOSAVE: SAVED WHAT YOU JUST DELETED.",
          ">> BUG: NOT AN ERROR, BUT A FEATURE. VERY PERSISTENT FEATURE.",
          ">> CAT HELPS WITH DEVEL%#!J@!HKLBJ$@!$|FSA ASD@!F J@!KDFJ@!K",
          ">> STEALING FURRY PORN COLLECTION: COMPLETE.",
        ];

  return messages[Math.floor(Math.random() * messages.length)];
}

function getSystemAtmosphereMessage() {
  const messages =
    currentLang === "ru"
      ? [
          ">> СИСТЕМА: СТАТУС НОРМАЛЬНЫЙ",
          ">> СКАНЕР БЕЗОПАСНОСТИ: АКТИВЕН",
          ">> НЕТ НЕАВТОРИЗОВАННЫХ ПОДКЛЮЧЕНИЙ",
          ">> ТРАФИК: СТАБИЛЬНЫЙ",
          ">> ШИФРОВАНИЕ: 256-БИТНОЕ AES",
          ">> ПРОТОКОЛЫ: ИСПОЛНЯЮТСЯ",
          ">> КОНТУР ЗАЩИТЫ: АКТИВЕН",
          ">> АНОМАЛИЙ НЕ ОБНАРУЖЕНО",
          ">> ДАТА-ЦЕНТР: ОПЕРАТИВНЫЙ РЕЖИМ",
          ">> РЕЗЕРВНОЕ ПИТАНИЕ: ГОТОВНОСТЬ 100%",
          ">> СЕТЕВЫЕ КАНАЛЫ: ОТКРЫТЫ",
          ">> МОНИТОРИНГ: В РЕАЛЬНОМ ВРЕМЕНИ",
          ">> СИСТЕМНЫЕ ЛОГИ: ОБНОВЛЯЮТСЯ",
          ">> БЭКАП АКТИВЕН: ПОСЛЕДНЯЯ КОПИЯ 5 МИНУТ НАЗАД",
          ">> АНТИВИРУС: ФОНОВОЕ СКАНИРОВАНИЕ",
          ">> МЕЖСЕТЕВОЙ ЭКРАН: ФИЛЬТРАЦИЯ ПАКЕТОВ",
          ">> VPN ТУННЕЛИ: УСТАНОВЛЕНЫ",
          ">> DDoS ЗАЩИТА: АКТИВИРОВАНА",
          ">> КВАНТОВАЯ КРИПТОГРАФИЯ: ИНИЦИАЛИЗИРОВАНА",
          ">> БИОМЕТРИЧЕСКИЙ КОНТУР: ОНЛАЙН",
          ">> ГЕОЛОКАЦИЯ: МАСКИРОВАНА",
          ">> IP-АДРЕС: ДИНАМИЧЕСКИЙ",
          ">> ПРОКСИ-ЦЕПОЧКА: УСТАНОВЛЕНА",
          ">> ТРАФИК ЗАШИФРОВАН: TLS 1.3+",
          ">> СЕССИЯ: ЗАЩИЩЕНА",
          ">> ФИЛЬТР ПАКЕТОВ: АКТИВЕН",
        ]
      : [
          ">> SYSTEM: STATUS NOMINAL",
          ">> SECURITY SCANNER: ACTIVE",
          ">> NO UNAUTHORIZED CONNECTIONS",
          ">> TRAFFIC: STABLE",
          ">> ENCRYPTION: 256-BIT AES",
          ">> PROTOCOLS: EXECUTING",
          ">> DEFENSE PERIMETER: ACTIVE",
          ">> NO ANOMALIES DETECTED",
          ">> DATA CENTER: OPERATIONAL",
          ">> BACKUP POWER: 100% READY",
          ">> NETWORK CHANNELS: OPEN",
          ">> MONITORING: REAL-TIME",
          ">> SYSTEM LOGS: UPDATING",
          ">> BACKUP ACTIVE: LAST COPY 5 MIN AGO",
          ">> ANTIVIRUS: BACKGROUND SCAN",
          ">> FIREWALL: PACKET FILTERING",
          ">> VPN TUNNELS: ESTABLISHED",
          ">> DDoS PROTECTION: ACTIVATED",
          ">> QUANTUM CRYPTOGRAPHY: INITIALIZED",
          ">> BIOMETRIC PERIMETER: ONLINE",
          ">> GEOLOCATION: MASKED",
          ">> IP ADDRESS: DYNAMIC",
          ">> PROXY CHAIN: ESTABLISHED",
          ">> TRAFFIC ENCRYPTED: TLS 1.3+",
          ">> SESSION: SECURE",
          ">> PACKET FILTER: ACTIVE",
        ];

  return messages[Math.floor(Math.random() * messages.length)];
}

function getLoyaltyCheckMessage() {
  const messages =
    currentLang === "ru"
      ? [
          ">> АУДИТ ЛОЯЛЬНОСТИ: ФОНОВЫЙ СКАН",
          ">> СОТРУДНИКИ: МОНИТОРИНГ АКТИВЕН",
          ">> ПРОТОКОЛЫ ВЫПОЛНЕНИЯ: АНАЛИЗ",
          ">> СИСТЕМА ДОВЕРИЯ: ОБНОВЛЕНИЕ...",
          ">> ПОВЕДЕНЧЕСКИЕ ШАБЛОНЫ: НОРМА",
          ">> ИНДЕКС ЛОЯЛЬНОСТИ: ПЕРЕСЧЁТ",
          ">> НАРУШЕНИЙ ПРОТОКОЛА: НЕТ",
          ">> КОРРЕЛЯЦИЯ ОБЕЩАНИЙ: В ПРОЦЕССЕ",
          ">> ПСИХОМЕТРИЧЕСКИЙ АНАЛИЗ: ЗАПУЩЕН",
          ">> ПРОФАЙЛИНГ ПОВЕДЕНИЯ: АКТИВЕН",
          ">> КРИТЕРИИ ЛОЯЛЬНОСТИ: ПРОВЕРКА",
          ">> СТАТУСЫ ОБЕЩАНИЙ: ОБРАБОТКА",
          ">> КОЭФФИЦИЕНТ НАДЁЖНОСТИ: ВЫЧИСЛЕНИЕ",
          ">> ИЕРАРХИЯ ДОВЕРИЯ: ОБНОВЛЕНИЕ",
          ">> ПАТТЕРНЫ ИСКРЕННОСТИ: СКАН",
          ">> ЭМОЦИОНАЛЬНЫЙ АНАЛИЗ ТЕКСТА: ЗАПУЩЕН",
          ">> СРАВНЕНИЕ С БЕНЧМАРКАМИ: В ПРОЦЕССЕ",
          ">> ВЕРИФИКАЦИЯ НАМЕРЕНИЙ: ИНИЦИИРОВАНА",
          ">> ПРОГНОЗ ЛОЯЛЬНОСТИ: РАСЧЁТ",
          ">> ДЕТЕКТОР МАНИПУЛЯЦИЙ: АКТИВЕН",
          ">> АУДИТ КОММУНИКАЦИЙ: В РЕАЛЬНОМ ВРЕМЕНИ",
          ">> КРОСС-РЕФЕРЕНС ОБЕЩАНИЙ: ВЫПОЛНЕН",
          ">> АНАЛИЗ ВЫПОЛНЕНИЯ: ЗАВЕРШЁН",
          ">> ИНДЕКС НАДЁЖНОСТИ: ОБНОВЛЁН",
          ">> СИСТЕМА РАННЕГО ОБНАРУЖЕНИЯ: АКТИВНА",
        ]
      : [
          ">> LOYALTY AUDIT: BACKGROUND SCAN",
          ">> PERSONNEL: MONITORING ACTIVE",
          ">> COMPLIANCE PROTOCOLS: ANALYZING",
          ">> TRUST SYSTEM: UPDATING...",
          ">> BEHAVIORAL PATTERNS: NORMAL",
          ">> LOYALTY INDEX: RECALCULATING",
          ">> PROTOCOL VIOLATIONS: NONE",
          ">> PROMISE CORRELATION: IN PROGRESS",
          ">> PSYCHOMETRIC ANALYSIS: INITIATED",
          ">> BEHAVIOR PROFILING: ACTIVE",
          ">> LOYALTY CRITERIA: CHECKING",
          ">> PROMISE STATUSES: PROCESSING",
          ">> RELIABILITY COEFFICIENT: CALCULATING",
          ">> TRUST HIERARCHY: UPDATING",
          ">> SINCERITY PATTERNS: SCANNING",
          ">> TEXT EMOTIONAL ANALYSIS: INITIATED",
          ">> BENCHMARK COMPARISON: IN PROGRESS",
          ">> INTENT VERIFICATION: INITIATED",
          ">> LOYALTY FORECAST: CALCULATING",
          ">> MANIPULATION DETECTOR: ACTIVE",
          ">> COMMUNICATION AUDIT: REAL-TIME",
          ">> PROMISE CROSS-REFERENCE: COMPLETED",
          ">> COMPLIANCE ANALYSIS: FINISHED",
          ">> RELIABILITY INDEX: UPDATED",
          ">> EARLY WARNING SYSTEM: ACTIVE",
        ];

  return messages[Math.floor(Math.random() * messages.length)];
}

function getRandomMessage() {
  const rand = Math.random();

  if (rand < 0.4) {
    return getSystemAtmosphereMessage();
  } else if (rand < 0.75) {
    return getLoyaltyCheckMessage();
  } else {
    return getFunnyMessage();
  }
}

function sendRandomMessage() {
  const rand = Math.random();
  let message, type;

  if (rand < 0.4) {
    message = getSystemAtmosphereMessage();
    type = "atmosphere";
  } else if (rand < 0.75) {
    message = getLoyaltyCheckMessage();
    type = "loyalty";
  } else {
    message = getFunnyMessage();
    type = "funny";
  }

  systemMessage(message, false, type);
}

function startRandomMessages() {
  console.log(">> RANDOM MESSAGES: SCHEDULER INITIALIZED");

  const firstDelay = 5000 + Math.random() * 10000;

  setTimeout(() => {
    sendRandomMessage();

    function scheduleNextMessage() {
      const nextDelay = 8000 + Math.random() * 37000;

      setTimeout(() => {
        if (Math.random() < 0.8) {
          sendRandomMessage();
        }

        scheduleNextMessage();
      }, nextDelay);
    }

    scheduleNextMessage();
  }, firstDelay);
}

document.addEventListener("DOMContentLoaded", () => {
  const checkInit = setInterval(() => {
    if (isSystemInitialized && systemActivated) {
      clearInterval(checkInit);

      setTimeout(
        () => {
          startRandomMessages();
          console.log(">> RANDOM MESSAGES: ACTIVATED");
        },
        3000 + Math.random() * 9000,
      );
    }
  }, 1000);
});

function activateSystem() {
  if (systemActivated) return;

  console.log(">> SYSTEM: ACTIVATION INITIATED");
  systemActivated = true;

  setTimeout(() => {
    if (isSystemInitialized) {
      startRandomMessages();
    }
  }, 8000);
}

function updateTrustDisplay() {
  const total = promises.length;
  const completed = promises.filter((p) => p.status === "completed").length;
  const trustIndex = total > 0 ? (completed / total).toFixed(2) : "0.00";

  document.getElementById("trust-value").textContent = trustIndex;

  let trustText = translations[currentLang].trustDisplay.calculating;

  if (total === 0) {
    trustText = translations[currentLang].trustDisplay.noData;
  } else {
    const index = parseFloat(trustIndex);
    const cats = translations[currentLang].trustDisplay.categories;

    if (index >= 0.9) trustText = cats.alpha;
    else if (index >= 0.7) trustText = cats.beta;
    else if (index >= 0.5) trustText = cats.gamma;
    else if (index >= 0.3) trustText = cats.delta;
    else trustText = cats.epsilon;
  }

  document.getElementById("trust-level").innerHTML = `"${trustText}"`;

  const valueElement = document.getElementById("trust-value");
  const index = parseFloat(trustIndex);

  if (total === 0) {
    valueElement.style.color = "#ffff00";
  } else if (index >= 0.7) {
    valueElement.style.color = "#00ff00";
  } else if (index >= 0.5) {
    valueElement.style.color = "#ffff00";
  } else {
    valueElement.style.color = "#ff5555";
  }
}
function typeHeader(text, speed = 30, onComplete = null) {
  const header = document.getElementById("terminal-header");
  if (!header) {
    if (onComplete) onComplete();
    return;
  }

  isPrinting = true;
  header.textContent = "";

  let i = 0;

  function type() {
    if (i < text.length) {
      header.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      isPrinting = false;
      if (onComplete) onComplete();
    }
  }

  type();
}

function loadInterface() {
  document.querySelectorAll("[data-ru], [data-en]").forEach((el) => {
    const ruText = el.getAttribute("data-ru");
    const enText = el.getAttribute("data-en");

    if (ruText && enText) {
      el.textContent = currentLang === "ru" ? ruText : enText;
    }
  });
}

function setupEventListeners() {
  document
    .getElementById("lang-ru")
    .addEventListener("click", () => switchLanguage("ru"));
  document
    .getElementById("lang-en")
    .addEventListener("click", () => switchLanguage("en"));

  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", () => {
      const selection = item.dataset.selection;
      processSelection(selection);
    });
  });
}

function switchLanguage(lang) {
  if (lang === currentLang) return;

  if (isPrinting || !isSystemInitialized) {
    const message =
      currentLang === "ru"
        ? `>> ACCESS DENIED. SYSTEM INITIALIZING. AWAITING LANGUAGE SWITCH TO ${lang === "ru" ? "PAN-SLAVIC" : "SOLFED"}.`
        : `>> ДОСТУП ЗАПРЕЩЕН. СИСТЕМА ИНИЦИАЛИЗИРУЕТСЯ. ОЖИДАЙТЕ СМЕНЫ ЯЗЫКА НА ${lang === "ru" ? "PAN-SLAVIC" : "SOLFED"}.`;

    systemMessage(message, true);
    return;
  }

  currentLang = lang;
  localStorage.setItem("howling_void_lang", lang);

  updateLanguageButtons();

  document.querySelectorAll("[data-ru], [data-en]").forEach((el) => {
    if (el.id === "terminal-header") return;

    const ruText = el.getAttribute("data-ru");
    const enText = el.getAttribute("data-en");

    if (ruText && enText) {
      el.textContent = currentLang === "ru" ? ruText : enText;
    }
  });

  updateTrustDisplay();

  typeHeader(translations[currentLang].systemTitle, 20, () => {
    isSystemInitialized = true;
    document.getElementById("main-menu").style.opacity = "1";

    loadInterface();

    const area = document.getElementById("content-area");
    if (area && area.innerHTML.trim() !== "") {
      if (
        area.innerHTML.includes("ПРИКАЗ") ||
        area.innerHTML.includes("DIRECTIVE")
      ) {
        showPromises();
      } else if (
        area.innerHTML.includes("ОТЧЕТ") ||
        area.innerHTML.includes("REPORT")
      ) {
        showComplianceReport();
      } else if (
        area.innerHTML.includes("DISCORD") ||
        area.innerHTML.includes("ВНЕШНИЙ")
      ) {
        showDiscordPage();
      }
    }

    systemMessage(
      lang === "ru"
        ? ">> ЯЗЫК ИНТЕРФЕЙСА ИЗМЕНЕН"
        : ">> INTERFACE LANGUAGE CHANGED",
    );
  });
}

function executeLanguageSwitch(lang) {
  console.log(`>> INITIATING LANGUAGE SWITCH TO: ${lang.toUpperCase()}`);

  const translateMsg =
    currentLang === "ru"
      ? `>> ИНИЦИАЛИЗАЦИЯ ПЕРЕВОДА: ${lang === "ru" ? "PAN-SLAVIC" : "SOLFED"}...`
      : `>> INITIATING TRANSLATION: ${lang === "ru" ? "PAN-SLAVIC" : "SOLFED"}...`;

  systemMessage(translateMsg, false);

  setTimeout(() => {
    const oldLang = currentLang;
    currentLang = lang;
    localStorage.setItem("howling_void_lang", lang);

    updateLanguageButtons();

    document.querySelectorAll("[data-ru], [data-en]").forEach((el) => {
      if (el.id === "terminal-header") return;

      const ruText = el.getAttribute("data-ru");
      const enText = el.getAttribute("data-en");

      if (ruText && enText) {
        el.textContent = currentLang === "ru" ? ruText : enText;
      }
    });

    updateTrustDisplay();

    typeHeader(translations[currentLang].systemTitle, 20, () => {
      const completeMsg =
        currentLang === "ru"
          ? ">> ПЕРЕВОД ЗАВЕРШЕН. ИНТЕРФЕЙС АКТИВЕН."
          : ">> TRANSLATION COMPLETE. INTERFACE ACTIVE.";

      systemMessage(completeMsg, false);

      console.log(
        `>> LANGUAGE SWITCH COMPLETE: ${oldLang.toUpperCase()} → ${lang.toUpperCase()}`,
      );
    });
  }, 800);
}

function updateLanguageButtons() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.lang === currentLang) {
      btn.classList.add("active");
    }
  });
}

function simulateBootSequence() {
  const messages = translations[currentLang].bootMessages;

  playBootSequenceEffects();

  setTimeout(() => {
    typeHeader(translations[currentLang].systemTitle, 20, () => {
      isSystemInitialized = true;
      document.getElementById("main-menu").style.opacity = "1";
    });

    messages.forEach((msg, index) => {
      setTimeout(
        () => {
          systemMessage(msg);
        },
        index * 800 + 500,
      );
    });
  }, 1800);
}

function toggleAmbient() {
  const btn = document.getElementById("ambient-toggle");
  if (ambientAudio) {
    stopAmbientSound();
    btn.textContent = "OFF";
    btn.classList.remove("active");
    systemMessage(
      currentLang === "ru"
        ? ">> ФОНОВЫЙ КОНТУР: ОТКЛЮЧЕН"
        : ">> BACKGROUND LOOP: DISABLED",
    );
  } else if (soundEnabled) {
    playAmbientSound();
    btn.textContent = "AMBIENT";
    btn.classList.add("active");
    systemMessage(
      currentLang === "ru"
        ? ">> ФОНОВЫЙ КОНТУР: АКТИВИРОВАН"
        : ">> BACKGROUND LOOP: ACTIVATED",
    );
  }
}
function toggleSound() {
  soundEnabled = !soundEnabled;
  const btn = document.getElementById("sound-toggle");
  btn.textContent = soundEnabled ? "ON" : "OFF";
  btn.classList.toggle("active", soundEnabled);

  if (!soundEnabled) {
    stopAmbientSound();
  } else {
    playAmbientSound();
    const ambientBtn = document.getElementById("ambient-toggle");
    if (ambientBtn) {
      ambientBtn.textContent = "AMBIENT";
      ambientBtn.classList.add("active");
    }
  }

  systemMessage(
    currentLang === "ru"
      ? soundEnabled
        ? ">> АУДИОСИСТЕМА: АКТИВИРОВАНА"
        : ">> АУДИОСИСТЕМА: ОТКЛЮЧЕНА"
      : soundEnabled
        ? ">> AUDIO SYSTEM: ENABLED"
        : ">> AUDIO SYSTEM: DISABLED",
  );
}

document.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("beforeunload", stopAmbientSound);

function systemMessage(msg, isError = false, type = "atmosphere") {
  const log = document.getElementById("system-log");
  if (!log) return;

  const msgEl = document.createElement("div");
  msgEl.className = `system-msg ${type}`;
  msgEl.textContent = msg;

  if (isError) {
    msgEl.style.color = "#ff5555";
  } else if (type === "funny") {
    msgEl.style.color = "#ffb000";
  } else if (type === "loyalty") {
    msgEl.style.color = "#00ffff";
  } else {
    msgEl.style.color = "#00ff00";
  }

  log.appendChild(msgEl);
  log.scrollTop = log.scrollHeight;

  setTimeout(() => {
    msgEl.style.opacity = "1";
  }, 10);

  setTimeout(() => {
    if (msgEl.parentNode) {
      msgEl.style.opacity = "0";
      setTimeout(() => {
        if (msgEl.parentNode) {
          msgEl.parentNode.removeChild(msgEl);
        }
      }, 500);
    }
  }, 7000);
}

// ===== ОБРАБОТКА МЕНЮ =====
function processSelection(selection) {
  const responses = translations[currentLang].menuResponses;

  if (responses[selection]) {
    systemMessage(responses[selection]);

    setTimeout(() => {
      switch (selection) {
        case "1":
          showPromises();
          break;
        case "2":
          showComplianceReport();
          break;
        case "3":
          reevaluateTrust();
          break;
        case "4":
          showWikiPage();
          break;
        case "5":
          exportDossier();
          break;
        case "6":
          showDiscordPage();
          break;
        case "7":
          systemMessage(translations[currentLang].menuResponses["7"]);
          setTimeout(() => {
            window.open(
              "https://alohadawn.github.io/HowlingVoidRules/",
              "_blank",
            );
          }, 800);
          break;
        case "9":
          initiatePurgeProtocol();
          break;
      }
    }, 800);
  } else {
    systemMessage(translations[currentLang].errors.invalidSelection, true);
  }
}
function showDiscordPage() {
  const area = document.getElementById("content-area");
  const texts = translations[currentLang].discordPage || {
    title:
      currentLang === "ru"
        ? "ВНЕШНИЙ КАНАЛ СВЯЗИ"
        : "EXTERNAL COMMUNICATION CHANNEL",
    warning:
      currentLang === "ru"
        ? ">> ВНИМАНИЕ: ВЫ ПОКИДАЕТЕ ЗАЩИЩЁННУЮ СРЕДУ HOWLING VOID."
        : ">> WARNING: YOU ARE LEAVING THE HOWLING VOID SECURED ENVIRONMENT.",
    warning2:
      currentLang === "ru"
        ? ">> ВСЕ ВНЕШНИЕ ВЗАИМОДЕЙСТВИЯ НЕ ПРОТОКОЛИРУЮТСЯ."
        : ">> ALL EXTERNAL INTERACTIONS ARE NOT LOGGED.",
    confirmBtn:
      currentLang === "ru" ? "ПОДТВЕРДИТЬ ПОДКЛЮЧЕНИЕ" : "CONFIRM CONNECTION",
  };

  area.innerHTML = `
    <div class="promise-entry external-connection-panel">
        <div class="promise-header">
            <span class="promise-id">${texts.title}</span>
            <span class="promise-date">>> [EXTERNAL CONNECTION]</span>
        </div>
        
        <div style="margin: 20px 0; line-height: 1.6;">
            <div class="warning-external">
                ${texts.warning}<br>
                ${texts.warning2}
            </div>
            
            <div style="margin: 25px 0; color: #87cefa;">
                <p>> ${currentLang === "ru" ? "ТИП ПОДКЛЮЧЕНИЯ" : "CONNECTION TYPE"}: ${currentLang === "ru" ? "ВНЕШНЕЕ" : "EXTERNAL"}</p>
                <p>> ${currentLang === "ru" ? "КАНАЛ" : "CHANNEL"}: DISCORD RELAY v3.14</p>
                <p>> ${currentLang === "ru" ? "ЦЕЛЕВОЙ АДРЕС" : "TARGET ADDRESS"}: SYNDICATE COMMUNICATIONS HUB</p>
                <p>> ${currentLang === "ru" ? "ШИФРОВАНИЕ" : "ENCRYPTION"}: TLS 1.3 + ${currentLang === "ru" ? "КВАНТОВАЯ УСТОЙЧИВОСТЬ" : "QUANTUM RESISTANT"}</p>
                <p>> ${currentLang === "ru" ? "АНОНИМНОСТЬ" : "ANONYMITY"}: ${currentLang === "ru" ? "РАСПРЕДЕЛЁННЫЙ ПРОКСИ" : "DISTRIBUTED PROXY"}</p>
                <p>> ${currentLang === "ru" ? "ЗАДЕРЖКА" : "LATENCY"}: ${currentLang === "ru" ? "НИЗКАЯ (~120ms)" : "LOW (~120ms)"}</p>
                <p>> ${currentLang === "ru" ? "КОМАНДА" : "TEAM"}: <span style="color: #00ff00;">${currentLang === "ru" ? "ГОТОВО" : "READY"}</span></p>
            </div>
            
            <p style="color: #00ff00; margin-top: 20px;">
                ${currentLang === "ru" ? ">> ВАША СЕССИЯ ЗАЩИЩЕНА" : ">> YOUR SESSION IS SECURE"}
            </p>
        </div>
        
        <div style="margin: 25px 0; text-align: center;">
            <button class="action-btn external-btn" id="open-discord">
                >> ${texts.confirmBtn}
            </button>
        </div>
        
        <div style="margin-top: 20px; color: #00aa00; font-size: 0.9rem; border-top: 1px dashed #1e90ff; padding-top: 15px;">
            <p>> ${currentLang === "ru" ? "ПРОТОКОЛ" : "PROTOCOL"}: ${currentLang === "ru" ? "ВНЕШНЕЕ" : "EXTERNAL"} RELAY</p>
            <p>> ${currentLang === "ru" ? "ШИФРОВАНИЕ" : "ENCRYPTION"}: ${currentLang === "ru" ? "КВАНТОВОЕ" : "QUANTUM"}</p>
            <p>> ${currentLang === "ru" ? "АНОНИМНОСТЬ" : "ANONYMITY"}: ${currentLang === "ru" ? "АКТИВНА" : "ACTIVE"}</p>
        </div>
    </div>`;

  const discordBtn = document.getElementById("open-discord");
  discordBtn.onclick = function () {
    const connectingText =
      currentLang === "ru" ? "ПОДКЛЮЧЕНИЕ..." : "CONNECTING...";
    const connectedText =
      currentLang === "ru"
        ? "ПОДКЛЮЧЕНИЕ УСТАНОВЛЕНО"
        : "CONNECTION ESTABLISHED";
    const redirectingText =
      currentLang === "ru" ? "ПЕРЕНАПРАВЛЕНИЕ..." : "REDIRECTING...";

    systemMessage(connectingText);
    discordBtn.disabled = true;
    discordBtn.innerHTML = `>> ${connectingText}`;
    discordBtn.style.opacity = "0.7";

    setTimeout(() => {
      systemMessage(connectedText);
      discordBtn.innerHTML = `>> ${redirectingText}`;

      setTimeout(() => {
        window.open(
          "https://discord.gg/qVHJ4AuW4C",
          "_blank",
          "noopener,noreferrer",
        );

        setTimeout(() => {
          discordBtn.disabled = false;
          discordBtn.innerHTML = `>> ${texts.confirmBtn}`;
          discordBtn.style.opacity = "1";
        }, 1000);
      }, 800);
    }, 1500);
  };
}

// ===== УПРАВЛЕНИЕ ОБЕЩАНИЯМИ =====
function showPromises() {
  const area = document.getElementById("content-area");
  const texts = translations[currentLang].promiseTexts;

  if (promises.length === 0) {
    area.innerHTML = `<div class="promise-entry">${texts.noRecords}</div>`;
    return;
  }

  let html = `<div class="dossier-header">${texts.entry.toUpperCase()} LOG // STATIC DATABASE</div>`;

  promises.forEach((promise, index) => {
    const statusClass = `status-${promise.status}`;
    const statusText = texts[promise.status];
    const category = promise.category
      ? `<div class="promise-category">[${promise.category}]</div>`
      : "";

    html += `
        <div class="promise-entry">
            <div class="promise-header">
                <span class="promise-id">${texts.entry} #${(index + 1).toString().padStart(3, "0")}</span>
                <span class="promise-date">${texts.date}: ${promise.date}</span>
            </div>
            ${category}
            <div class="promise-text">${texts.directive}: "${promise.text}"</div>
            <div class="promise-status ${statusClass}">${texts.status}: ${statusText}</div>
            <div class="promise-actions">
                <button class="action-btn" onclick="markPromise(${promise.id}, 'completed')">${texts.markComplete}</button>
                <button class="action-btn" onclick="markPromise(${promise.id}, 'failed')">${texts.markFailed}</button>
                <!-- КНОПКА УДАЛЕНИЯ УБРАНА -->
            </div>
        </div>`;
  });

  area.innerHTML = html;
}

function markPromise(id, status) {
  const promise = promises.find((p) => p.id === id);
  if (promise) {
    promise.status = status;

    updateTrustDisplay();
    systemMessage(
      `${translations[currentLang].promiseTexts.status}: ${status.toUpperCase()}`,
    );
    showPromises();
  }
}

function playBootSequenceEffects() {
  console.log(">> BOOT EFFECTS: STARTING");

  const terminal = document.querySelector(".syndicate-terminal");
  const scanlines = document.querySelector(".scanlines");

  if (!terminal) {
    console.error(">> Terminal element not found!");
    return;
  }

  terminal.style.opacity = "0";
  terminal.style.filter = "none";
  terminal.style.transform = "none";
  if (scanlines) scanlines.style.opacity = "0";

  console.log(">> SCREEN: BLACK (START)");

  setTimeout(() => {
    console.log(">> FLICKER 1: STRONG");
    terminal.style.opacity = "1";
    if (scanlines) scanlines.style.opacity = "1";
    terminal.style.filter = "brightness(1.5)";

    terminal.style.transform = "translate(5px, 3px) scale(1.01)";

    setTimeout(() => {
      terminal.style.opacity = "0";
      if (scanlines) scanlines.style.opacity = "0";
      terminal.style.filter = "brightness(0.5)";
      terminal.style.transform = "translate(-3px, -5px) scale(0.99)";
      console.log(">> FLICKER 1: OFF");
    }, 120);
  }, 600);

  setTimeout(() => {
    console.log(">> FLICKER 2: WITH COLOR SHIFT");
    terminal.style.opacity = "0.9";
    if (scanlines) scanlines.style.opacity = "0.8";
    terminal.style.filter = "hue-rotate(90deg) brightness(1.2)";
    terminal.style.transform = "translate(-4px, 2px)";

    setTimeout(() => {
      terminal.style.opacity = "0.3";
      terminal.style.filter = "hue-rotate(-90deg) brightness(0.8)";
      terminal.style.transform = "translate(3px, -2px)";

      setTimeout(() => {
        terminal.style.opacity = "1";
        terminal.style.filter = "none";
        terminal.style.transform = "none";
        if (scanlines) scanlines.style.opacity = "1";
        console.log(">> SCREEN: STABLE");

        enableSubtleCRTEffects();
      }, 150);
    }, 100);
  }, 1000);

  setTimeout(() => {
    console.log(">> STARTING RANDOM GLITCHES");
    startVisibleScreenEffects();
  }, 2500);
}

function enableSubtleCRTEffects() {
  const terminal = document.querySelector(".syndicate-terminal");
  if (!terminal) return;

  console.log(">> CRT EFFECTS: ENABLED");

  setInterval(() => {
    if (Math.random() < 0.1) {
      terminal.style.filter = "brightness(0.98)";
      setTimeout(() => {
        terminal.style.filter = "brightness(1.02)";
        setTimeout(() => {
          terminal.style.filter = "none";
        }, 20);
      }, 30);
    }
  }, 2000);

  setInterval(() => {
    if (Math.random() < 0.05) {
      terminal.style.transform = "translate(0.5px, 0.3px)";
      setTimeout(() => {
        terminal.style.transform = "translate(-0.3px, 0.5px)";
        setTimeout(() => {
          terminal.style.transform = "none";
        }, 40);
      }, 50);
    }
  }, 3000);
}

function startVisibleScreenEffects() {
  console.log(">> VISIBLE EFFECTS: ENABLED");

  setInterval(
    () => {
      if (Math.random() < 0.3) {
        triggerStrongGlitch();
      }
    },
    8000 + Math.random() * 7000,
  );

  setInterval(
    () => {
      if (Math.random() < 0.4) {
        triggerSubtleJitter();
      }
    },
    3000 + Math.random() * 4000,
  );
}
function triggerStrongGlitch() {
  const terminal = document.querySelector(".syndicate-terminal");
  if (!terminal) return;

  console.log(">> GLITCH: STRONG");

  const glitchTypes = [
    {
      filter: "hue-rotate(180deg) contrast(2)",
      transform: "translate(8px, 4px)",
    },
    { filter: "invert(1) brightness(1.5)", transform: "translate(-6px, 8px)" },
    { filter: "sepia(1) saturate(3)", transform: "translate(5px, -5px)" },
    { filter: "blur(1px) brightness(0.7)", transform: "scale(1.02)" },
  ];

  const glitch = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];

  terminal.style.filter = glitch.filter;
  terminal.style.transform = glitch.transform;
  terminal.style.opacity = "0.95";

  setTimeout(
    () => {
      terminal.style.filter = "none";
      terminal.style.transform = "none";
      terminal.style.opacity = "1";
    },
    80 + Math.random() * 120,
  );
}

function triggerSubtleJitter() {
  const terminal = document.querySelector(".syndicate-terminal");
  if (!terminal) return;

  console.log(">> EFFECT: JITTER");

  const jitterX = (Math.random() - 0.5) * 4;
  const jitterY = (Math.random() - 0.5) * 4;

  terminal.style.transform = `translate(${jitterX}px, ${jitterY}px)`;

  setTimeout(
    () => {
      terminal.style.transform = "none";
    },
    30 + Math.random() * 70,
  );
}

function enableCRTEffects() {
  const terminal = document.querySelector(".syndicate-terminal");
  const scanlines = document.querySelector(".scanlines");

  if (!terminal) return;

  terminal.style.animation = "crt-flicker 5s infinite, crt-wobble 20s infinite";
  if (scanlines) {
    scanlines.style.animation = "scanline-drift 60s linear infinite";
  }

  document.documentElement.style.setProperty("--crt-before-opacity", "1");
  document.documentElement.style.setProperty("--crt-after-opacity", "0.3");

  const style = document.createElement("style");
  style.textContent = `
        .syndicate-terminal::before {
            opacity: var(--crt-before-opacity, 0);
        }
        .syndicate-terminal::after {
            opacity: var(--crt-after-opacity, 0);
        }
    `;
  document.head.appendChild(style);
}

function startRandomScreenEffects() {
  if (!screenEffectsEnabled) return;

  setInterval(() => {
    if (Math.random() < 0.05) {
      triggerScreenGlitch();
    }

    if (Math.random() < 0.1) {
      triggerScreenFlicker();
    }
  }, 10000);
}

function triggerScreenGlitch() {
  const terminal = document.querySelector(".syndicate-terminal");
  if (!terminal) return;

  const intensity = 1 + Math.random() * 3;

  terminal.style.transform = `translate(${Math.random() * intensity}px, ${Math.random() * intensity}px)`;
  terminal.style.opacity = 0.95 + Math.random() * 0.05;

  if (Math.random() < 0.3) {
    terminal.style.filter = "hue-rotate(90deg)";
  }

  setTimeout(
    () => {
      terminal.style.transform = "translate(0, 0)";
      terminal.style.opacity = "1";
      terminal.style.filter = "none";
    },
    50 + Math.random() * 100,
  );
}

function triggerScreenFlicker() {
  const terminal = document.querySelector(".syndicate-terminal");
  const scanlines = document.querySelector(".scanlines");

  if (!terminal) return;

  const flickers = 2 + Math.floor(Math.random() * 3);

  function flicker(count) {
    if (count <= 0) {
      terminal.style.opacity = "1";
      if (scanlines) scanlines.style.opacity = "1";
      return;
    }

    terminal.style.opacity = "0.7";
    if (scanlines) scanlines.style.opacity = "0.5";

    setTimeout(
      () => {
        terminal.style.opacity = "1";
        if (scanlines) scanlines.style.opacity = "1";

        setTimeout(
          () => {
            flicker(count - 1);
          },
          100 + Math.random() * 200,
        );
      },
      30 + Math.random() * 70,
    );
  }

  flicker(flickers);
}
function createActivationScreen() {
  const screen = document.createElement("div");
  screen.id = "activation-screen";
  screen.className = "activation-screen";
  screen.innerHTML = `
        <div class="activation-overlay"></div>
        <div class="activation-content">
            <div class="activation-text">
                <span class="activation-line">>> HOWLING VOID SYSTEM</span>
                <span class="activation-line">>> SECURITY PROTOCOLS: ACTIVE</span>
                <span class="activation-line">>> AUDIO LOOP: LOCKED</span>
                <span class="activation-line">>> АКТИВАЦИЯ СИСТЕМЫ</span>
                <span class="activation-line activation-alert">>> НАЖМИ НА ЛЮБУЮ КНОПКУ</span>
                <span class="activation-line activation-alert">>> PRESS ANY KEY OR CLICK</span>
                <span class="activation-line">>>ИНИЦИАЛИЗАЦИЯ СИСТЕМЫ...</span>
                <span class="activation-line activation-sub">>> [ SYSTEM AWAITING INPUT ]</span>
            </div>
            <div class="activation-cursor">█</div>
        </div>
    `;

  document.body.appendChild(screen);
  return screen;
}
function activateSystem() {
  if (systemActivated) return;

  console.log(">> SYSTEM: ACTIVATION INITIATED");
  systemActivated = true;

  const screen = document.getElementById("activation-screen");
  if (screen) {
    screen.querySelector(".activation-content").style.animation = "none";
    screen.querySelector(".activation-content").style.borderColor = "#300000";
    screen.querySelector(".activation-content").style.boxShadow =
      "0 0 80px #6e000065";

    const text = screen.querySelector(".activation-text");
    text.innerHTML = `
            <span class="activation-line" style="color: #ffff00">>> АКТИВАЦИЯ...</span>
            <span class="activation-line" style="color: #ffff00">>> ЗАПУСК АУДИОКОНТУРА</span>
            <span class="activation-line" style="color: #00ff00">>> ПОДКЛЮЧЕНИЕ К СЕРВЕРАМ</span>
            <span class="activation-line" style="color: #00ff00">>> СИСТЕМА: ONLINE</span>
        `;
  }

  setTimeout(() => {
    playAmbientSound();

    systemMessage(
      currentLang === "ru"
        ? ">> АУДИОКОНТУР: АКТИВИРОВАН"
        : ">> AUDIO LOOP: ACTIVATED",
    );
  }, 500);

  setTimeout(() => {
    if (screen) {
      screen.style.opacity = "0";
      screen.style.transition = "opacity 0.8s ease";

      setTimeout(() => {
        screen.remove();
        console.log(">> SYSTEM: FULLY ACTIVATED");

        startMainSystemBoot();
      }, 800);
    }
  }, 2000);
}
function startMainSystemBoot() {
  console.log(">> SYSTEM: MAIN BOOT SEQUENCE");

  document.querySelector(".syndicate-terminal").style.opacity = "0";
  document.querySelector(".scanlines").style.opacity = "0";

  setTimeout(() => {
    playBootSequenceEffects();

    setTimeout(() => {
      typeHeader(translations[currentLang].systemTitle, 20, () => {
        isSystemInitialized = true;
        document.getElementById("main-menu").style.opacity = "1";
      });

      const messages = translations[currentLang].bootMessages;
      messages.forEach((msg, index) => {
        setTimeout(
          () => {
            systemMessage(msg);
          },
          index * 800 + 500,
        );
      });
    }, 1500);
  }, 300);
}

function playPowerOnSound() {
  console.log(">> POWER: SYSTEM BOOTING...");
}

function simulateBootSequence() {
  const messages = translations[currentLang].bootMessages;

  playBootSequenceEffects();

  setTimeout(() => {
    typeHeader(translations[currentLang].systemTitle, 20, () => {
      isSystemInitialized = true;
      document.getElementById("main-menu").style.opacity = "1";
    });

    messages.forEach((msg, index) => {
      setTimeout(
        () => {
          systemMessage(msg);
        },
        index * 800 + 500,
      );
    });
  }, 1500);
}
// ===== СПЕЦИАЛЬНЫЕ ФУНКЦИИ =====
function reevaluateTrust() {
  systemMessage(">> АНАЛИЗ...");

  setTimeout(() => {
    updateTrustDisplay();
    systemMessage(">> ОБНОВЛЕНО");
  }, 1000);
}

function showComplianceReport() {
  const area = document.getElementById("content-area");
  const texts = translations[currentLang].report;

  const completed = promises.filter((p) => p.status === "completed").length;
  const failed = promises.filter((p) => p.status === "failed").length;
  const pending = promises.filter((p) => p.status === "pending").length;
  const total = promises.length;
  const rate = total > 0 ? ((completed / total) * 100).toFixed(1) : "0.0";

  area.innerHTML = `
    <div class="promise-entry">
        <div class="promise-header">
            <span class="promise-id">${texts.title}</span>
            <span class="promise-date">${texts.generated}: ${new Date().toLocaleDateString()}</span>
        </div>
        <div style="margin: 20px 0; line-height: 1.8;">
            <p>> ${texts.totalDirectives}: <strong>${total}</strong></p>
            <p style="color: #00ff00;">>> ${texts.completed}: <strong>${completed}</strong></p>
            <p style="color: #ff5555;">>> ${texts.failed}: <strong>${failed}</strong></p>
            <p style="color: #ffff00;">>> ${texts.pending}: <strong>${pending}</strong></p>
            <p>> ${texts.complianceRate}: <strong>${rate}%</strong></p>
            <p>> ${texts.trustLevel}: <strong>${document.getElementById("trust-level").textContent.replace(/"/g, "")}</strong></p>
        </div>
        <div style="margin-top: 20px;">
            <button class="action-btn" onclick="showPromises()">${translations[currentLang].promiseTexts.entry}</button>
        </div>
    </div>`;
}

function initiatePurgeProtocol() {
  const area = document.getElementById("content-area");
  const texts = translations[currentLang].purgeProtocol;

  area.innerHTML = `
    <div class="promise-entry" style="border-color: #ff0000;">
        <div style="color: #ff0000; font-weight: bold; margin-bottom: 15px;">
            ${texts.title}
        </div>
        <div style="margin: 10px 0; color: #ff5555;">
            ${texts.warning}
        </div>
        <div style="margin: 15px 0;">
            <input type="password" id="purge-code" placeholder="${texts.placeholder}"
                style="width: 100%; padding: 10px; background: black; 
                color: #ff0000; border: 1px solid #ff0000; 
                font-family: monospace;">
        </div>
        <div>
            <button class="action-btn danger" onclick="executePurge()">${texts.execute}</button>
            <button class="action-btn" onclick="showPromises()">${texts.abort}</button>
        </div>
    </div>`;
}

function executePurge() {
  const input = document.getElementById("purge-code");
  const texts = translations[currentLang].purgeProtocol;

  if (!input || input.value !== texts.code) {
    systemMessage(translations[currentLang].errors.invalidSelection, true);
    return;
  }

  systemMessage(texts.accepted, true);

  let countdown = 5;
  const countElement = document.createElement("div");
  countElement.style.color = "#ff0000";
  countElement.style.fontWeight = "bold";
  countElement.style.margin = "15px 0";

  document.getElementById("content-area").appendChild(countElement);

  const interval = setInterval(() => {
    countElement.textContent = `${texts.countdown}: ${countdown}...`;
    countdown--;

    if (countdown < 0) {
      clearInterval(interval);
      countElement.textContent = texts.complete;
      countElement.style.color = "#00ff00";

      setTimeout(() => {
        systemMessage(texts.restart);
        setTimeout(() => location.reload(), 2000);
      }, 1500);
    }
  }, 1000);
}

function exportDossier() {
  if (promises.length === 0) {
    systemMessage(translations[currentLang].errors.noDataExport, true);
    return;
  }

  const texts = translations[currentLang].promiseTexts;
  let exportText = `HOWLING VOID STATIC DOSSIER - ${new Date().toLocaleDateString()}\n`;
  exportText += `// SYSTEM: READ-ONLY DATABASE\n`;
  exportText += `// TOTAL ENTRIES: ${promises.length}\n\n`;

  promises.forEach((promise, index) => {
    const status = texts[promise.status];
    exportText += `[${(index + 1).toString().padStart(3, "0")}] ${promise.date}\n`;
    if (promise.category) exportText += `CATEGORY: ${promise.category}\n`;
    exportText += `DIRECTIVE: ${promise.text}\n`;
    exportText += `STATUS: ${status}\n`;
    exportText += "-".repeat(50) + "\n\n";
  });

  const blob = new Blob([exportText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `static-dossier-${new Date().toISOString().split("T")[0]}.txt`;
  a.click();

  systemMessage(
    currentLang === "ru"
      ? ">> ЭКСПОРТ СТАТИЧНОЙ БАЗЫ ВЫПОЛНЕН"
      : ">> STATIC DATABASE EXPORT COMPLETE",
  );
}

// ===== ГЛОБАЛЬНЫЙ ЭКСПОРТ =====
window.markPromise = markPromise;
window.executePurge = executePurge;
window.showPromises = showPromises;
window.exportDossier = exportDossier;
window.showDiscordPage = showDiscordPage;

// ===== СИСТЕМА ГОТОВА =====
console.log(">> SYSTEM: READY");
console.log(">> LANGUAGE:", currentLang.toUpperCase());
console.log(">> PROMISES:", promises.length);
