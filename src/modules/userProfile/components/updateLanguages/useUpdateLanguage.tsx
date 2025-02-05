import { useEffect } from 'react';
import { LanguageCode, LanguageLevel } from 'src/core/api';
import { Error, LanguageProps } from 'src/modules/userProfile/containers/editInfo/editInfo.types';
import { v4 as uuidv4 } from 'uuid';

export const UseUpdateLanguage = (
  languages: LanguageProps[] | null,
  setLanguages: (newVal: LanguageProps[]) => void,
  setErrors?: (val: Error[]) => void,
) => {
  const addNewLanguage = () => {
    let langs = languages?.length ? [...languages] : [];
    const newLang: LanguageProps = {
      id: uuidv4(),
      name: undefined,
      level: undefined,
      isNew: true,
    };
    langs = langs.concat(newLang);
    setLanguages(langs);
  };

  const checkValidation = () => {
    const errRes: Error[] = [];
    languages?.forEach(l => {
      if (!l.name || l.name.trim() === '') {
        errRes.push({ id: l.id, type: 'empty-name', messages: 'Enter a valid language name' });
      } else if (!l.level || l.level.trim() === '') {
        errRes.push({ id: l.id, type: 'empty-level', messages: 'Add your level' });
      } else if (languages?.findIndex(item => l.name === item.name && l.id !== item.id) > -1) {
        errRes.push({ id: l.id, type: 'duplicated', messages: 'Selected language is duplicated' });
      }
    });
    setErrors?.(errRes);
  };

  useEffect(() => {
    checkValidation();
  }, [languages]);

  const editLanguage = (id: string, name: LanguageCode, level: string) => {
    const langs = languages?.length ? [...languages] : [];

    const idx = langs.findIndex(l => l.id === id);
    if (idx > -1) {
      langs[idx].name = name;
      langs[idx].level = level as LanguageLevel;
    }
    setLanguages(langs);
  };

  const deleteLanguage = (id: string) => {
    if (languages) {
      const langs = languages?.filter(l => l.id !== id);
      setLanguages(langs);
    }
  };
  return { languages, setLanguages, addNewLanguage, editLanguage, deleteLanguage };
};
