import { ReactNode, useState } from 'react';
import { Offer, acceptOffer, rejectOffer } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';

export const useAcceptOffer = (offer: Offer) => {
  const [displayMessage, setDisplayMessage] = useState(false);
  const [message, setMessage] = useState<ReactNode>();

  const handleAccept = async () => {
    await acceptOffer(offer.id);
    setDisplayMessage(true);
    setMessage(
      <AlertMessage
        theme="primary"
        iconName="check-circle"
        title="You have accepted this offer"
        subtitle="We are just waiting for the final confirmation from Ocean Protection to start the job."
      />,
    );
  };
  const handleDecline = async () => {
    await rejectOffer(offer.id);
    setDisplayMessage(true);
    setMessage(<AlertMessage theme="gray" iconName="check-circle" title="" subtitle="You have declined this offer" />);
  };
  return { handleAccept, handleDecline, displayMessage, message };
};
