import React, { useEffect } from 'react';
import { updateWallet } from 'src/core/api';
import Dapp from 'src/dapp';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';
import { ConnectButton, ConnectButtons } from 'src/modules/wallet/components/connectButton';

import { WalletModalProps } from './walletModal.types';

export const WalletModal: React.FC<WalletModalProps> = ({ open, handleClose, handleAccept, walletAddress }) => {
  const { isConnected, isLaceConnected, open: openConnect, account, laceAccount } = Dapp.useWeb3();

  useEffect(() => {
    if (isConnected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWallet({ wallet_address: account });
    }
    if (isLaceConnected && laceAccount && (!walletAddress || String(walletAddress) !== laceAccount)) {
      updateWallet({ wallet_address: laceAccount });
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
          {/* FIXME(Elaine): handleLaceConnect null for now because there's not really a reason with CIP-30 to turn it inside out */}
          {isConnected ? (
            <Dapp.Connect />
          ) : (
            <ConnectButtons handleWalletConnect={() => openConnect()} handleLaceConnect={() => undefined} />
          )}
        </div>
        <div className="flex flex-col gap-3 md:mt-2">
          <Button
            variant="contained"
            color="primary"
            disabled={!(isConnected || isLaceConnected)}
            fullWidth
            onClick={handleAccept}
          >
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
