import { ChangeEventHandler, FocusEventHandler } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { FormGroup } from '../../../core/form/useForm/useForm.types';

type ReactHTMLTextareaElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export interface TextareaProps<T = unknown> extends ReactHTMLTextareaElement {
  label?: string;
  register?: Required<FormGroup>;
  /** @deprecated We won't have any variant other than outline */
  variant?: 'outline';
  /** @deprecated Do not use className as it has unintentional effects */
  className?: string;
  name?: string;
  optional?: boolean;
  errors?: string[];
  validations?: Record<string, any>;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  onValueChange?: (value: string) => void;
}
