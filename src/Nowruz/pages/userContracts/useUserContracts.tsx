import { useLoaderData } from 'react-router-dom';
import { MissionsRes, OffersRes } from 'src/core/api';

export const useUserConttracts = () => {
  const { offers, missions } = useLoaderData() as { offers: OffersRes; missions: MissionsRes };
  return { offers: offers.items, missions: missions.items };
};
