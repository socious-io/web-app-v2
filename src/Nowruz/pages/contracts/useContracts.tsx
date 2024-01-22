import { useLoaderData } from 'react-router-dom';
import { OffersRes } from 'src/core/api';

export const useContracts = () => {
  const offers = useLoaderData() as OffersRes;

  const tabs = [
    { label: 'View all', content: <p>View all</p> },
    { label: 'Ongoing', content: <p>Ongoing</p> },
    { label: 'Archived', content: <p>Archived</p> },
  ];

  return {
    data: {
      tabs,
    },
    operations: {},
  };
};
