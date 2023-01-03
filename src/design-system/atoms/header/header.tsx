import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  const { onBack, title } = props;

  return (
    <div className={css.container}>
      <img className={css.img} src="/src/assets/icons/chevron-left.svg" />
      <div className={css.title}>{title}</div>
      {/* <div>...</div> */}
    </div>
  );
};
