import {CSSProperties} from 'react';

export interface LevelListProps extends CSSProperties {
  data: Array<{category: string}>;
}
