export type LevelId =
  | 'mission1'
  | 'mission2'
  | 'mission3'
  | 'mission4'
  | 'mission5'
  | 'mission6'
  | 'mission7'
  | 'mission8'
  | 'mission9'
  | 'mission10'
  | 'mission11'
  | 'mission12'
  | 'bonus1'
  | 'bonus2'
  | 'bonus3'
  | 'boss';

export type ChapterId = 'chapter1' | 'chapter2' | 'chapter3' | 'special';

export type DifficultyLevel = 'easy' | 'medium' | 'expert';

export type PlayMode = 'solo' | 'duo';

export type ActiveView =
  | 'onboarding'
  | 'hq'
  | 'mission'
  | 'dossier'
  | 'suspects'
  | 'rules'
  | 'certificate';

export type AvatarCodename = 'Сокол' | 'Нова' | 'Атлас' | 'Криптон';

export interface MissionResult {
  missionId: LevelId;
  completed: boolean;
  score: number;
  maxScore: number;
  mistakes: number;
  hintsUsed: number;
  timeSeconds: number;
  clueUnlocked: string;
  completedAt: string;
  branchSummary?: string;
}

export interface TeamProgressSnapshot {
  unlockedMainIndex: number;
  results: Partial<Record<LevelId, MissionResult>>;
  earnedBadges: string[];
  discoveredClues: string[];
  totalTimeSeconds: number;
}

export interface DetectiveState {
  detectiveName: string;
  partnerName: string;
  playMode: PlayMode;
  difficulty: DifficultyLevel;
  codename: AvatarCodename;
  registered: boolean;
  unlockedMainIndex: number; // 0..11 for the 12 main levels
  results: Partial<Record<LevelId, MissionResult>>;
  earnedBadges: string[];
  discoveredClues: string[];
  totalTimeSeconds: number;
  soundEnabled: boolean;
  teamProfiles?: Partial<Record<AvatarCodename, TeamProgressSnapshot>>;
}

export interface MissionMetadata {
  id: LevelId;
  chapter: ChapterId;
  chapterTitle: string;
  category: 'main' | 'bonus' | 'boss';
  index: number; // 0..11 for main, 12..14 for bonuses, 15 for boss
  numberLabel: string;
  title: string;
  subtitle: string;
  skillFocus: string;
  maxPoints: number;
  estimatedMinutes: number;
  briefingStory: string;
  clueRewardTitle: string;
  clueRewardText: string;
  dexHints: string[];
  citySector: string;
}

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  conditionLabel: string;
}

export interface SuspectProfile {
  id: string;
  name: string;
  alias: string;
  role: string;
  riskLevel: 'Висок риск' | 'Среден риск' | 'Разследван';
  unlockAtMainIndex: number;
  summary: string;
  digitalFootprint: string[];
  isMastermind?: boolean;
}

export interface PasswordAnalysis {
  score: number;
  label: 'Много слаба' | 'Слаба' | 'Средна' | 'Силна' | 'Непробиваема';
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasDigit: boolean;
  hasSymbol: boolean;
  hasNoCommonPattern: boolean;
  feedback: string;
}
