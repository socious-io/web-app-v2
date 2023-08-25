import clsx from 'clsx';
import React from 'react';

import styles from './text.module.scss';
import { TextProps } from './text.types';

const Text = (props: TextProps): JSX.Element | null => {
  const { variant, className, children, color, weight, size, align, style, ...rest } = props;

  const variantProps = {
    ...rest,
    className: clsx(
      styles.root,
      color && styles[color],
      weight && styles[weight],
      size && styles[size],
      align && styles[align],
      style && styles[style],
      className
    ),
    'data-testid': 'text',
  };

  if (!variant) return null;

  return React.createElement(variant, variantProps, children);
};

Text.defaultProps = {
  variant: 'p',
  color: 'black',
  weight: 'normal',
  size: 'md',
  style: 'normal',
};

export default Text;
