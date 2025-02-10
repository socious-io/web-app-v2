import { ConnectButton as RKButton } from '@rainbow-me/rainbowkit';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import styles from './index.module.scss';

const ConnectButton: React.FC = () => {
  return (
    <RKButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button type="button" color="info" variant="outlined" fullWidth onClick={openConnectModal}>
                    Connect Wallet
                  </Button>
                );
              }

              return (
                <Button type="button" color="info" variant="outlined" fullWidth>
                  <div onClick={openChainModal} className={styles['chain']}>
                    {chain.hasIcon && chain.iconUrl && (
                      <img src={chain.iconUrl} width={18} height={18} alt={chain.name || 'Chain icon'} />
                    )}
                    <Icon name="chevron-down" cursor="pointer" />
                  </div>
                  <div onClick={openAccountModal} className={styles['account']}>
                    {account.displayBalance && (
                      <span className={styles['account__balance']}>{account.displayBalance}</span>
                    )}
                    {account.ensAvatar && <img src={account.ensAvatar} width={18} height={18} alt="Wallet Avatar" />}
                    {account.displayName}
                  </div>
                </Button>
              );
            })()}
          </div>
        );
      }}
    </RKButton.Custom>
  );
};

export default ConnectButton;
