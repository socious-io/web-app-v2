import { Divider } from '@mui/material';
import { translate } from 'src/core/utils';
import dapp from 'src/dapp';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import AddPayoutAccount from 'src/modules/general/containers/AddPayoutAccount';

import { useAssets } from './useAssets';
import { ConnectButton } from '../connectButton';
import { StripeAccountItem } from '../stripeAccountItem';

export const Assets = () => {
  const { stripeAccounts, openAddAccount, setOpenAddAccount, Web3Connect } = useAssets();

  return (
    <>
      <div className="w-full flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{translate('pay-account')}</div>
          {!stripeAccounts.length && (
            <Button variant="text" color="secondary" onClick={() => setOpenAddAccount(true)}>
              <Icon name="plus" fontSize={20} className="text-Gray-light-mode-600" />
              {translate('pay-add-account')}
            </Button>
          )}
        </div>
        {stripeAccounts.map(item => (
          <StripeAccountItem key={item.id} bankName={item.bank_name} accountNumber={item.account} />
        ))}
        <Divider />
        <div className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{translate('pay-wallet')}</div>
        <Web3Connect />
      </div>
      <AddPayoutAccount open={openAddAccount} handleClose={() => setOpenAddAccount(false)} />
    </>
  );
};
