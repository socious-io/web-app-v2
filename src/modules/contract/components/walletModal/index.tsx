import { useEffect } from 'react';
import { updateWallet } from 'src/core/api';
import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import { WalletModalProps } from './walletModal.types';

export const WalletModal: React.FC<WalletModalProps> = ({ open, handleClose, handleAccept, walletAddress }) => {
  const { isConnected, account, Web3Connect } = Dapp.useWeb3();

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
        <div className="font-semibold text-lg  leading-7 text-Gray-light-mode-900">
          {translate('cont-connect-wallet')}
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="font-medium text-sm leading-5 text-Gray-light-mode-700 ">
            {translate('cont-connect-wallet-desc')}
          </div>
          <Web3Connect />
        </div>
        <div className="flex flex-col gap-3 md:mt-2">
          <Button variant="contained" color="primary" disabled={!isConnected} fullWidth onClick={handleAccept}>
            {translate('cont-accept-offer')}
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleClose}>
            {translate('cont-cancel')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
