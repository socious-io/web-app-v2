import { hapticsImpactLight } from 'src/core/haptic/haptic';
import css from './header.module.scss';
import { HeaderProps } from './header.types';

export const Header = (props: HeaderProps): JSX.Element => {
  function onBack() {
    hapticsImpactLight();
    if (props.onBack) {
      props.onBack();
    } else {
      history.back();
    }
  }

  return (
    <header className={css.container}>
      <div onClick={onBack} className={css.back}>
        <img src="/icons/chevron-left.svg" />
      </div>
      <div className={css.title}>{props.title}</div>
    </header>
  );
};
