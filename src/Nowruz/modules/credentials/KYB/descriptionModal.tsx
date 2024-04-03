import React from 'react';

import { FeaturedIcon } from '../../general/components/featuredIcon-new';
import { Button } from '../../general/components/Button';
import { CustomStepper } from './customStepper';
import { Modal } from '../../general/components/modal';

interface DescriptionModalProps {
  open: boolean;
  handleClose: () => void;
  handleContinue: () => void;
}
export const DescriptionModal: React.FC<DescriptionModalProps> = ({ open, handleClose, handleContinue }) => {
  const footerJSX = (
    <div className="w-full px-4 pb-4 pt-6 md:p-6 flex flex-col gap-3">
      <Button variant="contained" color="primary" fullWidth onClick={handleContinue}>
        Continue
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="light-circle" theme="primary" size="lg" iconName="check-verified-03" />}
      title="Verify your organization"
      subTitle="Get your organization verified to issue credentials."
      footer={footerJSX}
      mobileFullHeight={false}
      mobileCentered={true}
      footerDivider={false}
      customStyle="!w-[432px]"
      id="org_verify_first"
    >
      <div className="px-4 py-5 md:px-6">
        <CustomStepper
          title="Send your organization details"
          subtitle="Send a company registration document such as a company certificate/equivalent along with your organization name"
          iconName="mail-01"
          displayDivider
        />
        <CustomStepper
          title="Wait for processing"
          subtitle="Our verification team will take 1-3 days to process your verification request."
          iconName="hourglass-03"
          displayDivider
        />
        <CustomStepper
          title="Verification complete"
          subtitle="An email and notification will be sent to you upon successful verification and you will then be able to issue credentials."
          iconName="stars-02"
          displayDivider={false}
        />
      </div>
    </Modal>
  );
};
