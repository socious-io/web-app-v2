import { Typography } from '@mui/material';
import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { useEditSummary } from './useEditSummary';

interface EditSummaryProps {
  open: boolean;
  handleClose: () => void;
  type?: 'users' | 'organizations';
}
export const EditSummary: React.FC<EditSummaryProps> = ({ open, handleClose, type = 'users' }) => {
  const { error, summary, handleChange, letterCount, closeModal, onSave } = useEditSummary(handleClose, type);
  const contentJSX = (
    <div className="p-6 w-full h-full flex flex-col gap-[6px]">
      <Input
        id="summary"
        label="Write about your experience, skills, and passion. You can also talk about your achievements or previous job experiences."
        name="summary"
        required
        errors={error ? [error] : undefined}
        value={summary}
        onChange={handleChange}
        multiline
        customHeight="168px"
      />
      <Typography variant="caption" className="text-Gray-light-mode-600 mr-0 ml-auto">
        {`${letterCount}/2600`}
      </Typography>
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
    <Modal open={open} handleClose={closeModal} title="Edit summary" content={contentJSX} footer={modalFooterJsx} />
  );
};
