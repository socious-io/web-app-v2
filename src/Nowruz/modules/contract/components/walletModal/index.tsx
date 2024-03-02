import React, { useEffect } from 'react';
import { updateWallet } from 'src/core/api';
import Dapp from 'src/dapp';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { ConnectButton } from 'src/Nowruz/modules/wallet/components/connectButton';

import { WalletModalProps } from './walletModal.types';

export const WalletModal: React.FC<WalletModalProps> = ({ open, handleClose, handleAccept, walletAddress }) => {
  const { isConnected, open: openConnect, account } = Dapp.useWeb3();

  useEffect(() => {
    if (isConnected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWallet({ wallet_address: account });
    }
  }, [isConnected, account]);

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon iconName="credit-card-down" size="lg" type="modern" theme="gray" />}
      mobileFullHeight={false}
      headerDivider={false}
      customStyle="md:!w-96"
    >
      <div className="flex flex-col p-4 md:p-6 gap-6">
        <div className="font-semibold text-lg  leading-7 text-Gray-light-mode-900">Connect a wallet</div>
        <div className="flex flex-col gap-1.5">
          <div className="font-medium text-sm leading-5 text-Gray-light-mode-700 ">
            To accept this offer you need to connect your wallet
          </div>
          {isConnected ? <Dapp.Connect /> : <ConnectButton handleClick={() => openConnect()} />}
        </div>
        <div className="flex flex-col gap-3 md:mt-2">
          <Button variant="contained" color="primary" disabled={!isConnected} fullWidth onClick={handleAccept}>
            Accept offer
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
