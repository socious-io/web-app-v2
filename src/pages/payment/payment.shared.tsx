import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { CardsRes, hireOffer, removeCard } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { getFlooredFixed } from 'src/core/numbers';
import { getMonthName } from 'src/core/time';
import Dapp from 'src/dapp';
import store from 'src/store';
import { hideSpinner, showSpinner } from 'src/store/reducers/spinner.reducer';

import { confirmPayment, getCreditCardInfo } from './payment.service';
import { Resolver } from './payment.types';

export const usePaymentShared = () => {
  const { web3, account, isConnected } = Dapp.useWeb3();
  const { offer, cardInfo } = useLoaderData() as Resolver;
  const [process, setProcess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(cardInfo?.items[0]?.id);
  const [cards, setCards] = useState(cardInfo);
  const [status, setStatus] = useState(offer.status);
  const offerId = offer?.id;
  const {
    created_at,
    recipient,
    amount: assignment_total,
    total: total_price,
    stripe_fee,
    fee: commision,
    crypto_currency_address: token,
    project_id,
    project,
    payment_mode,
  } = offer || {};
  const { wallet_address: contributor } = recipient?.meta || {};
  const start_date = getMonthName(created_at) + ' ' + new Date(created_at).getDate();
  const isPaidCrypto = project?.payment_type === 'PAID' && payment_mode === 'CRYPTO';
  const isDisabledProceedPayment =
    process || (isPaidCrypto ? !isConnected || !account : !selectedCard) || status === 'HIRED';

  let unit = offer.currency || 'USD';

  function onSelectCard(id: string) {
    setSelectedCard(id);
  }

  function setCardsList(list: CardsRes) {
    setCards(list);
  }

  async function onRemoveCard(id: string) {
    setSelectedCard('');
    removeCard(id).then(async () => {
      const result = await getCreditCardInfo(offer.currency === 'JPY');
      setCards(result);
    });
  }

  async function proceedCryptoPayment() {
    // FIXME: please handle this errors in a proper way
    if (!web3) throw new Error('Not allow web3 is not connected');
    if (!contributor) throw new Error('Contributor wallet is not connected');

    setProcess(true);
    store.dispatch(showSpinner());
    // const escrowAmount = parseInt(assignment_total.toString());
    try {
      // put escrow on smart contract
      const result = await Dapp.escrow({
        web3,
        totalAmount: total_price,
        escrowAmount: assignment_total,
        contributor,
        token,
        projectId: project_id,
        verifiedOrg: offer.offerer.meta.verified_impact || false,
      });

      // this is paramater need to sync with backend to make Hire available
      await confirmPayment(offerId, {
        service: 'CRYPTO',
        source: account,
        txHash: result.txHash,
        meta: result,
      });
      hireOffer(offerId).then(() => setStatus('HIRED'));
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }

    setProcess(false);
    store.dispatch(hideSpinner());
  }

  async function proceedFiatPayment() {
    setProcess(true);
    try {
      await confirmPayment(offerId, {
        service: 'STRIPE',
        source: selectedCard,
      });
      hireOffer(offerId).then(() => setStatus('HIRED'));
    } catch (err: any) {
      dialog.alert({
        message: err?.response?.data.error || err?.message,
        title: 'Failed',
      });
    }
    setProcess(false);
  }

  if (offer.crypto_currency_address) {
    Dapp.NETWORKS.map((n) => {
      const token = n.tokens.filter((t) => offer.crypto_currency_address === t.address)[0];
      if (token) unit = token.symbol;
    });
  }

  const checkList = [
    { title: 'Total assignment', price: assignment_total },
    { title: 'Socious fee', price: commision },
  ];

  if (stripe_fee > 0) checkList.push({ title: 'Stripe fee', price: stripe_fee });

  return {
    offer,
    unit,
    assignment_total: getFlooredFixed(assignment_total, 2),
    commision: getFlooredFixed(commision, 2),
    total_price: getFlooredFixed(total_price, 2),
    stripe_fee: getFlooredFixed(stripe_fee, 2),
    checkList,
    start_date,
    isPaidCrypto,
    cards,
    setCardsList,
    selectedCard,
    onSelectCard,
    onRemoveCard,
    onClickProceedPayment: isPaidCrypto ? proceedCryptoPayment : proceedFiatPayment,
    isDisabledProceedPayment,
    status,
  };
};
