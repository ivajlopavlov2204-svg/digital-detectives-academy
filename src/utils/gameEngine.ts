import {
  AvatarCodename,
  DetectiveState,
  DifficultyLevel,
  LevelId,
  MissionMetadata,
  MissionResult,
  PasswordAnalysis,
  PlayMode,
  TeamProgressSnapshot,
} from '../types/game';

const STORAGE_KEY = 'digital_detectives_academy_v2';

export const MAIN_LEVEL_ORDER: LevelId[] = [
  'mission1',
  'mission2',
  'mission3',
  'mission4',
  'mission5',
  'mission6',
  'mission7',
  'mission8',
  'mission9',
  'mission10',
  'mission11',
  'mission12',
];

export const ALL_LEVEL_ORDER: LevelId[] = [
  ...MAIN_LEVEL_ORDER,
  'bonus1',
  'bonus2',
  'bonus3',
  'boss',
];

export const INITIAL_STATE: DetectiveState = {
  detectiveName: '',
  partnerName: '',
  playMode: 'solo',
  difficulty: 'medium',
  codename: 'Сокол',
  registered: false,
  unlockedMainIndex: 0,
  results: {},
  earnedBadges: [],
  discoveredClues: [],
  totalTimeSeconds: 0,
  soundEnabled: true,
  teamProfiles: {},
};

export function loadDetectiveState(): DetectiveState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as Partial<DetectiveState>;
    return {
      ...INITIAL_STATE,
      ...parsed,
      results: parsed.results ?? {},
      earnedBadges: Array.isArray(parsed.earnedBadges) ? parsed.earnedBadges : [],
      discoveredClues: Array.isArray(parsed.discoveredClues) ? parsed.discoveredClues : [],
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveDetectiveState(state: DetectiveState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors
  }
}

export function clearDetectiveState(): DetectiveState {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  }
  return { ...INITIAL_STATE };
}

export function getDifficultyConfig(difficulty: DifficultyLevel): {
  label: string;
  hintPenalty: number;
  mistakePenalty: number;
  bossMistakePenalty: number;
  blitzSeconds: number;
  description: string;
} {
  if (difficulty === 'easy') {
    return {
      label: 'Лесно',
      hintPenalty: 2,
      mistakePenalty: 2,
      bossMistakePenalty: 5,
      blitzSeconds: 75,
      description: 'Грешка отнема 2 т., подсказка от ДЕКС струва 2 т., блицът е 75 секунди.',
    };
  } else if (difficulty === 'expert') {
    return {
      label: 'Експертно',
      hintPenalty: 8,
      mistakePenalty: 5,
      bossMistakePenalty: 12,
      blitzSeconds: 45,
      description: 'Грешка отнема 5 т. (12 т. при Боса), подсказка струва 8 т., блицът е 45 секунди.',
    };
  }
  return {
    label: 'Средно',
    hintPenalty: 5,
    mistakePenalty: 3,
    bossMistakePenalty: 8,
    blitzSeconds: 60,
    description: 'Грешка отнема 3 т. (8 т. при Боса), подсказка струва 5 т., блицът е 60 секунди.',
  };
}

/**
 * Разбърква масив чрез алгоритъма Fisher-Yates за случайни въпроси при преиграване.
 */
export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

/**
 * Алгоритмична проверка и оценка на парола чрез обхождане с цикъл for и условни конструкции if/else.
 */
export function analyzePasswordStrength(password: string): PasswordAnalysis {
  const commonWeakPatterns: string[] = [
    '1234',
    '12345',
    '123456',
    'password',
    'parola',
    'qwerty',
    'admin',
    'cyber',
    '1111',
    '0000',
  ];

  let hasUppercase = false;
  let hasLowercase = false;
  let hasDigit = false;
  let hasSymbol = false;

  for (let i = 0; i < password.length; i++) {
    const ch = password[i];
    if (ch >= 'A' && ch <= 'Z') {
      hasUppercase = true;
    } else if (ch >= 'a' && ch <= 'z') {
      hasLowercase = true;
    } else if (ch >= 'А' && ch <= 'Я') {
      hasUppercase = true;
    } else if (ch >= 'а' && ch <= 'я') {
      hasLowercase = true;
    } else if (ch >= '0' && ch <= '9') {
      hasDigit = true;
    } else if (ch !== ' ') {
      hasSymbol = true;
    }
  }

  const lower = password.toLowerCase();
  let hasNoCommonPattern = password.length > 0;

  for (let i = 0; i < commonWeakPatterns.length; i++) {
    if (lower.includes(commonWeakPatterns[i])) {
      hasNoCommonPattern = false;
      break;
    }
  }

  const hasMinLength = password.length >= 10;

  let score = 0;
  if (password.length >= 6) score += 10;
  if (hasMinLength) score += 25;
  if (password.length >= 13) score += 10;
  if (hasUppercase) score += 15;
  if (hasLowercase) score += 10;
  if (hasDigit) score += 15;
  if (hasSymbol) score += 15;

  if (!hasNoCommonPattern && password.length > 0) {
    score = Math.max(5, score - 35);
  }

  if (score > 100) score = 100;

  let label: PasswordAnalysis['label'] = 'Много слаба';
  let feedback = 'Добави поне 10 символа, главни и малки букви, цифра и специален знак.';

  if (password.length === 0) {
    score = 0;
    label = 'Много слаба';
    feedback = 'Въведи примерна парола, за да започне проверката за сигурност.';
  } else if (!hasNoCommonPattern) {
    label = 'Слаба';
    feedback = 'Съдържа лесна за отгатване дума или поредица (напр. 1234, parola, qwerty).';
  } else if (score >= 90 && hasMinLength && hasUppercase && hasLowercase && hasDigit && hasSymbol) {
    label = 'Непробиваема';
    feedback = 'Отлично! Паролата съчетава дължина и разнообразие от символи.';
  } else if (score >= 70) {
    label = 'Силна';
    feedback = 'Много добре, но добави липсващите елементи за максимална защита.';
  } else if (score >= 45) {
    label = 'Средна';
    feedback = 'Добра основа — увеличи дължината или добави цифри и символи (!@#).';
  } else {
    label = 'Слаба';
    feedback = 'Твърде кратка или еднотипна парола. Лесна цел за автоматизирана атака.';
  }

  return {
    score,
    label,
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasDigit,
    hasSymbol,
    hasNoCommonPattern,
    feedback,
  };
}

/**
 * Изчислява общия брой точки по 1000-точковата система (600 основни + 150 бонус + 250 бос).
 */
export function calculateAcademyScore(
  results: Partial<Record<LevelId, MissionResult>>,
  missions: MissionMetadata[]
): {
  totalScore: number;
  maxPossibleScore: number;
  mainScore: number;
  bonusScore: number;
  bossScore: number;
  mainCompletedCount: number;
  bonusCompletedCount: number;
  bossCompleted: boolean;
  totalCompletedCount: number;
  totalMistakes: number;
} {
  let totalScore = 0;
  let maxPossibleScore = 0;
  let mainScore = 0;
  let bonusScore = 0;
  let bossScore = 0;
  let mainCompletedCount = 0;
  let bonusCompletedCount = 0;
  let bossCompleted = false;
  let totalMistakes = 0;

  for (let i = 0; i < missions.length; i++) {
    const mission = missions[i];
    maxPossibleScore += mission.maxPoints;
    const res = results[mission.id];
    if (res && res.completed) {
      totalScore += res.score;
      totalMistakes += res.mistakes;
      if (mission.category === 'main') {
        mainScore += res.score;
        mainCompletedCount += 1;
      } else if (mission.category === 'bonus') {
        bonusScore += res.score;
        bonusCompletedCount += 1;
      } else if (mission.category === 'boss') {
        bossScore += res.score;
        bossCompleted = true;
      }
    }
  }

  return {
    totalScore,
    maxPossibleScore,
    mainScore,
    bonusScore,
    bossScore,
    mainCompletedCount,
    bonusCompletedCount,
    bossCompleted,
    totalCompletedCount: mainCompletedCount + bonusCompletedCount + (bossCompleted ? 1 : 0),
    totalMistakes,
  };
}

/**
 * Определя ранга на детектива според напредъка в главите и победата над Фантома.
 */
export function getDetectiveRank(
  mainCompletedCount: number,
  bossCompleted: boolean,
  totalScore: number
): {
  title: string;
  chapterBadge: string;
  summary: string;
} {
  if (bossCompleted && totalScore >= 700) {
    return {
      title: 'ЛЕГЕНДАРЕН КИБЕРДЕТЕКТИВ',
      chapterBadge: 'Финал · Защитник на Cyber City',
      summary: 'Победи Фантома и защити всички сектори на дигиталния град.',
    };
  } else if (mainCompletedCount >= 9) {
    return {
      title: 'МАЙСТОР ДЕТЕКТИВ',
      chapterBadge: 'Глава III · Нива 9–12',
      summary: 'Владееш сложни разследвания и си готов за финалния сблъсък с Фантома.',
    };
  } else if (mainCompletedCount >= 5) {
    return {
      title: 'ОПИТЕН ИЗСЛЕДОВАТЕЛ',
      chapterBadge: 'Глава II · Нива 5–8',
      summary: 'Разкриваш по-сложни дигитални заплахи, фалшиви профили и вируси.',
    };
  }
  return {
    title: 'МЛАД ДЕТЕКТИВ',
    chapterBadge: 'Глава I · Нива 1–4',
    summary: 'Откриваш първите следи и изграждаш основните умения за интернет сигурност.',
  };
}

export function isLevelUnlocked(levelId: LevelId, state: DetectiveState): boolean {
  const mainIdx = MAIN_LEVEL_ORDER.indexOf(levelId);
  if (mainIdx !== -1) {
    return mainIdx <= state.unlockedMainIndex;
  }
  const summary = calculateAcademyScore(state.results, []);
  void summary;

  // Бонус 1 се отключва след Глава I (завършено Ниво 4)
  if (levelId === 'bonus1') {
    return Boolean(state.results.mission4?.completed);
  }
  // Бонус 2 се отключва след завършване на Ниво 6
  if (levelId === 'bonus2') {
    return Boolean(state.results.mission6?.completed);
  }
  // Тайна мисия (Бонус 3) се отключва след Глава II (Ниво 8) и поне 4 значки
  if (levelId === 'bonus3') {
    return Boolean(state.results.mission8?.completed) && state.earnedBadges.length >= 4;
  }
  // Финалният бос се отключва след завършване на всички 12 основни нива
  if (levelId === 'boss') {
    return Boolean(state.results.mission12?.completed);
  }
  return false;
}

export function applyMissionCompletion(
  prevState: DetectiveState,
  result: MissionResult,
  missions: MissionMetadata[]
): { nextState: DetectiveState; newlyUnlockedBadges: string[]; levelUnlocked: boolean } {
  const mainIdx = MAIN_LEVEL_ORDER.indexOf(result.missionId);
  const existing = prevState.results[result.missionId];

  const bestScore = existing ? Math.max(existing.score, result.score) : result.score;
  const bestMistakes = existing ? Math.min(existing.mistakes, result.mistakes) : result.mistakes;

  const updatedResults: Partial<Record<LevelId, MissionResult>> = {
    ...prevState.results,
    [result.missionId]: {
      ...result,
      score: bestScore,
      mistakes: bestMistakes,
    },
  };

  let nextUnlockedIndex = prevState.unlockedMainIndex;
  let levelUnlocked = false;
  if (mainIdx !== -1 && mainIdx >= prevState.unlockedMainIndex && mainIdx + 1 < MAIN_LEVEL_ORDER.length) {
    nextUnlockedIndex = mainIdx + 1;
    levelUnlocked = true;
  }

  const nextClues = [...prevState.discoveredClues];
  if (result.clueUnlocked && !nextClues.includes(result.clueUnlocked)) {
    nextClues.push(result.clueUnlocked);
  }

  const nextBadges = [...prevState.earnedBadges];
  const newlyUnlockedBadges: string[] = [];

  const grantBadge = (badgeId: string) => {
    if (!nextBadges.includes(badgeId)) {
      nextBadges.push(badgeId);
      newlyUnlockedBadges.push(badgeId);
    }
  };

  if (updatedResults.mission1?.completed) grantBadge('scam_hunter');
  if (updatedResults.mission2?.completed) grantBadge('code_breaker');
  if (updatedResults.mission4?.completed) grantBadge('chapter1_graduate');
  if (updatedResults.mission6?.completed) grantBadge('data_guardian');
  if (updatedResults.mission8?.completed) grantBadge('chapter2_graduate');
  if (updatedResults.mission9?.completed && updatedResults.mission11?.completed) {
    grantBadge('deepfake_detector');
  }
  if (updatedResults.mission12?.completed) grantBadge('chapter3_graduate');
  if (updatedResults.bonus1?.completed) grantBadge('board_analyst');
  if (updatedResults.bonus2?.completed) grantBadge('speed_thinker');
  if (updatedResults.bonus3?.completed) grantBadge('secret_agent');

  if (result.mistakes === 0 && result.hintsUsed === 0 && result.score >= Math.round(result.maxScore * 0.9)) {
    grantBadge('precision_analyst');
  }

  const summary = calculateAcademyScore(updatedResults, missions);
  if (updatedResults.boss?.completed && summary.totalScore >= 700) {
    grantBadge('legendary_detective');
  }

  const nextState: DetectiveState = {
    ...prevState,
    unlockedMainIndex: nextUnlockedIndex,
    results: updatedResults,
    earnedBadges: nextBadges,
    discoveredClues: nextClues,
    totalTimeSeconds: prevState.totalTimeSeconds + result.timeSeconds,
  };

  return { nextState, newlyUnlockedBadges, levelUnlocked };
}

export function formatTimeMMSS(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const mm = mins < 10 ? `0${mins}` : `${mins}`;
  const ss = secs < 10 ? `0${secs}` : `${secs}`;
  return `${mm}:${ss}`;
}

export function registerDetective(
  prevState: DetectiveState,
  name: string,
  partnerName: string,
  playMode: PlayMode,
  difficulty: DifficultyLevel,
  codename: AvatarCodename
): DetectiveState {
  const trimmed = name.trim();
  const trimmedPartner = partnerName.trim();
  return {
    ...prevState,
    detectiveName: trimmed.length > 0 ? trimmed : 'Агент 06',
    partnerName: playMode === 'duo' ? (trimmedPartner.length > 0 ? trimmedPartner : 'Агент 07') : '',
    playMode,
    difficulty,
    codename,
    registered: true,
  };
}

export function switchTeam(
  prevState: DetectiveState,
  nextTeam: AvatarCodename
): DetectiveState {
  if (prevState.codename === nextTeam) return prevState;

  const currentSnapshot: TeamProgressSnapshot = {
    unlockedMainIndex: prevState.unlockedMainIndex,
    results: prevState.results,
    earnedBadges: prevState.earnedBadges,
    discoveredClues: prevState.discoveredClues,
    totalTimeSeconds: prevState.totalTimeSeconds,
  };

  const updatedProfiles: Partial<Record<AvatarCodename, TeamProgressSnapshot>> = {
    ...(prevState.teamProfiles ?? {}),
    [prevState.codename]: currentSnapshot,
  };

  const targetSnapshot = updatedProfiles[nextTeam] ?? {
    unlockedMainIndex: 0,
    results: {},
    earnedBadges: [],
    discoveredClues: [],
    totalTimeSeconds: 0,
  };

  return {
    ...prevState,
    codename: nextTeam,
    unlockedMainIndex: targetSnapshot.unlockedMainIndex,
    results: targetSnapshot.results,
    earnedBadges: targetSnapshot.earnedBadges,
    discoveredClues: targetSnapshot.discoveredClues,
    totalTimeSeconds: targetSnapshot.totalTimeSeconds,
    teamProfiles: updatedProfiles,
  };
}
