import { CSSProperties } from 'react';

export interface TypographyProps extends CSSProperties {
  children: React.ReactNode;
  size?: 'm' | 'l' | 's' | 'xl' | 's2';
  type?: 'heading' | 'body';
  lineLimit?: number | 'none';
  className?: string;
}

export type TypeList = Record<
  NonNullable<TypographyProps['type']>,
  CSSProperties
>;
