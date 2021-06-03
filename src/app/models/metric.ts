import { Obstruct } from "./obstruct";

export interface Metric {
  index: number;
  position: number;
  isStart: number;
  isFinish: number;
  moveToIndex?: number;
  description: string;
  iconUrl: string;
  isHasObstruct: boolean;
  isRepeatable: boolean;
  bonus: number;
}
