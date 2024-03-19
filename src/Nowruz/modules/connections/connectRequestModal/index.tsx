import React from 'react';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useConnectRequestModal } from './useConnectRequestModal';
import { AlertModal } from '../../general/components/AlertModal';

interface ConnectRequestModalProps {
  identityId: string;
  open: boolean;
  handleClose: () => void;
}
export const ConnectRequestModal: React.FC<ConnectRequestModalProps> = ({ open, handleClose, identityId }) => {
  const { message, setMessage, handleConnect } = useConnectRequestModal(identityId, handleClose);

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
    >
      <div className="w-full mb-6">
        <Input
          id="connect-message"
          label=""
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          customHeight="180px"
          placeholder="Enter a description..."
          fullWidth
        />
      </div>
    </AlertModal>
  );
};
