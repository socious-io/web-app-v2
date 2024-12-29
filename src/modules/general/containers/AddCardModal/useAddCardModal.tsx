import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { config } from 'src/config';
import { addCard, Card, cards } from 'src/core/api';
import { translate } from 'src/core/utils';

export const useAddCardModal = (
  open: boolean,
  handleClose: () => void,
  setCardsList: (list: Card[]) => void,
  currency?: string,
) => {
  const [stripe, setStripe] = useState<Stripe | null>();
  const [card, setCard] = useState<StripeCardElement | null>();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const is_jp = currency === 'JPY';

  const style = {
    base: {
      color: '#32325D',
      fontWeight: 500,
      fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
      fontSize: '16px',
      fontSmoothing: 'antialiased',

      '::placeholder': {
        color: '#CFD7DF',
      },
      ':-webkit-autofill': {
        color: '#e39f48',
      },
    },
    invalid: {
      color: '#E25950',

      '::placeholder': {
        color: '#FFCCA5',
      },
    },
  };

  useEffect(() => {
    loadStripe(is_jp ? config.jpStripePublicKey : config.stripePublicKey).then(s => setStripe(s));
  }, []);

  useEffect(() => {
    if (stripe && open) {
      const elements = stripe.elements();
      const c = elements.create('card', { style, hidePostalCode: true });
      c?.mount('#card-element');
      setCard(c);
    }
  }, [stripe, open]);

  const onSubmit = async () => {
    if (!card || !stripe) return;

    const res = await stripe.createToken(card);
    if (res.error) {
      setErrorMessage(res.error.message || translate('cont-failed'));
      setOpenErrorModal(true);
    }
    if (!res.token) return;

    const payload = {
      token: res.token.id,
      meta: res.token.card,
    };
    try {
      await addCard(payload, is_jp);
    } catch (err: any) {
      setErrorMessage(err.response?.data?.error || translate('cont-failed'));
      setOpenErrorModal(true);
      return;
    }
    const cardsRes = await cards({ 'filter.is_jp': is_jp });
    setCardsList(cardsRes.items);
    handleClose();
  };

  return {
    data: { openErrorModal, errorMessage },
    operations: {
      onSubmit,
      setOpenErrorModal,
    },
  };
};
