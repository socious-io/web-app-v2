
type ReactHTMLInputElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface InputProps extends ReactHTMLInputElement {
  label?: string;
  variant?: 'outline';
  className?: string;
  onValueChange?: (value: string) => void;
}
