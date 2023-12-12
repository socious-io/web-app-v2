import { useEffect } from 'react';
import { LanguageCode } from 'src/core/api';
import { Error, LanguageProps } from 'src/Nowruz/modules/userProfile/containers/editInfo/editInfo.types';

export const UseUpdateLanguage = (
  languages: LanguageProps[] | null,
  setLanguages: (newVal: LanguageProps[]) => void,
  errors: Error[],
  setErrors: (val: Error[]) => void,
) => {
  const addNewLanguage = () => {
    let langs = languages?.length ? [...languages] : [];
    const newLang: LanguageProps = {
      id: languages?.length.toString() || '0',
      name: undefined,
      level: undefined,
      isNew: true,
    };
    langs = langs.concat(newLang);
    setLanguages(langs);
  };

  const checkValidation = () => {
    const errRes: Error[] = [];
    languages?.forEach((l) => {
      if (!l.name || l.name.trim() === '') {
        errRes.push({ id: l.id, type: 'empty-name', messages: 'Enter a valid language name' });
      } else if (!l.level || l.level.trim() === '') {
        errRes.push({ id: l.id, type: 'empty-level', messages: 'Add your level' });
      } else if (languages?.findIndex((item) => l.name === item.name && l.id !== item.id) > -1) {
        errRes.push({ id: l.id, type: 'duplicated', messages: 'Selected language is duplicated' });
      }
    });
    setErrors(errRes);
  };

  useEffect(() => {
    checkValidation();
  }, [languages]);

  const editLanguage = (id: string, name: LanguageCode, level: string) => {
    const langs = languages?.length ? [...languages] : [];

    const idx = langs.findIndex((l) => l.id === id);
    if (idx > -1) {
      langs[idx].name = name;
      langs[idx].level = level;
    }
    setLanguages(langs);
  };

  const deleteLanguage = (id: string) => {
    if (languages) {
      const langs = languages?.filter((l) => l.id !== id);
      setLanguages(langs);
    }
  };
  return { languages, setLanguages, addNewLanguage, editLanguage, deleteLanguage };
};
