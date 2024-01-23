import { useLoaderData } from 'react-router-dom';
import { MissionsRes, Offer, OffersRes } from 'src/core/api';
import { ContractCard } from 'src/Nowruz/modules/contract/components/contractCard';

export const useContracts = () => {
  const { offers, missions } = useLoaderData() as { offers: OffersRes; missions: MissionsRes };
  // return { offers: offers.items, missions: missions.items };

  const contentJSX = (items: Offer[]) => (
    <div className="flex flex-col md:gap-5 w-full max-w-[640px]">
      {items?.map((item: Offer) => (
        <ContractCard key={item.id} offer={item} mission={missions.items.find((m) => m.offer.id === item.id)} />
      ))}
    </div>
  );

  const tabs = [
    { label: 'View all', content: contentJSX(offers.items) },
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
