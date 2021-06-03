export interface GameStats {
  id: number;
  roomId: number;
  gameId: number;
  playerId: number;
  turnNumber: number;
  pointPerTurn: number;
  accumScore: number;
  currentMetricIndex: number;
  metaDescription: string;
  timestamp: string;
  
}
