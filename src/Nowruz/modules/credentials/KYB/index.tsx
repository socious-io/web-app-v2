import React, { useEffect, useState } from 'react';

import { DescriptionModal } from './descriptionModal';
import { SuccessModal } from './successModal';
import { UploadModal } from './uploadModal';

interface KYBModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const KYBModal: React.FC<KYBModalProps> = ({ open, setOpen }) => {
  const [openModals, setopenModals] = useState<{ [key in 'desc' | 'upload' | 'success']: boolean }>({
    desc: true,
    upload: false,
    success: false,
  });

  useEffect(() => {
    setopenModals({
      desc: true,
      upload: false,
      success: false,
    });
  }, [open]);

  const handleClose = () => {
    setopenModals({ desc: false, upload: false, success: false });
    setOpen(false);
  };

  const handleContinueFirstStep = () => {
    setopenModals({ desc: false, upload: true, success: false });
  };

  const handleOpenSuccessModal = () => {
    setopenModals({ desc: false, upload: false, success: true });
  };

  if (!open) return;
  return (
    <>
      <DescriptionModal open={openModals.desc} handleClose={handleClose} handleContinue={handleContinueFirstStep} />
      <UploadModal open={openModals.upload} handleClose={handleClose} handleOpenSuccessModal={handleOpenSuccessModal} />
      <SuccessModal open={openModals.success} handleClose={handleClose} />
    </>
  );
};
