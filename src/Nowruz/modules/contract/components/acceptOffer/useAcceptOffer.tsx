import { useState } from 'react';
import { Offer, acceptOffer, rejectOffer } from 'src/core/api';

import { AcceptOfferDetail } from '../acceptOfferDetail';

export const useAcceptOffer = (offer: Offer) => {
  const name = offer.offerer.meta.name;
  const profileImage = offer.offerer.meta.image;

  const [accepted, setAccepted] = useState(offer.status === 'APPROVED');
  const [declined, setDeclined] = useState(offer.status === 'WITHDRAWN');
  const tabs = [
    { label: 'Details', content: <AcceptOfferDetail offer={offer} /> },
    { label: 'Activity', content: <div /> },
  ];

  const handleAccept = async () => {
    await acceptOffer(offer.id);
    setAccepted(true);
  };
  const handleDecline = async () => {
    await rejectOffer(offer.id);
    setDeclined(true);
  };
  return { profileImage, name, tabs, accepted, handleAccept, declined, handleDecline };
};
