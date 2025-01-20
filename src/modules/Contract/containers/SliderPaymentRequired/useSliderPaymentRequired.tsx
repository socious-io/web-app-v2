import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cancelContractAdaptor, Contract, getContractAdaptor } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderPaymentRequired = (contract: Contract) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentDetail, setPaymentDetail] = useState<Contract | null>(null);
  const { name: partnerName } = getIdentityMeta(contract.partner);
  const displayPaymentModal = contract.status === 'SIGNED' && !contract.paymentId;

  const onWithdrawOffer = async () => {
    await cancelContractAdaptor(contract.id);
    dispatch(
      updateStatus({
        id: contract.id,
        status: 'PROVIDER_CANCELED',
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.paymentId,
      }),
    );
  };

  const handleOpenPaymentModal = async () => {
    const { error, data } = await getContractAdaptor(contract.id);
    if (error) return;
    if (data) {
      setPaymentDetail(data);
      setOpenPaymentModal(true);
    }
  };

  const handleClosePaymentModal = () => setOpenPaymentModal(false);

  const onSucceedPayment = (contract: Contract) => {
    dispatch(
      updateStatus({
        id: contract.id,
        status: 'SIGNED',
        isCurrentProvider: identityType === contract.providerId,
        type: contract.type,
        paymentId: contract.payment,
      }),
    );
  };

  return {
    data: {
      partnerName,
      displayPaymentModal,
      openPaymentModal,
      paymentDetail,
    },
    operations: {
      onWithdrawOffer,
      handleOpenPaymentModal,
      handleClosePaymentModal,
      onSucceedPayment,
    },
  };
};
