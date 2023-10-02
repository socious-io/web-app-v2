import { useMemo, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import Dapp from 'src/dapp';
import { Header } from 'src/components/atoms/header/header';
import { Input } from 'src/components/atoms/input/input';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Button } from 'src/components/atoms/button/button';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { InputModal } from 'src/components/molecules/input-modal';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { useForm } from 'src/core/form';
import { printWhen } from 'src/core/utils';
import { Resolver } from '../offer.types';
import { OfferPayload } from 'src/core/types';
import { offer } from '../../job-offer-reject.services';
import { formModel } from '../offer.services';
import { useOfferShared } from '../offer.shared';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { applicantDetail } = (useMatch().ownData as Resolver) || {};
  const [initialForm, setInitialForm] = useState({ estimatedTotalHours: '', message: '', weekly_limit: '' });
  const [paymentType, setPaymentType] = useState(applicantDetail?.project?.payment_type || 'VOLUNTEER');
  const [paymentScheme, setPaymentScheme] = useState(applicantDetail?.project?.payment_scheme || 'FIXED');
  const isPaidType = applicantDetail?.project?.payment_type === 'PAID';
  const isHourly = applicantDetail?.project?.payment_scheme === 'HOURLY';
  const defaultPaymentMode = isPaidType ? 'CRYPTO' : 'FIAT';
  const [paymentMode, setPaymentMode] = useState(defaultPaymentMode);
  const isPaidCrypto = isPaidType && paymentMode === 'CRYPTO';
  const isPaidFiat = isPaidType && paymentMode === 'FIAT';
  const memoizedFormState = useMemo(() => formModel(isHourly, isPaidType, isPaidFiat, initialForm), [paymentMode]);
  const form = useForm(memoizedFormState);
  const formIsInvalid = !form.isValid || !paymentType || !paymentScheme;
  const { tokens, openModal, setOpenModal, selectedToken, selectedCurrency, onSelectTokens, equivalentUSD, web3 } =
    useOfferShared();

  async function onSubmit() {
    const payload: OfferPayload = {
      payment_mode: paymentMode,
      assignment_total: isPaidType ? (form.controls.assignmentTotal.value as number) : 1,
      offer_message: (form.controls.message.value as string) || initialForm.message,
      weekly_limit: (form.controls.weekly_limit.value as string) || initialForm.weekly_limit,
      crypto_currency_address: isPaidCrypto ? selectedToken?.address || tokens[0]?.value : undefined,
    };
    if (!isHourly) {
      payload.total_hours = (form.controls.estimatedTotalHours.value as string) || initialForm.estimatedTotalHours;
    }
    offer(applicantDetail.id, payload).then(() => {
      navigate({ to: '../..' });
    });
  }

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '..' })} paddingTop="var(--safe-area)" title={applicantDetail.user.name} />
      <div className={css.sentTo}>An offer will be sent to {applicantDetail?.user?.first_name || ''}.</div>
      <div className={css.form}>
        {/* Temporary logic, if hourly-paid, then force paymentType to VOLUNTEER */}
        {printWhen(
          <RadioGroup
            name="paymentType"
            value={paymentType}
            onChange={console.log}
            label="Payment type"
            list={PROJECT_PAYMENT_TYPE}
          />,
          !isHourly
        )}
        {printWhen(
          <RadioGroup
            name="paymentType"
            value={'VOLUNTEER'}
            onChange={console.log}
            label="Payment type"
            list={PROJECT_PAYMENT_TYPE}
          />,
          isHourly
        )}
        <RadioGroup
          name="PaymentScheme"
          value={paymentScheme}
          onChange={console.log}
          label="Payment scheme"
          list={PROJECT_PAYMENT_SCHEME}
        />
        {printWhen(
          <Input
            register={form}
            name="estimatedTotalHours"
            label="Estimated total hours"
            placeholder="hrs"
            onKeyUp={(e) => setInitialForm({ ...initialForm, estimatedTotalHours: e.currentTarget.value })}
          />,
          !isHourly
        )}
        {printWhen(
          <RadioGroup
            name="PaymentMode"
            value={paymentMode}
            onChange={(value) => setPaymentMode(value)}
            label="Payment mode"
            list={PROJECT_PAYMENT_MODE}
          />,
          isPaidType
        )}
        {printWhen(<Dapp.Connect />, isPaidCrypto)}
        {printWhen(
          <div className={css.tokens}>
            {printWhen(<div className={css.inputTitle}>Paid - Hourly rate</div>, isHourly)}
            <InputModal
              name="assignmentTotal"
              register={form}
              placeholder="amount"
              modalHeader="Select a token"
              items={tokens as Item[]}
              open={openModal}
              onOpen={() => setOpenModal(true)}
              onClose={() => setOpenModal(false)}
              selectedItem={(selectedToken?.symbol || tokens[0]?.subtitle) as string}
              onSelectItem={onSelectTokens}
            />
            <div className={css.tokens__rate}>
              USD equivalent: <span>{equivalentUSD(form.controls.assignmentTotal.value)}</span>
            </div>
          </div>,
          isPaidCrypto && !!web3
        )}
        {printWhen(
          <Input register={form} name="assignmentTotal" label="Assignment total (USD)" placeholder="amount" />,
          isPaidFiat && !isHourly
        )}
        {printWhen(
          <Input register={form} name="assignmentTotal" label="Paid - Hourly rate" placeholder="amount" />,
          isPaidFiat && isHourly
        )}
        {printWhen(
          <div className={css.tokens}>
            <Input register={form} name="weekly_limit" label="Weekly limit" placeholder="15 hrs/week" />
            <div className={css.tokens__rate}>
              Max per week:{' '}
              <span>
                {Number(form.controls.weekly_limit.value) * Number(form.controls.assignmentTotal.value)}{' '}
                {printWhen(<>{selectedToken?.symbol || tokens[0]?.subtitle}</>, isPaidCrypto)}
                {printWhen(<>{selectedCurrency}</>, isPaidFiat)}
              </span>
            </div>
          </div>,
          isHourly
        )}
        <Textarea
          register={form}
          name="message"
          label="Message"
          placeholder="Write message"
          onKeyUp={(e) => setInitialForm({ ...initialForm, message: e.currentTarget.value })}
        />
      </div>
      <div className={css.btnContainer}>
        <Button onClick={onSubmit} disabled={formIsInvalid}>
          Send offer
        </Button>
      </div>
    </div>
  );
};
