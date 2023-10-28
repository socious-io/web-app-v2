import { useMemo, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { Header } from 'src/components/atoms/header/header';
import { Input } from 'src/components/atoms/input/input';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { InputModal } from 'src/components/molecules/input-modal';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { offerByApplicant } from 'src/core/api';
import { useForm } from 'src/core/form';
import { OfferPayload } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import Dapp from 'src/dapp';

import css from './mobile.module.scss';
import { formModel } from '../offer.services';
import { useOfferShared } from '../offer.shared';
import { Resolver } from '../offer.types';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { applicantDetail } = (useLoaderData() as Resolver) || {};
  const [initialForm, setInitialForm] = useState({ estimatedTotalHours: '', message: '' });
  const [paymentType, setPaymentType] = useState(applicantDetail?.project?.payment_type || 'VOLUNTEER');
  const [paymentScheme, setPaymentScheme] = useState(applicantDetail?.project?.payment_scheme || 'FIXED');
  const isPaidType = applicantDetail?.project?.payment_type === 'PAID';
  const defaultPaymentMode = isPaidType ? 'CRYPTO' : 'FIAT';
  const [paymentMode, setPaymentMode] = useState(defaultPaymentMode);
  const isPaidCrypto = isPaidType && paymentMode === 'CRYPTO';
  const isPaidFiat = isPaidType && paymentMode === 'FIAT';
  const memoizedFormState = useMemo(() => formModel(isPaidType, isPaidFiat, initialForm), [paymentMode]);
  const form = useForm(memoizedFormState);
  const formIsInvalid = !form.isValid || !paymentType || !paymentScheme;
  const { tokens, openModal, setOpenModal, selectedToken, onSelectTokens, equivalentUSD, web3 } = useOfferShared();

  async function onSubmit() {
    const payload: OfferPayload = {
      payment_mode: paymentMode,
      assignment_total: isPaidType ? (form.controls.assignmentTotal.value as number) : 1,
      offer_message: (form.controls.message.value as string) || initialForm.message,
      total_hours: (form.controls.estimatedTotalHours.value as string) || initialForm.estimatedTotalHours,
      crypto_currency_address: isPaidCrypto ? selectedToken?.address || tokens[0]?.value : undefined,
    };
    offerByApplicant(applicantDetail.id, payload).then(() => {
      navigate(-1);
    });
  }

  return (
    <div className={css.container}>
      <Header onBack={() => navigate(-1)} paddingTop="var(--safe-area)" title={applicantDetail.user.name} />
      <div className={css.sentTo}>An offer will be sent to {applicantDetail.user.name}.</div>
      <div className={css.form}>
        <RadioGroup
          name="paymentType"
          value={paymentType}
          onChange={console.log}
          label="Payment type"
          list={PROJECT_PAYMENT_TYPE}
        />
        <RadioGroup
          name="PaymentScheme"
          value={paymentScheme}
          onChange={console.log}
          label="Payment scheme"
          list={PROJECT_PAYMENT_SCHEME}
        />
        <Input
          register={form}
          name="estimatedTotalHours"
          label="Estimated total hours"
          placeholder="hrs"
          onKeyUp={(e) => setInitialForm({ ...initialForm, estimatedTotalHours: e.currentTarget.value })}
        />
        {printWhen(
          <RadioGroup
            name="PaymentMode"
            value={paymentMode}
            onChange={(value) => setPaymentMode(value)}
            label="Payment mode"
            list={PROJECT_PAYMENT_MODE}
          />,
          isPaidType,
        )}
        {printWhen(<Dapp.Connect />, isPaidCrypto)}
        {printWhen(
          <div className={css.tokens}>
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
          isPaidCrypto && !!web3,
        )}
        {printWhen(
          <Input register={form} name="assignmentTotal" label="Assignment total (USD)" placeholder="amount" />,
          isPaidFiat,
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
