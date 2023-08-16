import { useMemo, useState } from 'react';
import Dapp from 'src/dapp';
import { WebModal } from 'src/components/templates/web-modal';
import { Input } from 'src/components/atoms/input/input';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { InputModal } from 'src/components/molecules/input-modal';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { useForm } from 'src/core/form';
import { printWhen } from 'src/core/utils';
import { OfferModalProps } from './offer-modal.types';
import { OfferPayload } from 'src/core/types';
import { formModel } from '../offer.services';
import { offer } from '../../job-offer-reject.services';
import { useOfferShared } from '../offer.shared';
import css from './offer-modal.module.scss';

export const OfferModal: React.FC<OfferModalProps> = ({ open, onClose, applicantDetail, onDone }) => {
  const [initialForm, setInitialForm] = useState({ estimatedTotalHours: '', message: '',weeklyLimit:'',job:'' });
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
      // weeklyLimit: (form.controls.message.value as string) || initialForm.weeklyLimit,
      // job: (form.controls.message.value as string) || initialForm.job,
      total_hours: (form.controls.estimatedTotalHours.value as string) || initialForm.estimatedTotalHours,
      crypto_currency_address: isPaidCrypto ? selectedToken?.address || tokens[0]?.value : undefined,
    };
    offer(applicantDetail.id, payload).then(() => {
      onClose();
      onDone();
    });
  }
  return (
    <WebModal
      header={`An offer will be sent to ${applicantDetail?.user?.first_name || ''}.`}
      open={open}
      onClose={onClose}
      buttons={[{ children: 'Send offer', disabled: formIsInvalid, onClick: onSubmit }]}
    >
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
          isPaidType
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
          isPaidCrypto && !!web3
        )}
        {printWhen(
          <Input register={form} name="assignmentTotal" label="Assignment total (USD)" placeholder="amount" />,
          isPaidFiat
        )}
        <Textarea
          register={form}
          name="message"
          label="Message"
          placeholder="Write message"
          onKeyUp={(e) => setInitialForm({ ...initialForm, message: e.currentTarget.value })}
        />
        {printWhen(
            <Input register={form} name="weeklyLimit" label="Weekly limit" placeholder="15 hrs/week" />,
            paymentScheme === 'HOURLY'
        )}
        {printWhen(
            <Textarea
                register={form}
                name="job"
                label="Job"
                placeholder="Write job"
                onKeyUp={(e) => setInitialForm({ ...initialForm, job: e.currentTarget.value })}
            />,
            paymentScheme === 'HOURLY'
        )}
      </div>
    </WebModal>
  );
};
