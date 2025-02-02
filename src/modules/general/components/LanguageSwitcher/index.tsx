import { supportedLanguages } from 'src/constants/constants';
import { LanguageOption } from 'src/core/api/settings/settings.types';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';

import { SearchDropdown } from '../SearchDropdown';

export const LanguageSwitcher = () => {
  const { selectedLanguage, switchLanguage } = useSwitchLanguage();
  return (
    <div className="w-[200px]">
      <SearchDropdown
        border={false}
        id="size"
        className="mb-5"
        placeholder={'English (US)'}
        options={supportedLanguages}
        isSearchable={false}
        value={supportedLanguages.find(option => option.value === selectedLanguage)}
        onChange={newValue => {
          const option = newValue as LanguageOption;
          if (option) {
            switchLanguage(option.value);
          }
        }}
      />
    </div>
  );
};
