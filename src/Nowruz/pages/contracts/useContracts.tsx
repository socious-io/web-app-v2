import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, Offer, OffersRes } from 'src/core/api';
import { ContractCard } from 'src/Nowruz/modules/contract/components/contractCard';

export const useContracts = () => {
  const resolver = useLoaderData() as { offers: OffersRes; currentIdentities: Array<CurrentIdentity> };
  const identity = resolver.currentIdentities.find((identity: CurrentIdentity) => identity.current);
  const { items } = resolver.offers;

  const contentJSX = (items: Offer[]) => (
    <div className="flex flex-col md:gap-5 w-full max-w-[640px]">
      {items?.map((item: Offer) => <ContractCard key={item.id} offer={item} type={identity?.type ?? 'users'} />)}
    </div>
  );

  const tabs = [
    { label: 'View all', content: contentJSX(items) },
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
