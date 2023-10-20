import { printWhen } from 'src/core/utils';

import css from './tier-badge.module.scss';
import { TierBadgeProps } from './tier-badge.types';

export const TierBadge = (props: TierBadgeProps): JSX.Element => {
  const { size = '3.625rem', withLabel = true } = props;

  function setLabelFontSize(size: string) {
    switch (size) {
      case '3.625rem':
        return 'var(--font-size-s)';
      case '6rem':
        return '1.25rem';
      default:
        return 'var(--font-size-s)';
    }
  }

  function setValueFontSize(size: string) {
    switch (size) {
      case '3.625rem':
        return '1.75rem';
      case '6rem':
        return '3.5rem';
      default:
        return 'var(--font-size-s)';
    }
  }

  function badgeBgColor() {
    return props.disabled ? '#adadad' : '';
  }

  const labelJSX = (
    <div style={{ fontSize: setLabelFontSize(size) }} className={css.label}>
      Tier {props.value}
    </div>
  );

  return (
    <div className={css.container} style={{ width: size }}>
      <div
        style={{ width: size, height: size, fontSize: setValueFontSize(size), backgroundColor: badgeBgColor() }}
        className={css.badge}
      >
        {props.value}
      </div>
      {printWhen(labelJSX, withLabel)}
    </div>
  );
};
