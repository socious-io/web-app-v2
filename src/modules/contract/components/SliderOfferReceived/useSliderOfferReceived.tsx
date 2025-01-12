import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract } from 'src/core/adaptors';
import { CurrentIdentity, StripeAccount, acceptOffer, rejectOffer, stripeProfile } from 'src/core/api';
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

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    if (contract.type === 'VOLUNTEER') {
      setDisableAcceptBtn(false);
      return;
    }

    if (contract.payment === 'FIAT') {
      await initializeOfferFiat();
    } else if (contract.payment === 'CRYPTO') {
      setDisableAcceptBtn(false);
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
    if (!contract?.offerId) return;
    try {
      dispatch(
        updateStatus({
          id: contract.id,
          status: 'CLIENT_CANCELED',
          isCurrentProvider: identityType === contract.providerId,
          type: contract.type,
          paymentId: contract.paymentId,
        }),
      );
      await rejectOffer(contract.offerId);
    } catch (e) {
      console.log('Error in declining received offer', e);
    }
  };

  const onAcceptOffer = async () => {
    if (!contract?.offerId) return;
    try {
      dispatch(
        updateStatus({
          id: contract.id,
          status: 'SIGNED',
          isCurrentProvider: identityType === contract.providerId,
          type: contract.type,
          paymentId: contract.paymentId,
        }),
      );
      await acceptOffer(contract.offerId);
    } catch (error) {
      console.log('Error in accepting received offer', error);
    }
    handleCloseModal();
  };

  const handleAcceptClick = () => {
    if (contract.type === 'VOLUNTEER') {
      onAcceptOffer();
    } else {
      setOpenModal({ name: contract.payment === 'FIAT' ? 'select-card' : 'wallet', open: true });
    }
  };

  return {
    data: {
      disableAcceptBtn,
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
