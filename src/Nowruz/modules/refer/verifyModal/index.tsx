import React from 'react';
import { Modal } from '../../general/components/modal';
import { FeaturedIcon } from '../../general/components/featuredIcon-new';
import { Button } from '../../general/components/Button';

interface VerifyModalProps {
  open: boolean;
  handleClose: () => void;
}

export const VerifyModal: React.FC<VerifyModalProps> = ({ open, handleClose }) => {
  const footerJsx = (
    <div className=" w-full p-6 ">
      <Button variant="contained" color="primary" fullWidth>
        Open Socious Wallet app
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="modern" iconName="check-verified-02" size="lg" theme="gray" />}
      title="Verify your identity"
      subTitle="Verify your identity to access all Socious features"
      footer={footerJsx}
      mobileFullHeight
      customStyle="!w-[512px]"
    >
      <div className="px-4 py-5 md:p-6 flex flex-col gap-5">
        <div className="p-4 flex flex-col gap-1 rounded-xl border border-solid border-Gray-light-mode-300 bg-Gray-light-mode-25">
          <span className="text-sm leading-5 font-semibold text-Gray-light-mode-600">
            Socious uses blockchain technology to make credentials transparent and traceable.
          </span>
          <span className="text-sm leading-5 font-normal text-Gray-light-mode-600">
            We’ve partnered with Atala Prism through which your decentralized ID can receive verifiable credentials.
          </span>
        </div>
        <span className="text-base leading-6 font-semibold text-Gray-light-mode-900">How to verify you identity</span>
        <div className="flex flex-col">
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">
            1. Go through the app’s onboarding process which will create a decentralized ID on Atala Prism.
          </span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">
            2. Verify your identity with Veriff, our KYC partner.
          </span>
        </div>
      </div>
    </Modal>
  );
};