import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Contract, CurrentIdentity, Offer, cancelOffer, getOffer } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderPaymentRequired = (contract: Contract) => {
  const dispatch = useDispatch();
  const [paymentOffer, setPaymentOffer] = useState<Offer>();
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;

  const { name } = getIdentityMeta(identityType === 'users' ? contract.offerer : contract.recipient);

  const withdrawOfferByOP = async () => {
    try {
      dispatch(
        updateStatus({
          type: identityType,
          paymentType: contract.project.payment_type,
          id: contract.id,
          offerStatus: 'CANCELED',
        }),
      );
      cancelOffer(contract.id);
    } catch (e) {
      console.log('error in withdrawing offer by organization', e);
    }
  };

  const handleOpenPaymentModal = async () => {
    try {
      const res = await getOffer(contract.id);
      setPaymentOffer(res);
    } catch (e) {
      console.log('error in openning payment modal', e);
    }
    setOpenPaymentModal(true);
  };

  const handleClosePaymentModal = (paymentSuccess: boolean) => {
    try {
      if (paymentSuccess) {
        dispatch(
          updateStatus({
            type: identityType,
            paymentType: contract.project.payment_type,
            id: contract.id,
            offerStatus: 'HIRED',
            missionStatus: 'ACTIVE',
          }),
        );
      }
    } catch (e) {
      console.log('error in closing payment modal', e);
    }

    setOpenPaymentModal(false);
  };

  return {
    withdrawOfferByOP,
    handleOpenPaymentModal,
    paymentOffer,
    handleClosePaymentModal,
    openPaymentModal,
    name,
    displayPaymentModal: openPaymentModal && identityType === 'organizations' && contract.status === 'APPROVED',
  };
};
