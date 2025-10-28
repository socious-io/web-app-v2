import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PAYMENT_CURRENCIES } from 'src/constants/PAYMENT_CURRENCY';
import { minByToken } from 'src/constants/TOKEN_LIMIT';
import { Applicant, ProjectPaymentType, offerByApplicant } from 'src/core/api';
import { useTokens } from 'src/core/hooks/useTokens';
import { removeValuesFromObject } from 'src/core/utils';
import dapp from 'src/dapp';
import * as yup from 'yup';

import { Form } from './OrgOfferModal.types';

const getSchema = tokens => {
  return yup.object().shape({
    title: yup.string().required('Required').min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters'),
    paymentType: yup.string().required('Required'),
    paymentTerm: yup.string(),
    paymentMethod: yup.string(),
    hours: yup
      .number()
      .typeError('Total hours is required')
      .positive('Must be positive')
      .min(1, 'Hours must be more than 1')
      .required('Total hours is required'),
    total: yup
      .number()
      .when(['paymentType', 'paymentMethod', 'currency'], ([paymentType, paymentMethod, currency], schema) => {
        if (paymentType === 'VOLUNTEER') {
          return yup.number().nullable().notRequired();
        }
        let minValue;
        if (paymentMethod === 'FIAT') {
          minValue = 22;
        } else if (paymentMethod === 'CRYPTO' && currency) {
          const tokenLabel = tokens.find(token => token.value === currency)?.label;
          minValue = minByToken[tokenLabel];
        }
        return schema
          .typeError('Offer amount is required')
          .required('Offer amount is required')
          .test('is-positive', 'Offer amount should be positive', value => typeof value === 'number' && value > 0)
          .min(minValue || 0, minValue !== undefined ? `Offer amount must be at least ${minValue}.` : '');
      }),
    currency: yup.string().when(['paymentType', 'paymentMethod'], ([paymentType, paymentMethod], schema) => {
      if (paymentType === 'VOLUNTEER') {
        return schema.nullable().notRequired();
      }
      if (paymentMethod === 'FIAT') {
        return schema.required('Currency is required').oneOf(
          PAYMENT_CURRENCIES.map(c => c.value),
          'Invalid FIAT currency',
        );
      }
      if (paymentMethod === 'CRYPTO') {
        return schema.required('Token is required').oneOf(
          tokens.map(t => t.value),
          'Invalid CRYPTO token',
        );
      }
      return schema;
    }),
    description: yup.string().required('Description is required'),
  });
};

export const useOrgOffer = (applicant: Applicant, onClose: () => void, onSuccess: () => void) => {
  const { connected, network } = dapp.useWeb3();
  const tokens = useTokens(connected, network);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(getSchema(tokens)),
    defaultValues: {
      paymentType: 'PAID' as ProjectPaymentType,
      paymentMethod: 'FIAT' as 'STRIPE',
      paymentTerm: 'FIXED',
    },
  });
  const paymentMethod = watch('paymentMethod');
  const currency = watch('currency');
  const isNonPaid = watch('paymentType') === 'VOLUNTEER';
  const isCrypto = paymentMethod === 'CRYPTO';
  const isFiat = paymentMethod === 'FIAT';
  const paymentMethodOptions = isCrypto ? tokens : PAYMENT_CURRENCIES;

  const initCurrencyValue = () => {
    if (isCrypto) return tokens[0]?.value;
    else if (isFiat) return PAYMENT_CURRENCIES[0].value;
    return '';
  };

  useEffect(() => {
    setValue('currency', initCurrencyValue());
  }, [tokens.length, paymentMethod]);

  const onSelectValue = (name: 'paymentType' | 'paymentTerm' | 'paymentMethod' | 'currency', value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<Form> = async ({ paymentMethod, total, description, hours }) => {
    let netTotal = total || 0;

    if (isNonPaid) {
      netTotal = 0;
    }

    if (!isNonPaid && !currency) {
      setError('total', {
        message: 'Offer currency is required',
      });
      return;
    }

    if (isCrypto && currency && ['USD', 'JPY'].includes(currency)) {
      setError('total', {
        message: 'Offer currency is incorrect',
      });
      return;
    }

    if (!isCrypto && currency && !['USD', 'JPY'].includes(currency)) {
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
      crypto_currency_address: isCrypto ? currency : undefined,
      currency: isCrypto ? undefined : currency,
    };

    await offerByApplicant(applicant.id, removeValuesFromObject(payload, [undefined]));
    onSuccess();
    onClose();
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    onSelectValue,
    isCrypto,
    isNonPaid,
    paymentMethodOptions,
    currency,
    disabled: !isFiat && !connected,
  };
};
