import { useState } from 'react';
import { Mission, Offer } from 'src/core/api';

import { AcceptOfferDetail } from '../acceptOfferDetail';

export const useCompleteJob = (offer: Offer, mission: Mission) => {
  const name = offer.offerer.meta.name;
  const profileImage = offer.offerer.meta.image;

  const [stopped, setStopped] = useState(mission.status === 'CANCELED');
  const [completed, setCompleted] = useState(mission.status === 'COMPLETE');

  const tabs = [
    { label: 'Details', content: <AcceptOfferDetail offer={offer} /> },
    { label: 'Activity', content: <div /> },
  ];

  const handleStop = async () => {
    //  await acceptOffer(offer.id);
    // setStopped(true);
  };
  const handleComplete = async () => {
    // await rejectOffer(offer.id);
    // setCompleted(true)
  };
  return { profileImage, name, tabs, stopped, completed, handleComplete, handleStop };
};
