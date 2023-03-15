import css from './button.module.scss';
import { ButtonProps } from './button.types';
import { CSSProperties } from 'react';
import { hapticsImpactLight } from '../../../core/haptic/haptic';

const colorStyle: Record<NonNullable<ButtonProps['color']>, CSSProperties> = {
  blue: {
    backgroundColor: 'var(--color-primary-01)',
    border: 0,
    color: 'var(--color-white)',
  },
  red: {
    backgroundColor: 'var(--color-error-01)',
    border: 0,
    color: 'var(--color-white)',
  },
  white: {},
};

const sizeStyle: Record<NonNullable<ButtonProps['size']>, CSSProperties> = {
  s: {
    height: '2.25rem',
  },
  m: {},
  l: {},
};

export function Button(props: ButtonProps): JSX.Element {
  const { color = 'blue', disabled = false, size = 'm', type = 'button', ...rest } = props;

  function onClick() {
    hapticsImpactLight();
    props.onClick?.();
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...colorStyle[color], ...sizeStyle[size], ...rest }}
      className={`${css.button} ${props.className}`}
    >
      {props.icon && <img height={18} src={props.icon} />}
      {props.children}
    </button>
  );
}
