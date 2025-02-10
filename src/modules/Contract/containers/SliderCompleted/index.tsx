import { useState } from 'react';
import { isoToStandard } from 'src/core/time';
import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';

import { ContractSliderProps } from '../ContractDetailsSlider/index.types';
import ReviewModal from '../ReviewModal';

const SliderCompleted: React.FC<ContractSliderProps> = ({ contract, disableMessage, redirectToChat }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
          {!contract.feedback && (
            <Button variant="outlined" color="secondary" fullWidth onClick={() => setOpenReviewModal(true)}>
              {translate('cont-review')}
            </Button>
          )}
        </div>
        <AlertMessage
          theme="primary"
          iconName="info-circle"
          title={translate('cont-job-completed')}
          subtitle={translate('cont-job-completed-subtitle', {
            date: isoToStandard(contract?.updated || ''),
          })}
        />
      </div>
      <ReviewModal open={openReviewModal} closeReviewModal={() => setOpenReviewModal(false)} contract={contract} />
    </>
  );
};

export default SliderCompleted;
