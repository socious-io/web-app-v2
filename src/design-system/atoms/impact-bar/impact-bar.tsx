import css from './impact-bar.module.scss';
import {ImpactBarProps} from './impact-bar.types';

export const ImpactBar = (props: ImpactBarProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.bar}>
        <div className={css.innerBar}></div>
      </div>
      <div className={css.bar}>
        <div className={css.innerBar}></div>
      </div>
      <div className={css.bar}>
        <div className={css.innerBar}></div>
      </div>
    </div>
  );
};
