import { useState, useEffect, createContext, useContext } from 'react';

interface MeowContextType {
  meowMode: boolean;
  toggleMeowMode: () => void;
}

const MeowContext = createContext<MeowContextType>({
  meowMode: false,
  toggleMeowMode: () => {},
});

export const useMeowMode = () => useContext(MeowContext);

export const MeowProvider = ({ children }: { children: React.ReactNode }) => {
  const [meowMode, setMeowMode] = useState(false);

  const playMeow = () => {
    // Create a simple meow sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Meow-like frequency pattern
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    oscillator.frequency.exponentialRampToValueAtTime(500, audioContext.currentTime + 0.2);
    oscillator.frequency.exponentialRampToValueAtTime(300, audioContext.currentTime + 0.4);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleMeowMode = () => {
    const newMode = !meowMode;
    setMeowMode(newMode);
    if (newMode) {
      playMeow();
    }
  };

  useEffect(() => {
    if (meowMode) {
      document.body.classList.add('paw-cursor');
    } else {
      document.body.classList.remove('paw-cursor');
    }
  }, [meowMode]);

  return (
    <MeowContext.Provider value={{ meowMode, toggleMeowMode }}>
      {children}
    </MeowContext.Provider>
  );
};
