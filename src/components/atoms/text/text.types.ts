import React from 'react';

export type TextProps = React.HTMLAttributes<any> & {
  color?:
    | 'primary'
    | 'secondary'
    | 'black'
    | 'white'
    | 'error'
    | 'success'
    | 'warning'
    | 'gray1'
    | 'gray2'
    | 'gray3'
  weight?: 'normal' | 'medium' | 'semi-bold' | 'bold';
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center' | 'right' | 'justify';
  style?: 'normal' | 'italic';
  variant?: keyof JSX.IntrinsicElements;
};
