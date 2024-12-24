import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom';
import { PAYMENT_CURRENCIES } from 'src/constants/PAYMENT_CURRENCY';
import { translatePaymentMode } from 'src/constants/PROJECT_PAYMENT_MODE';
import { translateServiceLength } from 'src/constants/SERVICE_LENGTH';
import { createOrUpdateServiceAdaptor, OptionType, PaymentMode, Service, skillsToCategory } from 'src/core/adaptors';
import { CurrentIdentity, updateWallet, uploadMedia } from 'src/core/api';
import { useTokens } from 'src/core/hooks/useTokens';
import { getIdentityMeta, translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import { Files } from 'src/modules/general/components/FileUploader/index.types';
import { RootState } from 'src/store';
import * as yup from 'yup';

import { ServiceForm } from './index.types';

const schema = yup.object().shape({
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
  hours: yup.string().required(translate('service-form.error-message')),
  payment: yup.string().default('FIAT').required(translate('service-form.error-message')),
  price: yup.string().required(translate('service-form.error-message')),
  currency: yup.string().required(translate('service-form.error-message')),
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
  const { isConnected, open: openConnect, chainId, account } = Dapp.useWeb3();
  const tokens = useTokens(isConnected, chainId);
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
  const isEdit = !!pathname.includes('services/edit') ?? false;
  const isDuplicate = !!pathname.includes('services/duplicate') ?? false;
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
    resolver: yupResolver(schema),
  });
  const selectedCategory = getValues('category');
  const selectedDelivery = getValues('delivery');
  const selectedPaymentMethod = watch('payment') || paymentModes[0].value;
  const selectedCurrency = getValues('currency') || paymentCurrencies[0].value;
  const selectedSkills = getValues('skills') || [];
  const disabledButton = selectedPaymentMethod === 'CRYPTO' && !isConnected;

  useEffect(() => {
    if (
      currentIdentity?.type === 'users' &&
      isConnected &&
      account &&
      (!walletAddress || String(walletAddress) !== account)
    ) {
      updateWallet({ wallet_address: account });
    }
  }, [isConnected, account]);

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
  }, [service, tokens, selectedPaymentMethod]);

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
    const { error } = await createOrUpdateServiceAdaptor(payload, serviceId, isDuplicate);
    if (error) return;
    else {
      if (formData.payment === 'FIAT' && !hasStripeAccounts) {
        setOpenModal({ name: 'stripe', open: true });
      } else {
        setOpenModal({ name: 'publish', open: true });
      }
    }
  };

  return {
    data: {
      openModal,
      isEdit,
      isConnected,
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
      openConnect,
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
