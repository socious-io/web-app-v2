import { BrowserWallet, Wallet } from '@meshsdk/core';
import { useState } from 'react';
import { truncateFromMiddle } from 'src/core/stringTransformation';
import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button/index';
import { Icon } from 'src/modules/general/components/Icon';
import { useConnect } from 'wagmi';

import styles from './index.module.scss';
import ChooseWalletModal from '../ChooseWalletModal';
import ConnectModal from './ConnectModal';
import { CardanoWallet, ConnectButtonProps, EVMWallet } from './index.type';

export const ConnectButton: React.FC<ConnectButtonProps> = ({ defaultAddress = '' }) => {
  const {
    account = defaultAddress,
    connected,
    balance,
    setupCardanoConnection,
    setupEvmConnection,
    disconnect,
  } = Dapp.useWeb3();

  const { connectors: evmConnectors } = useConnect();

  const [availableWallets, setAvailableWallets] = useState<(CardanoWallet | EVMWallet)[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState('');

  const symbol = balance?.symbol || '';
  const formattedBalance = balance ? Number(balance.value.toFixed(3)).toLocaleString() : '';

  const handleClick = async () => {
    if (connected) {
      setShowMenu(prev => !prev);
      return;
    }

    const cardanoWallets: Wallet[] = await BrowserWallet.getAvailableWallets();
    const evmWallets: EVMWallet[] = evmConnectors.map(connector => ({
      name: connector.name,
      icon: connector.name.replaceAll(' ', '').toLowerCase(),
      connector: connector,
      type: 'evm',
    }));
    const wallets = [
      ...(cardanoWallets.map(wallet => ({ ...wallet, type: 'cardano' })) as CardanoWallet[]),
      ...evmWallets,
    ];

    if (!wallets.length) {
      setError(translate('wallet-not-installed-error'));
      return;
    }
    if (wallets.length === 1) {
      const wallet = wallets[0];
      wallet.type === 'cardano'
        ? setupCardanoConnection(wallet.name)
        : setupEvmConnection((wallet as EVMWallet).connector);
    } else {
      setAvailableWallets(wallets);
      setIsModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowMenu(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account);
    setShowMenu(false);
  };

  return (
    <>
      <div className="relative">
        <Button color="info" onClick={handleClick} block customStyle={styles['button']}>
          {!!symbol && (
            <div className={styles['symbol']}>
              <img src={`/icons/token-symbols/${symbol}.png`} width={18} height={18} alt={symbol} />
            </div>
          )}
          <div className={`${styles['address']} ${symbol && styles['address--connected']}`}>
            {!!symbol && (
              <span className={styles['balance']}>
                {formattedBalance} {symbol}
              </span>
            )}
            {account ? truncateFromMiddle(account, 5, 5) : translate('wallet-connect-btn')}
          </div>
        </Button>
        {connected && (
          <ConnectModal
            open={showMenu}
            handleClose={() => setShowMenu(false)}
            symbol={symbol}
            address={truncateFromMiddle(account, 5, 5)}
            formattedBalance={formattedBalance}
            handleDisconnect={handleDisconnect}
            handleCopy={handleCopy}
          />
        )}
        {!!availableWallets.length && (
          <ChooseWalletModal
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
            wallets={availableWallets}
            onWalletSelect={wallet => {
              wallet.type === 'cardano'
                ? setupCardanoConnection(wallet.name)
                : setupEvmConnection((wallet as EVMWallet).connector);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
      <AlertModal
        open={!!error}
        onClose={() => setError('')}
        title={translate('wallet-failed')}
        message={error}
        customIcon={<Icon name="alert-circle" className="error" />}
        closeButtn={false}
        submitButton={false}
      />
    </>
  );
};

export default ConnectButton;
