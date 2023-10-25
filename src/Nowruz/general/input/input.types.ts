export type InputProps = {
  id?: string;
  name?: string;
  label?: string;
  required?: boolean;
  errors?: string[];
  isValid?: boolean;
  type?: 'text' | 'password';
  validMessage?: string;
  prefix?: string;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  placeholder?: string;
};
