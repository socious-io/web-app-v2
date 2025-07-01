import { supportedLanguages } from 'src/constants/constants';
import { LanguageOption } from 'src/core/api/settings/settings.types';
import useSwitchLanguage from 'src/core/hooks/useSwitchLanguage';

import { SearchDropdown } from '../SearchDropdown';
import { LanguageSwitcherProps } from './index.types';

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  placeholder = 'English (US)',
  containerClassName = '',
  ...props
}) => {
  const { selectedLanguage, switchLanguage } = useSwitchLanguage();

  return (
    <div className={containerClassName}>
      <SearchDropdown
        id="language-switcher"
        placeholder={placeholder}
        options={supportedLanguages}
        isSearchable={false}
        value={supportedLanguages.find(option => option.value === selectedLanguage)}
        onChange={newValue => {
          const option = newValue as LanguageOption;
          if (option) {
            switchLanguage(option.value);
          }
        }}
        border={false}
        className="w-[12.5rem]"
        {...props}
      />
    </div>
  );
};

export default LanguageSwitcher;
