import React, { useEffect, useState } from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { FileUploaderMultiple } from 'src/Nowruz/modules/general/components/fileUploaderMultiple';
import { PostMediaUploadRes, uploadMedia } from 'src/core/api';

interface UploadModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpenSuccessModal: () => void;
}
export const UploadModal: React.FC<UploadModalProps> = ({ open, handleClose, handleOpenSuccessModal }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      const requests: Promise<PostMediaUploadRes>[] = [];
      files.forEach(f => {
        requests.push(uploadMedia(f));
      });
      const res = await Promise.all(requests);
      setLoading(false);
      handleOpenSuccessModal();
    } catch (error) {
      setLoading(false);
      console.log('error in uploading files', error);
    }
  };
  const footerJSX = (
    <div className="w-full px-4 pb-4 pt-6 md:p-6 flex flex-col gap-3">
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
        Continue
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="check-verified-03" />}
      title="Send your organization details"
      subTitle="Please upload your company registration document, like a certificate or equivalent."
      footer={footerJSX}
      mobileFullHeight={false}
      mobileCentered={true}
      footerDivider={false}
      customStyle="!w-[432px]"
      id="org_verify_first"
    >
      <div className="px-4 py-5 md:px-6">
        <FileUploaderMultiple
          fileTypes={['PDF', 'PNG', 'JPG']}
          maxFileNumbers={10}
          maxSize={2}
          customStyle="w-full h-[126px]"
          files={files}
          setFiles={setFiles}
          loading={loading}
        />
      </div>
    </Modal>
  );
};
