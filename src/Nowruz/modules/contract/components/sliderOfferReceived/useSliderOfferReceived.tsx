import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, StripeAccount, acceptOffer, rejectOffer, stripeProfile } from 'src/core/api';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderOfferReceived = (contract: Contract) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;

  const [disableAcceptBtn, setDisableAcceptBtn] = useState(true);
  const [stripeAccounts, setStripeAccounts] = useState<StripeAccount[]>([]);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [openModal, setOpenModal] = useState<{ name?: 'selectCard' | 'wallet' | 'addCard'; open: boolean }>();

  const handleAcceptOffer = () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'APPROVED',
        }),
      );
      acceptOffer(contract.id);
    } catch (error) {
      console.log('error in accepting offer', error);
    }
    setOpenModal({ open: false });
  };

  const inititalize = async () => {
    if (contract.project.payment_type === 'VOLUNTEER') {
      setDisableAcceptBtn(false);
      return;
    }
    if (contract.payment_mode === 'FIAT') await initializeOfferFiat();
    else if (contract.payment_mode === 'CRYPTO') setDisableAcceptBtn(false);
  };

  const initializeOfferFiat = async () => {
    await stripeProfile({ is_jp: contract.currency === 'JPY' }).then(r => {
      const { data } = r?.external_accounts || {};
      setDisableAcceptBtn(!data?.length);
      if (data?.length) setStripeAccounts(data);
      else setDisplayAlert(true);
    });
  };

  useEffect(() => {
    inititalize();
  }, []);

  const handleDecline = () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'WITHDRAWN',
        }),
      );
      rejectOffer(contract.id);
    } catch (e) {
      console.log('error in declining offer', e);
    }
  };

  const handleAcceptClick = () => {
    if (contract.payment_mode === 'FIAT') setOpenModal({ name: 'selectCard', open: true });
    else setOpenModal({ name: 'wallet', open: true });
  };

  return {
    handleDecline,
    handleAcceptOffer,
    disableAcceptBtn,
    stripeAccounts,
    displayAlert,
    handleAcceptClick,
    openModal,
    setOpenModal,
  };
};
