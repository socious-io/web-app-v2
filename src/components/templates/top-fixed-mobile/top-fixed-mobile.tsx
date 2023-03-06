import { TopFixedMobileProps } from './top-fixed-mobile.types';
import css from './top-fixed-mobile.module.scss';

export const TopFixedMobile = (props: TopFixedMobileProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.top}>{props.children[0]}</div>
      <div className={css.body}>{props.children[1]}</div>
    </div>
  );
};
