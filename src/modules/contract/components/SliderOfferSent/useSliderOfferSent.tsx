import { useDispatch, useSelector } from 'react-redux';
import { Contract } from 'src/core/adaptors';
import { cancelOffer, CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

export const useSliderOfferSent = (contract: Contract) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;

  const onWithdrawOffer = async () => {
    if (!contract?.offerId) return;
    try {
      dispatch(
        updateStatus({
          id: contract.id,
          status: 'PROVIDER_CANCELED',
          isCurrentProvider: identityType === contract.providerId,
          type: contract.type,
          paymentId: contract.paymentId,
        }),
      );
      await cancelOffer(contract.offerId);
    } catch (e) {
      console.log('Error in withdrawing offer by provider', e);
    }
  };

  return { operations: { onWithdrawOffer } };
};
