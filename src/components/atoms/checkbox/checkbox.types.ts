export type CheckboxProps = {
  label: string;
  id: string;
  checked?: boolean;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: boolean) => void;
};
