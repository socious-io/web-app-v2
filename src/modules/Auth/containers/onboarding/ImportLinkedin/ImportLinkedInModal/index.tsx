import { translate } from 'src/core/utils';
import LinkedInButton from 'src/modules/Auth/components/LinkedInButton';
import { Button } from 'src/modules/general/components/Button';
import { FileUploaderMultiple } from 'src/modules/general/components/fileUploaderMultiple';
import { Icon } from 'src/modules/general/components/Icon';
import { Modal } from 'src/modules/general/components/modal';

import css from './index.module.scss';
import { ImportModalProps } from './index.types';
import { useImportLinkedInModal } from './useImportLinkedInModal';

const ImportLinkedInModal: React.FC<ImportModalProps> = ({ handleClose, open }) => {
  const {
    data: { files, showFiles },
    operations: { updateSelectedStep, setShowFiles, handleUpload, handleDeleteUpload, importLinkedinProfile },
  } = useImportLinkedInModal();

  const footerJsx = (
    <div className="w-full p-4 md:p-6 flex flex-col gap-3">
      <LinkedInButton handleClick={importLinkedinProfile} disabled={!files.length} />
      <Button variant="text" color="secondary" customStyle="flex gap-2" onClick={() => updateSelectedStep(2)}>
        {translate('linkedin-fill-out-button')}
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
      contentClassName="px-4 py-6 md:p-6 flex flex-col gap-5 items-center"
    >
      <>
        <div className={css.desc}>{translate('linkedin-instruction-description')}</div>
        <img src="/images/linkedin.png" className={css.img} alt="LinkedIn Save PDF" />
        <div className={css.desc}>{translate('linkedin-instruction-upload')}</div>
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
      </>
    </Modal>
  );
};

export default ImportLinkedInModal;
