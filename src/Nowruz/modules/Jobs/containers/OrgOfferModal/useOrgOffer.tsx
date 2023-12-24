import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PaymentService, ProjectPaymentSchemeType, ProjectPaymentType, offerByApplicant } from 'src/core/api';
import { OfferPayload } from 'src/core/types';
import { removeValuesFromObject } from 'src/core/utils';
import Dapp from 'src/dapp';
import { useChainId } from 'wagmi';
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
  total: yup.string(),
  description: yup.string().required(),
});
export const useOrgOffer = (applicantId: string) => {
  const { web3 } = Dapp.useWeb3();
  const chainId = useChainId();
  const [tokens, setTokens] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentType: 'PAID',
      paymentMethod: 'CRYPTO',
      paymentTerm: 'FIXED',
    },
  });
  useEffect(() => {
    const getTokens = async () => {
      if (web3) {
        const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.id === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map((token) => {
          return {
            value: token.address,
            label: token.name,
            address: token.address,
          };
        });
        console.log('mapTokens333', selectedNetwork);
        setTokens(mapTokens);
      }
    };
    getTokens();
  }, [web3, chainId]);
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
  const onSubmit: SubmitHandler<Inputs> = async ({
    paymentMethod,
    total,
    description,
    hours,
    paymentTerm,
    paymentType,
  }) => {
    const payload = {
      payment_mode: paymentMethod,
      assignment_total: total,
      offer_message: description,
      total_hours: hours.toString(),
      crypto_currency_address: isCrypto ? selectedCurrency?.address : undefined,
      currency: selectedCurrency.label,
    };
    console.log('ID ID', payload);
    offerByApplicant(applicantId, removeValuesFromObject(payload, [undefined]));
    console.log(payload);
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
    paymentMethodOptions,
    setSelectedCurrency,
  };
};
