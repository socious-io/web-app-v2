import { useEffect, useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { useAccount } from 'wagmi';
import { Resolver } from './offer-received.types';
import { StatusKeys } from 'src/constants/APPLICANT_STATUS';
import { endpoint } from 'src/core/endpoints';
import { dialog } from 'src/core/dialog/dialog';
import { findTokenRate } from './offer-received.services';

export const useOfferReceivedShared = () => {
  const { offer } = useMatch().ownData as Resolver;
  const { project, payment_mode, recipient } = offer;
  const { payment_type } = project || {};
  const { wallet_address } = recipient?.meta || {};
  const isPaidCrypto = payment_type === 'PAID' && payment_mode === 'CRYPTO';
  const { address: account, isConnected } = useAccount();
  const [status, setStatus] = useState<StatusKeys>(offer?.status as StatusKeys);
  const [tokenRate, setTokenRate] = useState(1);

  useEffect(() => {
    if (isConnected && account && (!wallet_address || String(wallet_address) !== account)) {
      endpoint.post.user['{user_id}/update_wallet']({
        wallet_address: account,
      });
    }
  }, [isConnected, account]);

  useEffect(() => {
    const getTokenRate = async () => {
      const { rate } = await findTokenRate(offer.crypto_currency_address);
      setTokenRate(rate);
    };
    getTokenRate();
  }, []);

  function onAccept(id: string) {
    return () =>
      endpoint.post.offers['{offer_id}/approve'](id).then(() => {
        dialog.alert({ title: 'Offer accepted', message: 'You have successfully accepted the offer' }).then(() => {
          setStatus('APPROVED');
        });
      });
  }

  function onDeclined(id: string) {
    return () => {
      endpoint.post.offers['{offer_id}/withdrawn'](id).then(() => {
        dialog.alert({ title: 'Offer declined', message: 'You have successfully declined the offer' }).then(() => {
          setStatus('WITHRAWN');
        });
      });
    };
  }

  function equivalentUSD() {
    return Math.round((offer.assignment_total / tokenRate) * 100) / 100;
  }

  return { offer, status, account, isPaidCrypto, onAccept, onDeclined, equivalentUSD };
};
