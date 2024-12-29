import { useDispatch, useSelector } from 'react-redux';
import { CurrentIdentity, cancelOffer } from 'src/core/api';
import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';
import { RootState } from 'src/store';
import { updateStatus } from 'src/store/reducers/contracts.reducer';

import { SliderSentOfferProps } from './index.types';

const SliderOfferSent: React.FC<SliderSentOfferProps> = ({ contract, disableMessage, redirectToChat }) => {
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const identityType = identity?.type;
  const isServiceContract = contract?.kind === 'SERVICE';

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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {!disableMessage && (
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
        )}
        {!isServiceContract && (
          <Button variant="outlined" color="secondary" fullWidth onClick={withdrawOfferByOP}>
            {translate('cont-withdraw')}
          </Button>
        )}
      </div>
      <AlertMessage
        theme={isServiceContract ? 'warning' : 'gray'}
        iconName="check-circle"
        title={
          isServiceContract ? translate('cont-pending-alert', { seller: 'sanaz' }) : translate('cont-offer-sent-alert')
        }
        containerClassName="!items-center"
      />
    </div>
  );
};

export default SliderOfferSent;
