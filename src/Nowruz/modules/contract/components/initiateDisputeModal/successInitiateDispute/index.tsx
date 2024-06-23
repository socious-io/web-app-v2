import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { SuccessInitiateDisputeProps } from './index.types';

const SuccessInitiateDispute: React.FC<SuccessInitiateDisputeProps> = ({
  open,
  handleClose,
  disputeId,
  respondentName,
  respondDate,
}) => {
  const isMobile = isTouchDevice();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIconOutlined iconName="check-circle" theme="success" size="md" />}
      title="Dispute submitted successfully"
      subTitle={`Thank you for submitting your dispute (Dispute ID #${disputeId})`}
      inlineTitle={!isMobile}
      customStyle="max-w-[400px]"
      mobileCentered
      headerDivider={false}
      contentClassName="px-6 pb-6 md:px-12"
    >
      <div className="text-sm flex flex-col gap-4 leading-5 md:px-7 text-Gray-light-mode-700">
        <p>
          <span className="font-semibold text-Brand-700">{respondentName} </span>
          has been notified of your dispute and has until {respondDate} to respond. You will receive a notification once
          they has provided their response or if any further action is required from you.
        </p>
        <p>In the meantime, you can track the progress of your dispute in this section of your contracts.</p>
      </div>
    </Modal>
  );
};

export default SuccessInitiateDispute;
