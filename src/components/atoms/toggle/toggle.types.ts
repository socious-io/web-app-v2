export interface ToggleProps {
  name: string;
  checked: boolean;
  onChange: (checked: boolean, name: string) => void;
}
