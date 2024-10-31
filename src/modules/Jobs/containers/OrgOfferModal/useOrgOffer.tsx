import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardEvent, useEffect, useState } from 'react';
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
  hours: number;
  total?: number;
  paymentMethod?: string;
  description: string;
};
const schema = yup.object().shape({
  title: yup.string().required('Required').min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters'),
  paymentType: yup.string().required('Required'),
  paymentTerm: yup.string(),
  paymentMethod: yup.string(),
  hours: yup
    .number()
    .positive()
    .typeError('Total hours is required')
    .min(1, 'Hours needs to be more than 0')
    .required('Total hours is required'),
  total: yup.number().when(['paymentType'], paymentType => {
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
  const [isLaceConnected, setLaceConnected] = useState<boolean>(false);
  //FIXME(Elaine): there's probably a more elegant way to do this

  //FIXME(Elaine): add this right here
  const [tokens, setTokens] = useState<
    {
      value: string;
      label: string;
      address: string;
    }[]
  >([]);
  const [selected, setSelected] = useState<string>();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      paymentType: 'PAID' as ProjectPaymentType,
      paymentMethod: 'FIAT' as 'STRIPE',
      paymentTerm: 'FIXED',
    },
  });

  useEffect(() => {
    const getTokens = async () => {
      if (isConnected) {
        const selectedNetwork = Dapp.NETWORKS.filter(n => n.chain.chainId === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map(token => {
          return {
            value: token.address,
            label: token.name,
            address: token.address,
          };
        });

        setTokens(mapTokens);
      }
    };

    const getLaceConnected = async () => {
      const lace = window?.cardano?.lace;
      if (lace === undefined) {
        setLaceConnected(false);
        return;
      }
      const isEnabled = await lace.isEnabled();
      setLaceConnected(isEnabled);
      setTokens([
        {
          value: 'ADA (lace)',
          label: 'ADA (lace)',
          address: 'ADA (lace)',
        },
      ]); //FIXME(Elaine): check whatever schema this is supposed to be, remove debug test
    };
    getTokens();
    getLaceConnected();
  }, [isConnected, chainId]); //FIXME(Elaine): Do we need to add anything to the dependencies here?

  const onSelectPaymentType = paymentType => {
    setValue('paymentType', paymentType);
  };
  const onSelectPaymentTerm = paymentTerm => {
    setValue('paymentTerm', paymentTerm);
  };
  const onSelectPaymentMethod = paymentMethod => {
    setValue('paymentMethod', paymentMethod);
  };
  const isCrypto = watch('paymentMethod') === 'CRYPTO';
  const isNonPaid = watch('paymentType') === 'VOLUNTEER';

  const preventArrow = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async ({ paymentMethod, total, description, hours }) => {
    let netTotal = total || 0;

    if (isNonPaid) {
      netTotal = 0;
    }

    if (!isNonPaid && !selected) {
      setError('total', {
        message: 'Offer currency is required',
      });
      return;
    }

    if (!isNonPaid && paymentMethod === ('FIAT' as 'STRIPE') && netTotal < 22) {
      setError('total', {
        message: 'Offer amount on Fiat should have a minimum value of 22',
      });
      return;
    }

    if (isCrypto && selected && ['USD', 'JPY'].includes(selected)) {
      setError('total', {
        message: 'Offer currency is incorrect',
      });
      return;
    }

    if (!isCrypto && selected && !['USD', 'JPY'].includes(selected)) {
      setError('total', {
        message: 'Offer currency is incorrect',
      });
      return;
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
    preventArrow,
  };
};
