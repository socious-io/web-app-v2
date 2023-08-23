import css from './button.module.scss';
import { ButtonProps } from './button.types';
import { hapticsImpactLight } from '../../../core/haptic/haptic';
import clsx from 'clsx';

export function Button(props: ButtonProps): JSX.Element {
  const { color, disabled, size, type, icon, className, children, weight, removeBorder, ...rest } = props;

  function onClick() {
    hapticsImpactLight();
    props.onClick?.();
  }

  return (
    <button
      ref={props.ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        css.button,
        className,
        color && css[color],
        size && css[`size-${size}`],
        weight && css[weight],
        removeBorder && css.removeBorder
      )}
      {...rest}
    >
      {icon && <img height={18} src={icon} alt={icon} />}
      {children}
    </button>
  );
}

Button.defaultProps = {
  color: 'blue',
  disabled: false,
  size: 'm',
  type: 'button',
  weight: 'semi-bold',
};
