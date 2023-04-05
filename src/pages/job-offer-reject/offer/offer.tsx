import css from './offer.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Header } from '../../../components/atoms/header/header';
import { Resolver } from './offer.types';
import { Input } from '../../../components/atoms/input/input';
import { Textarea } from '../../../components/atoms/textarea/textarea';
import { Button } from '../../../components/atoms/button/button';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { PROJECT_PAYMENT_TYPE } from '../../../constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME } from '../../../constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { formModel } from './offer.services';
import { offer } from '../job-offer-reject.services';
import { OfferPayload } from '../../../core/types';
import { useForm } from '../../../core/form';
import { printWhen } from 'src/core/utils';
import Dapp from 'src/dapp';

export const Offer = (): JSX.Element => {
  const navigate = useNavigate();
  const { applicantDetail } = useMatch().ownData as Resolver;
  const { project } = applicantDetail;
  const [paymentType, setPaymentType] = useState(project.payment_type);
  const [paymentScheme, setPaymentScheme] = useState(project.payment_scheme);
  const [paymentMode, setPaymentMode] = useState('CRYPTO');
  const isPaidType = project.payment_type === 'PAID';
  const memoizedFormState = useMemo(() => formModel(isPaidType), []);
  const form = useForm(memoizedFormState);
  const formIsInvalid = !form.isValid || !paymentType || !paymentScheme;

  const { web3 } = Dapp.useWeb3();

  async function onSubmit() {
    let token: string | undefined = undefined;
    if (paymentMode === 'CRYPTO' && web3) {
      const chainId = await web3.eth.getChainId();
      const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.id === chainId)[0];
      // FIXME: let use select token from options
      token = selectedNetwork.tokens[0].address;
    }

    const payload: OfferPayload = {
      payment_mode: paymentMode,
      assignment_total: isPaidType ? (form.controls.assignmentTotal.value as number) : 1,
      offer_message: form.controls.message.value as string,
      total_hours: form.controls.estimatedTotalHours.value as string,
      crypto_currency_address: token,
    };
    offer(applicantDetail.id, payload).then(() => {
      navigate({ to: '../..' });
    });
  }

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '..' })} paddingTop="var(--safe-area)" title={applicantDetail.user.name} />
      <div className={css.sentTo}>An offer will be sent to {applicantDetail.user.name}.</div>
      <div className={css.form}>
        <RadioGroup
          name="paymentType"
          value={paymentType}
          onChange={() => setPaymentType(project.payment_type)}
          label="Payment type"
          list={PROJECT_PAYMENT_TYPE}
        />
        <RadioGroup
          name="PaymentScheme"
          value={paymentScheme}
          onChange={() => setPaymentScheme(project.payment_scheme)}
          label="Payment scheme"
          list={PROJECT_PAYMENT_SCHEME}
        />

        <Input register={form} name="estimatedTotalHours" label="Estimated total hours" placeholder="hrs" />

        {/* later add fiat  */}
        <RadioGroup
          name="PaymentMode"
          value={paymentMode}
          onChange={() => setPaymentMode('CRYPTO')}
          label="Payment mode"
          list={PROJECT_PAYMENT_MODE}
        />

        {printWhen(
          <Input register={form} name="assignmentTotal" label="Assignment total (USDC)" placeholder="amount" />,
          isPaidType
        )}

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
