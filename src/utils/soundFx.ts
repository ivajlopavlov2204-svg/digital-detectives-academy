// Web Audio API synthesized feedback effects without external audio assets

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  gainValue = 0.08,
  delay = 0
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(gainValue, now + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playFeedbackSound(
  kind: 'click' | 'clue' | 'success' | 'error' | 'unlock' | 'victory',
  enabled: boolean
): void {
  if (!enabled) return;

  try {
    if (kind === 'click') {
      playTone(540, 0.06, 'sine', 0.04);
    } else if (kind === 'clue') {
      playTone(587.33, 0.1, 'triangle', 0.07, 0);
      playTone(880, 0.14, 'triangle', 0.07, 0.08);
    } else if (kind === 'success') {
      playTone(523.25, 0.11, 'sine', 0.07, 0);
      playTone(659.25, 0.12, 'sine', 0.07, 0.09);
      playTone(783.99, 0.18, 'sine', 0.08, 0.18);
    } else if (kind === 'error') {
      playTone(240, 0.14, 'sawtooth', 0.04, 0);
      playTone(190, 0.18, 'sawtooth', 0.04, 0.11);
    } else if (kind === 'unlock') {
      playTone(440, 0.1, 'triangle', 0.06, 0);
      playTone(554.37, 0.1, 'triangle', 0.06, 0.08);
      playTone(659.25, 0.14, 'triangle', 0.07, 0.16);
      playTone(880, 0.22, 'triangle', 0.08, 0.24);
    } else if (kind === 'victory') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      for (let i = 0; i < notes.length; i++) {
        playTone(notes[i], 0.22, 'triangle', 0.08, i * 0.11);
      }
    }
  } catch {
    // Ignore audio context restriction errors
  }
}
