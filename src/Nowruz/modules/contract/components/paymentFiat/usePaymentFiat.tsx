import { useEffect, useState } from 'react';
import { Card, cards, hireOffer, payByOffer } from 'src/core/api';
import { CardRadioButtonItem } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton.types';

export const usePaymentFiat = (handleCloseModal: (paymentSuccess: boolean) => void, offerId?: string) => {
  const [cardOptionList, setCardOptionList] = useState<CardRadioButtonItem[]>([]);
  const [cardList, setCardList] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [process, setProcess] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const getCards = async () => {
    const res = await cards({});
    setCardList(res.items);
  };

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    const options = cardList.map((i) => {
      const iconPath = `/icons/nowruz/pay-icons/${i.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;
      return {
        value: i.id,
        title: `${i.meta.brand} ending in ${i.meta.last4}`,
        description: `Expiry ${i.meta.exp_month}/${i.meta.exp_year}`,
        img: <img src={iconPath} alt="" />,
      };
    });
    setCardOptionList(options);
  }, [cardList]);

  const proceedFiatPayment = async () => {
    if (!offerId) return;
    setProcess(true);
    try {
      await payByOffer(offerId, {
        service: 'STRIPE',
        source: selectedCardId,
      });
      await hireOffer(offerId);
      handleCloseModal(true);
    } catch (err: any) {
      handleCloseModal(false);
      setErrorMessage(err?.response?.data.error || err?.message);
      setOpenErrorModal(true);
    }

    setProcess(false);
  };

  return {
    cardOptionList,
    selectedCardId,
    setSelectedCardId,
    proceedFiatPayment,
    process,
    errorMessage,
    openErrorModal,
    setOpenErrorModal,
    openAddCardModal,
    setOpenAddCardModal,
    setCardList,
  };
};
