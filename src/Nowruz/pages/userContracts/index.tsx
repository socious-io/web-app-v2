import React from 'react';
import { ContractCard } from 'src/Nowruz/modules/contract/contractCard';

import { useUserConttracts } from './useUserContracts';

export const UserContracts = () => {
  const { offers } = useUserConttracts();
  return (
    <div className="flex flex-col py-8 px-4 md:px-8 gap-4 md:gap-5 w-full max-w-[640px]">
      {offers.map((item) => (
        <ContractCard key={item.id} offer={item} type="users" />
      ))}
    </div>
  );
};
