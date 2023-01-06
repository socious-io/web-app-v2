
type ReactHTMLInputElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface InputProps extends ReactHTMLInputElement {
  label: string;
  variant?: 'outline';
  onValueChange?: (value: string) => void;
}
