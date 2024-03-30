import { Typography } from '@mui/material';
import React from 'react';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useConnectRequestModal } from './useConnectRequestModal';

interface ConnectRequestModalProps {
  identityId: string;
  open: boolean;
  handleClose: () => void;
}
export const ConnectRequestModal: React.FC<ConnectRequestModalProps> = ({ open, handleClose, identityId }) => {
  const { message, handleConnect, letterCount, error, handleChangeMessage } = useConnectRequestModal(
    identityId,
    handleClose,
  );

  return (
    <AlertModal
      open={open}
      onClose={handleClose}
      title="Send a connection request"
      message="Add a message to your connection request"
      customIcon={<FeaturedIcon iconName="user-plus-01" size="lg" theme="gray" type="modern" />}
      closeButtn={true}
      closeButtonLabel="Cancel"
      submitButton={true}
      submitButtonTheme="primary"
      submitButtonLabel="Send"
      onSubmit={handleConnect}
      disableSubmitButton={message.replaceAll(' ', '').length === 0}
    >
      <div className="w-full mb-6 flex flex-col gap-[6px]">
        <Input
          id="connect-message"
          label=""
          value={message}
          onChange={(e) => handleChangeMessage(e.target.value)}
          multiline
          customHeight="180px"
          placeholder="Enter a description..."
          fullWidth
          errors={error ? [error] : undefined}
        />
        <Typography variant="caption" className="text-Gray-light-mode-600 mr-0 ml-auto">
          {`${letterCount}/300`}
        </Typography>
      </div>
    </AlertModal>
  );
};
