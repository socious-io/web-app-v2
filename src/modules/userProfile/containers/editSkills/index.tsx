import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';
import { Modal } from 'src/modules/general/components/modal';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import variables from 'src/styles/constants/_exports.module.scss';

import { useEditSkills } from './useEditSkills';

interface EditSkillsProps {
  open: boolean;
  handleClose: () => void;
}
export const EditSkills: React.FC<EditSkillsProps> = ({ open, handleClose }) => {
  const { t } = useTranslation('profile');
  const { skills, skillItems, setSkills, errors, closeModal, onSave } = useEditSkills(handleClose);
  const contentJSX = (
    <div className="p-6 w-full h-full">
      <MultiSelect
        id="skills"
        searchTitle={t('selectAtLeastOneSkillLabel')}
        items={skillItems}
        maxLabel={t('maxTenSkillsHintText')}
        max={10}
        componentValue={skills}
        setComponentValue={setSkills}
        chipBorderColor={variables.color_grey_blue_200}
        chipBgColor={variables.color_grey_blue_50}
        chipFontColor={variables.color_grey_blue_700}
        popularLabel={false}
        errors={errors}
        customHeight="180px"
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={onSave}>
        {t('saveText')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={closeModal}>
        {t('cancelText')}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title={t('editSkillsText')}
      subTitle={t('showcaseTopSkillsText')}
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
