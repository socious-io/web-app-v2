export interface OTPProps {
  value?: string;
  setValue: (value: string) => void;
  isValid?: boolean;
  errorMessage?: string;
}
