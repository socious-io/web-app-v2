import { IconButton } from '@mui/material';
import React from 'react';
import { Language } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useLanguageItem } from './useLanguageItem';

interface LanguageItemProps {
  language: Language;
  editLanguage: (id: string, name: string, level: string) => void;
  deleteLanguage: (id: string) => void;
}
export const LanguageItem: React.FC<LanguageItemProps> = ({ language, editLanguage, deleteLanguage }) => {
  const { name, level, onSelectLanguage, onSelectLevel, languageOptions, levelOptions } = useLanguageItem(language);

  return (
    <div className="w-full flex gap-4">
      <SearchDropdown
        required
        id={language.id}
        value={name}
        options={languageOptions}
        icon="search-lg"
        hasDropdownIcon={false}
        onChange={(value) => {
          onSelectLanguage(value);
          editLanguage(language.id, value.value, level.value);
        }}
        className="flex-1"
        isSearchable
      />
      <SearchDropdown
        required
        id={`${language.id}-level`}
        value={level}
        options={levelOptions}
        className="flex-1"
        hasDropdownIcon
        onChange={(value) => {
          onSelectLevel(value);
          editLanguage(language.id, name.value, value.value);
        }}
        isSearchable
      />
      <IconButton onClick={() => deleteLanguage(language.id)}>
        <Icon name="trash-01" fontSize={20} className="text-Gray-light-mode-600" />
      </IconButton>
    </div>
  );
};
