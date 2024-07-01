import React from 'react';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { SuccessRespondDisputeProps } from './index.types';

const SuccessRespondDispute: React.FC<SuccessRespondDisputeProps> = ({
  open,
  handleClose,
  disputeId,
  claimantName,
}) => {
  const headerJSX = (
    <div className="flex flex-col md:flex-row gap-2">
      <FeaturedIconOutlined iconName="check-circle" theme="success" size="md" />
      <div className="flex flex-col text-sm font-semibold text-Gray-light-mode-900 md:pr-12 md:pl-0.5">
        Response submitted successfully
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
          Thank you for submitting your response to the dispute (Dispute ID #{disputeId}). Your response has been
          successfully recorded and will be reviewed by the assigned jurors.
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
      <div className="text-sm leading-5 md:px-6 text-Gray-light-mode-700">
        <span className="font-semibold text-Brand-700">{claimantName} </span>
        will be notified of your response and will have the opportunity to review the information you provided.
      </div>
    </Modal>
  );
};

export default SuccessRespondDispute;
