import { Language } from 'src/core/api';

export const UseUpdateLanguage = (languages: Language[] | null, setLanguages: (newVal: Language[]) => void) => {
  const addNewLanguage = () => {
    let langs = languages?.length ? [...languages] : [];
    const newLang = {
      id: languages?.length.toString() || '0',
      created_at: new Date(),
      name: '',
      level: '',
    };
    langs = langs.concat(newLang);
    setLanguages(langs);
  };

  const editLanguage = (id: string, name: string, level: string) => {
    const langs = languages?.length ? [...languages] : [];
    const idx = langs.findIndex((l) => l.id === id);
    if (idx > -1) {
      langs[idx].name = name;
      langs[idx].level = level;
    }
    setLanguages(langs);
  };

  const deleteLanguage = (id: string) => {
    const langs = languages?.filter((l) => l.id !== id);
    setLanguages(langs);
  };
  return { languages, setLanguages, addNewLanguage, editLanguage, deleteLanguage };
};
