import { ChangeEventHandler, FocusEventHandler } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type ReactHTMLTextareaElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export interface TextareaProps<T = unknown> extends ReactHTMLTextareaElement {
  label?: Path<T extends FieldValues>;
  register?: UseFormRegister<T extends FieldValues>;
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
