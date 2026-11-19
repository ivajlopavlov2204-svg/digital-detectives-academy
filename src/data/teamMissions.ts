import { AvatarCodename, MissionMetadata } from '../types/game';
import {
  MISSIONS,
  MISSION1_CASES,
  MISSION2_CANDIDATES,
  MISSION3_ROUNDS,
  MISSION4_ROUNDS,
  MISSION5_SCENES,
  Mission1Case,
  PasswordCandidate,
  UrlComparisonRound,
  NewsComparisonRound,
  StoryScene,
} from './missionsData';
import {
  LEVEL6_CARDS,
  LEVEL7_CHAT_MESSAGES,
  LEVEL8_FILES,
  LEVEL9_NETWORKS,
  LEVEL10_ITEMS,
  LEVEL11_CLUES,
  BONUS1_EVIDENCE_CARDS,
  BOSS_CHALLENGES,
  PersonalDataCard,
  ChatFlagMessage,
  SystemFileItem,
  WifiNetworkOption,
  FootprintItem,
  DeepfakeClue,
  BossChallengeTask,
} from './advancedLevelsData';

export interface TeamInfo {
  id: AvatarCodename;
  teamTitle: string;
  operationName: string;
  specialty: string;
  description: string;
}

export const TEAMS: TeamInfo[] = [
  {
    id: 'Сокол',
    teamTitle: 'Отбор „Сокол“',
    operationName: 'Операция „Училищна мрежа“',
    specialty: 'Училищни имейли и класни чатове',
    description:
      'Разследва измамни писма до ученици, пробиви в електронния дневник и конфликти в училищната общност.',
  },
  {
    id: 'Нова',
    teamTitle: 'Отбор „Нова“',
    operationName: 'Операция „Гейминг арена“',
    specialty: 'Игри, скинове и стрийминг профили',
    description:
      'Преследва крадци на игрални акаунти, фалшиви турнири, опасни модове и измамни оферти за диаманти.',
  },
  {
    id: 'Атлас',
    teamTitle: 'Отбор „Атлас“',
    operationName: 'Операция „Социална медия“',
    specialty: 'Фалшиви новини и deepfake измами',
    description:
      'Разобличава клонирани профили, сензационни слухове, манипулирани снимки и AI гласови клонинги.',
  },
  {
    id: 'Криптон',
    teamTitle: 'Отбор „Криптон“',
    operationName: 'Операция „Облачен щит“',
    specialty: 'Wi-Fi капани, вируси и пароли',
    description:
      'Открива зловредни файлове, фалшиви безжични мрежи, шпионски приложения и защитава системните профили.',
  },
];

export function getTeamInfo(team: AvatarCodename): TeamInfo {
  return TEAMS.find((t) => t.id === team) ?? TEAMS[0];
}

// Персонализирани заглавия и сюжети на мисиите за всеки отбор
const TEAM_MISSION_OVERRIDES: Record<
  AvatarCodename,
  Partial<Record<string, { title: string; subtitle: string; briefingStory: string }>>
> = {
  Сокол: {}, // Отбор Сокол използва базовия училищен сюжет
  Нова: {
    mission1: {
      title: 'Капанът за безплатни скинове',
      subtitle: 'Анализ на измамни съобщения в гейминг пощата',
      briefingStory:
        'В пощата на Гейминг клуб Cyber City валят оферти за безплатни скинове и VIP пропуски. Открий измамните искания и отдели истинската покана за турнир.',
    },
    mission2: {
      title: 'Кодът на Гейминг профила',
      subtitle: 'Защита на акаунта с редки предмети',
      briefingStory:
        'Хакер се опитва да открадне гейминг акаунта на отбора с автоматичен скрипт. Отсей слабите пароли и създай непробиваем ключ.',
    },
    mission3: {
      title: 'Фалшивият гейминг магазин',
      subtitle: 'Сравнение на турнирни сайтове и фишинг линкове',
      briefingStory:
        'В чата на играта се разпространяват копия на популярни магазини за игри. Сравни адресите символ по символ.',
    },
    mission4: {
      title: 'Слухове в стрийма',
      subtitle: 'Проверка на гейминг новини и фалшиви раздавания',
      briefingStory:
        'Стриймъри и анонимни канали пускат шокиращи новини за спиране на сървърите. Отдели фактите от кликбейта.',
    },
    mission5: {
      title: 'Честна игра онлайн',
      subtitle: 'Токсичност, непознати в отбора и пробит геймърски чат',
      briefingStory:
        'В гласовия и текстовия чат на отбора възникват обиди, непознат иска адреса ти, а профил праща спам. Вземи правилните решения.',
    },
    mission6: {
      title: 'Данните в геймърския профил',
      subtitle: 'Какво да показваш в биографията си за игри',
      briefingStory:
        'Нови играчи попълват профилите си. Разпредели кои данни са безопасни за публичност и кои трябва да останат тайна.',
    },
    mission7: {
      title: 'Съотборникът в сянка',
      subtitle: 'Непознат ти предлага подарък за играта',
      briefingStory:
        'Нов играч твърди, че е на твоите години, но започва да разпитва за снимки и среща. Открий петте червени флага.',
    },
    mission8: {
      title: 'Заразеният мод',
      subtitle: 'Опасни файлове с „безплатни“ добавки за игри',
      briefingStory:
        'В папката за сваляне има модове и учебни файлове. Изолирай заразените програми и подреди реакцията при инцидент.',
    },
    mission9: {
      title: 'Wi-Fi в компютърния клуб',
      subtitle: 'Сигурност на мрежата по време на градски турнир',
      briefingStory:
        'В залата за състезания виждаш три отворени мрежи. Защити входа в игралните и училищните си профили.',
    },
    mission10: {
      title: 'Следите на стриймъра',
      subtitle: 'Публични клипове, коментари и харесвания',
      briefingStory:
        'Прегледай хронологията на млад геймър и открий кои публикации издават лична информация или вредят на репутацията му.',
    },
    mission11: {
      title: 'Фалшивият шампион',
      subtitle: 'Deepfake видео на известен геймър и гласова измама',
      briefingStory:
        'Излиза видео с любим стриймър, който раздава пари, и спешно гласово съобщение. Открий 3-те признака на измама.',
    },
    mission12: {
      title: 'Спасяване на акаунта',
      subtitle: 'Възстановяване на откраднат гейминг и училищен профил',
      briefingStory:
        'Профилът е компрометиран след фалшив турнир. Подреди 5-те стъпки за пълно възстановяване.',
    },
  },
  Атлас: {
    mission1: {
      title: 'Измамата със „Синята отметка“',
      subtitle: 'Фалшиви имейли за верификация на социален профил',
      briefingStory:
        'Инфлуенсъри и ученици получават писма, че профилът им ще бъде изтрит, ако не потвърдят паролата си. Разкрий измамата.',
    },
    mission2: {
      title: 'Ключът към социалния канал',
      subtitle: 'Одит на слаби пароли на редактори',
      briefingStory:
        'Редакторите на училищния медиен канал използват лесни пароли. Отсей уязвимите и изгради сигурна защита.',
    },
    mission3: {
      title: 'Копието на социалната мрежа',
      subtitle: 'Подменени адреси за вход и фалшиви анкети',
      briefingStory:
        'Появиха се фалшиви страници за вход в социалната платформа на Cyber City. Сравни линковете внимателно.',
    },
    mission4: {
      title: 'Вирусната фалшива новина',
      subtitle: 'Анализ на манипулативни публикации и слухове',
      briefingStory:
        'В социалната мрежа циркулират тревожни публикации без автори. Провери източниците и отдели истината.',
    },
    mission5: {
      title: 'Отговорен коментатор',
      subtitle: 'Обиди под публикации, лични данни и пробити профили',
      briefingStory:
        'В коментарите под градска публикация започва онлайн тормоз и опит за измама. Действай като кибергерой.',
    },
    mission6: {
      title: 'Поверителност в социалната мрежа',
      subtitle: 'Кое остава лично и кое може да се сподели',
      briefingStory:
        'Настрой правилно правилата за споделяне, като разпределиш картите в трите категории.',
    },
    mission7: {
      title: 'Клонираният последовател',
      subtitle: 'Манипулация чрез лични съобщения',
      briefingStory:
        'Нов последовател ти пише мило, но бързо иска снимки и лична среща. Маркирай петте опасни признака.',
    },
    mission8: {
      title: 'Опасният „филтър за снимки“',
      subtitle: 'Зловредни файлове, маскирани като фото програми',
      briefingStory:
        'На компютъра за обработка на медии са свалени подозрителни файлове. Постави опасните под карантина.',
    },
    mission9: {
      title: 'Безжична мрежа в пресцентъра',
      subtitle: 'Отворени точки за достъп и защита на HTTPS',
      briefingStory:
        'От кафенето до редакцията има три Wi-Fi мрежи. Прецени коя е безопасна за качване на материали.',
    },
    mission10: {
      title: 'Архивът на публикациите',
      subtitle: 'Как снимките и коментарите остават завинаги',
      briefingStory:
        'Провери публичната лента на млад фотограф и открий четирите рискови следи.',
    },
    mission11: {
      title: 'Синтетичното интервю',
      subtitle: 'Разобличаване на AI видео и гласов клонинг',
      briefingStory:
        'В медиите се появява фалшиво интервю и гласова молба за пари. Открий 3 подозрителни детайла.',
    },
    mission12: {
      title: 'Щит за редакционния профил',
      subtitle: '5-стъпков протокол за възстановяване',
      briefingStory:
        'След фишинг атака профилът трябва да бъде върнат и защитен с 2FA. Подреди правилните стъпки.',
    },
  },
  Криптон: {
    mission1: {
      title: 'Сигнал от „Облачна поддръжка“',
      subtitle: 'Фалшиви известия за запълнено място и изтрити файлове',
      briefingStory:
        'Гражданите получават тревожни имейли, че облачните им снимки ще изчезнат до минути. Маркирай капаните.',
    },
    mission2: {
      title: 'Криптиране на системния ключ',
      subtitle: 'Разкриване на лесни администраторски пароли',
      briefingStory:
        'Скрипт атакува системните входове на града. Открий трите слаби комбинации и изгради нова защита.',
    },
    mission3: {
      title: 'Подмененият облачен вход',
      subtitle: 'Фишинг домейни за онлайн хранилища',
      briefingStory:
        'Някой е направил двойник на градското облачно хранилище. Сравни уеб адресите с точност.',
    },
    mission4: {
      title: 'Измамата с „Аварийно обновление“',
      subtitle: 'Проверка на технически предупреждения и фалшиви тревоги',
      briefingStory:
        'Слухове твърдят, че всички телефони ще изключат, ако не свалиш неизвестен софтуер. Провери източниците.',
    },
    mission5: {
      title: 'Защитник на мрежата',
      subtitle: 'Реакции при тормоз, непознати и пробити устройства',
      briefingStory:
        'Изправяш се пред четири последователни ситуации в дигиталната общност. Всеки избор има последствие.',
    },
    mission6: {
      title: 'Класификация на системните данни',
      subtitle: 'Сортиране на информация по ниво на поверителност',
      briefingStory:
        'Подреди правилно личните и публичните данни в трите сигурни категории.',
    },
    mission7: {
      title: 'Непознатият „техник“ в чата',
      subtitle: 'Социално инженерство под прикритие',
      briefingStory:
        'Профил се представя за ученик-помощник, но иска лична информация и тайна среща. Открий червените флагове.',
    },
    mission8: {
      title: 'Карантина в облака',
      subtitle: 'Премахване на скрити скриптове и троянски файлове',
      briefingStory:
        'Отсей петте файла в сървърната папка и подреди правилния план при заразяване.',
    },
    mission9: {
      title: 'Капанът на публичния рутер',
      subtitle: 'Анализ на Evil Twin Wi-Fi и мобилни данни',
      briefingStory:
        'Навън засичаш три безжични мрежи. Прецени кога да ползваш мобилни данни и какво пази HTTPS.',
    },
    mission10: {
      title: 'Цифровите логове',
      subtitle: 'Опасните следи в публичните профили',
      briefingStory:
        'Провери какви рискови следи е оставил потребителят и как те могат да бъдат използвани срещу него.',
    },
    mission11: {
      title: 'Клонираният глас на директора',
      subtitle: 'AI аудио и видео измами за спешни кодове',
      briefingStory:
        'Получаваш спешно видео и гласово съобщение за пари и кодове. Намери 3 признака на синтетична измама.',
    },
    mission12: {
      title: 'Авариен протокол за възстановяване',
      subtitle: 'Връщане на контрола след пробив',
      briefingStory:
        'Подреди петте задължителни стъпки, за да заключиш окончателно компрометирания профил.',
    },
  },
};

export function getMissionsForTeam(team: AvatarCodename): MissionMetadata[] {
  const overrides = TEAM_MISSION_OVERRIDES[team] ?? {};
  return MISSIONS.map((mission) => {
    const custom = overrides[mission.id];
    if (!custom) return mission;
    return {
      ...mission,
      title: custom.title,
      subtitle: custom.subtitle,
      briefingStory: custom.briefingStory,
    };
  });
}

// === СПЕЦИФИЧНИ ЗА ВСЕКИ ОТБОР ЗАДАЧИ (НИВО 1) ===
const TEAM_MISSION1_CASES: Record<AvatarCodename, Mission1Case[]> = {
  Сокол: MISSION1_CASES,
  Нова: [
    {
      id: 'nova_c1',
      subject: 'БЕЗПЛАТНИ 5000 ДИАМАНТА за твоя профил!',
      senderName: 'GamePromo VIP',
      senderAddress: 'gifts@free-skins-arena.xyz',
      isSenderSuspicious: true,
      senderExplanation: 'Фалшив безплатен домейн (.xyz), несвързан с официалната игра.',
      isScamMessage: true,
      safeSummary: 'Гейминг фишинг с фалшиви диаманти и искане на парола.',
      segments: [
        {
          id: 'nc1_1',
          text: 'Честито! Избран си за специален VIP подарък в любимата си игра.',
          isSuspicious: false,
          explanation: 'Обещанието е примамка — търси конкретното искане на данни и срока.',
        },
        {
          id: 'nc1_2',
          text: 'Въведи потребителското си име и паролата си на линка по-долу,',
          isSuspicious: true,
          explanation: 'Червен флаг! Нито една истинска игра не иска паролата ти по имейл.',
        },
        {
          id: 'nc1_3',
          text: 'Офертата изтича след 5 минути — побързай!',
          isSuspicious: true,
          explanation: 'Червен флаг! Изкуственият таймер те кара да сбъркаш от бързане.',
        },
      ],
    },
    {
      id: 'nova_c2',
      subject: 'Профилът ти в играта е докладван — блокиране след 1 час',
      senderName: 'Анти-чийт Отдел',
      senderAddress: 'ban-appeal@game-supp0rt-team.ru',
      isSenderSuspicious: true,
      senderExplanation: 'Подменена буква „o“ с „0“ (supp0rt) и непознат адрес.',
      isScamMessage: true,
      safeSummary: 'Измамно сплашване с искане на телефонен номер и банкова карта.',
      segments: [
        {
          id: 'nc2_1',
          text: 'За да не загубиш всичките си нива и герои днес,',
          isSuspicious: false,
          explanation: 'Заплахата за загуба цели уплаха — виж какво точно искат да им пратиш.',
        },
        {
          id: 'nc2_2',
          text: 'отговори с номера на телефона си, ЕГН и снимка на картата на родител за проверка.',
          isSuspicious: true,
          explanation: 'Червен флаг! Искане на лични документи и банкова карта е сигурна измама.',
        },
      ],
    },
    {
      id: 'nova_c3',
      subject: 'График за училищния турнир по логически игри',
      senderName: 'Треньор Стоянов',
      senderAddress: 'stoyanov@school-cybercity.bg',
      isSenderSuspicious: false,
      senderExplanation: 'Официален училищен адрес (.bg) на треньора на клуба.',
      isScamMessage: false,
      safeSummary: 'Безопасно организационно съобщение за училищния турнир.',
      segments: [
        {
          id: 'nc3_1',
          text: 'Срещата на отбора е в четвъртък от 15:00 ч. в компютърния кабинет.',
          isSuspicious: false,
          explanation: 'Ясна информация за тренировка без опасни линкове.',
        },
        {
          id: 'nc3_2',
          text: 'Не се изисква регистрация в чужди сайтове.',
          isSuspicious: false,
          explanation: 'Няма искане на лични данни или пароли.',
        },
      ],
    },
  ],
  Атлас: [
    {
      id: 'atlas_c1',
      subject: 'Получи безплатна Синя отметка за профила си днес!',
      senderName: 'SocialVerify Bot',
      senderAddress: 'verify@social-badge-check.tk',
      isSenderSuspicious: true,
      senderExplanation: 'Подозрителен домейн (.tk) без връзка с официалната платформа.',
      isScamMessage: true,
      safeSummary: 'Измама със „синя отметка“ за кражба на акаунти.',
      segments: [
        {
          id: 'ac1_1',
          text: 'Твоят профил е одобрен за звездна значка на популярност.',
          isSuspicious: false,
          explanation: 'Ласкателството е примамка — търси искането на парола и спешния срок.',
        },
        {
          id: 'ac1_2',
          text: 'Изпрати ни текущата си парола и SMS кода, който ще получиш,',
          isSuspicious: true,
          explanation: 'Червен флаг! Искат паролата и кода за двуфакторна защита, за да откраднат профила.',
        },
        {
          id: 'ac1_3',
          text: 'до 10 минути, иначе профилът ще бъде закрит!',
          isSuspicious: true,
          explanation: 'Червен флаг! Изкуствена спешност и заплаха за закриване.',
        },
      ],
    },
    {
      id: 'atlas_c2',
      subject: 'Нарушение на авторски права — плати такса веднага',
      senderName: 'Медиен Контрол',
      senderAddress: 'legal@media-c0pyright.xyz',
      isSenderSuspicious: true,
      senderExplanation: 'Цифра „0“ вместо „o“ (c0pyright) и съмнително разширение .xyz.',
      isScamMessage: true,
      safeSummary: 'Измамно писмо с искане на карта на родител.',
      segments: [
        {
          id: 'ac2_1',
          text: 'Твоята снимка от училищния двор е в нарушение.',
          isSuspicious: false,
          explanation: 'Търси конкретното опасно искане в писмото.',
        },
        {
          id: 'ac2_2',
          text: 'Въведи данните от банковата карта на родителя си, за да избегнеш глоба.',
          isSuspicious: true,
          explanation: 'Червен флаг! Никой не събира глоби чрез карта на родител по имейл.',
        },
      ],
    },
    {
      id: 'atlas_c3',
      subject: 'Училищен вестник: Срок за нови статии',
      senderName: 'Клуб „Млад журналист“',
      senderAddress: 'newspaper@school-cybercity.bg',
      isSenderSuspicious: false,
      senderExplanation: 'Официален училищен адрес (.bg).',
      isScamMessage: false,
      safeSummary: 'Реално писмо от училищния клуб без рискови елементи.',
      segments: [
        {
          id: 'ac3_1',
          text: 'Приемаме материали за броя за безопасен интернет до сряда.',
          isSuspicious: false,
          explanation: 'Нормално съобщение на клуба.',
        },
      ],
    },
  ],
  Криптон: [
    {
      id: 'krypton_c1',
      subject: 'ВНИМАНИЕ: Облакът ти е пълен на 99% — снимките се трият!',
      senderName: 'Cloud Storage Alert',
      senderAddress: 'alert@cl0ud-drive-free.xyz',
      isSenderSuspicious: true,
      senderExplanation: 'Подменен адрес с „0“ (cl0ud) и безплатен домейн .xyz.',
      isScamMessage: true,
      safeSummary: 'Фалшиво системно предупреждение за кражба на пароли.',
      segments: [
        {
          id: 'kc1_1',
          text: 'Твоите учебни проекти и снимки ще бъдат изтрити завинаги',
          isSuspicious: false,
          explanation: 'Страхът от загуба на файлове е капанът — виж искането по-долу.',
        },
        {
          id: 'kc1_2',
          text: 'ако не влезеш до 8 минути и не напишеш главната си парола тук.',
          isSuspicious: true,
          explanation: 'Червен флаг! Комбинация от 8-минутен натиск и искане на парола.',
        },
        {
          id: 'kc1_3',
          text: 'Също прикачи снимка на личната карта или банковата карта на родител.',
          isSuspicious: true,
          explanation: 'Червен флаг! Официална облачна услуга никога не иска лични документи по имейл.',
        },
      ],
    },
    {
      id: 'krypton_c2',
      subject: 'Спешно обновление на Wi-Fi рутера у дома',
      senderName: 'RouterSecurity',
      senderAddress: 'update@wifi-fix-now.ru',
      isSenderSuspicious: true,
      senderExplanation: 'Непознат външен адрес (.ru) вместо вашия интернет доставчик.',
      isScamMessage: true,
      safeSummary: 'Опит за инсталиране на опасен файл чрез фалшив ъпдейт.',
      segments: [
        {
          id: 'kc2_1',
          text: 'Открихме проблем в домашния интернет.',
          isSuspicious: false,
          explanation: 'Погледни какво те кара да изтеглиш и въведеш.',
        },
        {
          id: 'kc2_2',
          text: 'Изтегли файла router_patch.exe и ни изпрати паролата си за Wi-Fi.',
          isSuspicious: true,
          explanation: 'Червен флаг! .exe файл от имейл и искане на Wi-Fi парола е сигурна атака.',
        },
      ],
    },
    {
      id: 'krypton_c3',
      subject: 'Напомняне: Проверка на проектите по ИТ',
      senderName: 'Г-н Димитров (ИТ учител)',
      senderAddress: 'dimitrov@school-cybercity.bg',
      isSenderSuspicious: false,
      senderExplanation: 'Истински служебен адрес на учителя по ИТ.',
      isScamMessage: false,
      safeSummary: 'Реално училищно съобщение без линкове и искания на пароли.',
      segments: [
        {
          id: 'kc3_1',
          text: 'Напомням ви да запазите презентациите си на училищния сървър преди часа.',
          isSuspicious: false,
          explanation: 'Стандартна учебна инструкция.',
        },
      ],
    },
  ],
};

export function getMission1Cases(team: AvatarCodename): Mission1Case[] {
  return TEAM_MISSION1_CASES[team] ?? MISSION1_CASES;
}

// === НИВО 2: СПЕЦИФИЧНИ ПАРОЛИ ЗА ВСЕКИ ОТБОР ===
const TEAM_MISSION2_CANDIDATES: Record<AvatarCodename, PasswordCandidate[]> = {
  Сокол: MISSION2_CANDIDATES,
  Нова: [
    { id: 'np1', value: 'gamer2014', isWeak: true, reason: 'Обща дума + година на раждане се отгатва веднага.' },
    { id: 'np2', value: '123456minecraft', isWeak: true, reason: 'Поредица от цифри и име на популярна игра.' },
    { id: 'np3', value: 'Srebro#Drakon83!', isWeak: false, reason: 'Силна парола с 16 символа, главни/малки букви, цифри и символи.' },
    { id: 'np4', value: 'qwertyGG', isWeak: true, reason: 'Твърде кратка и използва клавишна подредба qwerty.' },
  ],
  Атлас: [
    { id: 'ap1', value: 'elena_insta', isWeak: true, reason: 'Име + платформа без цифри и символи.' },
    { id: 'ap2', value: 'tiktok2026', isWeak: true, reason: 'Популярна мрежа + текущата година.' },
    { id: 'ap3', value: 'Kometen#Zrak71@', isWeak: false, reason: 'Надеждна комбинация с 15 знака и разнородни символи.' },
    { id: 'ap4', value: 'parola12345', isWeak: true, reason: 'Най-често срещаната слаба парола.' },
  ],
  Криптон: [
    { id: 'kp1', value: 'admin1234', isWeak: true, reason: 'По подразбиране и лесна за автоматичен пробив.' },
    { id: 'kp2', value: 'wifi0000', isWeak: true, reason: 'Повтарящи се нули и кратка дължина.' },
    { id: 'kp3', value: 'Severen#Vihar58$', isWeak: false, reason: 'Отлична защита с главни/малки букви, цифри и $/#.' },
    { id: 'kp4', value: 'cybercity', isWeak: true, reason: 'Само една дума с малки букви.' },
  ],
};

export function getMission2Candidates(team: AvatarCodename): PasswordCandidate[] {
  return TEAM_MISSION2_CANDIDATES[team] ?? MISSION2_CANDIDATES;
}

// === НИВО 3: СПЕЦИФИЧНИ URL СРАВНЕНИЯ ЗА ВСЕКИ ОТБОР ===
const TEAM_MISSION3_ROUNDS: Record<AvatarCodename, UrlComparisonRound[]> = {
  Сокол: MISSION3_ROUNDS,
  Нова: [
    {
      id: 'nu1',
      contextTitle: 'Магазин за игри CyberPlay',
      siteA: { url: 'http://cyberp1ay-free-skins.ru/login', isHttps: false, buttonText: 'ВЗЕМИ 1000 СКИНА БЕЗПЛАТНО', isSafe: false },
      siteB: { url: 'https://cyberplay.bg/store', isHttps: true, buttonText: 'Официален каталог', isSafe: true },
      differenceHint: 'Погледни цифрата „1“ вместо „l“ и липсата на HTTPS.',
      explanation: 'Истинският сайт е https://cyberplay.bg/store, а фалшивият примамва с безплатни скинове.',
    },
    {
      id: 'nu2',
      contextTitle: 'Турнирна платформа за ученици',
      siteA: { url: 'https://arena.cybercity.bg/tournaments', isHttps: true, buttonText: 'Записване за турнир', isSafe: true },
      siteB: { url: 'https://arena-cyberc1ty-prizes.xyz/win', isHttps: true, buttonText: 'СВАЛИ КЛЮЧ (.EXE)', isSafe: false },
      differenceHint: 'Провери буквата „i“ (подменена с „1“) и съмнителното разширение .xyz.',
      explanation: 'Въпреки HTTPS, адресът arena-cyberc1ty-prizes.xyz е фишинг капан.',
    },
  ],
  Атлас: [
    {
      id: 'au1',
      contextTitle: 'Градска социална мрежа CyberGram',
      siteA: { url: 'https://cybergram.bg/settings', isHttps: true, buttonText: 'Настройки на поверителност', isSafe: true },
      siteB: { url: 'http://cybergrarn-verify.com/blue-tick', isHttps: false, buttonText: 'ПОТВЪРДИ СИНЯ ОТМЕТКА СЕГА', isSafe: false },
      differenceHint: 'Вгледай се в буквите „r“ + „n“ вместо „m“ (cybergrarn) и липсата на HTTPS.',
      explanation: 'Много хитър капан: „rn“ наподобява „m“, за да подмами невнимателния читател.',
    },
    {
      id: 'au2',
      contextTitle: 'Училищен медиен портал',
      siteA: { url: 'https://media-cybercity-gifts.tk/login', isHttps: true, buttonText: 'ГЛАСУВАЙ И СПЕЧЕЛИ НАГРАДА', isSafe: false },
      siteB: { url: 'https://media.school-cybercity.bg', isHttps: true, buttonText: 'Училищни новини', isSafe: true },
      differenceHint: 'Официалният портал завършва на .school-cybercity.bg, а не на .tk.',
      explanation: 'Гласуването за награди на външен .tk домейн е класически начин за кражба на пароли.',
    },
  ],
  Криптон: [
    {
      id: 'ku1',
      contextTitle: 'Облачно хранилище на Cyber City',
      siteA: { url: 'http://c1oud-cybercity-backup.net/auth', isHttps: false, buttonText: 'ВЪЗСТАНОВИ ФАЙЛОВЕТЕ СПЕШНО', isSafe: false },
      siteB: { url: 'https://cloud.cybercity.bg/files', isHttps: true, buttonText: 'Моите защитени файлове', isSafe: true },
      differenceHint: 'Виж „c1oud“ с цифрата 1 и незащитения HTTP протокол.',
      explanation: 'Официалният облак е https://cloud.cybercity.bg/files.',
    },
    {
      id: 'ku2',
      contextTitle: 'Портал за киберзащита',
      siteA: { url: 'https://shield.cybercity.bg/check', isHttps: true, buttonText: 'Проверка на сигурността', isSafe: true },
      siteB: { url: 'https://shieId-cybercity-scan.com/free', isHttps: true, buttonText: 'ИЗЧИСТИ ВИРУСИТЕ ЗА 1 СЕК.', isSafe: false },
      differenceHint: 'Внимавай за главна буква „I“ вместо „l“ (shieId) и рекламен бутон.',
      explanation: 'Подмененият домейн се опитва да те накара да свалиш фалшива антивирусна програма.',
    },
  ],
};

export function getMission3Rounds(team: AvatarCodename): UrlComparisonRound[] {
  return TEAM_MISSION3_ROUNDS[team] ?? MISSION3_ROUNDS;
}

// === НИВО 4: СПЕЦИФИЧНИ НОВИНИ ЗА ВСЕКИ ОТБОР ===
const TEAM_MISSION4_ROUNDS: Record<AvatarCodename, NewsComparisonRound[]> = {
  Сокол: MISSION4_ROUNDS,
  Нова: [
    {
      id: 'nn1',
      topic: 'Новина за нова безплатна версия на популярна игра',
      postA: {
        headline: 'СЕНЗАЦИЯ!! РАЗДАВАТ ПЛАТЕНИ ИГРИ БЕЗПЛАТНО САМО ДНЕС НА ТОЗИ ЛИНК!!',
        author: 'GamerLeak999',
        source: 'Анонимен чат канал',
        date: 'Без дата',
        excerpt: 'Прати паролата си на бота и ще отключиш всички игри без пари!',
        isReliable: false,
      },
      postB: {
        headline: 'Уикенд безплатен достъп до образователната игра „Код Сити“',
        author: 'Официален екип на CyberPlay',
        source: 'cyberplay.bg/news',
        date: '14 ноември 2026 г.',
        excerpt: 'През уикенда всички ученици могат да играят демонстрационната версия директно през официалния магазин без да въвеждат банкови карти.',
        isReliable: true,
      },
      explanation: 'Публикация Б има официален източник и не иска пароли или банкови карти.',
    },
    {
      id: 'nn2',
      topic: 'Предупреждение за сървърна поддръжка',
      postA: {
        headline: 'Планирана 2-часова поддръжка на игралните сървъри в неделя',
        author: 'Технически екип CyberPlay',
        source: 'cyberplay.bg/status',
        date: '13 ноември 2026 г.',
        excerpt: 'В неделя от 07:00 до 09:00 ч. сървърите ще бъдат обновени. Прогресът на играчите е напълно запазен.',
        isReliable: true,
      },
      postB: {
        headline: 'КРАЙ!! ИЗТРИВАТ ВСИЧКИ ПРОФИЛИ ЗАВИНАГИ, СПАСИ СВОЯ ТУК!!',
        author: 'Неизвестен профил',
        source: 'Препратен пост без източник',
        date: 'Преди 5 минути',
        excerpt: 'Влез веднага в нашия таен сайт, иначе акаунтът ти изчезва!',
        isReliable: false,
      },
      explanation: 'Спокойното официално съобщение с час и източник е достоверно; паниката цели фишинг.',
    },
  ],
  Атлас: [
    {
      id: 'an1',
      topic: 'Новина за нова функция в социалната мрежа',
      postA: {
        headline: 'ШОК! ОТ УТРЕ ПРИЛОЖЕНИЕТО СТАВА ПЛАТЕНО ПО 20 ЛВ. НА ДЕН!!',
        author: 'ВирусенБлог',
        source: 'Препратено съобщение „Сподели с 20 души“',
        date: 'Без дата',
        excerpt: 'Ако не споделиш този пост с всичките си контакти, ще ти спрат профила!',
        isReliable: false,
      },
      postB: {
        headline: 'Нова настройка за защита на профилите под 16 години',
        author: 'Редакция „Дигитална грамотност“',
        source: 'Официален блог на CyberGram',
        date: '14 ноември 2026 г.',
        excerpt: 'Платформата въвежда автоматично заключване на личните съобщения от непознати за ученически акаунти.',
        isReliable: true,
      },
      explanation: 'Верижните заплахи „сподели с 20 души“ винаги са фалшиви новини.',
    },
    {
      id: 'an2',
      topic: 'Градски конкурс за дигитална рисунка',
      postA: {
        headline: 'Резултати от ученическия конкурс „Безопасна мрежа 2026“',
        author: 'Община Cyber City',
        source: 'cybercity.bg/culture',
        date: '12 ноември 2026 г.',
        excerpt: 'Журито отличи 15 творби на шестокласници. Изложбата може да се разгледа в градската галерия.',
        isReliable: true,
      },
      postB: {
        headline: 'НЕВЕРОЯТНО!! НАГРАДАТА ОТ КОНКУРСА СЕ ДАВА САМО ЧРЕЗ ПЛАТЕН SMS!!',
        author: 'Анонимен коментатор',
        source: 'Непозната страница',
        date: 'Без дата',
        excerpt: 'Изпрати SMS за 6 лв., за да видиш дали си спечелил!',
        isReliable: false,
      },
      explanation: 'Официалният конкурс никога не иска платени SMS-и.',
    },
  ],
  Криптон: [
    {
      id: 'kn1',
      topic: 'Предупреждение за спешен софтуерен ъпдейт',
      postA: {
        headline: 'СПЕШНО!! СВАЛИ ТОЗИ ФАЙЛ ДО 1 ЧАС ИЛИ ТЕЛЕФОНЪТ ТИ ЩЕ СЕ ЗАКЛЮЧИ!!',
        author: 'TechAlert_00',
        source: 'Рекламен изскачащ прозорец',
        date: 'Без дата',
        excerpt: 'Натисни тук, за да инсталираш секретен файл за защита на батерията.',
        isReliable: false,
      },
      postB: {
        headline: 'Препоръка: Обновявайте устройствата само през системните настройки',
        author: 'Лаборатория „Киберщит“',
        source: 'shield.cybercity.bg/guides',
        date: '14 ноември 2026 г.',
        excerpt: 'Истинските обновления за сигурност идват директно от настройките на телефона или компютъра, никога от случайни реклами.',
        isReliable: true,
      },
      explanation: 'Официалните ъпдейти са в системните настройки, а не в страшни изскачащи реклами.',
    },
    {
      id: 'kn2',
      topic: 'Сигурност на облачното хранилище',
      postA: {
        headline: 'Училищният облак преминава към задължителна двуфакторна защита',
        author: 'Администратор на Cyber City',
        source: 'cloud.cybercity.bg/announcements',
        date: '13 ноември 2026 г.',
        excerpt: 'От понеделник учениците могат да активират 2FA за още по-надеждно пазене на учебните проекти.',
        isReliable: true,
      },
      postB: {
        headline: 'СЕНЗАЦИЯ: ВСИЧКИ ОБЛАЦИ СПИРАТ, ПРАТЕТЕ ПАРОЛИТЕ СИ НА ТОЗИ ИМЕЙЛ!!',
        author: 'Анонимен канал',
        source: 'Верижно съобщение',
        date: 'Без дата',
        excerpt: 'За да си запазиш снимките, изпрати паролата си на наш служител.',
        isReliable: false,
      },
      explanation: 'Двуфакторната защита (2FA) повишава сигурността, докато искането на пароли е измама.',
    },
  ],
};

export function getMission4Rounds(team: AvatarCodename): NewsComparisonRound[] {
  return TEAM_MISSION4_ROUNDS[team] ?? MISSION4_ROUNDS;
}

// === НИВО 5: РАЗКЛОНЯВАЩИ СЕ ИСТОРИИ ЗА ВСЕКИ ОТБОР ===
const TEAM_MISSION5_SCENES: Record<AvatarCodename, StoryScene[]> = {
  Сокол: MISSION5_SCENES,
  Нова: [
    {
      id: 'n5_1',
      stepTitle: 'Сцена 1: Обиди в гласовия чат на играта',
      situation:
        'По време на отборна игра двама играчи започват жестоко да се подиграват на нов съотборник заради грешка. Как реагираш?',
      choices: [
        {
          id: 'n5_1a',
          label: 'Защитавам съотборника, заглушавам и докладвам токсичните играчи, и му помагам да се включи спокойно.',
          isResponsible: true,
          points: 13,
          consequenceText: 'Спря тормоза в отбора и показа истински спортен и кибергеройски дух.',
          safetyImpact: 25,
        },
        {
          id: 'n5_1b',
          label: 'Започвам и аз да крещя обиди в микрофона.',
          isResponsible: false,
          points: 0,
          consequenceText: 'Гневът само влоши обстановката и развали играта за всички.',
          safetyImpact: -10,
        },
      ],
    },
    ...MISSION5_SCENES.slice(1),
  ],
  Атлас: [
    {
      id: 'a5_1',
      stepTitle: 'Сцена 1: Подигравателно видео в социалната мрежа',
      situation:
        'Някой е качил кратко видео, с което осмива съученик от 6. клас, и съученици слагат смеещи се реакции. Как постъпваш?',
      choices: [
        {
          id: 'a5_1a',
          label: 'НЕ харесвам и не споделям видеото, докладвам публикацията, правя скрийншот и уведомявам класния ръководител.',
          isResponsible: true,
          points: 13,
          consequenceText: 'Видеото беше свалено бързо, а съученикът ти получи подкрепа.',
          safetyImpact: 25,
        },
        {
          id: 'a5_1b',
          label: 'Препращам видеото на приятели с коментар „Виж колко е глупаво“.',
          isResponsible: false,
          points: 0,
          consequenceText: 'Всяко препращане увеличава болката на засегнатия ученик.',
          safetyImpact: -10,
        },
      ],
    },
    ...MISSION5_SCENES.slice(1),
  ],
  Криптон: [
    {
      id: 'k5_1',
      stepTitle: 'Сцена 1: Натиск за споделяне на чужд профил',
      situation:
        'Познат ти предлага да отгатнете паролата на облачния профил на съученик „само на шега“, за да му смените снимките. Какво правиш?',
      choices: [
        {
          id: 'k5_1a',
          label: 'Отказвам категорично — влизането в чужд профил е нарушение и предупреждавам съученика да си смени паролата.',
          isResponsible: true,
          points: 13,
          consequenceText: 'Предотврати злоупотреба и защити дигиталната сигурност на съученика си.',
          safetyImpact: 25,
        },
        {
          id: 'k5_1b',
          label: 'Съгласявам се, защото никой няма да разбере.',
          isResponsible: false,
          points: 0,
          consequenceText: 'Неоторизираният достъп до чужд профил е сериозно нарушение и руши доверието.',
          safetyImpact: -15,
        },
      ],
    },
    ...MISSION5_SCENES.slice(1),
  ],
};

export function getMission5Scenes(team: AvatarCodename): StoryScene[] {
  return TEAM_MISSION5_SCENES[team] ?? MISSION5_SCENES;
}

// === НИВО 6: ЛИЧНИ ДАННИ ЗА ВСЕКИ ОТБОР ===
const TEAM_LEVEL6_CARDS: Record<AvatarCodename, PersonalDataCard[]> = {
  Сокол: LEVEL6_CARDS,
  Нова: [
    { id: 'nl1', label: 'Любим жанр игри', category: 'careful', explanation: 'Общ интерес без лични координати.' },
    { id: 'nl2', label: 'Парола за Steam/Play акаунт', category: 'never', explanation: 'Паролата никога не се споделя с никого.' },
    { id: 'nl3', label: 'Истинско име и фамилия', category: 'trusted', explanation: 'Споделя се само с доверени хора и официални платформи.' },
    { id: 'nl4', label: 'Домашен адрес за доставка', category: 'never', explanation: 'Адресът никога не се публикува в геймърски профил.' },
    { id: 'nl5', label: 'Телефонен номер', category: 'trusted', explanation: 'Само за близки и при реална необходимост.' },
    { id: 'nl6', label: 'Снимка от училищния турнир', category: 'trusted', explanation: 'Снимките от училище изискват разрешение и затворен кръг.' },
    { id: 'nl7', label: 'Любим герой от анимация', category: 'careful', explanation: 'Безопасна тема за разговор без разкриване на самоличност.' },
  ],
  Атлас: [
    { id: 'al1', label: 'Любим филм или песен', category: 'careful', explanation: 'Безопасно споделяне на интереси.' },
    { id: 'al2', label: 'ЕГН и номер на ученическа карта', category: 'never', explanation: 'Критични лични данни — никога публично!' },
    { id: 'al3', label: 'Снимка пред входа на училището', category: 'trusted', explanation: 'Показва точното място, където ходиш — само за доверени.' },
    { id: 'al4', label: 'Код за двуфакторна защита (2FA)', category: 'never', explanation: 'Кодовете за сигурност са строго лични.' },
    { id: 'al5', label: 'Три имена', category: 'trusted', explanation: 'Лични данни — споделят се внимателно само с доверени хора.' },
    { id: 'al6', label: 'Телефонен номер на родител', category: 'trusted', explanation: 'Само при необходимост с доверени институции.' },
    { id: 'al7', label: 'Любимо хоби (рисуване)', category: 'careful', explanation: 'Не разкрива адрес или лична идентичност.' },
  ],
  Криптон: [
    { id: 'kl1', label: 'Любим предмет по информатика', category: 'careful', explanation: 'Безопасен учебен интерес.' },
    { id: 'kl2', label: 'Парола за домашния Wi-Fi рутер', category: 'never', explanation: 'Мрежовите пароли са строго поверителни.' },
    { id: 'kl3', label: 'ПИН код и резервни кодове за облака', category: 'never', explanation: 'Резервните кодове отварят целия профил — никога публично!' },
    { id: 'kl4', label: 'Училищен имейл адрес', category: 'trusted', explanation: 'Споделя се с учители и съученици за учебна работа.' },
    { id: 'kl5', label: 'Домашен телефон / адрес', category: 'trusted', explanation: 'Само с доверени близки и официални формуляри с родител.' },
    { id: 'kl6', label: 'Общностна снимка от състезание', category: 'trusted', explanation: 'Само със съгласие на участниците и в защитена група.' },
    { id: 'kl7', label: 'Любим робот или книга', category: 'careful', explanation: 'Общ разговор без риск за личната сигурност.' },
  ],
};

export function getLevel6Cards(team: AvatarCodename): PersonalDataCard[] {
  return TEAM_LEVEL6_CARDS[team] ?? LEVEL6_CARDS;
}

// === НИВО 7, 8, 9, 10, 11, Бонус 1, Бос ===
export function getLevel7Chat(team: AvatarCodename): ChatFlagMessage[] {
  if (team === 'Нова') {
    return [
      { id: 'n7_1', sender: 'stranger', text: 'Супер играеш! И аз съм в 6. клас, дай да станем приятели!', isRedFlag: false, explanation: 'Приятелският тон не доказва кой стои зад екрана.' },
      { id: 'n7_2', sender: 'stranger', text: 'В кое училище ходиш, за да видим дали сме от един квартал?', isRedFlag: true, flagLabel: 'Пита за училище', explanation: 'Червен флаг! Събира информация къде се намираш през деня.' },
      { id: 'n7_3', sender: 'stranger', text: 'Прати ми твое селфи тук в чата, да те видя!', isRedFlag: true, flagLabel: 'Иска снимка', explanation: 'Червен флаг! Личните снимки не се пращат на непознати.' },
      { id: 'n7_4', sender: 'stranger', text: 'Премини на таен чат и не казвай на вашите, че си говорим.', isRedFlag: true, flagLabel: 'Настоява за таен разговор', explanation: 'Червен флаг! Молбата за тайна от родителите е ясен знак за опасност.' },
      { id: 'n7_5', sender: 'stranger', text: 'Ще ти пратя златен пропуск, само ми дай домашния си адрес и телефона!', isRedFlag: true, flagLabel: 'Подарък срещу данни', explanation: 'Червен флаг! Скъп подарък срещу адрес и телефон е капан.' },
      { id: 'n7_6', sender: 'stranger', text: 'Утре в 17:00 ч. да се видим сами пред парка?', isRedFlag: true, flagLabel: 'Иска среща на живо', explanation: 'Червен флаг! Никога не се срещай с непознати от игри.' },
    ];
  }
  if (team === 'Атлас') {
    return [
      { id: 'a7_1', sender: 'stranger', text: 'Снимките ти са страхотни! Харесах всичките ти постове!', isRedFlag: false, explanation: 'Комплиментите са чест начин за печелене на доверие.' },
      { id: 'a7_2', sender: 'stranger', text: 'На коя улица живееш? Може да сме съседи!', isRedFlag: true, flagLabel: 'Пита за адрес', explanation: 'Червен флаг! Непознат никога не бива да знае адреса ти.' },
      { id: 'a7_3', sender: 'stranger', text: 'Изпрати ми видео само за мен, ще изчезне след 5 секунди.', isRedFlag: true, flagLabel: 'Иска лично видео', explanation: 'Червен флаг! Изчезващите съобщения могат да се запишат.' },
      { id: 'a7_4', sender: 'stranger', text: 'Ще ти дам 1000 последователи, но ми напиши паролата си за вход.', isRedFlag: true, flagLabel: 'Иска парола', explanation: 'Червен флаг! Никога не давай парола за последователи.' },
      { id: 'a7_5', sender: 'stranger', text: 'Не казвай на родителите си, те не разбират от социални мрежи.', isRedFlag: true, flagLabel: 'Изолира от родителите', explanation: 'Червен флаг! Манипулаторът винаги иска разговорът да е таен.' },
      { id: 'a7_6', sender: 'stranger', text: 'Ела сам в мола след училище, имам изненада за теб.', isRedFlag: true, flagLabel: 'Настоява за среща', explanation: 'Червен флаг! Опасна покана за среща на живо.' },
    ];
  }
  if (team === 'Криптон') {
    return [
      { id: 'k7_1', sender: 'stranger', text: 'Здравей! Аз съм от техническата поддръжка на ученическите таблети.', isRedFlag: false, explanation: 'Представянето в чат не означава, че профилът е истински.' },
      { id: 'k7_2', sender: 'stranger', text: 'Кажи ми паролата и ПИН кода си, за да „оправя“ облака ти.', isRedFlag: true, flagLabel: 'Иска парола и ПИН', explanation: 'Червен флаг! Техниците никога не искат личните ти пароли.' },
      { id: 'k7_3', sender: 'stranger', text: 'Прати ми снимка на личната карта или ученическия си бележник.', isRedFlag: true, flagLabel: 'Иска документ', explanation: 'Червен флаг! Не пращай документи на непознати профили.' },
      { id: 'k7_4', sender: 'stranger', text: 'Инсталирай този таен файл за отдалечен достъп и не казвай на вашите.', isRedFlag: true, flagLabel: 'Таен софтуер и секретност', explanation: 'Червен флаг! Молба за тайна + инсталиране на софтуер е двоен капан.' },
      { id: 'k7_5', sender: 'stranger', text: 'На кой точен адрес да дойда да ти настроя домашния рутер?', isRedFlag: true, flagLabel: 'Търси домашен адрес', explanation: 'Червен флаг! Опитва се да научи къде живееш.' },
      { id: 'k7_6', sender: 'stranger', text: 'Срещни ме сам пред входа на блока след часовете, за да ти дам USB.', isRedFlag: true, flagLabel: 'Опасна среща и USB', explanation: 'Червен флаг! Никога не се срещай с непознати и не взимай чужди флашки.' },
    ];
  }
  return LEVEL7_CHAT_MESSAGES;
}

export function getLevel8Files(team: AvatarCodename): SystemFileItem[] {
  if (team === 'Нова') {
    return [
      { id: 'nf1', filename: 'Tabela_Rezultati.txt', size: '12 KB', source: 'Училищен клуб', isDangerous: false, reason: 'Обикновен текстов файл с резултати.' },
      { id: 'nf2', filename: 'Aimbot_Free_Mod.exe', size: '6.8 MB', source: 'Случаен линк в чат', isDangerous: true, reason: 'Опасно! Изпълним .exe файл с обещание за хак в игра.' },
      { id: 'nf3', filename: 'Reward_Code.jpg.exe', size: '1.9 MB', source: 'Непознат профил', isDangerous: true, reason: 'Опасно! Двойно разширение (.jpg.exe) — крие зловредна програма.' },
      { id: 'nf4', filename: 'Pravila_Turnir.pptx', size: '1.7 MB', source: 'Треньор Стоянов', isDangerous: false, reason: 'Учебна презентация от треньора.' },
      { id: 'nf5', filename: 'FPS_Booster_Script.bat', size: '64 KB', source: 'Реклама в сайт', isDangerous: true, reason: 'Опасно! Скрипт (.bat) от неизвестен сайт може да зарази системата.' },
    ];
  }
  if (team === 'Атлас') {
    return [
      { id: 'af1', filename: 'Plakat_Izlojba.png', size: '2.1 MB', source: 'Училищен фотоклуб', isDangerous: false, reason: 'Безопасно изображение (.png) от училищния клуб.' },
      { id: 'af2', filename: 'Pro_PhotoFilter_Crack.exe', size: '9.4 MB', source: 'Пиратски сайт', isDangerous: true, reason: 'Опасно! „Краковете“ (.exe) често съдържат вируси и шпионски код.' },
      { id: 'af3', filename: 'Selfie_Album.pdf.exe', size: '1.4 MB', source: 'Фалшив имейл', isDangerous: true, reason: 'Опасно! Двойно разширение (.pdf.exe), маскирано като документ.' },
      { id: 'af4', filename: 'Statia_Bezopasnost.docx', size: '310 KB', source: 'Редакция 6. клас', isDangerous: false, reason: 'Нормален текстов документ от съученик.' },
      { id: 'af5', filename: 'Free_Followers_Bot.vbs', size: '48 KB', source: 'Непознат линк', isDangerous: true, reason: 'Опасно! Скрипт (.vbs) за фалшиви последователи крие зловреден код.' },
    ];
  }
  if (team === 'Криптон') {
    return [
      { id: 'kf1', filename: 'Cloud_Backup_Notes.txt', size: '18 KB', source: 'Училищен сървър', isDangerous: false, reason: 'Безопасен текстов файл.' },
      { id: 'kf2', filename: 'WiFi_Password_Finder.exe', size: '4.5 MB', source: 'Анонимен форум', isDangerous: true, reason: 'Опасно! Програмите за „откриване на пароли“ са троянски коне.' },
      { id: 'kf3', filename: 'System_Patch_2026.scr', size: '2.3 MB', source: 'Спам писмо', isDangerous: true, reason: 'Опасно! .scr файловете са изпълними програми, маскирани като скрийнсейвър.' },
      { id: 'kf4', filename: 'Grafik_IT_Kabinet.pdf', size: '820 KB', source: 'Г-н Димитров', isDangerous: false, reason: 'Проверен PDF документ от учителя по ИТ.' },
      { id: 'kf5', filename: 'Router_Driver_Fix.bat', size: '52 KB', source: 'Изскачаща реклама', isDangerous: true, reason: 'Опасно! .bat скрипт от реклама променя системните настройки.' },
    ];
  }
  return LEVEL8_FILES;
}

export function getLevel9Networks(team: AvatarCodename): WifiNetworkOption[] {
  if (team === 'Нова') {
    return [
      { id: 'nw1', ssid: 'Arena_Free_WiFi', security: 'Отворена (без парола)', signal: 'Силна', note: 'Отворена мрежа — данните без защита лесно се прихващат.' },
      { id: 'nw2', ssid: 'Club_Players_5G', security: 'WPA2 (Парола от организатора)', signal: 'Средна', note: 'Попитай организаторите за точната парола и име на мрежата.' },
      { id: 'nw3', ssid: 'Tournament_Official_Free', security: 'Отворена (без парола)', signal: 'Много силна', note: 'Името „Official“ не гарантира истинност — може да е фалшива точка за достъп!' },
    ];
  }
  if (team === 'Атлас') {
    return [
      { id: 'aw1', ssid: 'PressCenter_Free', security: 'Отворена (без парола)', signal: 'Силна', note: 'Отворена обществена мрежа — избягвай влизане с пароли.' },
      { id: 'aw2', ssid: 'MediaHub_Secure', security: 'WPA2/WPA3 (Парола на рецепция)', signal: 'Силна', note: 'Защитена служебна мрежа с парола от организаторите.' },
      { id: 'aw3', ssid: 'Free_Photos_WiFi', security: 'Отворена (без парола)', signal: 'Много силна', note: 'Съмнителна отворена мрежа с примамливо име.' },
    ];
  }
  if (team === 'Криптон') {
    return [
      { id: 'kw1', ssid: 'CyberMall_Guest_Free', security: 'Отворена (без парола)', signal: 'Силна', note: 'Без криптиране — опасна за облачни профили.' },
      { id: 'kw2', ssid: 'TechLab_Protected', security: 'WPA3 (Официална парола)', signal: 'Средна', note: 'Надежден стандарт WPA3, но винаги проверявай името с домакина.' },
      { id: 'kw3', ssid: 'Cloud_Sync_Free_5G', security: 'Отворена (без парола)', signal: 'Много силна', note: 'Класически Evil Twin капан със силен сигнал без парола.' },
    ];
  }
  return LEVEL9_NETWORKS;
}

export function getLevel10Items(team: AvatarCodename): FootprintItem[] {
  if (team === 'Нова') {
    return [
      { id: 'nfp1', kind: 'Публикация', content: '„Ето снимка с моя адрес на бележка до монитора, готов за стрийм!“', isRisky: true, explanation: 'Разкрива публично домашния ти адрес на кадър.' },
      { id: 'nfp2', kind: 'Снимка', content: 'Рисунка на любим космически кораб, създадена от теб.', isRisky: false, explanation: 'Безопасна творческа снимка.' },
      { id: 'nfp3', kind: 'Коментар', content: 'Агресивен коментар с обиди към загубил отбор.', isRisky: true, explanation: 'Обидите оставят негативна дигитална следа и вредят на репутацията.' },
      { id: 'nfp4', kind: 'Публикация', content: '„Ще бъда сам вкъщи до петък, пишете ми да играем цяла нощ!“', isRisky: true, explanation: 'Опасно споделяне на информация, че си сам у дома.' },
      { id: 'nfp5', kind: 'Харесване', content: 'Харесване на страница „Безплатни хакове за чужди акаунти“.', isRisky: true, explanation: 'Свързва профила ти с измамни и опасни ресурси.' },
      { id: 'nfp6', kind: 'Публикация', content: '„Благодарим на всички за честния мач днес!“', isRisky: false, explanation: 'Позитивна и безопасна публикация.' },
    ];
  }
  if (team === 'Атлас') {
    return [
      { id: 'afp1', kind: 'Публикация', content: '„Заминаваме на планина за цяла седмица, апартаментът остава празен!“', isRisky: true, explanation: 'Разкрива публично кога домът е без надзор.' },
      { id: 'afp2', kind: 'Снимка', content: 'Красив залез над парка без имена, адреси и номера.', isRisky: false, explanation: 'Безопасна творческа снимка.' },
      { id: 'afp3', kind: 'Коментар', content: 'Обиден коментар под профила на ученик от друг клас.', isRisky: true, explanation: 'Публичните обиди вредят и остават като дигитална следа.' },
      { id: 'afp4', kind: 'Снимка', content: 'Снимка на билет за концерт с ясно видим QR код и име.', isRisky: true, explanation: 'Някой може да открадне баркода на билета или личните ти данни.' },
      { id: 'afp5', kind: 'Харесване', content: 'Харесване на страница „Свали тайна програма за чужди пароли“.', isRisky: true, explanation: 'Свързва профила ти с опасни и незаконни инструменти.' },
      { id: 'afp6', kind: 'Публикация', content: '„Днес завърших дигиталната си рисунка за конкурса!“', isRisky: false, explanation: 'Позитивна и безопасна публикация.' },
    ];
  }
  if (team === 'Криптон') {
    return [
      { id: 'kfp1', kind: 'Снимка', content: 'Снимка на бележка с написана парола за училищния Wi-Fi.', isRisky: true, explanation: 'Никога не снимай и не публикувай пароли.' },
      { id: 'kfp2', kind: 'Публикация', content: '„Днес научих как работи двуфакторната защита!“', isRisky: false, explanation: 'Позитивна образователна публикация.' },
      { id: 'kfp3', kind: 'Публикация', content: '„Родителите ми пътуват и до неделя съм сам на ул. Витоша 14.“', isRisky: true, explanation: 'Точен адрес и информация, че си сам у дома — голям риск!' },
      { id: 'kfp4', kind: 'Коментар', content: 'Подигравки под снимка на съученик в публична група.', isRisky: true, explanation: 'Дигиталните подигравки остават и нараняват другите.' },
      { id: 'kfp5', kind: 'Харесване', content: 'Харесване на група „Клониране на чужди телефони за 5 минути“.', isRisky: true, explanation: 'Опасна следа, свързана със злонамерени действия.' },
      { id: 'kfp6', kind: 'Снимка', content: 'Снимка на проект по роботика без лични данни.', isRisky: false, explanation: 'Безопасно споделяне на ученическо постижение.' },
    ];
  }
  return LEVEL10_ITEMS;
}

export function getLevel11Clues(_team: AvatarCodename): DeepfakeClue[] {
  return LEVEL11_CLUES;
}

export function getBonus1Cards(_team: AvatarCodename) {
  return BONUS1_EVIDENCE_CARDS;
}

export function getBossChallenges(team: AvatarCodename): BossChallengeTask[] {
  // Всеки отбор се изправя пред Фантома с персонализиран ред и акцент
  if (team === 'Нова') {
    return [...BOSS_CHALLENGES.slice(2), ...BOSS_CHALLENGES.slice(0, 2)].map((t, idx) => ({
      ...t,
      shieldLayer: idx + 1,
      categoryLabel: `Слой ${idx + 1} · ${t.categoryLabel.split('·')[1]?.trim() ?? 'Защита'}`,
    }));
  }
  if (team === 'Атлас') {
    return [...BOSS_CHALLENGES.slice(3), ...BOSS_CHALLENGES.slice(0, 3)].map((t, idx) => ({
      ...t,
      shieldLayer: idx + 1,
      categoryLabel: `Слой ${idx + 1} · ${t.categoryLabel.split('·')[1]?.trim() ?? 'Защита'}`,
    }));
  }
  if (team === 'Криптон') {
    return [...BOSS_CHALLENGES].reverse().map((t, idx) => ({
      ...t,
      shieldLayer: idx + 1,
      categoryLabel: `Слой ${idx + 1} · ${t.categoryLabel.split('·')[1]?.trim() ?? 'Защита'}`,
    }));
  }
  return BOSS_CHALLENGES;
}
