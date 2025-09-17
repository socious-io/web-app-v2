import { BrowserWallet } from '@meshsdk/core';
import { QueryClient } from '@tanstack/react-query';
import { BrowserProvider, Eip1193Provider } from 'ethers';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MIDNIGHT_DECIMAL_FACTOR } from 'socious-midnight/escrow-cli/src/wallet-types';
import { config } from 'src/config';
import { CustomError } from 'src/core/adaptors';
import { RootState } from 'src/store';
import { resetWalletState, setWalletState } from 'src/store/reducers/wallet.reducer';
import { Chain } from 'viem';
import {
  Connector,
  createConfig,
  CreateConnectorFn,
  http,
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
} from 'wagmi';
import { metaMask, walletConnect } from 'wagmi/connectors';

import { dappConfig } from './dapp.config';
import { getCardanoEscrow } from './dapp.service';
import { Network } from './dapp.types';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

const chains = NETWORKS.map(n => n.chain);

const projectId = dappConfig.walletConnetProjectId;

const metadata = {
  name: 'Socious',
  description: 'Socious Dapp',
  url: 'https://socious.io',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const wagmiConfig = createConfig({
  chains: chains as [Chain, ...Chain[]],
  connectors: [walletConnect({ projectId, metadata }), metaMask()],
  transports: Object.fromEntries(chains.map(chain => [chain.id, http(chain.rpcUrls.default?.http[0])])),
});

export const queryClient = new QueryClient();

const WALLET_TYPES = {
  EVM: 'evm',
  CARDANO: 'cardano',
  MIDNIGHT: 'midnight',
} as const;

export const useWeb3 = () => {
  const initialState = {
    wallet: null,
    walletProvider: null,
    provider: null,
    signer: null,
    account: '',
    chainId: null,
    connected: false,
    network: null,
    networkName: '',
    testnet: config.dappENV === 'testnet',
    balance: null,
  };
  const dispatch = useDispatch();
  const walletState = useSelector((state: RootState) => state.wallet);
  const [pendingConnector, setPendingConnector] = useState<Connector<CreateConnectorFn> | null>(walletState.wallet);

  const { address: evmAddress, isConnected: isEvmConnected, connector: evmConnector } = useAccount();
  const { connect: evmConnect } = useConnect();
  const { disconnect: disconnectEvm } = useDisconnect();
  const evmChainId = useChainId();
  const { data: evmBalance } = useBalance({ address: evmAddress, chainId: evmChainId });

  const savedWallet = localStorage.getItem('selectedWallet');
  const savedType = localStorage.getItem('walletType');

  const finalizeEvmConnection = async (connector: Connector<CreateConnectorFn>) => {
    if (!connector) return;

    const evmFormat = 1e18;
    const eipProvider = (await connector.getProvider()) as Eip1193Provider;
    const ethersProvider = new BrowserProvider(eipProvider);
    const signer = await ethersProvider.getSigner();
    const network = NETWORKS.find(n => n.chain.id === evmChainId);

    dispatch(
      setWalletState({
        wallet: connector,
        walletProvider: eipProvider,
        provider: ethersProvider,
        signer,
        account: evmAddress ?? '',
        chainId: evmChainId,
        connected: !!evmAddress || isEvmConnected,
        network,
        networkName: network?.name || '',
        testnet: network?.chain.testnet || false,
        balance: {
          symbol: evmBalance?.symbol || '',
          value: Number(evmBalance?.value ?? 0) / evmFormat,
        },
      }),
    );
    localStorage.setItem('walletType', WALLET_TYPES.EVM);
    localStorage.setItem('selectedWallet', connector.name || '');
  };

  const setupEvmConnection = async (connector: Connector<CreateConnectorFn>) => {
    try {
      await evmConnect({ connector });
      // Wait until evmAddress updates via useAccount
      setPendingConnector(connector);
    } catch (error: unknown) {
      console.error((error as CustomError).message);
    }
  };

  const setupCardanoConnection = async (name: string) => {
    try {
      const cardanoFormat = 1_000_000;
      const wallet = await BrowserWallet.enable(name);
      const account = await wallet.getChangeAddress();
      const utxos = await wallet.getUtxos();
      const totalLovelace = utxos?.reduce((sum, utxo) => {
        const lovelace = utxo.output.amount.find(a => a.unit === 'lovelace');
        return sum + BigInt(lovelace?.quantity || '0');
      }, BigInt(0));
      const ada = Number(totalLovelace) / cardanoFormat;
      const network = NETWORKS.find(n => n.name === 'cardano');

      const cardanoEscrow = getCardanoEscrow();
      if (!cardanoEscrow) return;
      await cardanoEscrow.connectWallet(name);

      dispatch(
        setWalletState({
          wallet,
          walletProvider: wallet,
          provider: null,
          signer: null,
          account,
          chainId: null,
          connected: true,
          network,
          networkName: network?.name || '',
          testnet: network?.chain.testnet || false,
          balance: { symbol: 'ADA', value: ada },
        }),
      );
      localStorage.setItem('walletType', WALLET_TYPES.CARDANO);
      localStorage.setItem('selectedWallet', name);
    } catch (err) {
      console.error('Failed to connect Cardano wallet:', err);
    }
  };

  const setupMidnightConnection = async (walletName: string = 'mnLace') => {
    try {
      // Check if Midnight wallet is available
      if (!window.midnight || !window.midnight[walletName]) {
        throw new Error(`Midnight wallet ${walletName} not found`);
      }

      const midnightWallet = await window.midnight[walletName];
      console.log('Midnight wallet structure before enable:', midnightWallet); // Debug log

      // Enable the wallet connection FIRST - this is required to access the API
      if (!midnightWallet.enable) {
        throw new Error(`Midnight wallet ${walletName} does not have an enable method`);
      }
      const walletApi = await midnightWallet.enable();
      // Get wallet state using the state() method
      const walletState = await walletApi.state();

      const account = walletState.address;
      const networkId = walletState.network;

      // Parse balance if available
      let dustBalance = 0;
      if (walletState.balance) {
        dustBalance = Number(BigInt(walletState.balance.value || '0')) / MIDNIGHT_DECIMAL_FACTOR;
      }

      const network = NETWORKS.find(n => n.name === 'midnight');

      dispatch(
        setWalletState({
          wallet: midnightWallet,
          walletProvider: walletApi,
          provider: null,
          signer: null,
          account,
          chainId: null,
          connected: true,
          network,
          networkName: network?.name || '',
          testnet: networkId === 'testnet' || networkId === 'devnet',
          balance: { symbol: 'tDUST', value: dustBalance },
        }),
      );
      localStorage.setItem('walletType', WALLET_TYPES.MIDNIGHT);
      localStorage.setItem('selectedWallet', walletName);
    } catch (err) {
      console.error('Failed to connect Midnight wallet:', err);
    }
  };

  const disconnect = () => {
    if (savedType === 'evm') disconnectEvm();

    dispatch(resetWalletState());
    localStorage.removeItem('walletType');
    localStorage.removeItem('selectedWallet');
    setWalletState(initialState);
  };

  useEffect(() => {
    if (!savedWallet) return;

    if (savedType === WALLET_TYPES.CARDANO) setupCardanoConnection(savedWallet);
    if (savedType === WALLET_TYPES.MIDNIGHT) setupMidnightConnection(savedWallet);
    if (savedType === WALLET_TYPES.EVM && evmConnector) setupEvmConnection(evmConnector);
  }, []);

  useEffect(() => {
    if (isEvmConnected && evmAddress && evmBalance && pendingConnector) {
      finalizeEvmConnection(pendingConnector);
      setPendingConnector(null);
    }
  }, [isEvmConnected, evmAddress, evmBalance, pendingConnector]);

  return {
    ...walletState,
    walletName: savedWallet,
    walletType: savedType,
    setupCardanoConnection,
    setupMidnightConnection,
    setupEvmConnection,
    disconnect,
  };
};
