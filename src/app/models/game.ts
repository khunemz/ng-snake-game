import { Metric } from "./metric";

export interface Game {
  gameId: number;
  gameCode: string;
  gameName: string;
  maxScore: number;
  minScore: number;
  maxTime: number; // in sec
  maxTurnCount: number;
  matricX: number;
  matricY: number;
  maxObstruct: number;
  matrics: Metric[];
}

