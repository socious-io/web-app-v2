import React, { useEffect, useState } from 'react';
import { PaymentFiatProps } from './paymentFiat.types';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { config } from 'src/config';
import { Card, cards } from 'src/core/api';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { CardRadioButtonItem } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton.types';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Icon } from 'src/Nowruz/general/Icon';
import { Typography } from '@mui/material';
import { PaymentSummary } from '../paymentSummary';

export const PaymentFiat: React.FC<PaymentFiatProps> = ({ open, handleClose, currency, amount }) => {
  const [cardList, setCardList] = useState<Card[]>([]);
  const [cardOptionList, setCardOptionList] = useState<CardRadioButtonItem[]>([]);
  //   const [stripe, setStripe] = useState<Stripe | null>();
  //   const [card, setCard] = useState<StripeCardElement | null>();
  //   const is_jp = currency === 'JPY';
  //   useEffect(() => {
  //     loadStripe(is_jp ? config.jpStripePublicKey : config.stripePublicKey).then((s) => setStripe(s));
  //   }, []);

  //   const style = {
  //     base: {
  //       color: '#32325D',
  //       fontWeight: 500,
  //       fontFamily: 'Source Code Pro, Consolas, Menlo, monospace',
  //       fontSize: '16px',
  //       fontSmoothing: 'antialiased',

  //       '::placeholder': {
  //         color: '#CFD7DF',
  //       },
  //       ':-webkit-autofill': {
  //         color: '#e39f48',
  //       },
  //     },
  //     invalid: {
  //       color: '#E25950',

  //       '::placeholder': {
  //         color: '#FFCCA5',
  //       },
  //     },
  //   };

  //   useEffect(() => {
  //     if (stripe) {
  //       const elements = stripe.elements();
  //       const c = elements.create('card', { style, hidePostalCode: true });
  //       c?.mount('#card-element');
  //       setCard(c);
  //     }
  //   }, [stripe]);

  const getCards = async () => {
    const res = await cards({});
    setCardList(res.items);
    console.log('test log res', res);
    // const options=res.items.map(i=>{
    //     value: i.id,
    //     title: i.meta
    //     description?: string;
    //     icon?: IconProps;
    //     img?: ReactNode;
    // })
  };

  useEffect(() => {
    getCards();
  }, []);

  const footerJsx = <div></div>;
  const contentJsx = (
    <div className="flex flex-col gap-5">
      {/* <CardRadioButton
        items={onboardingOptons}
        selectedValue={selectedOnboarding}
        setSelectedValue={(value) => {
          setSelectedOnboarding(value);
        }}
        
      /> */}
      <Button variant="text" color="primary" customStyle="flex gap-2">
        <Icon name="plus" fontSize={20} className="text-Brand-700" />
        <Typography variant="subtitle2" className="text-Brand-700">
          Add a new card
        </Typography>
      </Button>
      <PaymentSummary offerAmount={amount} currency={currency} />
    </div>
  );
  return (
    <Modal
      title="Escrow payment"
      subTitle="Proceed to payment"
      content={contentJsx}
      footer={footerJsx}
      open={open}
      handleClose={handleClose}
      mobileFullHeight={false}
    />
  );
};
