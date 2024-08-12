import { LanguageCode, LanguageLevel } from 'src/core/api';

export interface Error {
  type: string;
  id: string;
  messages: string;
}
export interface LanguageProps {
  id: string;
  name: LanguageCode | undefined;
  level: LanguageLevel | undefined;
  isNew: boolean;
}

export interface UpdateLanguagesProps {
  languages: LanguageProps[] | null;
  setLanguages: (newval: LanguageProps[]) => void;
  errors: Error[];
  setErrors: (val: Error[]) => void;
}
