import { ReactNode } from 'react';

export interface IntroHeaderProps {
  logo?: ReactNode;
  title: string;
  description: string;
  subtitle?: string;
}
