import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <header className={css.container}>
      <div onClick={props.onBack} className={css.back}>
        <img src="/public/icons/chevron-left.svg" />
      </div>
      <div className={css.title}>{props.title}</div>
    </header>
  );
};
