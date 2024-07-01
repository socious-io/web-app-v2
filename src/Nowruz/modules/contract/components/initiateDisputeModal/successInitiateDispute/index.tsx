import React from 'react';
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
  const headerJSX = (
    <div className="flex flex-col md:flex-row gap-2">
      <FeaturedIconOutlined iconName="check-circle" theme="success" size="md" />
      <div className="flex flex-col text-sm font-semibold text-Gray-light-mode-900 md:pr-12 md:pl-0.5">
        Dispute submitted successfully
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
          Thank you for submitting your dispute (Dispute ID #{disputeId})
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={headerJSX}
      customStyle="max-w-[400px]"
      mobileCentered
      headerDivider={false}
      contentClassName="px-6 pb-6 md:px-12"
    >
      <div className="text-sm flex flex-col gap-4 leading-5 md:px-6 text-Gray-light-mode-700">
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
