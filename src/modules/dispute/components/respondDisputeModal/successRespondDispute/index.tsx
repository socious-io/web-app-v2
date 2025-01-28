import { Slide, SlideProps } from '@mui/material';
import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { FeaturedIconOutlined } from 'src/modules/general/components/featuredIconOutlined';
import CustomSnackbar from 'src/modules/general/components/Snackbar';

import { SuccessRespondDisputeProps } from './index.types';

const SuccessRespondDispute: React.FC<SuccessRespondDisputeProps> = ({
  open,
  handleClose,
  disputeId,
  claimantName,
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
            Response submitted successfully
            <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
              Thank you for submitting your response to the dispute (Dispute ID #{disputeId}). Your response has been
              successfully recorded and will be reviewed by the assigned jurors.
            </span>
          </div>
        </div>
        <div className="text-sm leading-5 text-Gray-light-mode-700">
          <span className="font-semibold text-Brand-700">{claimantName} </span>
          will be notified of your response and will have the opportunity to review the information you provided.
        </div>
      </div>
    </CustomSnackbar>
  );
};

export default SuccessRespondDispute;
