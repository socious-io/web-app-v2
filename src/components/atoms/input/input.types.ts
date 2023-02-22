import { FormGroup, FormModel } from '../../../core/form/useForm/useForm.types';

type ReactHTMLInputElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface InputProps extends ReactHTMLInputElement {
  name?: string;
  variant?: 'outline';
  className?: string;
  errors?: string[];
  validations?: Record<string, any>;
  optional?: boolean;
  label?: string;
  register: (model: FormModel) => Required<FormGroup>;
}
