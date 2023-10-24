export type InputProps = {
  id?: string;
  name?: string;
  type?: 'text' | 'file' | 'email' | 'password';
  placeHolder?: string;
  errors?: string[];
  label?: string;
  required?: boolean;
  isValid?: boolean;
  validMessage?: string;
  prefix?: string;
};
