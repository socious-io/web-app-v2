type ReactHTMLTextareaElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export interface TextareaProps extends ReactHTMLTextareaElement {
  label?: string;
  variant?: 'outline';
  className?: string;
  onValueChange?: (value: string) => void;
}
