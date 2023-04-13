import { CSSProperties } from 'react';
import css from './impact-bar-level.module.scss';
import { ImpactBarLevelProps } from './impact-bar-level.types';

export const ImpactBarLevel = (props: ImpactBarLevelProps): JSX.Element => {
  const { start, end, current, nextLevel, currentLevel, prevLevel, ...rest } = props;

  const curr = current - start;
  const diff = end - start;
  const result = (curr / diff) * 100;

  // TODO: clean up this logic
  const calculateTransformation = (value: number) => {
    const v = value - 100;

    if (v < -100) {
      return `calc(-100% + 0.75rem)`;
    }

    if (v > 0) {
      return `calc(0%)`;
    }

    if (v >= -50) {
      return `${v}%`;
    }

    if (v < -50) {
      return `calc(${v}% + 0.75rem)`;
    }
  };

  const style: CSSProperties = {
    transform: `translateX(${calculateTransformation(result)})`,
  };

  return (
    <div className={css.container} style={rest}>
      {/* <div className={css.currentLevel}>{currentLevel}</div> */}
      <div className={css.nextLevel}>{nextLevel}</div>
      <div className={css.prevLevel}>{prevLevel}</div>
      <div className={css.currentLevel}>{currentLevel}</div>
      <div className={css.startNumber}>{start.toLocaleString('en-US')}</div>
      <div className={css.endNumber}>{end.toLocaleString('en-US')}</div>
      <div className={css.barContainer} role="progressbar">
        <div style={style} className={css.innerBar}>
          <div className={css.bullet}></div>
        </div>
      </div>
    </div>
  );
};
