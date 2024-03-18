export interface ToggleButtonItem {
  text: string;
  checked: boolean;
  onChange: () => void;
}
export interface SettingsItem {
  label: string;
  description?: string;
  toggleButtons: ToggleButtonItem[];
}
