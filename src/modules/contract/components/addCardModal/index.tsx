import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import React, { useState, useEffect } from 'react';
import { config } from 'src/config';
import { addCard, cards } from 'src/core/api';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import { AddCardModalProps } from './addCardModal.types';

export const AddCardModal: React.FC<AddCardModalProps> = ({ open, handleClose, currency, setCardsList }) => {
  const [stripe, setStripe] = useState<Stripe | null>();
  const [card, setCard] = useState<StripeCardElement | null>();
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const is_jp = currency === 'JPY';

  useEffect(() => {
    loadStripe(is_jp ? config.jpStripePublicKey : config.stripePublicKey).then(s => setStripe(s));
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
  }

  const footerJSX = (
    <div className="w-full p-4 md:p-6">
      <Button color="primary" variant="contained" onClick={onSubmit} fullWidth>
        {translate('cont-add-btn')}
      </Button>
    </div>
  );
  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={translate('cont-add-credit-card')}
        mobileFullHeight={false}
        footer={footerJSX}
      >
        <div className="p-4 md:p-6 ">
          <div id="card-element"></div>
        </div>
      </Modal>
      <AlertModal
        title={translate('cont-failed')}
        message={errorMessage}
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        closeButtn={false}
        submitButton={false}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
      />
    </>
  );
};
