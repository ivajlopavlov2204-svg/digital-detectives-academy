/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import {
  ActiveView,
  AvatarCodename,
  DetectiveState,
  DifficultyLevel,
  LevelId,
  MissionResult,
  PlayMode,
} from './types/game';
import { getMissionsForTeam } from './data/teamMissions';
import {
  MAIN_LEVEL_ORDER,
  applyMissionCompletion,
  clearDetectiveState,
  isLevelUnlocked,
  loadDetectiveState,
  registerDetective,
  saveDetectiveState,
  switchTeam,
} from './utils/gameEngine';
import { playFeedbackSound } from './utils/soundFx';
import { TopBar } from './components/TopBar';
import { OnboardingView } from './components/OnboardingView';
import { HeadquartersView } from './components/HeadquartersView';
import { DossierView } from './components/DossierView';
import { SuspectsView } from './components/SuspectsView';
import { RulesView } from './components/RulesView';
import { CertificateView } from './components/CertificateView';
import { MissionShell } from './components/missions/MissionShell';

export default function App() {
  const [state, setState] = useState<DetectiveState>(() => loadDetectiveState());
  const [activeView, setActiveView] = useState<ActiveView>(() =>
    loadDetectiveState().registered ? 'hq' : 'onboarding'
  );
  const [activeLevelId, setActiveLevelId] = useState<LevelId>('mission1');

  useEffect(() => {
    saveDetectiveState(state);
  }, [state]);

  const handleSound = (
    kind: 'click' | 'clue' | 'success' | 'error' | 'unlock' | 'victory'
  ) => {
    playFeedbackSound(kind, state.soundEnabled);
  };

  const handleRegister = (
    name: string,
    partnerName: string,
    playMode: PlayMode,
    difficulty: DifficultyLevel,
    codename: AvatarCodename
  ) => {
    handleSound('unlock');
    setState((prev) =>
      registerDetective(prev, name, partnerName, playMode, difficulty, codename)
    );
    setActiveView('hq');
  };

  const teamMissions = getMissionsForTeam(state.codename);

  const handleUpdateProfile = (
    name: string,
    partnerName: string,
    codename: AvatarCodename
  ) => {
    handleSound('success');
    setState((prev) => {
      const switched = codename !== prev.codename ? switchTeam(prev, codename) : prev;
      return {
        ...switched,
        detectiveName: name,
        partnerName,
      };
    });
  };

  const handleSwitchTeam = (nextTeam: AvatarCodename) => {
    handleSound('click');
    setState((prev) => switchTeam(prev, nextTeam));
  };

  const handleStartLevel = (levelId: LevelId) => {
    if (!isLevelUnlocked(levelId, state)) return;
    handleSound('click');
    setActiveLevelId(levelId);
    setActiveView('mission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMissionComplete = (result: MissionResult) => {
    const outcome = applyMissionCompletion(state, result, teamMissions);
    setState(outcome.nextState);
    return {
      newlyUnlockedBadges: outcome.newlyUnlockedBadges,
      levelUnlocked: outcome.levelUnlocked,
    };
  };

  const handleOpenNextOrCertificate = (completedLevelId: LevelId) => {
    if (completedLevelId === 'boss') {
      setActiveView('certificate');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const mainIdx = MAIN_LEVEL_ORDER.indexOf(completedLevelId);
    if (mainIdx !== -1 && mainIdx + 1 < MAIN_LEVEL_ORDER.length) {
      setActiveLevelId(MAIN_LEVEL_ORDER[mainIdx + 1]);
      setActiveView('mission');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (completedLevelId === 'mission12') {
      setActiveLevelId('boss');
      setActiveView('mission');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setActiveView('hq');
  };

  const handleResetProgress = () => {
    const fresh = clearDetectiveState();
    setState(fresh);
    setActiveLevelId('mission1');
    setActiveView('onboarding');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrimaryHeaderAction = () => {
    if (!state.registered) {
      setActiveView('onboarding');
      return;
    }
    if (state.results.boss?.completed) {
      setActiveView('certificate');
      return;
    }
    if (state.results.mission12?.completed) {
      handleStartLevel('boss');
      return;
    }
    const currentIdx = Math.min(state.unlockedMainIndex, MAIN_LEVEL_ORDER.length - 1);
    handleStartLevel(MAIN_LEVEL_ORDER[currentIdx]);
  };

  const activeMission =
    teamMissions.find((m) => m.id === activeLevelId) ?? teamMissions[0];

  return (
    <div className="min-h-screen flex flex-col cyber-grid-bg text-[#E6EEFF]">
      <TopBar
        activeView={activeView}
        isRegistered={state.registered}
        isBossCompleted={Boolean(state.results.boss?.completed)}
        onNavigate={(view) => {
          handleSound('click');
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onPrimaryAction={handlePrimaryHeaderAction}
      />

      <div className="flex-1">
        {activeView === 'onboarding' && (
          <OnboardingView
            initialName={state.detectiveName}
            initialPartnerName={state.partnerName}
            initialPlayMode={state.playMode}
            initialDifficulty={state.difficulty}
            initialCodename={state.codename}
            onRegister={handleRegister}
          />
        )}

        {activeView === 'hq' && (
          <HeadquartersView
            state={state}
            onStartMission={handleStartLevel}
            onToggleSound={() =>
              setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
            }
            onChangeDifficulty={(difficulty) =>
              setState((prev) => ({ ...prev, difficulty }))
            }
            onSwitchTeam={handleSwitchTeam}
            onResetProgress={handleResetProgress}
            onOpenCertificate={() => setActiveView('certificate')}
          />
        )}

        {activeView === 'mission' && (
          <MissionShell
            mission={activeMission}
            state={state}
            onSound={handleSound}
            onBackToHq={() => {
              handleSound('click');
              setActiveView('hq');
            }}
            onMissionComplete={handleMissionComplete}
            onOpenNextOrCertificate={handleOpenNextOrCertificate}
          />
        )}

        {activeView === 'dossier' && (
          <DossierView
            state={state}
            onUpdateProfile={handleUpdateProfile}
            onOpenCertificate={() => setActiveView('certificate')}
          />
        )}

        {activeView === 'suspects' && <SuspectsView state={state} />}

        {activeView === 'rules' && <RulesView />}

        {activeView === 'certificate' && (
          <CertificateView
            state={state}
            onBackToHq={() => setActiveView('hq')}
          />
        )}
      </div>

      <footer className="border-t border-slate-800/70 bg-[#050914] py-5 px-6 text-center text-xs text-slate-400">
        DIGITAL DETECTIVES – ОПЕРАЦИЯ „БЕЗОПАСЕН ИНТЕРНЕТ“ · Детективска академия (12 нива + Бос) · Cyber City
      </footer>
    </div>
  );
}
