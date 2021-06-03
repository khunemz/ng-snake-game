export interface GameStats {
  id: number;
  gameId: number;
  userId: number;
  turnNumber: number;
  pointPerTurn: number;
  accumScore: number;
  metaDescription: string;
  timestamp: string;
}
