import React, { useEffect, useState } from 'react';
import { DescriptionModal } from './descriptionModal';
import { UploadModal } from './uploadModal';
import { SuccessModal } from './successModal';

interface KYBModalProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}
export const KYBModal: React.FC<KYBModalProps> = ({ open, setOpen }) => {
  const [openDescModal, setOpenDescModal] = useState(true);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openSuccessModal, setopenSuccessModal] = useState(false);
  const handleClose = () => {
    setOpenDescModal(false);
    setOpenUploadModal(false);
    setopenSuccessModal(false);
    setOpen(false);
  };

  const handleContinueFirstStep = () => {
    setOpenDescModal(false);
    setOpenUploadModal(true);
  };

  const handleOpenSuccessModal = () => {
    setOpenUploadModal(false);
    setopenSuccessModal(true);
  };

  if (!open) return;
  return (
    <>
      <DescriptionModal open={openDescModal} handleClose={handleClose} handleContinue={handleContinueFirstStep} />
      <UploadModal open={openUploadModal} handleClose={handleClose} handleOpenSuccessModal={handleOpenSuccessModal} />
      <SuccessModal open={openSuccessModal} handleClose={handleClose} />
    </>
  );
};
