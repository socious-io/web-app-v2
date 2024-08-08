import { Preference } from 'src/core/api';

export interface CultureAccordionsProps {
  preferences: Preference[];
}

export type CultureType = {
  key: string;
  title: string;
  subtitle: string;
  value: string;
  answers: { label: string; value: string }[];
  description?: string | null;
};
