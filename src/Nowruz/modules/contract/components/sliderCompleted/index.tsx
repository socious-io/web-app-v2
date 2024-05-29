import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Contract, CurrentIdentity } from 'src/core/api';
import { isoToStandard } from 'src/core/time';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { RootState } from 'src/store';

import { ReviewModal } from '../reviewModal';

interface SliderCompletedProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}

export const SliderCompleted: React.FC<SliderCompletedProps> = ({ contract, disableMessage, redirectToChat }) => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const identityType = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  )?.type;
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          {!disableMessage && (
            <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
              Message
            </Button>
          )}
          {identityType === 'organizations' && !contract.org_feedback && (
            <Button variant="outlined" color="secondary" fullWidth onClick={() => setOpenReviewModal(true)}>
              Review
            </Button>
          )}
        </div>
        {identityType === 'organizations' && (
          <AlertMessage
            theme="primary"
            iconName="info-circle"
            title="Job completed"
            subtitle={`Completed on ${isoToStandard(contract.mission!.updated_at.toString())}`}
          />
        )}
      </div>
      {openReviewModal && <ReviewModal open={openReviewModal} closeReviewModal={() => setOpenReviewModal(false)} />}
    </>
  );
};
