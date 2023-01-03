
type ReactHTMLInputElement = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export interface InputProps extends ReactHTMLInputElement {
  label: string;
  onValueChange?: (value: string) => void;
}
