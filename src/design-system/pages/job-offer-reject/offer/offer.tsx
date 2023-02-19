import css from './offer.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Header } from '../../../atoms/header/header';
import { Resolver } from './offer.types';
import { Input } from '../../../atoms/input/input';
import { Dropdown } from '../../../atoms/dropdown/dropdown';
import { Textarea } from '../../../atoms/textarea/textarea';
import { Button } from '../../../atoms/button/button';
import { PROJECT_PAYMENT_TYPE_DROPDOWN } from '../../../../core/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME_DROPDOWN } from '../../../../core/constants/PROJECT_PAYMENT_SCHEME';
import { useState } from 'react';
import { formInitialState } from './offer.services';
import { offer } from '../job-offer-reject.services';
import { OfferPayload } from '../../../../core/types';

export const Offer = (): JSX.Element => {
  const navigate = useNavigate();
  const { applicantDetail } = useMatch().ownData as Resolver;
  const [form, setForm] = useState(formInitialState);

  function navigateToOverview() {
    navigate({ to: '..' });
  }

  function updateForm(fieldName: string) {
    return (value: string) => setForm((prev) => ({ ...prev, [fieldName]: value }));
  }

  function formIsValid() {
    return Object.entries(form).every(([key, value]) => value);
  }

  function onSubmit() {
    const payload: OfferPayload = {
      assignment_total: 1,
      offer_message: form.message,
      total_hours: form.estimatedTotalHours,
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
          onValueChange={updateForm('paymentType')}
          label="Payment type"
          list={PROJECT_PAYMENT_TYPE_DROPDOWN}
          placeholder="payment type"
        />
        <Dropdown
          onValueChange={updateForm('paymentMode')}
          label="Payment mode"
          list={PROJECT_PAYMENT_SCHEME_DROPDOWN}
          placeholder="payment mode"
        />
        <Input
          onChange={(e) => updateForm('estimatedTotalHours')(e.target.value)}
          label="Estimated total hours"
          placeholder="hrs"
        />
        <Textarea onValueChange={updateForm('message')} label="Message" placeholder="Write message" />
      </div>
      <div className={css.btnContainer}>
        <Button onClick={onSubmit} disabled={!formIsValid()}>
          Send offer
        </Button>
      </div>
    </div>
  );
};
