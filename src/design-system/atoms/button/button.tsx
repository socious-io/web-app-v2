import css from './button.module.scss';
import { ButtonProps } from './button.types';
import { CSSProperties } from 'react';

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
  const {
    onClick,
    color = 'blue',
    disabled = false,
    size = 'm',
    icon,
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...colorStyle[color], ...sizeStyle[size], ...rest }}
      className={`${css.button} ${className}`}
    >
      {icon && <img height={18} src={icon} />}
      {children}
    </button>
  );
}
