import { CheckboxProps as DefaultProps } from '@mui/material';
export interface CheckboxProps extends DefaultProps {
  id: string;
  label?: string;
  required?: boolean;
  register?: any;
  errors?: string[];
  isValid?: boolean;
  type?: 'checkBox' | 'checkCircle';
  size?: 'small' | 'medium';
}
