import { useMemo } from 'react';
import { useMatch } from '@tanstack/react-location';
import { useForm } from 'src/core/form';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Header } from 'src/components/atoms/header-v2/header';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Input } from 'src/components/atoms/input/input';
import { Sticky } from 'src/components/templates/sticky';
import { formModel } from './mobile.service';
import { endpoint } from 'src/core/endpoints';
import { CardInfoResp, CardItems } from 'src/core/types';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const cardInfo = useMatch().ownData as unknown || {};
  const memoizedFormState = useMemo(() => formModel(cardInfo as CardItems), []);
  const form = useForm(memoizedFormState);
  const formIsInvalid = !form.isValid;

  function onSubmit() {
    const payload = {
      holder_name: form.controls.cardholderName.value,
      numbers: form.controls.cardNumber.value,
      exp_month: form.controls.month.value,
      exp_year: +('20' + form.controls.year.value),
      cvc: form.controls.cvc.value,
    };
    if ((cardInfo as CardInfoResp).items) {
      endpoint.post.payments['add-card'](payload).then(() => history.back());
    } else {
      endpoint.post.payments['{card_id}/update']((cardInfo as CardItems).id, payload).then(() => history.back());
    }
  }
  
  return (
    <TopFixedMobile>
      <Header title="Add a credit card" onBack={() => history.back()} />
      <>
        <div className={css.container}>
          <Card className={css.card}>
            <form className={css.divider__container}>
              <Input register={form} name="cardholderName" label="Cardholder’s name" placeholder="Name" />

              <Input
                register={form}
                name="cardNumber"
                label="Card number"
                type="tel"
                inputMode="numeric"
                maxLength={19}
              />

              <div className={css.card__details}>
                <div className={css.detail}>
                  <div className={css.detail__label}>Expiry Date</div>
                  <div className={css.date}>
                    <Input
                      register={form}
                      name="month"
                      placeholder="MM"
                      maxLength={2}
                      inputClassName={css.date__input}
                    />
                    /
                    <Input register={form} name="year" placeholder="YY" maxLength={2} inputClassName={css.date__input} />
                  </div>
                </div>
                <div className={css.detail}>
                  <Input register={form} name="cvc" label="CVC" placeholder="***" type="password" />
                </div>
              </div>
            </form>
          </Card>
        </div>
        <Sticky>
          <Button color="blue" className={css['footer__btn']} disabled={formIsInvalid} onClick={onSubmit}>
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
