import css from './top-static-mobile.module.scss';
import { TopStaticMobileProps } from './top-static-mobile.types';

export const TopStaticMobile = (props: TopStaticMobileProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.top}>{props.children[0]}</div>
      <div className={css.body}>{props.children[1]}</div>
    </div>
  );
};
