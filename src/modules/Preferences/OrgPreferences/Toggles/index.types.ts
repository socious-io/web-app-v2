import { Preference } from 'src/core/api';

export interface TogglesProps {
  preferences: Preference[];
}

export type ToggleType = {
  key: string;
  title: string;
  subtitle: string;
  value: string;
};
