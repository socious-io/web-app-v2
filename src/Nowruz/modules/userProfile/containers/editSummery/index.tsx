import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { useEditSummary } from './useEditSummary';

interface EditSummaryProps {
  open: boolean;
  handleClose: () => void;
}
export const EditSummary: React.FC<EditSummaryProps> = ({ open, handleClose }) => {
  const { error, summary, handleChange, letterCount } = useEditSummary();
  const contentJSX = (
    <div>
      <Input
        id="summary"
        label="Write about your experience, skills, and passion. You can also talk about your achievements or previous job experiences."
        name="summary"
        required
        errors={[error]}
        value={summary}
        onChange={handleChange}
        multiline
        customHeight="168px"
        hints={[{ hint: `${letterCount}/2600`, hide: false }]}
      />
    </div>
  );

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary">
        Save
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  return (
    <Modal open={open} handleClose={handleClose} title="Edit summary" content={contentJSX} footer={modalFooterJsx} />
  );
};
