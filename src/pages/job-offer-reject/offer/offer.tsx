import css from './offer.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Header } from '../../../components/atoms/header/header';
import { Resolver } from './offer.types';
import { Input } from '../../../components/atoms/input/input';
import { Dropdown } from '../../../components/atoms/dropdown/dropdown';
import { Textarea } from '../../../components/atoms/textarea/textarea';
import { Button } from '../../../components/atoms/button/button';
import { PROJECT_PAYMENT_TYPE_DROPDOWN } from '../../../constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME_DROPDOWN } from '../../../constants/PROJECT_PAYMENT_SCHEME';
import { useState } from 'react';
import { formModel } from './offer.services';
import { offer } from '../job-offer-reject.services';
import { OfferPayload } from '../../../core/types';
import { useForm } from '../../../core/form';

export const Offer = (): JSX.Element => {
  const navigate = useNavigate();
  const { applicantDetail } = useMatch().ownData as Resolver;
  const [paymentType, setPaymentType] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const form = useForm(formModel);
  const formIsInvalid = !form.isValid || !paymentType || !paymentMode;

  function navigateToOverview() {
    navigate({ to: '..' });
  }

  function onSubmit() {
    const payload: OfferPayload = {
      assignment_total: 1,
      offer_message: form.controls.message.value,
      total_hours: form.controls.estimatedTotalHours.value,
    };
    offer(applicantDetail.id, payload).then(() => {
      navigate({ to: '../..' });
    });
  }

  return (
    <div className={css.container}>
      <Header onBack={navigateToOverview} paddingTop="var(--safe-area)" title={applicantDetail.user.name} />
      <div className={css.sentTo}>An offer will be sent to {applicantDetail.user.name}.</div>
      <div className={css.form}>
        <Dropdown
          onValueChange={(value) => setPaymentType(value)}
          label="Payment type"
          list={PROJECT_PAYMENT_TYPE_DROPDOWN}
          placeholder="payment type"
        />
        <Dropdown
          onValueChange={(value) => setPaymentMode(value)}
          label="Payment mode"
          list={PROJECT_PAYMENT_SCHEME_DROPDOWN}
          placeholder="payment mode"
        />
        <Input register={form} name="estimatedTotalHours" label="Estimated total hours" placeholder="hrs" />
        <Textarea register={form} name="message" label="Message" placeholder="Write message" />
      </div>
      <div className={css.btnContainer}>
        <Button onClick={onSubmit} disabled={formIsInvalid}>
          Send offer
        </Button>
      </div>
    </div>
  );
};
