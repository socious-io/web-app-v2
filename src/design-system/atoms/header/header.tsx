import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  const { onBack, title, ...rest } = props;

  return (
    <div style={rest} onClick={onBack} className={css.container}>
      <img className={css.img} src="/icons/chevron-left.svg" />
      <div className={css.title}>{title}</div>
      {props.right && <div className={css.right}>{props.right}</div>}
    </div>
  );
};
