import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Service } from 'src/core/adaptors';
import { Card, CurrentIdentity, updateWallet, uploadMedia } from 'src/core/api';
import { formatDate } from 'src/core/time';
import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import { Files } from 'src/modules/general/components/FileUploader/index.types';
import { OrderStatus } from 'src/modules/Services/components/ServiceOrderDetail/index.types';
import { RootState } from 'src/store';
import * as yup from 'yup';

const schema = yup.object().shape({
  description: yup.string().required(translate('service-form.error-message')),
});

export const useServicePaymentFlow = () => {
  const { isConnected, open: openConnect, account } = Dapp.useWeb3();
  const { serviceDetail: service, cards } = useLoaderData() as { serviceDetail: Service; cards: Card[] };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [step, setStep] = useState(1);
  const [cardsList, setCardsList] = useState(cards);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [attachments, setAttachments] = useState<Files[]>([]);
  const cardsOptionList = cardsList.map(card => {
    const iconPath = `/icons/pay-icons/${card.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      value: card.id,
      title: `${card.meta.brand} ending in ${card.meta.last4}`,
      description: `Expiry ${card.meta.exp_month}/${card.meta.exp_year}`,
      img: <img src={iconPath} alt="" />,
    };
  });
  const walletAddress = currentIdentity?.meta.wallet_address;
  const feePercentage = 2;
  const feeCalculation = parseFloat(service.price) * (feePercentage / 100);
  const orderPayment = { feePercentage, fee: feeCalculation, total: feeCalculation + parseFloat(service.price) };
  const paymentIsFiat = service.payment === 'FIAT';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isValidSendStep },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const isValidPayStep = paymentIsFiat ? !selectedCardId : !isConnected;

  useEffect(() => {
    if (isConnected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWallet({ wallet_address: account });
    }
  }, [isConnected, account]);

  const onPay = async () => {
    //TODO: payment API call and result for order status
    setOrderStatus({ status: 'PENDING', orderId: 'SO2023124434353', date: formatDate(new Date()) });
    setStep(prev => prev + 1);
  };

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const res = await uploadMedia(file);
      setAttachments([...attachments, { id: res.id, name: res.filename }]);
    });
  };

  const onDeleteFiles = (deletedId: string) => {
    const filteredFiles = attachments.filter(attachment => attachment.id !== deletedId);
    setAttachments(filteredFiles);
  };

  const onSubmit = formData => {
    console.log('send', formData, attachments);
  };

  return {
    data: {
      service,
      orderPayment,
      step,
      paymentIsFiat,
      cardsOptionList,
      selectedCardId,
      openAddCardModal,
      isConnected,
      orderStatus,
      register,
      errors,
      attachments,
      isValidPayStep,
      isValidSendStep,
    },
    operations: {
      onPay,
      setCardsList,
      setSelectedCardId,
      setOpenAddCardModal,
      openConnect,
      onDropFiles,
      onDeleteFiles,
      handleSubmit,
      onSubmit,
    },
  };
};
