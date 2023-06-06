import { FormGroup } from 'src/core/form/useForm/useForm.types';

export type CategoryItem = { label: string; value: string | number };

export type CategoryProps = {
  list: CategoryItem[];
  register: Required<FormGroup>;
  name: string;
  label?: string;
  onValueChange?: (option: CategoryItem) => void;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
};
