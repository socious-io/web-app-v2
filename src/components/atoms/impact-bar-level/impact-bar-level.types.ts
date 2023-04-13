import {CSSProperties} from 'react';
export interface ImpactBarLevelProps extends CSSProperties {
  start: number;
  end: number;
  current: number;
  currentLevel: string;
  prevLevel: string;
  nextLevel: string;
}
