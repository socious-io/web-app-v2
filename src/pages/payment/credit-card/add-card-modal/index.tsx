import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Modal } from 'src/components/templates/modal/modal';
import { config } from 'src/config';
import { addCard } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';

import css from './add-card-modal.module.scss';
import { AddCardModalProps } from './add-card-modal.types';
import { getCreditCardInfo } from '../../payment.service';

export const AddCardModal: React.FC<AddCardModalProps> = ({ open, onClose, setCardsList, currency }) => {
  const [stripe, setStripe] = useState<Stripe | null>();
  const [card, setCard] = useState<StripeCardElement | null>();
  const is_jp = currency === 'JPY';

  useEffect(() => {
    loadStripe(is_jp ? config.jpStripePublicKey : config.stripePublicKey).then((s) => setStripe(s));
  }, []);

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
    if (stripe) {
      const elements = stripe.elements();
      const c = elements.create('card', { style, hidePostalCode: true });
      c?.mount('#card-element');
      setCard(c);
    }
  }, [stripe]);

  async function onSubmit() {
    if (!card || !stripe) return;

    const { token } = await stripe.createToken(card);
    if (!token) return;

    const payload = {
      token: token.id,
      meta: token.card,
    };
    try {
      await addCard(payload, is_jp);
    } catch (err) {
      dialog.alert({
        title: 'add card error',
        message: err.response.data.error,
      });
      return;
    }
    const cards = await getCreditCardInfo(is_jp);
    setCardsList(cards);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.container}>
        <div className={css.header}>
          <span></span>
          Add a credit card
          <div onClick={onClose}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <div id="card-element"></div>

        <div className={css.btn}>
          <Button color="blue" onClick={onSubmit}>
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};
