export type VehicleType = 'taxi' | 'minibus' | 'bus' | 'tram';

export interface Vehicle {
  id: VehicleType;
  name: string;
  nameEn: string;
  image: string;
  color: string;
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  timeLeft: number;
  difficulty: 'easy' | 'hard';
  gameOver: boolean;
  won: boolean;
}

export interface Obstacle {
  id: number;
  x: number;
  type: 'cone' | 'box' | 'barrier';
  speed: number;
}

export interface Coin {
  id: number;
  x: number;
  y: number;
  collected: boolean;
}
