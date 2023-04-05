import css from './tier-badge.module.scss';
import { TierBadgeProps } from './tier-badge.types';

export const TierBadge = (props: TierBadgeProps): JSX.Element => {
  const { size = '3.625rem' } = props;

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

  return (
    <div className={css.container} style={{ width: size }}>
      <div style={{ width: size, height: size }} className={css.badge}>
        {props.value}
      </div>
      <div style={{ fontSize: setLabelFontSize(size) }} className={css.label}>
        Tier {props.value}
      </div>
    </div>
  );
};
