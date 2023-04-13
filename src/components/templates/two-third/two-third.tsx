import css from './two-third.module.scss';
import { TwoThirdProps } from './two-third.types';

export const TwoThird = (props: TwoThirdProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.top}>{props.top}</div>
      <div className={css.bottom}>{props.bottom}</div>
    </div>
  );
};
