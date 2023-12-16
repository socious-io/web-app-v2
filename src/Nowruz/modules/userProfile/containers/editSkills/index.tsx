import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';

import { useEditSkills } from './useEditSkills';

interface EditSkillsProps {
  open: boolean;
  handleClose: () => void;
}
export const EditSkills: React.FC<EditSkillsProps> = ({ open, handleClose }) => {
  const { skills, skillItems, setSkills, errors, closeModal, onSave } = useEditSkills(handleClose);
  const contentJSX = (
    <div className="p-6 w-full h-full">
      <MultiSelect
        id="skills"
        searchTitle="Select at least 1 skill"
        items={skillItems}
        maxLabel={'Max. 10 skills'}
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
        Save
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={closeModal}>
        Cancel
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={closeModal}
      title="Edit skills"
      subTitle="Showcase your top skills"
      content={contentJSX}
      footer={modalFooterJsx}
    />
  );
};
