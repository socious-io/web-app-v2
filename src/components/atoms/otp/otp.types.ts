import { CSSProperties } from 'react';

export interface OtpProps extends CSSProperties {
  length: number;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  reset?: (fn: () => void) => void;
}
