import { hapticsImpactLight } from 'src/core/haptic/haptic';
import css from './header.module.scss';
import { HeaderProps, HeaderLabel } from './header.types';
import { printWhen } from 'src/core/utils';

export const Header = (props: HeaderProps): JSX.Element => {
  function onBack() {
    hapticsImpactLight();
    if (props.onBack) {
      props.onBack();
    } else {
      history.back();
    }
  }

  function getRightPropType(): 'JSX' | 'callback' | null {
    if (props.right && 'label' in props.right) {
      return 'callback';
    } else if (props.right) {
      return 'JSX';
    }
    return null;
  }

  function callbackJSX(headerLabel: HeaderLabel) {
    return (
      <div onClick={headerLabel.onClick} className={css.headerLabel}>
        {headerLabel.label}
      </div>
    );
  }

  function rightContent(right: HeaderProps['right']): JSX.Element {
    const type = getRightPropType();
    switch (type) {
      case 'JSX':
        return right as JSX.Element;
      case 'callback':
        return callbackJSX(right as HeaderLabel);
      case null:
        return <></>;
    }
  }

  return (
    <header className={css.container}>
      <div onClick={onBack} className={css.back}>
        <img src="/icons/chevron-left.svg" />
      </div>
      <div className={css.title}>{props.title}</div>
      {rightContent(props.right)}
    </header>
  );
};
