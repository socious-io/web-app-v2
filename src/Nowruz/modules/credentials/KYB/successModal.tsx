import React from 'react';
import { AlertModal } from '../../general/components/AlertModal';

interface SuccessModalProps {
  open: boolean;
  handleClose: () => void;
}
export const SuccessModal: React.FC<SuccessModalProps> = ({ open, handleClose }) => {
  return (
    <AlertModal
      open={open}
      onClose={handleClose}
      title="Your documents have been sent"
      message="Our verification team will take 1-3 days to process your verification request. An email and notification will be sent to you upon successful verification and you will then be able to issue credentials."
      closeButtn={false}
      submitButton={false}
    />
  );
};
