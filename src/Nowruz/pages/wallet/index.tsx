import { Divider } from '@mui/material';
import React from 'react';
import { HorizontalButtonTabs } from 'src/Nowruz/modules/general/components/horizontalButtonTabs';
import { Assets } from 'src/Nowruz/modules/wallet/components/assets';
import { DesktopTransactions } from 'src/Nowruz/modules/wallet/components/transactions/desktopTransactions';

import { useWallet } from './useWallet';
import css from './wallet.module.scss';

export const Wallet = () => {
  const { tabs } = useWallet();
  return (
    <div className="w-full h-full p-4 md:p-8 flex flex-col gap-8">
      <div className={css.header}>Payments</div>
      <div className="flex md:hidden">
        <HorizontalButtonTabs tabs={tabs} />
      </div>
      <div className="w-full h-full hidden md:flex gap-8">
        <div className="w-[348px]">
          <Assets />
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="flex-1">
          <DesktopTransactions />
        </div>
      </div>
    </div>
  );
};
