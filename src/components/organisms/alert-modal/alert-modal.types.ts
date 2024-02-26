import { ReactNode } from 'react';
import { ButtonProps } from 'src/components/atoms/button/button.types';
import { CardSlideProps } from 'src/components/templates/card-slide-up/card-slide-up.types';

export interface AlertModalProps extends Omit<CardSlideProps, 'children'> {
  title: string;
  header?: string;
  status?: 'success' | 'warning' | 'failed';
  subtitle?: string | ReactNode;
  footer?: string;
  buttons?: ButtonProps[];
  contentClassName?: string;
}
