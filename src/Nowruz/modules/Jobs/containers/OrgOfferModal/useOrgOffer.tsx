import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Applicant,
  PaymentService,
  ProjectPaymentSchemeType,
  ProjectPaymentType,
  offerByApplicant,
} from 'src/core/api';
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
  hours: yup
    .number()
    .positive()
    .typeError('Total hours is required')
    .min(1, 'Hours needs to be more than 0')
    .required('Total hours is required'),
  total: yup.number().when(['paymentType'], (paymentType) => {
    if (paymentType.includes('PAID')) {
      return yup
        .number()
        .typeError('Offer amount is required')
        .positive('Offer amount should be positive value')
        .required('Offer amount is required');
    } else {
      return yup.string().nullable().notRequired();
    }
  }),
  description: yup.string().required('Description is required'),
});
export const useOrgOffer = (applicant: Applicant, onClose: () => void, onSuccess: () => void) => {
  const { chainId, isConnected } = Dapp.useWeb3();
  const [tokens, setTokens] = useState([]);
  const [selected, setSelected] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
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
  const isNonPaid = watch('paymentType') === 'VOLUNTEER';

  const onSubmit: SubmitHandler<Inputs> = async ({ paymentMethod, total, description, hours }) => {
    let netTotal = total;
    if (!isNonPaid && paymentMethod === ('FIAT' as 'STRIPE') && total < 22) {
      setError('total', {
        message: 'Offer amount on Fiat should have a minimum value of 22',
      });
    }
    if (isNonPaid) {
      netTotal = 0;
    }
    const payload = {
      payment_mode: paymentMethod,
      assignment_total: netTotal.toString(),
      offer_message: description,
      total_hours: hours.toString(),
      crypto_currency_address: isCrypto ? selected : undefined,
      currency: isCrypto ? undefined : selected,
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
    setSelected,
  };
};
