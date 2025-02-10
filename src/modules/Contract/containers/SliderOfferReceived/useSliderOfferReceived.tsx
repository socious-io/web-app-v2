import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelContractAdaptor, Contract, signContractAdaptor } from 'src/core/adaptors';
import { CurrentIdentity, StripeAccount, stripeProfile } from 'src/core/api';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderOfferReceived = (contract: Contract) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const [stripeAccounts, setStripeAccounts] = useState<StripeAccount[]>([]);
  const [disableAcceptBtn, setDisableAcceptBtn] = useState(true);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [openModal, setOpenModal] = useState<{ name: 'add-card' | 'select-card' | 'wallet' | ''; open: boolean }>({
    name: '',
    open: false,
  });
  //FIXME: on contract.type === 'PAID' not price
  const displayPaymentAccount = !!contract.price && !contract.paymentId;

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    // if (contract.type === 'VOLUNTEER') {
    //   setDisableAcceptBtn(false);
    //   return;
    // }

    // if (contract.payment === 'FIAT') {
    //   await initializeOfferFiat();
    // } else if (contract.payment === 'CRYPTO') {
    //   setDisableAcceptBtn(false);
    // }

    //FIXME: on contract.type not price
    if (contract.price) {
      if (contract.payment === 'FIAT') {
        await initializeOfferFiat();
      } else {
        setDisableAcceptBtn(false);
      }
    } else {
      setDisableAcceptBtn(false);
      return;
    }
  };

  const initializeOfferFiat = async () => {
    const response = await stripeProfile({ is_jp: contract.currency.name === 'JPY' });
    const accounts = response?.external_accounts?.data || [];
    setDisableAcceptBtn(!accounts.length);
    if (accounts.length) {
      setStripeAccounts(accounts);
    } else {
      setDisplayAlert(true);
    }
  };

  const handleCloseModal = () => setOpenModal({ ...openModal, open: false });

  const onDeclineOffer = async () => {
    await cancelContractAdaptor(contract.id);
    dispatch(
      updateStatus({
        id: contract.id,
        status: 'CLIENT_CANCELED',
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.paymentId,
      }),
    );
  };

  const onAcceptOffer = async () => {
    await signContractAdaptor(contract.id);
    dispatch(
      updateStatus({
        id: contract.id,
        status: 'SIGNED',
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.paymentId,
      }),
    );
    handleCloseModal();
  };

  const handleAcceptClick = () => {
    //FIXME: on contract.type === 'VOLUNTEER' not price
    if (!contract.price || contract.paymentId) {
      onAcceptOffer();
    } else {
      setOpenModal({ name: contract.payment === 'FIAT' ? 'select-card' : 'wallet', open: true });
    }
  };

  return {
    data: {
      disableAcceptBtn,
      displayPaymentAccount,
      stripeAccounts,
      displayAlert,
      openModal,
    },
    operations: {
      setOpenModal,
      handleCloseModal,
      onDeclineOffer,
      onAcceptOffer,
      handleAcceptClick,
    },
  };
};
