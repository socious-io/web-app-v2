import { useState, useEffect } from 'react';

import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Header } from 'src/components/atoms/header/header';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Sticky } from 'src/components/templates/sticky';
import { config } from 'src/config';
import { endpoint } from 'src/core/endpoints';
import { Offer } from 'src/core/types';
import css from './mobile.module.scss';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { dialog } from 'src/core/dialog/dialog';

type Resolver = {
  offer: Offer;
};

export const Mobile: React.FC = () => {
  const { offer } = useMatch().ownData as Resolver;
  const [stripe, setStripe] = useState<Stripe | null>();
  const [card, setCard] = useState<StripeCardElement | null>();
  const is_jp = offer.currency === 'JPY';

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
      await endpoint.post.payments['add-card'](payload, is_jp);
    } catch (err) {
      dialog.alert({
        title: 'add card error',
        message: err.response.data.error,
      });
      return;
    }
    history.back();
  }

  return (
    <TopFixedMobile>
      <Header title="Add a credit card" onBack={() => history.back()} />
      <>
        <div className={css.container}>
          <Card className={css.card}>
            <div id="card-element"></div>
          </Card>
        </div>
        <Sticky>
          <Button color="blue" className={css['footer__btn']} onClick={onSubmit}>
            Add
          </Button>
          <Button
            color="white"
            className={`${css['footer__btn']} ${css['footer__btn--cancel']}`}
            onClick={() => history.back()}
          >
            Cancel
          </Button>
        </Sticky>
      </>
    </TopFixedMobile>
  );
};
