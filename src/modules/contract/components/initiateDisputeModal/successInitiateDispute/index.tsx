import { Slide, SlideProps } from '@mui/material';
import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { FeaturedIconOutlined } from 'src/modules/general/components/featuredIconOutlined';
import CustomSnackbar from 'src/modules/general/components/Snackbar';

import { SuccessInitiateDisputeProps } from './index.types';

const SuccessInitiateDispute: React.FC<SuccessInitiateDisputeProps> = ({
  open,
  handleClose,
  disputeId,
  respondentName,
  respondDate,
}) => {
  const isMobile = isTouchDevice();
  const SlideTransition = (props: SlideProps) => <Slide {...props} direction={isMobile ? 'up' : 'left'} />;

  return (
    <CustomSnackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      containerClassName="flex-nowrap !items-start max-w-[400px]"
      contentClassName="md:!items-start"
      icon={<FeaturedIconOutlined iconName="check-circle" size="md" theme="success" />}
      anchorOrigin={isMobile ? { vertical: 'bottom', horizontal: 'center' } : { vertical: 'top', horizontal: 'right' }}
    >
      <div className="flex flex-col gap-4 pb-2 px-2 md:py-2 md:px-0">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col text-sm font-semibold text-Gray-light-mode-900">
            Dispute submitted successfully
            <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
              Thank you for submitting your dispute (Dispute ID #{disputeId})
            </span>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-4 leading-5 text-Gray-light-mode-700">
          <p>
            <span className="font-semibold text-Brand-700">{respondentName} </span>
            has been notified of your dispute and has until {respondDate} to respond. You will receive a notification
            once they has provided their response or if any further action is required from you.
          </p>
          <p>In the meantime, you can track the progress of your dispute in this section of your contracts.</p>
        </div>
      </div>
    </CustomSnackbar>
  );
};

export default SuccessInitiateDispute;
