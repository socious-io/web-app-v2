import { QRCodeSVG } from 'qrcode.react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

interface KYCModalProps {
  open: boolean;
  handleClose: () => void;
  connectUrl: string;
}

export const KYCModal: React.FC<KYCModalProps> = ({ open, handleClose, connectUrl }) => {
  const footerJsx = (
    <div className="w-full p-6 block md:hidden">
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          const newTab = window.open(connectUrl, '_blank');
          newTab?.focus();
        }}
      >
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
      contentClassName="h-full"
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
        <span className="text-base leading-6 font-semibold text-Gray-light-mode-900">How to verify your identity</span>
        <div className="flex flex-col">
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">
            1. Go through the app’s onboarding process which will create a decentralized ID on Atala Prism.
          </span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">
            2. Verify your identity with Veriff, our KYC partner.
          </span>
        </div>
        <div className="bg-Gray-light-mode-50 rounded-default p-4 hidden md:flex items-center justify-center">
          <QRCodeSVG value={connectUrl} size={200} />
        </div>
        <div className="flex flex-col md:items-center gap-4">
          <span className="text-sm leading-5 text-Gray-light-mode-600">Download the Socious Wallet app</span>
          <div className="flex items-center gap-4">
            <Link to="https://wallet.socious.io/ios" target="_blank">
              <img
                src="/images/download-appstore.svg"
                alt="app-store"
                height={40}
                width={135}
                className="cursor-pointer"
              />
            </Link>
            <Link to="https://wallet.socious.io/android" target="_blank">
              <img
                src="/images/download-googleplay.svg"
                alt="google-play"
                height={40}
                width={135}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};
