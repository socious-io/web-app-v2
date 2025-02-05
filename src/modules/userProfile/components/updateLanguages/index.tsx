import { Typography } from '@mui/material';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import { LanguageItem } from './languageItem';
import css from './languageItem.module.scss';
import { UseUpdateLanguage } from './useUpdateLanguage';
import { UpdateLanguagesProps } from '../../containers/editInfo/editInfo.types';

export const UpdateLanguages: React.FC<UpdateLanguagesProps> = ({ languages, setLanguages, errors, setErrors }) => {
  const { addNewLanguage, editLanguage, deleteLanguage } = UseUpdateLanguage(languages, setLanguages, setErrors);

  return (
    <div className="w-full flex flex-col gap-4 py-5 items-start">
      <Typography variant="h4" className="text-Gray-light-mode-700">
        {translate('languages.title')}
      </Typography>
      {languages?.map(l => (
        <LanguageItem
          key={l.id}
          language={l}
          editLanguage={editLanguage}
          deleteLanguage={deleteLanguage}
          errors={errors}
        />
      ))}
      <Button variant="text" color="primary" onClick={addNewLanguage} customStyle={css.addBtn}>
        <Icon fontSize={20} name="plus" className="text-Brand-700" />
        {translate('languages.add')}
      </Button>
    </div>
  );
};
