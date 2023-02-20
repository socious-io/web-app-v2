import {CSSProperties} from 'react';
import css from './impact-bar-simple.module.scss';
import {ImpactBarSimpleProps} from './impact-bar-simple.module.types';

export const ImpactBarSimple = (props: ImpactBarSimpleProps): JSX.Element => {
  const {start, end, current, ...rest} = props;

  const curr = current - start;
  const diff = end - start;
  const result = (curr / diff) * 100;

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
      <div className={css.barContainer} role="progressbar">
        <div style={style} className={css.innerBar}>
          <div className={css.bullet}></div>
        </div>
      </div>
      <div className={css.indicators}>
        <div>{start}</div>
        <div>{end}</div>
      </div>
    </div>
  );
};
