import { Preference } from 'src/core/api';

export interface CultureProps {
  items: Preference[];
  onOpenPreferences: () => void;
}
