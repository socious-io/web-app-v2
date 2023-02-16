import { ChangeEventHandler, FocusEventHandler } from 'react';
import {  FieldValues, Path, UseFormRegister } from 'react-hook-form';

type ReactHTMLInputElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface InputProps<T = unknown> extends ReactHTMLInputElement {
  label?: Path<T extends FieldValues>;
  register?: UseFormRegister<T extends FieldValues>;
  name?: string;
  variant?: 'outline';
  className?: string;
  errors?: string[];
  validations?: Record<string, any>;
  optional?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
