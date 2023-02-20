import css from './header-static-mobile.module.scss';
import { HeaderStaticMobileProps } from './header-static-mobile.types';

export const HeaderStaticMobile = (props: HeaderStaticMobileProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.header}>{props.children[0]}</div>
      <div className={css.body}>{props.children[1]}</div>
    </div>
  );
};
