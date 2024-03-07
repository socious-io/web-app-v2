import React from 'react';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';

interface ApplyExternalPartyModalProps {
  open: boolean;
  handleClose: () => void;
  otherPartyUrl: string;
}

export const ApplyExternalPartyModal: React.FC<ApplyExternalPartyModalProps> = ({
  open,
  handleClose,
  otherPartyUrl,
}) => {
  const continueApply = () => {
    otherPartyUrl && window.open(otherPartyUrl, '_blank');
    handleClose();
  };

  return (
    <AlertModal
      open={open}
      onClose={handleClose}
      onSubmit={continueApply}
      message="Your application for the job will continue to another site."
      title="Partner job board"
      customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="warning" type="light-circle-outlined" />}
      closeButtn={true}
      closeButtonLabel="Cancel"
      submitButton={true}
      submitButtonTheme="primary"
      submitButtonLabel="Continue"
    />
  );
};
