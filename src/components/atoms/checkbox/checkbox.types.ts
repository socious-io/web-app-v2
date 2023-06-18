import { FormGroup } from "src/core/form/useForm/useForm.types";

export type CheckboxProps = {
  label: string;
  id: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
  register?: Required<FormGroup>;
};
