import { useState, useEffect, useCallback } from 'react';

export type GameId = 'jump-runner' | 'traffic-light' | 'coin-collector' | 'driving-simulator';

export interface LeaderboardEntry {
  score: number;
  date: string;
  vehicle: string;
}

const STORAGE_KEY = 'hk-vehicle-games-leaderboard';
const STORAGE_VERSION = 'v4'; // bump to reset bad old data

// Default leaderboard with different scores
const defaultLeaderboard: Record<GameId, LeaderboardEntry[]> = {
  'jump-runner': [
    { score: 320, date: new Date().toISOString(), vehicle: 'taxi' },
    { score: 260, date: new Date().toISOString(), vehicle: 'bus' },
    { score: 210, date: new Date().toISOString(), vehicle: 'minibus' },
    { score: 180, date: new Date().toISOString(), vehicle: 'tram' },
    { score: 140, date: new Date().toISOString(), vehicle: 'taxi' },
  ],
  'traffic-light': [
    { score: 160, date: new Date().toISOString(), vehicle: 'tram' },
    { score: 130, date: new Date().toISOString(), vehicle: 'taxi' },
    { score: 105, date: new Date().toISOString(), vehicle: 'bus' },
    { score: 85, date: new Date().toISOString(), vehicle: 'minibus' },
    { score: 60, date: new Date().toISOString(), vehicle: 'tram' },
  ],
  'coin-collector': [
    { score: 520, date: new Date().toISOString(), vehicle: 'minibus' },
    { score: 420, date: new Date().toISOString(), vehicle: 'taxi' },
    { score: 340, date: new Date().toISOString(), vehicle: 'tram' },
    { score: 260, date: new Date().toISOString(), vehicle: 'bus' },
    { score: 180, date: new Date().toISOString(), vehicle: 'taxi' },
  ],
  'driving-simulator': [
    { score: 850, date: new Date().toISOString(), vehicle: 'taxi' },
    { score: 680, date: new Date().toISOString(), vehicle: 'bus' },
    { score: 520, date: new Date().toISOString(), vehicle: 'minibus' },
    { score: 380, date: new Date().toISOString(), vehicle: 'tram' },
    { score: 240, date: new Date().toISOString(), vehicle: 'taxi' },
  ],
};

const getStoredLeaderboard = (): Record<GameId, LeaderboardEntry[]> => {
  try {
    // Check version - if different, reset to defaults
    const storedVersion = localStorage.getItem(STORAGE_KEY + '-version');
    if (storedVersion !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY + '-version', STORAGE_VERSION);
      return defaultLeaderboard;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<GameId, LeaderboardEntry[]>;

      // If data looks corrupted (e.g. top5 all same score), reset
      const looksBad = (gameId: GameId) => {
        const arr = parsed?.[gameId] || [];
        if (arr.length < 5) return false;
        const top5 = arr.slice(0, 5);
        const first = top5[0]?.score;
        return top5.every(e => e.score === first);
      };

      if (looksBad('jump-runner') || looksBad('traffic-light') || looksBad('coin-collector') || looksBad('driving-simulator')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(STORAGE_KEY + '-version', STORAGE_VERSION);
        return defaultLeaderboard;
      }

      return parsed;
    }
  } catch {
    console.log('Using default leaderboard');
  }
  return defaultLeaderboard;
};

const saveLeaderboard = (leaderboard: Record<GameId, LeaderboardEntry[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leaderboard));
  } catch {
    console.log('Failed to save leaderboard');
  }
};

export const useLeaderboard = (gameId: GameId) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [rank, setRank] = useState<number | null>(null);

  useEffect(() => {
    const stored = getStoredLeaderboard();
    setLeaderboard(stored[gameId] || []);
  }, [gameId]);

  const submitScore = useCallback((score: number, vehicle: string) => {
    const allLeaderboards = getStoredLeaderboard();
    const currentBoard = [...(allLeaderboards[gameId] || [])];
    
    const newEntry: LeaderboardEntry = {
      score,
      date: new Date().toISOString(),
      vehicle,
    };

    // Add new entry and sort by score descending
    currentBoard.push(newEntry);
    currentBoard.sort((a, b) => b.score - a.score);
    
    // Keep top 5
    const top5 = currentBoard.slice(0, 5);
    
    // Find rank of current score
    const currentRank = top5.findIndex(e => e.score === score && e.date === newEntry.date) + 1;
    
    // Check if it's a new high score (rank 1)
    const isHighScore = currentRank === 1;
    
    // Save updated leaderboard
    allLeaderboards[gameId] = top5;
    saveLeaderboard(allLeaderboards);
    
    setLeaderboard(top5);
    setIsNewHighScore(isHighScore);
    setRank(currentRank <= 5 ? currentRank : null);
    
    return { isHighScore, rank: currentRank <= 5 ? currentRank : null };
  }, [gameId]);

  const getHighScore = useCallback(() => {
    return leaderboard.length > 0 ? leaderboard[0].score : 0;
  }, [leaderboard]);

  const resetNewHighScore = useCallback(() => {
    setIsNewHighScore(false);
    setRank(null);
  }, []);

  return {
    leaderboard,
    submitScore,
    getHighScore,
    isNewHighScore,
    rank,
    resetNewHighScore,
  };
};

