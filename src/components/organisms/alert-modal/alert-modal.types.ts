import { CardSlideProps } from '@templates/card-slide-up/card-slide-up.types';
import { ButtonProps } from '@atoms/button/button.types';

export interface AlertModalProps extends Omit<CardSlideProps, "children"> {
  title: string;
  header?: string;
  status?: 'success' | 'warning' | 'failed';
  subtitle?: string | React.ReactNode;
  footer?: string;
  buttons?: ButtonProps[];
  contentClassName?: string;
}
