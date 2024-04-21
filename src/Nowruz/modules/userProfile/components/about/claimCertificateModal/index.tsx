import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

interface ClaimCertificateModalProps {
  open: boolean;
  handleClose: () => void;
  handleClaimVC: () => void;
}
export const ClaimCertificateModal: React.FC<ClaimCertificateModalProps> = ({ open, handleClose, handleClaimVC }) => {
  const footerJsx = (
    <div className=" w-full p-6 ">
      <Button variant="contained" color="primary" fullWidth onClick={handleClaimVC}>
        Open Socious Wallet app
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon type="modern" iconName="shield-tick" size="lg" theme="gray" />}
      title="Claim your certificate"
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
        {/* <span className="text-base leading-6 font-semibold text-Gray-light-mode-900">How to get your certificate</span>
        <div className="flex flex-col">
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">1. Open your Socious Wallet</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">2. Scan the QR code below</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">
            3. Accept the request to get your certificate
          </span>
        </div> */}
      </div>
    </Modal>
  );
};
