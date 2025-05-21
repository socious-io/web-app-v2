import { useEffect } from 'react';
import { updateWallet } from 'src/core/api';
import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import styles from './index.module.scss';
import { WalletModalProps } from './index.types';

const WalletModal: React.FC<WalletModalProps> = ({ open, handleClose, handleAccept, walletAddress }) => {
  const { isConnected, account, Web3Connect, walletProvider } = Dapp.useWeb3();

  useEffect(() => {
    if (isConnected && walletProvider?.isCIP30) {
      console.log(walletAddress, ' <---------------------> ', walletProvider.addresses[0]);
      if (walletAddress != walletProvider.addresses[0]) {
        updateWallet({ wallet_address: walletProvider.addresses[0] });
        return;
      }
    }
    if (isConnected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWallet({ wallet_address: account });
    }
  }, [isConnected, account, walletProvider]);

  const footerJsx = (
    <div className={styles['modal__footer']}>
      <Button color="primary" variant="contained" disabled={!isConnected} fullWidth onClick={handleAccept}>
        {translate('cont-accept-offer')}
      </Button>
      <Button color="secondary" variant="outlined" fullWidth onClick={handleClose}>
        {translate('cont-cancel')}
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon iconName="credit-card-down" size="lg" type="modern" theme="gray" />}
      title={translate('cont-connect-wallet')}
      subTitle={translate('cont-connect-wallet-desc')}
      content={<Web3Connect />}
      footer={footerJsx}
      inlineTitle={false}
      mobileFullHeight={false}
      headerDivider={false}
      footerDivider={false}
      customStyle="md:!w-96"
      contentClassName={styles['modal__content']}
    />
  );
};

export default WalletModal;
