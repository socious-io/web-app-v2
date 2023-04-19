import { useEffect, useMemo, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Header } from '../../../components/atoms/header/header';
import { Resolver } from './offer.types';
import { Input } from '../../../components/atoms/input/input';
import { Textarea } from '../../../components/atoms/textarea/textarea';
import { Button } from '../../../components/atoms/button/button';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { InputModal } from 'src/components/molecules/input-modal';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';
import { PROJECT_PAYMENT_TYPE } from '../../../constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME } from '../../../constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { formModel } from './offer.services';
import { offer } from '../job-offer-reject.services';
import { OfferPayload } from '../../../core/types';
import { useForm } from '../../../core/form';
import { printWhen } from 'src/core/utils';
import Dapp from 'src/dapp';
import css from './offer.module.scss';

export const Offer = (): JSX.Element => {
  const navigate = useNavigate();
  const { web3 } = Dapp.useWeb3();
  const { applicantDetail } = useMatch().ownData as Resolver;
  const [paymentType, setPaymentType] = useState(applicantDetail?.project?.payment_type || 'VOLUNTEER');
  const [paymentScheme, setPaymentScheme] = useState(applicantDetail?.project?.payment_scheme || 'FIXED');
  const isPaidType = applicantDetail.project?.payment_type === 'PAID';
  const defaultPaymentMode = isPaidType ? 'CRYPTO' : 'FIAT';
  const [paymentMode, setPaymentMode] = useState(defaultPaymentMode);
  const [openModal, setOpenModal] = useState(false);
  const [tokens, setTokens] = useState<Item[]>([]);
  const [selectedToken, setSelectedToken] = useState<{ address: string; symbol?: string }>();
  const isPaidCrypto = isPaidType && paymentMode === 'CRYPTO';
  const isPaidFiat = isPaidType && paymentMode === 'FIAT';
  const memoizedFormState = useMemo(() => formModel(isPaidType), []);
  const form = useForm(memoizedFormState);
  const formIsInvalid = !form.isValid || !paymentType || !paymentScheme;

  useEffect(() => {
    const getTokens = async () => {
      if (web3) {
        const chainId = await web3.eth.getChainId();
        const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.id === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map((token) => {
          return {
            value: token.address,
            title: token.name,
            subtitle: token.symbol,
          };
        });
        setTokens(mapTokens);
      }
    };
    getTokens();
  }, [web3]);

  async function onSubmit() {
    const payload: OfferPayload = {
      payment_mode: paymentMode,
      assignment_total: isPaidType ? (form.controls.assignmentTotal.value as number) : 1,
      offer_message: form.controls.message.value as string,
      total_hours: form.controls.estimatedTotalHours.value as string,
      crypto_currency_address: selectedToken?.address || tokens[0]?.value,
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
        <Input register={form} name="estimatedTotalHours" label="Estimated total hours" placeholder="hrs" />
        {printWhen(
          <RadioGroup
            name="PaymentMode"
            value={paymentMode}
            onChange={console.log}
            label="Payment mode"
            list={PROJECT_PAYMENT_MODE}
          />,
          isPaidType
        )}
        {printWhen(<Dapp.Connect />, isPaidCrypto)}
        {printWhen(
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
            onSelectItem={({ value, subtitle }) => {
              setSelectedToken({ address: value, symbol: subtitle });
              setOpenModal(false);
            }}
          />,
          isPaidCrypto && !!web3
        )}
        {printWhen(
          <Input register={form} name="assignmentTotal" label="Assignment total (USD)" placeholder="amount" />,
          isPaidFiat
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
