import { CSSProperties } from 'react';

export interface OtpProps extends CSSProperties {
  length: number;
  disabled?: boolean;
  onChange?: (value: string) => void;
  reset?: () => void;
}
