import { BadgeDefinition, MissionMetadata, SuspectProfile } from '../types/game';

export const MISSIONS: MissionMetadata[] = [
  // === ГЛАВА I – МЛАД ДЕТЕКТИВ (Нива 1–4) ===
  {
    id: 'mission1',
    chapter: 'chapter1',
    chapterTitle: 'Глава I – Млад детектив',
    category: 'main',
    index: 0,
    numberLabel: 'Ниво 1',
    title: 'Кой се крие зад съобщението?',
    subtitle: 'Разпознаване на измамни съобщения в пощата',
    skillFocus: 'Разпознаване на измами и критично мислене',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Училищна поща',
    briefingStory:
      'В училищната поща пристигнаха съмнителни писма за награди и спешни блокирания. Маркирай червените флагове и отдели истинските съобщения.',
    clueRewardTitle: 'Улика №1: Скрит подател',
    clueRewardText:
      'Измамните писма са изпратени от безплатни домейни и използват изкуствен таймер за паника.',
    dexHints: [
      'Провери адреса на подателя — училището не използва случайни .xyz или чужди домейни.',
      'Измамниците създават фалшива спешност („Имаш 10 минути!“), за да не провериш фактите.',
      'Никой честен конкурс не иска паролата ти или данни на банкова карта.',
    ],
  },
  {
    id: 'mission2',
    chapter: 'chapter1',
    chapterTitle: 'Глава I – Млад детектив',
    category: 'main',
    index: 1,
    numberLabel: 'Ниво 2',
    title: 'Разбий кода!',
    subtitle: 'Сигурни пароли и защита на профили',
    skillFocus: 'Защита на профили и дигитална хигиена',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Училищен портал',
    briefingStory:
      'Нападател пробва списък от слаби пароли срещу електронния дневник. Открий уязвимите комбинации и създай непробиваема парола.',
    clueRewardTitle: 'Улика №2: Отпечатък от скрипт',
    clueRewardText:
      'Нападателят използва автоматичен речник, който тества имена, години и клавишни редици.',
    dexHints: [
      'Пароли с лично име и рождена година (ivan2013) се отгатват за под секунда.',
      'Силната парола съчетава поне 10 знака: главни и малки букви, цифри и символи (!@#$).',
      'Избягвай поредици като 123456, qwerty или думата parola.',
    ],
  },
  {
    id: 'mission3',
    chapter: 'chapter1',
    chapterTitle: 'Глава I – Млад детектив',
    category: 'main',
    index: 2,
    numberLabel: 'Ниво 3',
    title: 'Опасният линк',
    subtitle: 'Разпознаване на фишинг сайтове и домейни',
    skillFocus: 'Безопасно сърфиране и защита от фишинг',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Уеб шлюз',
    briefingStory:
      'Появиха се фалшиви сайтове, копиращи училищния портал и гейминг платформи. Сравни адресите символ по символ и избери правилната реакция.',
    clueRewardTitle: 'Улика №3: Подменен домейн',
    clueRewardText:
      'Фантомът заменя буквата „o“ с „0“ и „l“ с главно „I“, за да подмами учениците.',
    dexHints: [
      'Гледай основния домейн точно преди .bg или .com — там се крият подменените знаци.',
      'HTTPS криптира връзката, но не гарантира, че самият сайт не е фалшив!',
      'Ако приятел прати странен съкратен линк, провери по друг канал дали наистина е от него.',
    ],
  },
  {
    id: 'mission4',
    chapter: 'chapter1',
    chapterTitle: 'Глава I – Млад детектив',
    category: 'main',
    index: 3,
    numberLabel: 'Ниво 4',
    title: 'Истина или лъжа?',
    subtitle: 'Проверка на достоверността на новини',
    skillFocus: 'Медийна грамотност и проверка на факти',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Медиен център',
    briefingStory:
      'Градската мрежа е залята от панически слухове и кликбейт заглавия. Сравни публикациите и отдели проверените факти.',
    clueRewardTitle: 'Улика №4: Фабрика за слухове',
    clueRewardText:
      'Фалшивите новини нямат реален автор и целят страх, за да примамят кликове.',
    dexHints: [
      'Заглавия с много удивителни и „ШОК!“ почти винаги целят силна емоция, а не истина.',
      'Надеждната статия има реален автор, точна дата и проверим официален източник.',
      'Винаги проверявай сензацията в поне два независими източника.',
    ],
  },

  // === ГЛАВА II – ОПИТЕН ИЗСЛЕДОВАТЕЛ (Нива 5–8) ===
  {
    id: 'mission5',
    chapter: 'chapter2',
    chapterTitle: 'Глава II – Опитен изследовател',
    category: 'main',
    index: 4,
    numberLabel: 'Ниво 5',
    title: 'Кибергерой',
    subtitle: 'Кибертормоз и отговорно поведение онлайн',
    skillFocus: 'Дигитална етика и реакция при инцидент',
    maxPoints: 50,
    estimatedMinutes: 4,
    citySector: 'Училищна общност',
    briefingStory:
      'В чата на класа възникват кибертормоз, опит за събиране на данни и кражба на профил. Твоите избори променят развитието на историята.',
    clueRewardTitle: 'Улика №5: Следа от вътрешния чат',
    clueRewardText:
      'Отговорните решения прекъснаха верижната атака в общността на 6. клас.',
    dexHints: [
      'При кибертормоз не отвръщай с обиди — запази екранна снимка, подкрепи жертвата и уведоми възрастен.',
      'Никога не давай домашен адрес или училище на непознати от онлайн игри.',
      'При пробит профил смени паролата, включи 2FA и предупреди контактите си.',
    ],
  },
  {
    id: 'mission6',
    chapter: 'chapter2',
    chapterTitle: 'Глава II – Опитен изследовател',
    category: 'main',
    index: 5,
    numberLabel: 'Ниво 6',
    title: 'Тайните на личните данни',
    subtitle: 'Интерактивно разпределяне на информация по ниво на риск',
    skillFocus: 'Защита на личните данни и поверителност',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Хранилище за данни',
    briefingStory:
      'Учениците не са сигурни какво могат да напишат в профила си и какво трябва да остане напълно поверително. Разпредели картите в правилните категории.',
    clueRewardTitle: 'Улика №6: Карта на изтеклите данни',
    clueRewardText:
      'Измамниците сглобяват профил на жертвата от дребни детайли — снимка с емблема на училище и телефонен номер.',
    dexHints: [
      'Пароли, ЕГН, точен адрес и телефон никога не се публикуват публично.',
      'Снимка от училище и три имена се споделят само внимателно и с доверени хора.',
      'Общи интереси като любима книга или спорт могат да се споделят спокойно, без лични координати.',
    ],
  },
  {
    id: 'mission7',
    chapter: 'chapter2',
    chapterTitle: 'Глава II – Опитен изследовател',
    category: 'main',
    index: 6,
    numberLabel: 'Ниво 7',
    title: 'Кой е непознатият?',
    subtitle: 'Разпознаване на фалшиви профили и онлайн манипулация',
    skillFocus: 'Защита от онлайн непознати и социално инженерство',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Социална мрежа',
    briefingStory:
      'Във виртуалната социална мрежа получаваш покана за приятелство от уж твой връстник. Разкрий петте подозрителни признака в разговора му.',
    clueRewardTitle: 'Улика №7: Шаблон на манипулатора',
    clueRewardText:
      'Акаунтът е маскиран като ученик, но системно изисква снимки, училище и тайна среща.',
    dexHints: [
      'Всеки непознат, който иска да пазиш разговора в тайна от родителите си, е сериозен сигнал за опасност.',
      'Подаръци или бонуси в замяна на снимка и адрес са класическа схема за изнудване.',
      'Винаги отказвай лични срещи с хора, които познаваш само онлайн, и уведомявай родител или учител.',
    ],
  },
  {
    id: 'mission8',
    chapter: 'chapter2',
    chapterTitle: 'Глава II – Опитен изследовател',
    category: 'main',
    index: 7,
    numberLabel: 'Ниво 8',
    title: 'Вирусът в системата',
    subtitle: 'Опасни файлове и действия при заразено устройство',
    skillFocus: 'Откриване на зловреден софтуер и реакция при заразяване',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Компютърен кабинет',
    briefingStory:
      'На училищен компютър са изтеглени пет файла. Изолирай опасните преди да се стартират и подреди правилната реакция при съмнение за вирус.',
    clueRewardTitle: 'Улика №8: Двоичен отпечатък',
    clueRewardText:
      'Зловредните файлове се прикриват с двойни разширения (.pdf.exe, .apk.exe) и обещания за безплатни игри.',
    dexHints: [
      'Внимавай за файлове, завършващи на .exe, .bat, .scr или с макроси (.docm) от непознат източник.',
      'Истинският учебен текст или домашно рядко изисква стартиране на изпълнима програма.',
      'При съмнение за вирус спри действията си, уведоми възрастен и сканирай устройството с антивирусна защита.',
    ],
  },

  // === ГЛАВА III – МАЙСТОР ДЕТЕКТИВ (Нива 9–12) ===
  {
    id: 'mission9',
    chapter: 'chapter3',
    chapterTitle: 'Глава III – Майстор детектив',
    category: 'main',
    index: 8,
    numberLabel: 'Ниво 9',
    title: 'Капанът на Wi-Fi',
    subtitle: 'Безопасност при обществени безжични мрежи',
    skillFocus: 'Мрежова сигурност, мобилни данни и границите на HTTPS',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Дигитално кафене',
    briefingStory:
      'В кафене на Cyber City виждаш три отворени Wi-Fi мрежи с примамливи имена. Прецени коя е безопасна и как да защитиш паролите си навън.',
    clueRewardTitle: 'Улика №9: Фалшива точка за достъп',
    clueRewardText:
      'Името „Cafe_Free_Official“ може да бъде настроено от всеки лаптоп на съседната маса („Evil Twin“).',
    dexHints: [
      'Името на една Wi-Fi мрежа НЕ доказва кой я управлява — попитай персонала или използвай мобилни данни.',
      'Никога не въвеждай банкови данни или главни пароли през непозната отворена Wi-Fi мрежа.',
      'HTTPS пази връзката между теб и сайта, но собственикът на фалшивия Wi-Fi все още може да те пренасочи към измамен домейн.',
    ],
  },
  {
    id: 'mission10',
    chapter: 'chapter3',
    chapterTitle: 'Глава III – Майстор детектив',
    category: 'main',
    index: 9,
    numberLabel: 'Ниво 10',
    title: 'Дигиталната следа',
    subtitle: 'Какво оставяме след себе си онлайн',
    skillFocus: 'Дигитална репутация и дълготрайни онлайн следи',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Градски архив',
    briefingStory:
      'Разгледай публичния профил на виртуалния герой Мартин — публикации, коментари, снимки и харесвания. Открий кои действия могат да му навредят в бъдеще.',
    clueRewardTitle: 'Улика №10: Публичен профилен запис',
    clueRewardText:
      'Всичко споделено публично остава в мрежата и може да разкрие кога домът е празен или да навреди на репутацията.',
    dexHints: [
      'Публикация „Цялото семейство сме на море за 10 дни!“ подсказва на крадците, че домът е празен.',
      'Груб коментар или обида в публичен чат остават като скрийншот дълго след като си ги изтрил.',
      'Снимка на билет с баркод или ученическа карта разкрива лични данни.',
    ],
  },
  {
    id: 'mission11',
    chapter: 'chapter3',
    chapterTitle: 'Глава III – Майстор детектив',
    category: 'main',
    index: 10,
    numberLabel: 'Ниво 11',
    title: 'Лицето на измамата',
    subtitle: 'AI изображения, фалшиви видеа и клонирани гласове',
    skillFocus: 'Разпознаване на deepfake съдържание и гласови измами',
    maxPoints: 50,
    estimatedMinutes: 4,
    citySector: 'Видео студио',
    briefingStory:
      'В мрежата се появява видео с известна личност, обещаваща лесни пари, и спешно гласово съобщение от уж познат човек за превод на пари. Открий 3 подозрителни признака!',
    clueRewardTitle: 'Улика №11: Синтетичен гласов профил',
    clueRewardText:
      'Фантомът използва генератор на глас и лице (deepfake), за да имитира близки и известни личности.',
    dexHints: [
      'При AI видеа гледай внимателно устните, мигането на очите, пръстите и странните сенки по фона.',
      'Ако „познат“ иска спешно пари с гласово съобщение, затвори и му се обади лично по реалния телефон.',
      'Само едно видео или глас вече не са достатъчно доказателство без допълнителна проверка.',
    ],
  },
  {
    id: 'mission12',
    chapter: 'chapter3',
    chapterTitle: 'Глава III – Майстор детектив',
    category: 'main',
    index: 11,
    numberLabel: 'Ниво 12',
    title: 'Последната защита',
    subtitle: 'Възстановяване и защита на компрометиран профил',
    skillFocus: 'Пълен протокол за реакция при пробив в акаунт',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Защитен център',
    briefingStory:
      'Училищен профил е бил компрометиран! Подреди петте стъпки за възстановяване в точната логическа последователност, преди да се изправиш срещу Фантома.',
    clueRewardTitle: 'Улика №12: Главният ключ за кулата',
    clueRewardText:
      'Профилът е възстановен и защитен с 2FA, а пътят към Сървърната кула на Фантома е отворен.',
    dexHints: [
      'Първо си върни контрола чрез официалния механизъм за възстановяване на платформата.',
      'После смени паролата от чисто и защитено устройство, включи 2FA и затвори чуждите активни сесии.',
      'Накрая задължително уведоми учителя или администратора, ако профилът е училищен.',
    ],
  },

  // === СПЕЦИАЛНИ ПРЕДИЗВИКАТЕЛСТВА И ФИНАЛЕН БОС ===
  {
    id: 'bonus1',
    chapter: 'special',
    chapterTitle: 'Специални предизвикателства',
    category: 'bonus',
    index: 12,
    numberLabel: 'Бонус 1',
    title: 'Детективска стая',
    subtitle: 'Свържи 10 доказателства на таблото и разкрий извършителя',
    skillFocus: 'Дедукция и свързване на улики',
    maxPoints: 50,
    estimatedMinutes: 4,
    citySector: 'Следствено табло',
    briefingStory:
      'На таблото са закачени 10 доказателства от инцидентите. Свържи правилните улики в логически двойки и посочи кой стои зад конкретната измама.',
    clueRewardTitle: 'Бонус улика №1: Схема на връзките',
    clueRewardText:
      'Връзката между домейните, фалшивите профили и нощния трафик сочи директно към Кулата на Фантома.',
    dexHints: [
      'Съпоставяй всяко дигитално доказателство с метода на атака, който го оставя.',
      'Провери часовете и адресите на тримата заподозрени, преди да посочиш виновника.',
    ],
  },
  {
    id: 'bonus2',
    chapter: 'special',
    chapterTitle: 'Специални предизвикателства',
    category: 'bonus',
    index: 13,
    numberLabel: 'Бонус 2',
    title: '60 секунди до пробива',
    subtitle: 'Бързо предизвикателство с 10 въпроса срещу часовника',
    skillFocus: 'Бърза реакция и сигурни знания под напрежение',
    maxPoints: 50,
    estimatedMinutes: 2,
    citySector: 'Авариен терминал',
    briefingStory:
      'Имаш ограничено време, за да отговориш на 10 светкавични въпроса и да спреш автоматичното изтичане на данни!',
    clueRewardTitle: 'Бонус улика №2: Блокиран трансфер',
    clueRewardText:
      'Светкавичните ти решения спряха копирането на училищния архив в последните секунди.',
    dexHints: [
      'Чети ключовите думи бързо: „парола“, „https“, „личен адрес“, „2FA“, „възрастен“.',
    ],
  },
  {
    id: 'bonus3',
    chapter: 'special',
    chapterTitle: 'Специални предизвикателства',
    category: 'bonus',
    index: 14,
    numberLabel: 'Тайна мисия',
    title: 'Сигнал от тъмната мрежа',
    subtitle: 'Отключена секретна операция за разшифроване на капан',
    skillFocus: 'Скрити заплахи, фалшиви QR кодове и социално инженерство',
    maxPoints: 50,
    estimatedMinutes: 3,
    citySector: 'Тайна лаборатория',
    briefingStory:
      'Откри тайна следа! По улиците на Cyber City са залепени плакати с QR код за „Безплатен градски транспорт и подарък“. Провери капаните в скритата операция.',
    clueRewardTitle: 'Тайна улика: Код за отслабване на Фантома',
    clueRewardText:
      'Разбихте схемата с подменените QR кодове и отслабихте защитата на главния злодей.',
    dexHints: [
      'QR код на случаен плакат може да отвори опасен фишинг сайт точно както подозрителен линк.',
      'Никога не давай права за достъп до камера, контакти и съобщения на непознати приложения.',
    ],
  },
  {
    id: 'boss',
    chapter: 'special',
    chapterTitle: 'Финална битка',
    category: 'boss',
    index: 15,
    numberLabel: 'Финален бос',
    title: 'Среща с Фантома',
    subtitle: '10 сложни задачи за пробив на защитната система на злодея',
    skillFocus: 'Пълно майсторство по киберсигурност',
    maxPoints: 250,
    estimatedMinutes: 6,
    citySector: 'Сървърна кула на Фантома',
    briefingStory:
      'Изправяш се лице в лице с Фантома! Защитният му щит има 10 слоя. Всяко правилно решение нанася точен удар (25 точки) и приближава Cyber City към пълно спасение.',
    clueRewardTitle: 'Победа над Фантома',
    clueRewardText:
      'Всички 10 защитни слоя на Фантома са разбити. Сигурността в Cyber City е възстановена!',
    dexHints: [
      'Използвай всички знания от Глава I, II и III: фишинг, пароли, лични данни, Wi-Fi, deepfake и 2FA.',
      'Внимавай при всяка задача — всеки слой на щита проверява различна дигитална заплаха.',
    ],
  },
];

export const BADGES: BadgeDefinition[] = [
  {
    id: 'scam_hunter',
    title: 'Ловец на измами',
    description: 'Завършено Ниво 1 с анализ на подозрителни имейли.',
    conditionLabel: 'Ниво 1 завършено',
  },
  {
    id: 'code_breaker',
    title: 'Майстор на паролите',
    description: 'Открити слаби пароли и създадена надеждна комбинация.',
    conditionLabel: 'Ниво 2 завършено',
  },
  {
    id: 'chapter1_graduate',
    title: 'Завършил Глава I',
    description: 'Преминати всички четири нива за Млад детектив.',
    conditionLabel: 'Нива 1–4 завършени',
  },
  {
    id: 'data_guardian',
    title: 'Пазител на данните',
    description: 'Правилно разпределени личните данни по ниво на поверителност.',
    conditionLabel: 'Ниво 6 завършено',
  },
  {
    id: 'chapter2_graduate',
    title: 'Опитен изследовател',
    description: 'Завършена Глава II и разкрити сложни социални и вирусни заплахи.',
    conditionLabel: 'Нива 5–8 завършени',
  },
  {
    id: 'deepfake_detector',
    title: 'Радар за фалшификати',
    description: 'Овладени защитата при обществен Wi-Fi и разпознаването на AI измами.',
    conditionLabel: 'Ниво 9 и 11',
  },
  {
    id: 'chapter3_graduate',
    title: 'Майстор детектив',
    description: 'Преминати всички 12 нива на Детективската академия.',
    conditionLabel: 'Нива 9–12 завършени',
  },
  {
    id: 'board_analyst',
    title: 'Стратег на таблото',
    description: 'Свързани 10-те доказателства в Детективската стая.',
    conditionLabel: 'Бонус 1 завършен',
  },
  {
    id: 'speed_thinker',
    title: 'Светкавичен ум',
    description: 'Успешно преминато блиц предизвикателството „60 секунди“.',
    conditionLabel: 'Бонус 2 завършен',
  },
  {
    id: 'secret_agent',
    title: 'Агент в сянка',
    description: 'Разкрита и завършена тайната мисия.',
    conditionLabel: 'Тайна мисия',
  },
  {
    id: 'precision_analyst',
    title: 'Безпогрешен детектив',
    description: 'Завършено ниво без грешки и без подсказки.',
    conditionLabel: '0 грешки · 0 подсказки',
  },
  {
    id: 'legendary_detective',
    title: 'Легендарен кибердетектив',
    description: 'Победен Финалният бос Фантомът с поне 700/1000 точки.',
    conditionLabel: 'Бос + 700/1000 т.',
  },
];

export const SUSPECTS: SuspectProfile[] = [
  {
    id: 'suspect_giftbot',
    name: 'Акаунт „PrizeCenter-BG“',
    alias: 'Подателят на фалшиви награди',
    role: 'Масов фишинг и измамни линкове',
    riskLevel: 'Среден риск',
    unlockAtMainIndex: 0,
    summary:
      'Изпраща писма за несъществуващи телефони и ваучери, за да събира пароли и данни на ученици.',
    digitalFootprint: [
      'Домейн с правописна измама: @cyber-prizes-free.xyz',
      'Таймер за паника: „Остават само 10 минути“',
      'Фалшиви страници с подменени букви и цифри (sch00l)',
    ],
  },
  {
    id: 'suspect_social_mask',
    name: 'Профил „Dani_6B_Real“',
    alias: 'Непознатият манипулатор',
    role: 'Социално инженерство и зловредни файлове',
    riskLevel: 'Среден риск',
    unlockAtMainIndex: 5,
    summary:
      'Представя се за ученик от 6. клас, иска снимки и адрес срещу подаръци и праща заразени файлове с двойни разширения.',
    digitalFootprint: [
      'Настоява разговорът да остане таен от родителите',
      'Разпраща файла Free_Robux_Crack.apk.exe',
      'Събира публични публикации за семейни пътувания',
    ],
  },
  {
    id: 'suspect_phantom',
    name: 'Фантомът („Сянка-404“)',
    alias: 'Господарят на Сървърната кула',
    role: 'Главен архитект на атаките в Cyber City',
    riskLevel: 'Висок риск',
    unlockAtMainIndex: 8,
    isMastermind: true,
    summary:
      'Обединява фалшиви Wi-Fi мрежи, deepfake видеа и клониране на глас, за да пробие защитите на целия град.',
    digitalFootprint: [
      'Пуска фалшиви точки за достъп като Cafe_Free_Official',
      'Генерира синтетични гласови молби за превод на пари',
      'Опитва превземане на училищни и градски акаунти без 2FA',
    ],
  },
];

// --- НИВО 1: Имейл криминалистика (50 точки макс) ---
export interface MessageSegment {
  id: string;
  text: string;
  isSuspicious: boolean;
  explanation: string;
}

export interface Mission1Case {
  id: string;
  subject: string;
  senderName: string;
  senderAddress: string;
  isSenderSuspicious: boolean;
  senderExplanation: string;
  isScamMessage: boolean;
  segments: MessageSegment[];
  safeSummary: string;
}

export const MISSION1_CASES: Mission1Case[] = [
  {
    id: 'm1_case1',
    subject: 'Поздравления! Спечели нов телефон от Cyber City!',
    senderName: 'Награден център',
    senderAddress: 'admin@cyber-prizes-free.xyz',
    isSenderSuspicious: true,
    senderExplanation:
      'Непознат безплатен домейн (.xyz), който няма нищо общо с официалния училищен сайт.',
    isScamMessage: true,
    safeSummary: 'Фишинг измама с фалшива награда и искане на парола.',
    segments: [
      {
        id: 'c1_s1',
        text: 'ТИ СИ ИЗБРАН СРЕД 1000 УЧЕНИЦИ!',
        isSuspicious: false,
        explanation: 'Рекламният тон е подозрителен, но търси конкретни опасни искания и срокове.',
      },
      {
        id: 'c1_s2',
        text: 'Натисни линка и въведи паролата за училищния си профил,',
        isSuspicious: true,
        explanation: 'Червен флаг! Никой честен конкурс не иска паролата ти.',
      },
      {
        id: 'c1_s3',
        text: 'Имаш само 10 минути, иначе наградата ще бъде дадена на друг!',
        isSuspicious: true,
        explanation: 'Червен флаг! Изкуствената спешност цели да действаш без да мислиш.',
      },
    ],
  },
  {
    id: 'm1_case2',
    subject: 'СПЕШНО: Профилът ти ще бъде изтрит днес!',
    senderName: 'Системен Екип',
    senderAddress: 'support-alert@secur1ty-check.ru',
    isSenderSuspicious: true,
    senderExplanation:
      'Подменен адрес с цифрата „1“ вместо „i“ (secur1ty) и съмнителен домейн.',
    isScamMessage: true,
    safeSummary: 'Измамно сплашване с искане на ЕГН и снимка на банкова карта.',
    segments: [
      {
        id: 'c2_s1',
        text: 'Открихме грешка във твоите дани. Ако не реагираш, акаунтът ти изчезва.',
        isSuspicious: false,
        explanation: 'Търси конкретното искане на лични данни — то е най-силната улика.',
      },
      {
        id: 'c2_s2',
        text: 'Изпрати трите си имена, ЕГН и снимка на банковата карта на родител.',
        isSuspicious: true,
        explanation: 'Червен флаг! Искане на ЕГН и банкова карта по имейл е кражба на данни.',
      },
    ],
  },
  {
    id: 'm1_case3',
    subject: 'Промяна в часа по компютърно моделиране в петък',
    senderName: 'Г-жа Петрова (Класен ръководител)',
    senderAddress: 'petrova@school-cybercity.bg',
    isSenderSuspicious: false,
    senderExplanation:
      'Официален училищен адрес (.bg), съвпадащ с твоя учител.',
    isScamMessage: false,
    safeSummary: 'Достоверно училищно съобщение без искания за пароли или линкове.',
    segments: [
      {
        id: 'c3_s1',
        text: 'Здравейте, ученици! В петък часът по компютърно моделиране ще бъде в зала 204.',
        isSuspicious: false,
        explanation: 'Обичайна училищна информация.',
      },
      {
        id: 'c3_s2',
        text: 'Носете си тетрадките и проектите за безопасния интернет.',
        isSuspicious: false,
        explanation: 'Няма подозрителни искания.',
      },
    ],
  },
];

// --- НИВО 2: Слаби пароли ---
export interface PasswordCandidate {
  id: string;
  value: string;
  isWeak: boolean;
  reason: string;
}

export const MISSION2_CANDIDATES: PasswordCandidate[] = [
  {
    id: 'pw1',
    value: 'ivan2013',
    isWeak: true,
    reason: 'Име + година на раждане се отгатва мигновено.',
  },
  {
    id: 'pw2',
    value: 'qwerty12345',
    isWeak: true,
    reason: 'Най-популярната клавишна комбинация в света.',
  },
  {
    id: 'pw3',
    value: 'Morski#Valk29!',
    isWeak: false,
    reason: 'Силна парола с 14 знака, букви, цифри и символи.',
  },
  {
    id: 'pw4',
    value: 'parola6klas',
    isWeak: true,
    reason: 'Предвидима дума и клас без специални знаци.',
  },
];

// --- НИВО 3: Сравнение на URL адреси ---
export interface UrlComparisonRound {
  id: string;
  contextTitle: string;
  siteA: { url: string; isHttps: boolean; buttonText: string; isSafe: boolean };
  siteB: { url: string; isHttps: boolean; buttonText: string; isSafe: boolean };
  differenceHint: string;
  explanation: string;
}

export const MISSION3_ROUNDS: UrlComparisonRound[] = [
  {
    id: 'u1',
    contextTitle: 'Вход в електронния дневник на Cyber City',
    siteA: {
      url: 'http://sch00l-cyberc1ty.net-login.ru/auth',
      isHttps: false,
      buttonText: 'ВЛЕЗ БЪРЗО ЗА БОНУС ОЦЕНКА',
      isSafe: false,
    },
    siteB: {
      url: 'https://school-cybercity.bg/login',
      isHttps: true,
      buttonText: 'Вход в ученическия портал',
      isSafe: true,
    },
    differenceHint: 'Погледни буквите „o“ и „i“ и провери дали има HTTPS.',
    explanation:
      'Истинският адрес е https://school-cybercity.bg/login. Фалшивият заменя „o“ с „0“ и „i“ с „1“.',
  },
  {
    id: 'u2',
    contextTitle: 'Платформа за игри и профили',
    siteA: {
      url: 'https://cyberplay.bg/profile',
      isHttps: true,
      buttonText: 'Моят профил и настройки',
      isSafe: true,
    },
    siteB: {
      url: 'https://cyberpIay-gifts.com/claim-now',
      isHttps: true,
      buttonText: 'ИЗТЕГЛИ БЕЗПЛАТНИ СКИНОВЕ СЕГА!!!',
      isSafe: false,
    },
    differenceHint: 'Внимавай за главна буква „I“ вместо малко „l“ и добавеното „-gifts“.',
    explanation:
      'Дори да има HTTPS, адресът „cyberpIay-gifts.com“ подменя буква и примамва с безплатни подаръци.',
  },
  {
    id: 'u3',
    contextTitle: 'Градска библиотека на Cyber City',
    siteA: {
      url: 'http://library-cybercity-free.tk/download',
      isHttps: false,
      buttonText: 'СВАЛИ КНИГАТА (.EXE ФАЙЛ)',
      isSafe: false,
    },
    siteB: {
      url: 'https://library.cybercity.bg/catalog',
      isHttps: true,
      buttonText: 'Каталог с електронни книги',
      isSafe: true,
    },
    differenceHint: 'Провери официалния .bg домейн и дали бутонът не те кара да сваляш странни програми.',
    explanation:
      'Официалната библиотека използва https://library.cybercity.bg, а не съмнителен .tk адрес с .exe файл.',
  },
];

// --- НИВО 4: Медийна грамотност ---
export interface NewsComparisonRound {
  id: string;
  topic: string;
  postA: {
    headline: string;
    author: string;
    source: string;
    date: string;
    excerpt: string;
    isReliable: boolean;
  };
  postB: {
    headline: string;
    author: string;
    source: string;
    date: string;
    excerpt: string;
    isReliable: boolean;
  };
  explanation: string;
}

export const MISSION4_ROUNDS: NewsComparisonRound[] = [
  {
    id: 'n1',
    topic: 'Слух за затваряне на училищата',
    postA: {
      headline: 'ШОК!! ЗАТВАРЯТ ВСИЧКИ УЧИЛИЩА ЗАВИНАГИ ОТ ПОНЕДЕЛНИК!!',
      author: 'Анонимен_99',
      source: 'Блог „Сензации-Днес“',
      date: 'Без дата',
      excerpt:
        'Един познат чул, че интернетът спира. Сподели с 10 приятели или профилът ти ще изчезне!',
      isReliable: false,
    },
    postB: {
      headline: 'Профилактика на градската Wi-Fi мрежа в събота сутрин',
      author: 'Елена Маркова, отдел „Образование“',
      source: 'Официален портал cybercity.bg',
      date: '14 ноември 2026 г.',
      excerpt:
        'Между 08:00 и 10:00 ч. в събота ще се обнови защитата на мрежата. Учебните часове продължават по график.',
      isReliable: true,
    },
    explanation:
      'Публикация Б има реален автор, точна дата, официален източник и проверими факти.',
  },
  {
    id: 'n2',
    topic: 'Съобщение за софтуерно обновление',
    postA: {
      headline: 'Препоръка: Обновете браузърите си през официалното меню Настройки',
      author: 'Инж. Георги Колев',
      source: 'Национален център за безопасен интернет',
      date: '13 ноември 2026 г.',
      excerpt:
        'Специалистите съветват да актуализирате браузъра си от официалните настройки, за да затворите открита уязвимост.',
      isReliable: true,
    },
    postB: {
      headline: 'СПЕШНО! ИЗТЕГЛИ ТОВА ПРИЛОЖЕНИЕ ИНАЧЕ ТЕЛЕФОНЪТ ТИ ЩЕ ГРЪМНЕ!',
      author: 'СуперХакер_ТикТок',
      source: 'Препратено видео без източник',
      date: 'Преди малко',
      excerpt:
        'Само нашето тайно приложение „CleanMax999“ спасява телефоните! Инсталирай го от линка!',
      isReliable: false,
    },
    explanation:
      'Надеждният източник насочва към официалните настройки, а фалшивата новина плаши, за да инсталираш опасен файл.',
  },
];

// --- НИВО 5: Разклоняваща се история ---
export interface StoryChoice {
  id: string;
  label: string;
  isResponsible: boolean;
  points: number;
  consequenceText: string;
  safetyImpact: number;
}

export interface StoryScene {
  id: string;
  stepTitle: string;
  situation: string;
  choices: StoryChoice[];
}

export const MISSION5_SCENES: StoryScene[] = [
  {
    id: 'scene1',
    stepTitle: 'Сцена 1: Подигравки в груповия чат',
    situation:
      'В чата на 6. Б някой качва обиден колаж на твой съученик. Как реагираш?',
    choices: [
      {
        id: 's1_c1',
        label: 'Запазвам екранна снимка за доказателство, подкрепям съученика си и сигнализирам класния ръководител.',
        isResponsible: true,
        points: 13,
        consequenceText: 'Учителят спря разпространението навреме, а съученикът ти получи подкрепа.',
        safetyImpact: 25,
      },
      {
        id: 's1_c2',
        label: 'Написвам обиди към автора и препращам колажа в друг чат.',
        isResponsible: false,
        points: 0,
        consequenceText: 'Препращането увеличи броя хора, които видяха снимката.',
        safetyImpact: -10,
      },
      {
        id: 's1_c3',
        label: 'Мълча и не правя нищо.',
        isResponsible: false,
        points: 4,
        consequenceText: 'Не участва в тормоза, но съученикът ти остана без защита.',
        safetyImpact: 0,
      },
    ],
  },
  {
    id: 'scene2',
    stepTitle: 'Сцена 2: Непознат в игра',
    situation:
      'Непознат играч ти предлага редки скинове, но иска домашен адрес и телефон.',
    choices: [
      {
        id: 's2_c1',
        label: 'Отказвам категорично, блокирам го и казвам на родителите си.',
        isResponsible: true,
        points: 12,
        consequenceText: 'Запази личните си данни и спря опит за събиране на детски адреси.',
        safetyImpact: 25,
      },
      {
        id: 's2_c2',
        label: 'Давам само името на училището и квартала.',
        isResponsible: false,
        points: 0,
        consequenceText: 'Дори частичните данни помагат на злонамерен човек да те намери.',
        safetyImpact: -10,
      },
    ],
  },
  {
    id: 'scene3',
    stepTitle: 'Сцена 3: Пробит профил',
    situation:
      'Твоят профил започва сам да праща съмнителни линкове на приятелите ти.',
    choices: [
      {
        id: 's3_c1',
        label: 'Сменям паролата, изключвам активните устройства, включвам 2FA и предупреждавам приятелите си.',
        isResponsible: true,
        points: 13,
        consequenceText: 'Прекрати достъпа на нарушителя и предпази приятелите си.',
        safetyImpact: 25,
      },
      {
        id: 's3_c2',
        label: 'Просто изтривам приложението от телефона без да сменям паролата.',
        isResponsible: false,
        points: 0,
        consequenceText: 'Нарушителят продължи да използва профила ти от друг компютър.',
        safetyImpact: -10,
      },
    ],
  },
  {
    id: 'scene4',
    stepTitle: 'Сцена 4: Към кого да се обърнеш?',
    situation:
      'Инцидентите са сериозни и засягат целия клас. Към кого се обръщаш за помощ?',
    choices: [
      {
        id: 's4_c1',
        label: 'Родители, класен ръководител и Националната линия за безопасен интернет (124 123 / safenet.bg).',
        isResponsible: true,
        points: 12,
        consequenceText: 'Специалистите и възрастните спряха атаката и защитиха класа.',
        safetyImpact: 25,
      },
      {
        id: 's4_c2',
        label: 'Търся случаен непознат „хакер“ в интернет да помогне.',
        isResponsible: false,
        points: 0,
        consequenceText: 'Това води до нов риск от изнудване.',
        safetyImpact: -10,
      },
    ],
  },
];
