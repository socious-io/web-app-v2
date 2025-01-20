import { useEffect, useState } from 'react';
import { Contract, depositContractAdaptor } from 'src/core/adaptors';
import { Card, cards, removeCard } from 'src/core/api';

export const usePaymentFiatModal = (contract: Contract, onSucceedPayment?: (contract: Contract) => void) => {
  const [cardsList, setCardsList] = useState<Card[]>([]);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [paymentDisabled, setPaymentDisabled] = useState(!selectedCardId);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    setPaymentDisabled(!selectedCardId);
  }, [selectedCardId]);

  const getCards = async () => {
    const { items = [] } = await cards({});
    setCardsList(items);
  };

  const onRemoveCard = async (cardId: string) => {
    const filteredCard = cardsList.filter(card => card.id !== cardId);
    try {
      await removeCard(cardId);
      setCardsList(filteredCard);
      setSelectedCardId(filteredCard.length ? filteredCard[0].id : '');
    } catch (e) {
      console.log(`Error in removing card ${cardId}`, e);
    }
  };

  const onProceedFiatPayment = async () => {
    setPaymentDisabled(true);
    const { error, data } = await depositContractAdaptor(contract.id, selectedCardId, contract.payment);
    if (error) {
      setErrorMessage(error);
      return;
    } else if (data) {
      onSucceedPayment?.(data);
    }
    setPaymentDisabled(false);
  };

  return {
    data: {
      cardsList,
      selectedCardId,
      openAddCardModal,
      paymentDisabled,
      errorMessage,
    },
    operations: {
      setCardsList,
      setSelectedCardId,
      onRemoveCard,
      setOpenAddCardModal,
      onProceedFiatPayment,
      setErrorMessage,
    },
  };
};
