import { useNavigate } from '@tanstack/react-location';
import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  const { onBack, title, ...rest } = props;
  const navigate = useNavigate();

  return (
    <div style={rest} onClick={() => navigate({to: '..'})} className={css.container}>
      <img className={css.img} src="/icons/chevron-left.svg" />
      <div className={css.title}>{title}</div>
      {/* <div>...</div> */}
    </div>
  );
};
