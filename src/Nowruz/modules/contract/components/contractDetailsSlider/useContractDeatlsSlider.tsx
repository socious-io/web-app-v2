import { MissionStatus, Offer } from 'src/core/api';

import { ContractDetailTab } from '../contractDetailTab';

export const useContractDetailsSlider = (
  offer: Offer,
  missionStatus?: MissionStatus,
  type?: 'users' | 'organizations',
) => {
  const name = offer.offerer.meta.name;
  const profileImage = offer.offerer.meta.image;
  const tabs = [
    { label: 'Details', content: <ContractDetailTab offer={offer} /> },
    { label: 'Activity', content: <div /> },
  ];

  return { name, profileImage, tabs };
};
