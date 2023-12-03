import { Typography } from '@mui/material';
import { Language } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { LanguageItem } from './languageItem';
import { UseUpdateLanguage } from './useUpdateLanguage';

interface UpdateLanguageProps {
  languages: Language[] | null;
  setLanguages: (newval: Language[]) => void;
}
export const UpdateLanguages: React.FC<UpdateLanguageProps> = ({ languages, setLanguages }) => {
  const { addNewLanguage, editLanguage, deleteLanguage } = UseUpdateLanguage(languages, setLanguages);

  return (
    <div className="w-full flex flex-col gap-4 py-5 items-start">
      <Typography variant="h4" className="text-Gray-light-mode-700">
        Languages
      </Typography>
      {languages?.map((l) => (
        <LanguageItem key={l.id} language={l} editLanguage={editLanguage} deleteLanguage={deleteLanguage} />
      ))}
      <Button
        variant="text"
        color="primary"
        onClick={addNewLanguage}
        customStyle="flex items-center justify-center gap-2 text-Brand-700"
      >
        <Icon fontSize={20} name="plus" className="text-Brand-700" />
        Add a lnaguage
      </Button>
    </div>
  );
};
