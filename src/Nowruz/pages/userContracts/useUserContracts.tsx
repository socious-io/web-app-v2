import { useLoaderData } from 'react-router-dom';
import { OffersRes } from 'src/core/api';

export const useUserConttracts = () => {
  const { items, page } = useLoaderData() as OffersRes;

  return { offers: items };
};
