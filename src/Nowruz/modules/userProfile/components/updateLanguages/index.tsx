import { Typography } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { LanguageItem } from './languageItem';
import { UseUpdateLanguage } from './useUpdateLanguage';
import { UpdateLanguagesProps } from '../../containers/editInfo/editInfo.types';

export const UpdateLanguages: React.FC<UpdateLanguagesProps> = ({ languages, setLanguages, errors, setErrors }) => {
  const { addNewLanguage, editLanguage, deleteLanguage } = UseUpdateLanguage(
    languages,
    setLanguages,
    errors,
    setErrors,
  );

  return (
    <div className="w-full flex flex-col gap-4 py-5 items-start">
      <Typography variant="h4" className="text-Gray-light-mode-700">
        Languages
      </Typography>
      {languages?.map((l) => (
        <LanguageItem
          key={l.id}
          language={l}
          editLanguage={editLanguage}
          deleteLanguage={deleteLanguage}
          errors={errors}
        />
      ))}
      <Button
        variant="text"
        color="primary"
        onClick={addNewLanguage}
        customStyle="flex items-center justify-center gap-2 text-Brand-700"
      >
        <Icon fontSize={20} name="plus" className="text-Brand-700" />
        Add a lanaguage
      </Button>
    </div>
  );
};
