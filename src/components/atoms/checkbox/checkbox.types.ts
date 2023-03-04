export type CheckboxProps = {
  label: string;
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
};
