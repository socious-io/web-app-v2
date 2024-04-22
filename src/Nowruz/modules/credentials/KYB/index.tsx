import React, { useState } from 'react';

import { DescriptionModal } from './descriptionModal';
import { SuccessModal } from './successModal';
import { UploadModal } from './uploadModal';

interface KYBModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export const KYBModal: React.FC<KYBModalProps> = ({ open, setOpen }) => {
  const [openModals, setopenModals] = useState<{ [key in 'desc' | 'uplaod' | 'success']: boolean }>({
    desc: true,
    uplaod: false,
    success: false,
  });
  const handleClose = () => {
    setopenModals({ desc: false, uplaod: false, success: false });
    setOpen(false);
  };

  const handleContinueFirstStep = () => {
    setopenModals({ desc: false, uplaod: true, success: false });
  };

  const handleOpenSuccessModal = () => {
    setopenModals({ desc: false, uplaod: false, success: true });
  };

  if (!open) return;
  return (
    <>
      <DescriptionModal open={openModals.desc} handleClose={handleClose} handleContinue={handleContinueFirstStep} />
      <UploadModal open={openModals.uplaod} handleClose={handleClose} handleOpenSuccessModal={handleOpenSuccessModal} />
      <SuccessModal open={openModals.success} handleClose={handleClose} />
    </>
  );
};
