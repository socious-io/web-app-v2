import React from 'react';

import { AcceotOfferProps } from './acceptOffer.types';
import { useAcceptOffer } from './useAcceptOffer';
import { ContractDetailsSlider } from '../contractDetailsSlider';

export const AcceptOffer: React.FC<AcceotOfferProps> = ({ offer }) => {
  const { handleAccept, handleDecline, displayMessage, message } = useAcceptOffer(offer);
  return (
    <ContractDetailsSlider
      offer={offer}
      displayMessage={displayMessage}
      messageComponent={message}
      displayPrimaryButton={!displayMessage}
      displaySecondaryButton={!displayMessage}
      primaryButtonLabel="Accept offer"
      secondaryButtonLabel="Decline"
      primaryButtonAction={handleAccept}
      secondaryButtonAction={handleDecline}
    />
  );
};
