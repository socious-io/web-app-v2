import { ChangeEvent } from 'react';
import { FormGroup } from '../../../core/form/useForm/useForm.types';

type ReactHTMLInputElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface InputProps extends ReactHTMLInputElement {
  name?: string;
  variant?: 'outline';
  className?: string;
  inputClassName?: string;
  errors?: string[];
  validations?: Record<string, any>;
  optional?: boolean;
  label?: string;
  register?: Required<FormGroup>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
