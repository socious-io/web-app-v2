import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'src/constants/constants';
import { Language } from 'src/core/api';

interface LanguageProps {
  items: Language[];
}
export const LanguageJSX: React.FC<LanguageProps> = (props) => {
  const { t } = useTranslation();
  const mapCodeToLanguage = (langCode?: keyof typeof Languages | undefined) => {
    if (langCode && Languages[langCode]) {
      return Languages[langCode];
    } else {
      return langCode;
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="subtitle1" className="text-Gray-light-mode-600">
        Languages
      </Typography>
      {props.items.map((lang) => (
        <div key={lang.name} className="flex gap-2">
          <Typography variant="h4" className="text-Gray-light-mode-700">
            {mapCodeToLanguage(lang.name)}
          </Typography>
          <Typography variant="h5" className="text-Gray-light-mode-700">
            {`(${t(lang.level)})`}
          </Typography>
        </div>
      ))}
    </div>
  );
};
