import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';

import { SliderOfferSentProps } from './index.types';
import { useSliderOfferSent } from './useSliderOfferSent';

const SliderOfferSent: React.FC<SliderOfferSentProps> = ({ contract, disableMessage, redirectToChat }) => {
  const {
    operations: { onWithdrawOffer },
  } = useSliderOfferSent(contract);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {!disableMessage && (
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
        )}
        <Button variant="outlined" color="secondary" fullWidth onClick={onWithdrawOffer}>
          {translate('cont-withdraw')}
        </Button>
      </div>
      <AlertMessage
        theme="gray"
        iconName="check-circle"
        title={translate('cont-offer-sent-alert')}
        containerClassName="!items-center"
      />
    </div>
  );
};

export default SliderOfferSent;
