import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {
  Contract,
  createContractAdaptor,
  depositContractAdaptor,
  Service,
  submitRequirementsAdaptor,
  updateWalletAdaptor,
} from 'src/core/adaptors';
import { Card, CurrentIdentity, OrgMeta, ProjectPaymentType, removeCard, uploadMedia } from 'src/core/api';
import { translate } from 'src/core/utils';
import dapp from 'src/dapp';
import { Files } from 'src/modules/general/components/FileUploader/index.types';
import { OrderStatus } from 'src/modules/Services/components/ServiceOrderDetail/index.types';
import { RootState } from 'src/store';
import * as yup from 'yup';

const schema = yup.object().shape({
  description: yup.string().required(translate('service-form.error-message')),
});

export const useServicePaymentFlow = () => {
  const navigate = useNavigate();
  const { connected, account, network, networkName, testnet, signer } = dapp.useWeb3();
  const { serviceDetail: service, cards } = useLoaderData() as { serviceDetail: Service; cards: Card[] };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [step, setStep] = useState(1);
  const [cardsList, setCardsList] = useState(cards || []);
  const [selectedCardId, setSelectedCardId] = useState(cardsList.length ? cards[0]?.id : '');
  const [openAddCardModal, setOpenAddCardModal] = useState(false);
  const [contractId, setContractId] = useState('');
  const [contractLoading, setContractLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [attachments, setAttachments] = useState<Files[]>([]);
  const walletAddress = currentIdentity?.meta.wallet_address;
  const feePercentage = (currentIdentity?.meta as OrgMeta).verified ? 2 : 3;
  const feeCalculation = parseFloat(service.price) * (feePercentage / 100);
  const orderPayment = { feePercentage, fee: feeCalculation, total: feeCalculation + parseFloat(service.price) };
  const paymentIsFiat = service.payment === 'FIAT';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isValidSendStep },
  } = useForm<{ description: string }>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const isValidPayStep = paymentIsFiat ? !selectedCardId : !connected;

  useEffect(() => {
    if (!paymentIsFiat && connected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWalletAdaptor({ account, networkName, testnet });
    }
  }, [paymentIsFiat, connected, account]);

  const onRemoveCard = async (cardId: string) => {
    const filteredCard = cardsList.filter(card => card.id !== cardId);
    try {
      await removeCard(cardId);
      setCardsList(filteredCard);
      setSelectedCardId(filteredCard.length ? filteredCard[0].id : '');
    } catch (e) {
      console.log(`Error in removing card ${cardId}`, e);
    }
  };

  const createContractBeforeDeposit = async (service: Service) => {
    const { name, description, price, currency, payment, id: projectId } = service;
    const contractPayload = {
      name,
      description,
      type: 'PAID' as ProjectPaymentType,
      price: parseFloat(price),
      currency: paymentIsFiat ? currency.name : currency?.address || '',
      payment,
      projectId,
      clientId: service.identity?.id || '',
    };
    const { error: contractError, data: contract } = await createContractAdaptor(contractPayload);
    if (contractError) {
      throw new Error(translate('cont-create-error'));
    }
    if (contract) {
      setContractId(contract.id);
      return contract;
    }
  };

  const handleCryptoPayment = async (contract: Contract) => {
    try {
      const contributor = contract.client?.meta.wallet_address;
      if (!connected) {
        setErrorMessage(translate('cont-wallet-not-connected'));
        return;
      }

      if (!contributor) {
        setErrorMessage(translate('cont-contributor-wallet-not-connected'));
        return;
      }

      const result = await dapp.escrow({
        signer,
        network,
        totalAmount: contract.amounts?.total || 0,
        escrowAmount: contract.amounts?.amount || 0,
        contributor,
        token: contract.currency.address,
        projectId: contract?.projectId || '',
        verifiedOrg: (contract.provider?.meta as OrgMeta).verified_impact || false,
        applyOrgFeeDiscount: contract.amounts?.org_fee_discount || false,
        addressReferringOrg: contract.amounts?.org_referrer_wallet,
        applyContFeeDiscount: contract.amounts?.user_fee_discount || false,
        addressReferringCont: contract.amounts?.user_referrer_wallet,
      });
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(translate('cont-crypto-escrow-error'));
    }
  };

  const onPay = async () => {
    setErrorMessage('');
    try {
      setContractLoading(true);
      const contract = await createContractBeforeDeposit(service);
      if (!contract) return;

      let identifier = '';
      let result:
        | { id: string; txHash: string; token?: string; amount?: number; fee?: number; contributor?: string }
        | undefined = undefined;

      if (paymentIsFiat) {
        identifier = selectedCardId;
        result = undefined;
      } else {
        result = await handleCryptoPayment(contract);
        identifier = result?.txHash || '';
      }

      if (!result) return;
      const { error: depositError, data: depositData } = await depositContractAdaptor(
        contract.id,
        identifier,
        service.payment,
        {
          amount: result.amount,
          contributor: result.contributor,
          fee: result.fee,
          escrowId: result.id,
          token: result?.token || '',
          txHash: result.txHash,
        },
      );
      if (depositError) {
        throw new Error(translate('cont-deposit-error'));
      }

      if (depositData) {
        const { semanticStatus = 'Canceled', orderId = '', date } = depositData || {};
        setOrderStatus({ status: semanticStatus, orderId, date });
        setStep(prev => prev + 1);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage(error.message);
    }
    setContractLoading(false);
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

  const onSubmit = async (formData: { description: string }) => {
    const payload = {
      description: formData.description,
      files: attachments.map(attachment => attachment.id),
    };
    const { error } = await submitRequirementsAdaptor(contractId, payload);
    if (error) return;
    navigate('/contracts');
  };

  return {
    data: {
      service,
      contractLoading,
      orderPayment,
      step,
      paymentIsFiat,
      cardsList,
      selectedCardId,
      openAddCardModal,
      errorMessage,
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
      onRemoveCard,
      setOpenAddCardModal,
      onDropFiles,
      onDeleteFiles,
      handleSubmit,
      onSubmit,
    },
  };
};
