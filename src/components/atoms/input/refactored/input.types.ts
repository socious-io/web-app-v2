import { ChangeEvent } from 'react';

type ReactHTMLInputElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface NewInputProps extends ReactHTMLInputElement {
  name: string;
  variant?: 'outline';
  className?: string;
  inputClassName?: string;
  errors?: string[] | undefined;
  validations?: Record<string, any>;
  optional?: boolean;
  label?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  register: any;
}
