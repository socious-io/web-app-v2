import React from 'react';
import { supportedLanguages } from 'src/constants/constants';
import { LanguageOption } from 'src/core/api/settings/settings.types';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { useLanguage } from './useLanguage';
const Languge = () => {
  const { onCancel, onSave, unsavedValue, setUnsavedValue } = useLanguage();
  // const FlagGenerator = ({ value }) => <img src={`/icons/countries/${value}.svg`} width={20} height={20} alt={value} />;

  // const languageOptions: LanguageOption[] = supportedLanguages.map(lang => ({
  //   ...lang,
  //   icon: <FlagGenerator value={lang.value} />,
  // }));

  const customFormatOptionLabel = (option: LanguageOption) => (
    <div className="flex items-center">
      {option.icon}
      <span className="ml-2">{option.label}</span>
    </div>
  );
  return (
    <>
      <div className="border border-solid border-t-0 border-x-0 pb-5 border-Gray-light-mode-200">
        <div className="w-full items-center">
          <h2 className="grow css.title text-lg font-semibold">{translate('setting-language')}</h2>
        </div>
      </div>
      <div className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="flex flex-col ">
            <label>{translate('setting-language-change')}</label>
            <p className="text-sm font-normal text-Gray-light-mode-600 pt-1">{translate('setting-language-select')}</p>
          </div>
          <div className="col-span-2">
            <div className="w-full md:w-80">
              <SearchDropdown
                id="size"
                className="mb-5"
                placeholder={'English (US)'}
                formatOptionLabel={data => customFormatOptionLabel(data as LanguageOption)}
                options={supportedLanguages}
                isSearchable={false}
                value={supportedLanguages.find(option => option.value === unsavedValue.value)}
                onChange={(newValue: unknown) => {
                  const value = newValue as { label: string; value: string };
                  setUnsavedValue(value);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex  justify-end gap-4">
          <Button color="info" onClick={onCancel}>
            {translate('setting-buttons.cancel')}
          </Button>

          <Button onClick={onSave} color="primary">
            {translate('setting-buttons.save')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Languge;
