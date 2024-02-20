import { Divider } from '@mui/material';
import dapp from 'src/dapp';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { useAssets } from './useAssets';
import { AddPayoutAccount } from '../addPayoutAccount';
import { ConnectButton } from '../connectButton';
import { StripeAccountItem } from '../stripeAccountItem';

export const Assets = () => {
  const { stripeAccounts, openAddAccount, setOpenAddAccount, isConnected, openConnect } = useAssets();

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Payout account</div>
          <Button variant="text" color="secondary" onClick={() => setOpenAddAccount(true)}>
            <Icon name="plus" fontSize={20} className="text-Gray-light-mode-600" />
            Add account
          </Button>
        </div>
        {stripeAccounts.map((item) => (
          <StripeAccountItem key={item.id} bankName={item.bank_name} accountNumber={item.account} />
        ))}
        <Divider />
        <div className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Crypto wallet</div>
        {isConnected ? <dapp.Connect /> : <ConnectButton handleClick={() => openConnect()} />}
      </div>
      {openAddAccount && <AddPayoutAccount open={openAddAccount} handleClose={() => setOpenAddAccount(false)} />}
    </>
  );
};
