import { IconButton } from '@mui/material';
import React from 'react';
import { LanguageCode } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useLanguageItem } from './useLanguageItem';
import { Error, LanguageProps } from '../../containers/editInfo/editInfo.types';

interface LanguageItemProps {
  language: LanguageProps;
  editLanguage: (id: string, name: LanguageCode, level: string) => void;
  deleteLanguage: (id: string) => void;
  errors: Error[];
}
export const LanguageItem: React.FC<LanguageItemProps> = ({ language, editLanguage, deleteLanguage, errors }) => {
  const { name, level, onSelectLanguage, onSelectLevel, languageOptions, levelOptions } = useLanguageItem(language);
  const error = errors.find((e) => e.id === language.id);
  return (
    <div className="flex flex-col w-full">
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
          errors={[error?.messages || '']}
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
    </div>
  );
};
