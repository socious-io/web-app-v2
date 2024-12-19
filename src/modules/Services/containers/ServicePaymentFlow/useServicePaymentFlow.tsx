import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Service } from 'src/core/adaptors';
import { Card, CurrentIdentity, updateWallet } from 'src/core/api';
import Dapp from 'src/dapp';
import { RootState } from 'src/store';

export const useServicePaymentFlow = () => {
  const { isConnected, open: openConnect, account } = Dapp.useWeb3();
  const { serviceDetail: service, cards } = useLoaderData() as { serviceDetail: Service; cards: Card[] };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [cardsList, setCardsList] = useState(cards);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const cardsOptionList = cardsList.map(card => {
    const iconPath = `/icons/pay-icons/${card.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      value: card.id,
      title: `${card.meta.brand} ending in ${card.meta.last4}`,
      description: `Expiry ${card.meta.exp_month}/${card.meta.exp_year}`,
      img: <img src={iconPath} alt="" />,
    };
  });
  const walletAddress = currentIdentity?.meta.wallet_address;
  const feePercentage = 2;
  const feeCalculation = parseFloat(service.price) * (feePercentage / 100);
  const orderPayment = { feePercentage, fee: feeCalculation, total: feeCalculation + parseFloat(service.price) };
  const paymentIsFiat = service.payment === 'FIAT';

  useEffect(() => {
    if (isConnected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWallet({ wallet_address: account });
    }
  }, [isConnected, account]);

  const onPay = () => console.log('pay');

  return {
    data: { service, orderPayment, paymentIsFiat, cardsOptionList, selectedCardId, openAddCardModal, isConnected },
    operations: { onPay, setCardsList, setSelectedCardId, setOpenAddCardModal, openConnect },
  };
};
