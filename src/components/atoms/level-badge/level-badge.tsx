import { CSSProperties } from 'react';

import css from './level-badge.module.scss';
import { LevelBadgeProps } from './level-badge.types';

export const LevelBadge = ({ level, size }: LevelBadgeProps): JSX.Element => {
  const setSize: Record<LevelBadgeProps['size'], CSSProperties> = {
    l: { width: '6rem', height: '6rem', fontSize: '2.5rem' },
    s: { width: '3.625rem', height: '3.625rem', fontSize: '1.25rem' },
  };

  return (
    <div style={setSize[size]} role="button" className={css.container}>
      <div>{level}</div>
    </div>
  );
};
