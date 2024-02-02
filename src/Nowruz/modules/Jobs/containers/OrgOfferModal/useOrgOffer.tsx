import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Applicant,
  PaymentService,
  ProjectPaymentSchemeType,
  ProjectPaymentType,
  offerByApplicant,
} from 'src/core/api';
import { OfferPayload } from 'src/core/types';
import { removeValuesFromObject } from 'src/core/utils';
import Dapp from 'src/dapp';
import * as yup from 'yup';

type Inputs = {
  title: string;
  paymentType: ProjectPaymentType;
  paymentTerm: ProjectPaymentSchemeType;
  hours: number;
  total: number;
  paymentMethod: PaymentService;
  description: string;
};
const schema = yup.object().shape({
  title: yup.string().min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters'),
  paymentType: yup.string(),
  paymentTerm: yup.string(),
  paymentMethod: yup.string(),
  hours: yup.string().required('Total hours is required'),
  total: yup.number().min(22),
  description: yup.string().required(),
});
export const useOrgOffer = (applicant: Applicant, onClose: () => void, onSuccess: () => void) => {
  const { chainId, isConnected } = Dapp.useWeb3();
  const [tokens, setTokens] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentType: 'PAID',
      paymentMethod: 'FIAT' as 'STRIPE',
      paymentTerm: 'FIXED',
    },
  });
  useEffect(() => {
    const getTokens = async () => {
      if (isConnected) {
        const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.chainId === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map((token) => {
          return {
            value: token.address,
            label: token.name,
            address: token.address,
          };
        });

        setTokens(mapTokens);
      }
    };
    getTokens();
  }, [isConnected, chainId]);
  const onSelectPaymentType = (paymentType: ProjectPaymentType) => {
    setValue('paymentType', paymentType);
  };
  const onSelectPaymentTerm = (paymentType: ProjectPaymentSchemeType) => {
    setValue('paymentTerm', paymentType);
  };
  const onSelectPaymentMethod = (paymentMethod: PaymentService) => {
    setValue('paymentMethod', paymentMethod);
  };
  const isCrypto = watch('paymentMethod') === 'CRYPTO';
  const isNonPaid = watch('paymentTerm') === 'FIXED' && watch('paymentType') === 'VOLUNTEER';

  const onSubmit: SubmitHandler<Inputs> = async ({ paymentMethod, total, description, hours }) => {
    const payload = {
      payment_mode: paymentMethod,
      assignment_total: total.toString(),
      offer_message: description,
      total_hours: hours.toString(),
      crypto_currency_address: isCrypto ? tokens[0]?.value || tokens[0]?.address : undefined,
      currency: selectedCurrency,
    };

    await offerByApplicant(applicant.id, removeValuesFromObject(payload, [undefined]));
    onSuccess();
    onClose();
  };

  const paymentMethodOptions = isCrypto
    ? tokens
    : [
        { label: 'USD', value: 'USD' },
        { label: 'JPY', value: 'JPY' },
      ];
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    setValue,
    onSelectPaymentType,
    onSelectPaymentTerm,
    onSelectPaymentMethod,
    isCrypto,
    isNonPaid,
    paymentMethodOptions,
    setSelectedCurrency,
  };
};
