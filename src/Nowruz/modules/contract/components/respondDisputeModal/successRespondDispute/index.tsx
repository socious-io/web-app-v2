import React from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { SuccessRespondDisputeProps } from './index.types';

const SuccessRespondDispute: React.FC<SuccessRespondDisputeProps> = ({
  open,
  handleClose,
  disputeId,
  respondentName,
}) => {
  const isMobile = isTouchDevice();
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIconOutlined iconName="check-circle" theme="success" size="md" />}
      title="Response submitted successfully"
      subTitle={`Thank you for submitting your response to the dispute (Dispute ID #${disputeId}). Your response has been successfully recorded and will be reviewed by the assigned jurors.`}
      inlineTitle={!isMobile}
      customStyle="max-w-[400px]"
      mobileCentered
      headerDivider={false}
      contentClassName="px-6 pb-6 md:px-12"
    >
      <div className="text-sm leading-5 md:px-7 text-Gray-light-mode-700">
        <span className="font-semibold text-Brand-700">{respondentName} </span>
        will be notified of your response and will have the opportunity to review the information you provided.
      </div>
    </Modal>
  );
};

export default SuccessRespondDispute;
