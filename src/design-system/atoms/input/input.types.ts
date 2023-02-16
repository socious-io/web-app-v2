import { FieldValue, FieldValues, Path, UseFormRegister } from 'react-hook-form';

type ReactHTMLInputElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface InputProps<T = unknown> extends ReactHTMLInputElement {
  label?: Path<T extends FieldValues>;
  register?: UseFormRegister<T extends FieldValues>;
  variant?: 'outline';
  className?: string;
  errors?: string[];
  optional?: boolean;
  onValueChange?: (value: string) => void;
}
