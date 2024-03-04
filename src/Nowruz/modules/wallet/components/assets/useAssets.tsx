import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, updateWallet } from 'src/core/api';
import dapp from 'src/dapp';
import { RootState } from 'src/store';

import { Resolver } from './assets.types';

export const useAssets = () => {
  const { stripeProfileRes, jpStripeProfileRes } = useLoaderData() as Resolver;
  const { isConnected, open: openConnect, account } = dapp.useWeb3();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const walletAddress = currentIdentity?.meta.wallet_address;
  const [openAddAccount, setOpenAddAccount] = useState(false);
  const stripeAccounts = [];
  if (stripeProfileRes?.external_accounts?.data.length > 0)
    stripeAccounts.push(...stripeProfileRes?.external_accounts.data);
  if (jpStripeProfileRes?.external_accounts?.data.length > 0)
    stripeAccounts.push(...jpStripeProfileRes?.external_accounts.data);

  useEffect(() => {
    if (
      currentIdentity?.type === 'users' &&
      isConnected &&
      account &&
      (!walletAddress || String(walletAddress) !== account)
    ) {
      updateWallet({ wallet_address: account });
    }
  }, [isConnected, account]);

  return { stripeAccounts, openAddAccount, setOpenAddAccount, isConnected, openConnect };
};
