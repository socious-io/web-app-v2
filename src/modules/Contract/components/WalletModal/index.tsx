import { useEffect } from 'react';
import { updateWalletAdaptor } from 'src/core/adaptors';
import { translate } from 'src/core/utils';
import dapp from 'src/dapp';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';
import ConnectButton from 'src/modules/wallet/components/ConnectButton';

import styles from './index.module.scss';
import { WalletModalProps } from './index.types';

const WalletModal: React.FC<WalletModalProps> = ({ open, handleClose, handleAccept, walletAddress }) => {
  const { connected, account, networkName, testnet } = dapp.useWeb3();

  useEffect(() => {
    if (connected && account && (!walletAddress || String(walletAddress) !== account)) {
      updateWalletAdaptor({ account, networkName, testnet });
    }
  }, [connected, account]);

  const footerJsx = (
    <div className={styles['modal__footer']}>
      <Button color="primary" variant="contained" disabled={!connected} fullWidth onClick={handleAccept}>
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
      content={<ConnectButton />}
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
