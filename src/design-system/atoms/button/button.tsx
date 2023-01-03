import css from './button.module.scss';
import { ButtonProps } from './button.types';
import { CSSProperties } from 'react';

const style: Record<NonNullable<ButtonProps['color']>, CSSProperties> = {
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

export function Button(props: ButtonProps): JSX.Element {
  const {
    onClick,
    color = 'blue',
    disabled = false,
    children,
    className,
    ...rest
  } = props;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ ...style[color], ...rest }}
      className={`${css.button} ${className}`}
    >
      {children}
    </button>
  );
}
