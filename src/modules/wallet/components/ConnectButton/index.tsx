import { BrowserWallet, Wallet } from '@meshsdk/core';
import { useEffect, useState } from 'react';
import { CustomError } from 'src/core/adaptors';
import { truncateFromMiddle } from 'src/core/helpers/texts';
import { translate } from 'src/core/helpers/utils';
import { NETWORKS } from 'src/dapp/dapp.connect';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button/index';
import { Icon } from 'src/modules/general/components/Icon';
import Image from 'src/modules/general/components/Image';
import { useWalletContext } from 'src/store/contexts';
import { useAccount, useBalance, useChainId, useConnect, useDisconnect } from 'wagmi';

import styles from './index.module.scss';
import ChooseWalletModal from '../ChooseWalletModal';
import ConnectModal from './ConnectModal';
import { CardanoWallet, ConnectButtonProps, EVMWallet } from './index.type';

const ConnectButton: React.FC<ConnectButtonProps> = ({ defaultAddress = '', onSetWallet }) => {
  const { dispatch, state } = useWalletContext();
  const { address = defaultAddress, wallet, balance } = state;

  const { address: evmAddress = '0x', isConnected: isEvmConnected } = useAccount();
  const { connectors: evmConnectors, connect: connectEvm } = useConnect();
  const { disconnect: disconnectEvm } = useDisconnect();
  const evmChainId = useChainId();
  const { data: evmBalance } = useBalance({
    address: evmAddress,
    chainId: evmChainId,
  });

  const [availableWallets, setAvailableWallets] = useState<(CardanoWallet | EVMWallet)[]>([]);
  const [pendingConnector, setPendingConnector] = useState<EVMWallet['connector'] | null>(wallet);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState('');

  const connected = !!address || isEvmConnected;
  const savedWallet = localStorage.getItem('selectedWallet');
  const savedType = localStorage.getItem('walletType');
  const cardanoFormat = 1_000_000;
  const evmFormat = 1e18;
  const symbol = balance.symbol;
  const formattedBalance = Number(balance.value.toFixed(3)).toLocaleString();

  useEffect(() => {
    if (!savedWallet) return;
    if (savedType === 'cardano') {
      connectCardanoWallet(savedWallet);
    }
    if (savedType === 'evm') {
      const connector = evmConnectors.find(connector => connector.name === savedWallet);
      if (connector) {
        connectEvmWallet(connector);
      }
    }
  }, []);

  useEffect(() => {
    if (isEvmConnected && evmAddress && evmBalance && pendingConnector) {
      finalizeConnection({
        wallet: pendingConnector,
        address: evmAddress,
        name: pendingConnector.name,
        type: 'evm',
        chain_id: evmChainId.toString(),
        balance: { symbol: evmBalance?.symbol || '', value: Number(evmBalance.value) / evmFormat },
      });
      setPendingConnector(null);
    }
  }, [isEvmConnected, evmAddress, evmBalance, pendingConnector]);

  const finalizeConnection = ({
    wallet,
    address,
    name,
    type,
    chain_id,
    balance,
  }: {
    wallet: BrowserWallet | EVMWallet['connector'];
    address: string;
    name: string;
    type: 'cardano' | 'evm';
    chain_id: string;
    balance: { symbol: string; value: number };
  }) => {
    dispatch({ type: 'CONNECT', payload: { wallet, address, balance, connected } });
    setIsModalOpen(false);
    localStorage.setItem('walletType', type);
    localStorage.setItem('selectedWallet', name);

    const chain = type === 'cardano' ? 'Cardano' : (NETWORKS.find(n => n.chain.id === evmChainId)?.chain.name ?? 'EVM');
    onSetWallet?.({ chain, chain_id, address });
  };

  const connectCardanoWallet = async (walletName: string) => {
    try {
      const wallet = await BrowserWallet.enable(walletName);
      const networkId = await wallet.getNetworkId();
      const address = await wallet.getChangeAddress();
      const utxos = await wallet.getUtxos();
      const totalLovelace = utxos?.reduce((sum, utxo) => {
        const lovelace = utxo.output.amount.find(a => a.unit === 'lovelace');
        return sum + BigInt(lovelace?.quantity || '0');
      }, BigInt(0));
      const ada = Number(totalLovelace) / cardanoFormat;

      finalizeConnection({
        wallet,
        address,
        name: walletName,
        type: 'cardano',
        chain_id: networkId ? 'cardano-mainnet' : 'cardano-preprod',
        balance: { symbol: 'ADA', value: ada },
      });
    } catch (error: unknown) {
      console.error((error as CustomError).message);
      setError(translate('payments-method-crypto-wallet.not-connected-error', { walletName }));
    }
  };

  const connectEvmWallet = async (connector: EVMWallet['connector']) => {
    try {
      await connectEvm({ connector });
      // Wait until evmAddress updates via useAccount
      setPendingConnector(connector);
    } catch (error: unknown) {
      console.error((error as CustomError).message);
      setError(translate('payments-method-crypto-wallet.not-connected-error', { walletName: connector.name }));
    }
  };

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
      setError(translate('payments-method-crypto-wallet.not-installed-error'));
      return;
    }
    if (wallets.length === 1) {
      const wallet = wallets[0];
      wallet.type === 'cardano' ? connectCardanoWallet(wallet.name) : connectEvmWallet((wallet as EVMWallet).connector);
    } else {
      setAvailableWallets(wallets);
      setIsModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    if (isEvmConnected) disconnectEvm();
    dispatch({ type: 'DISCONNECT' });
    setShowMenu(false);
    localStorage.removeItem('walletType');
    localStorage.removeItem('selectedWallet');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setShowMenu(false);
  };

  return (
    <>
      <div className="relative">
        <Button color="info" onClick={handleClick} block customStyle={styles['button']}>
          {!!symbol && (
            <div className={styles['symbol']}>
              <Image src={`/icons/token-symbols/${symbol}.png`} width={18} height={18} alt={symbol} />
            </div>
          )}
          <div className={`${styles['address']} ${symbol && styles['address--connected']}`}>
            {!!symbol && (
              <span className={styles['balance']}>
                {formattedBalance} {symbol}
              </span>
            )}
            {address ? truncateFromMiddle(address, 5, 5) : translate('payments-method-crypto-wallet.connect-btn')}
          </div>
        </Button>
        {connected && (
          <ConnectModal
            open={showMenu}
            handleClose={() => setShowMenu(false)}
            symbol={symbol}
            address={truncateFromMiddle(address, 5, 5)}
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
            onWalletSelect={wallet =>
              wallet.type === 'cardano'
                ? connectCardanoWallet(wallet.name)
                : connectEvmWallet((wallet as EVMWallet).connector)
            }
          />
        )}
      </div>
      <AlertModal
        open={!!error}
        onClose={() => setError('')}
        title={translate('payment-cards.failed')}
        message={error}
        customIcon={<Icon name="alert-circle" className="error" />}
        closeButtn={false}
        submitButton={false}
      />
    </>
  );
};

export default ConnectButton;
