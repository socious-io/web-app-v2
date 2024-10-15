import React, { useContext, useState } from 'react';
import { Button } from 'src/modules/general/components/Button';
import { FileUploader } from 'src/modules/general/components/fileUploader';
import { FileUploaderMultiple } from 'src/modules/general/components/fileUploaderMultiple';
import { Icon } from 'src/modules/general/components/Icon';
import { Modal } from 'src/modules/general/components/modal';
import { LinkedInButton } from 'src/modules/importLinkedIn/components/LinkedInButton';

import css from './importModal.module.scss';
import { ImportModalProps } from './importModal.types';
import { useImportModal } from './useImportModal';
import { StepsContext } from '../../../Auth/containers/onboarding/Stepper';

export const ImportModal: React.FC<ImportModalProps> = ({ handleClose, open }) => {
  const { updateSelectedStep } = useContext(StepsContext);
  const {
    data: { files, showFiles },
    operations: { handleUpload, handleDeleteUpload, setShowFiles, importLinkedinProfile },
  } = useImportModal();

  const footerJsx = (
    <div className="w-full p-4 md:p-6 flex flex-col gap-3">
      <LinkedInButton handleClick={importLinkedinProfile} disabled={!files.length} />
      <Button variant="text" color="secondary" customStyle="flex gap-2" onClick={() => updateSelectedStep(2)}>
        Fill out manually
        <Icon fontSize={20} name="arrow-right" className="text-Gray-light-mode-600" />
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Upload your LinkedIn CV"
      subTitle=""
      footer={footerJsx}
      mobileFullHeight={false}
      headerDivider
      footerDivider
      customTitleStyle="items-center"
    >
      <div className="px-4 py-6 md:p-6 flex flex-col gap-5 items-center">
        <div className={css.desc}>
          Go to your LinkedIn profile, click on “More” and then click “Save to PDF” to download your LinkedIn CV in PDF
        </div>
        <img src="/images/linkedin.png" className={css.img} />
        <div className={css.desc}>Upload the downloaded PDF file here</div>
        <div className="w-full">
          <FileUploaderMultiple
            fileTypes={['PDF']}
            maxFileNumbers={1}
            customStyle="w-full"
            uploaded={files}
            setUploaded={handleUpload}
            onDeleteFile={handleDeleteUpload}
            setShowFiles={setShowFiles}
            showFiles={showFiles}
            loading={false}
          />
        </div>
      </div>
    </Modal>
  );
};
