import { useCallback, useRef, useEffect, useMemo } from 'react';

// Web Audio API based sound effects generator
class SoundGenerator {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0.3; // Master volume
      } catch {
        console.log('Web Audio API not supported');
        return null;
      }
    }
    return this.audioContext;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.gainNode) {
      this.gainNode.gain.value = muted ? 0 : 0.3;
    }
  }

  getMuted() {
    return this.isMuted;
  }

  // Collect coin/item sound - cheerful ding
  playCollect() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.gainNode!);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  // Hit obstacle sound - low thud with buzz
  playHit() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    // Low impact
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(this.gainNode!);
    
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(120, ctx.currentTime);
    osc1.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.2);
    
    gain1.gain.setValueAtTime(0.4, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.3);

    // Noise burst
    const bufferSize = ctx.sampleRate * 0.1;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    
    const noise = ctx.createBufferSource();
    const noiseGain = ctx.createGain();
    noise.buffer = buffer;
    noise.connect(noiseGain);
    noiseGain.connect(this.gainNode!);
    noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    noise.start(ctx.currentTime);
  }

  // Jump sound - quick ascending tone
  playJump() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.gainNode!);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }

  // Correct action sound - happy two-tone
  playCorrect() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const playNote = (freq: number, start: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(this.gainNode!);
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + 0.15);
      
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + 0.15);
    };

    playNote(523, 0);     // C5
    playNote(659, 0.1);   // E5
  }

  // Wrong action sound - descending buzz
  playWrong() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.gainNode!);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.25);
  }

  // Game start sound - energetic fanfare
  playGameStart() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(this.gainNode!);
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      const start = i * 0.1;
      gain.gain.setValueAtTime(0.25, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + 0.2);
      
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + 0.2);
    });
  }

  // Victory sound - triumphant melody
  playVictory() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const notes = [523, 659, 784, 659, 784, 1047]; // Victory jingle
    const durations = [0.15, 0.15, 0.15, 0.15, 0.15, 0.4];
    let time = 0;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(this.gainNode!);
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + durations[i]);
      
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + durations[i]);
      
      time += durations[i] * 0.8;
    });
  }

  // Game over sound - sad descending tones
  playGameOver() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const notes = [392, 349, 311, 262]; // G4, F4, Eb4, C4
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(this.gainNode!);
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const start = i * 0.25;
      gain.gain.setValueAtTime(0.2, ctx.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + start + 0.3);
      
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + 0.3);
    });
  }

  // Button click sound
  playClick() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.gainNode!);
    
    osc.type = 'sine';
    osc.frequency.value = 600;
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  }

  // Countdown tick sound
  playCountdown() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.gainNode!);
    
    osc.type = 'sine';
    osc.frequency.value = 440; // A4
    
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }

  // Combo sound - higher pitch for higher combos
  playCombo(comboCount: number) {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const baseFreq = 600 + Math.min(comboCount, 10) * 50;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.gainNode!);
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.08);
    
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
  }

  // New high score fanfare
  playNewHighScore() {
    const ctx = this.getContext();
    if (!ctx || this.isMuted) return;

    const notes = [523, 659, 784, 1047, 784, 1047, 1319]; // Extended victory
    const durations = [0.12, 0.12, 0.12, 0.2, 0.12, 0.12, 0.5];
    let time = 0;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(this.gainNode!);
      
      osc.type = 'triangle';
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime + time);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + time + durations[i]);
      
      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + durations[i]);
      
      time += durations[i] * 0.7;
    });
  }
}

// Singleton instance
let soundGenerator: SoundGenerator | null = null;

const getSoundGenerator = () => {
  if (!soundGenerator) {
    soundGenerator = new SoundGenerator();
  }
  return soundGenerator;
};

export const useGameSounds = () => {
  const generator = useRef<SoundGenerator | null>(null);

  useEffect(() => {
    generator.current = getSoundGenerator();
  }, []);

  const playCollect = useCallback(() => generator.current?.playCollect(), []);
  const playHit = useCallback(() => generator.current?.playHit(), []);
  const playJump = useCallback(() => generator.current?.playJump(), []);
  const playCorrect = useCallback(() => generator.current?.playCorrect(), []);
  const playWrong = useCallback(() => generator.current?.playWrong(), []);
  const playGameStart = useCallback(() => generator.current?.playGameStart(), []);
  const playVictory = useCallback(() => generator.current?.playVictory(), []);
  const playGameOver = useCallback(() => generator.current?.playGameOver(), []);
  const playClick = useCallback(() => generator.current?.playClick(), []);
  const playCountdown = useCallback(() => generator.current?.playCountdown(), []);
  const playCombo = useCallback((count: number) => generator.current?.playCombo(count), []);
  const playNewHighScore = useCallback(() => generator.current?.playNewHighScore(), []);

  const setMuted = useCallback((muted: boolean) => {
    generator.current?.setMuted(muted);
  }, []);

  const getMuted = useCallback(() => {
    return generator.current?.getMuted() ?? false;
  }, []);

  // IMPORTANT: memoize the returned object so it stays referentially stable.
  // Otherwise effects depending on `sounds` will re-run every render (breaking timers).
  return useMemo(
    () => ({
      playCollect,
      playHit,
      playJump,
      playCorrect,
      playWrong,
      playGameStart,
      playVictory,
      playGameOver,
      playClick,
      playCountdown,
      playCombo,
      playNewHighScore,
      setMuted,
      getMuted,
    }),
    [
      playCollect,
      playHit,
      playJump,
      playCorrect,
      playWrong,
      playGameStart,
      playVictory,
      playGameOver,
      playClick,
      playCountdown,
      playCombo,
      playNewHighScore,
      setMuted,
      getMuted,
    ]
  );
};
