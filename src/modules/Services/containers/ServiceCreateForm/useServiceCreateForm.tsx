import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PAYMENT_CURRENCIES } from 'src/constants/PAYMENT_CURRENCY';
import { translatePaymentMode } from 'src/constants/PROJECT_PAYMENT_MODE';
import { translateServiceLength } from 'src/constants/SERVICE_LENGTH';
import { minByToken } from 'src/constants/TOKEN_LIMIT';
import {
  createOrUpdateServiceAdaptor,
  OptionType,
  Service,
  skillsToCategory,
  updateWalletAdaptor,
} from 'src/core/adaptors';
import { CurrentIdentity, uploadMedia, PaymentMode } from 'src/core/api';
import { useTokens } from 'src/core/hooks/useTokens';
import { getIdentityMeta, translate } from 'src/core/utils';
import dapp from 'src/dapp';
import { Files } from 'src/modules/general/components/FileUploader/index.types';
import { RootState } from 'src/store';
import * as yup from 'yup';

import { ServiceForm } from './index.types';

const getSchema = tokens => {
  return yup.object().shape({
    name: yup.string().required(translate('service-form.error-message')),
    category: yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required(translate('service-form.error-message')),
    }),
    description: yup.string().required(translate('service-form.error-message')),
    delivery: yup.object().shape({
      label: yup.string().required(),
      value: yup.string().required(translate('service-form.error-message')),
    }),
    hours: yup
      .string()
      .matches(/^[0-9]*\.?[0-9]+$/, translate('service-form.error-positive-message'))
      .required(translate('service-form.error-message')),
    payment: yup.string().default('FIAT').required(translate('service-form.error-message')),
    price: yup
      .string()
      .required(translate('service-form.error-message'))
      .when(['payment', 'currency'], ([payment, currency], schema) => {
        let minValue;
        if (payment === 'FIAT') {
          minValue = 22;
        } else if (payment === 'CRYPTO' && currency) {
          const tokenLabel = tokens.find(t => t.value === currency)?.label;
          minValue = minByToken[tokenLabel];
        }
        return schema
          .test('is-positive', translate('service-form.error-positive-message'), value =>
            value ? parseFloat(value) > 0 : false,
          )
          .test(
            'min-price',
            minValue !== undefined ? translate('service-form.error-min-price', { minValue }) : '',
            value => {
              if (!value || minValue === undefined) return true;
              return parseFloat(value) >= minValue;
            },
          );
      }),
    currency: yup
      .string()
      .required(translate('service-form.error-message'))
      .when(['payment'], ([payment], schema) => {
        if (payment === 'FIAT') {
          return schema.required(translate('service-form.error-message')).oneOf(
            PAYMENT_CURRENCIES.map(c => c.value),
            'Invalid FIAT currency',
          );
        }
        if (payment === 'CRYPTO') {
          return schema.required(translate('service-form.error-message')).oneOf(
            tokens.map(t => t.value),
            'Invalid CRYPTO token',
          );
        }
        return schema;
      }),
    skills: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string().required(),
          value: yup.string().required(translate('service-form.error-message')),
        }),
      )
      .required(translate('service-form.error-message')),
  });
};

export const useServiceCreateForm = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id: serviceId = '' } = useParams<{ id: string }>();
  const {
    jobCategories: categories = [],
    skillCategories: skills = [],
    serviceDetail: service,
    hasStripeAccounts,
  } = useLoaderData() as {
    jobCategories: OptionType[];
    skillCategories: OptionType[];
    serviceDetail: Service;
    hasStripeAccounts: boolean;
  };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { usernameVal } = getIdentityMeta(currentIdentity);
  const walletAddress = currentIdentity?.meta.wallet_address;
  const { connected, account, network, networkName, testnet } = dapp.useWeb3();
  const tokens = useTokens(connected, network);
  const [openModal, setOpenModal] = useState<{ name: 'publish' | 'cancel' | 'stripe' | ''; open: boolean }>({
    name: '',
    open: false,
  });
  const [attachments, setAttachments] = useState<Files[]>(service?.samples || []);
  const [errorMessage, setErrorMessage] = useState('');
  const attachmentIds = attachments.map(attachment => attachment.id) || [];
  const serviceLength = translateServiceLength;
  const paymentModes = translatePaymentMode;
  const paymentCurrencies = PAYMENT_CURRENCIES;
  const isEdit = !!pathname.includes('services/edit');
  const isDuplicate = !!pathname.includes('services/duplicate');
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    setValue,
    reset,
  } = useForm<ServiceForm>({
    mode: 'all',
    resolver: yupResolver(getSchema(tokens)),
  });
  const selectedCategory = getValues('category');
  const selectedDelivery = getValues('delivery');
  const selectedPaymentMethod = watch('payment') || paymentModes[0].value;
  const selectedCurrency = getValues('currency') || paymentCurrencies[0].value;
  const selectedSkills = getValues('skills') || [];
  const disabledButton = selectedPaymentMethod === 'CRYPTO' && !connected;

  useEffect(() => {
    if (
      currentIdentity?.type === 'users' &&
      connected &&
      account &&
      (!walletAddress || String(walletAddress) !== account)
    ) {
      updateWalletAdaptor({ account, networkName, testnet });
    }
  }, [connected, account]);

  const initCurrencyValue = (service: Service) => {
    if (!service) {
      return selectedPaymentMethod === 'FIAT' ? paymentCurrencies[0].value : tokens[0]?.value || '';
    }

    const { payment, currency } = service;
    const isCryptoPayment = payment === 'CRYPTO';
    const isFiatPayment = payment === 'FIAT';

    if (isCryptoPayment && selectedPaymentMethod === 'FIAT') {
      return paymentCurrencies[0].value;
    }
    if (isFiatPayment && selectedPaymentMethod === 'CRYPTO' && tokens.length) {
      return tokens[0]?.value || '';
    }
    if (isCryptoPayment && tokens.length) {
      return tokens.find(token => token.value === currency.address)?.value || '';
    }
    if (isFiatPayment) {
      return paymentCurrencies.find(curr => curr.value === currency.name)?.value || '';
    }

    return '';
  };

  const initializeValues = useCallback(
    (service: Service) => {
      const defaultDelivery = serviceLength.find(length => length.value === service?.delivery)?.value || '';
      const initialVal = {
        name: service?.name || '',
        category: categories?.find(category => category.value === service?.category),
        description: service?.description || '',
        delivery: defaultDelivery
          ? {
              label: translate(`service-form.delivery-options.${defaultDelivery}`),
              value: defaultDelivery,
            }
          : undefined,
        hours: service?.hours || '',
        payment: service?.payment || paymentModes[0].value,
        price: service?.price || '',
        currency: undefined,
        skills: service?.skills ? skillsToCategory(service.skills) : undefined,
      };
      setAttachments(service?.samples || []);
      reset(initialVal);
    },
    [reset],
  );

  useEffect(() => {
    initializeValues(service);
  }, [initializeValues, service]);

  useEffect(() => {
    setValue('currency', initCurrencyValue(service));
  }, [service, tokens.length, selectedPaymentMethod]);

  const handleCloseModal = () => setOpenModal({ name: '', open: false });

  const onCancelClick = () => setOpenModal({ name: 'cancel', open: true });

  const onBack = () => navigate(`/profile/users/${usernameVal}/view#services`);

  const onSelectSearchDropdown = (name: 'category' | 'delivery', option: OptionType) => {
    setValue(name, option, { shouldValidate: true });
  };

  const onSelectValue = (name: 'payment' | 'currency', value: string) => {
    setValue(name, value, { shouldValidate: true });
  };

  const onSelectSkills = (skills: OptionType[]) => setValue('skills', skills, { shouldValidate: true });

  const onDropFiles = async (newFiles: File[]) => {
    try {
      const uploadedFiles = await Promise.all(
        newFiles.map(async file => {
          const res = await uploadMedia(file);
          return { id: res.id, url: URL.createObjectURL(file) };
        }),
      );
      setAttachments(prev => [...prev, ...uploadedFiles]);
    } catch {
      setErrorMessage('Some files failed to upload. Please try again.');
    }
  };

  const onDeleteFiles = (deletedId: string) => {
    const filteredFiles = attachments.filter(attachment => attachment.id !== deletedId);
    setAttachments(filteredFiles);
  };

  const onSubmit = async (formData: ServiceForm) => {
    const payload = {
      ...formData,
      category: formData.category.value,
      delivery: formData.delivery.value,
      payment: formData.payment as PaymentMode,
      skills: formData.skills.map(skill => skill.value) || [],
      samples: (attachmentIds as string[]) || [],
    };
    if (formData.payment === 'FIAT' && !hasStripeAccounts) {
      setOpenModal({ name: 'stripe', open: true });
    } else {
      const { error, data } = await createOrUpdateServiceAdaptor(payload, serviceId, isDuplicate);
      if (error) return;
      else if (data) setOpenModal({ name: 'publish', open: true });
    }
  };

  return {
    data: {
      openModal,
      isEdit,
      categories,
      serviceLength,
      paymentModes,
      paymentCurrencies,
      tokens,
      skills,
      register,
      errors,
      selectedCategory,
      selectedDelivery,
      selectedPaymentMethod,
      selectedCurrency,
      selectedSkills,
      attachments,
      errorMessage,
      disabledButton,
    },
    operations: {
      handleCloseModal,
      onCancelClick,
      onBack,
      handleSubmit,
      onSubmit,
      onSelectSearchDropdown,
      onSelectValue,
      onSelectSkills,
      onDropFiles,
      onDeleteFiles,
    },
  };
};
