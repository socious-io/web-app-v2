import { CardSlideProps } from 'src/components/templates/card-slide-up/card-slide-up.types';
import { ButtonProps } from 'src/components/atoms/button/button.types';

export interface AlertModalProps extends Omit<CardSlideProps, "children"> {
  header: string;
  status: 'success' | 'warning' | 'failed';
  title: string;
  subtitle?: string | React.ReactNode;
  footer?: string;
  buttons?: ButtonProps[];
}
