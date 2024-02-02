import { Offer } from 'src/core/api';

import { ContractDetailTab } from '../contractDetailTab';

export const useContractDetailsSlider = (offer: Offer) => {
  const name = offer.offerer.meta.name;
  const profileImage = offer.offerer.meta.image;
  const tabs = [
    { label: 'Details', content: <ContractDetailTab offer={offer} /> },
    { label: 'Activity', content: <div /> },
  ];

  return { name, profileImage, tabs };
};
