import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserProvider, Eip1193Provider, JsonRpcSigner } from 'ethers';
import { useState, useEffect } from 'react';
import { config } from 'src/config';
import ConnectButton from 'src/modules/wallet/components/ConnectButton';
import { Chain, HttpTransport } from 'viem';
import { useAccount, WagmiProvider, createConfig, http } from 'wagmi';
import { Escrow } from 'cardano-bridge';
import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';
import { laceWallet } from './wallets/lace';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

export const CardanoEscrow = new Escrow({ blockfrost: config.blocfrostProjectId });

const chains = NETWORKS.map(n => n.chain);

const projectId = dappConfig.walletConnetProjectId;

const metadata = {
  name: 'Socious',
  description: 'Socious Dapp',
  url: 'https://socious.io',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, walletConnectWallet, trustWallet, ledgerWallet],
    },
    {
      groupName: 'Cardano',
      wallets: [laceWallet(1215)],
    },
  ],
  {
    appName: metadata.name,
    projectId,
  },
);


const wagmiConfig = createConfig({
  chains: chains as [Chain, ...Chain[]],
  transports: Object.fromEntries(chains.map(chain => [chain.id, http(chain.rpcUrls.default?.http[0])])),
  connectors,
});

const queryClient = new QueryClient();

const RainbowKitWrapper = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const useWeb3 = () => {
  // const connectors = useConnectors()
  // const { walletProvider } = /useWeb3ModalProvider();
  const [provider, setProvider] = useState<BrowserProvider>();
  const [walletProvider, setWalletProvider] = useState<unknown>();
  const [connected, setConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string>();
  const [chainId, setChainId] = useState<number>(0);
  const [signer, setSigner] = useState<JsonRpcSigner>();


  const Button: React.FC = () => {
    const { address, isConnected, connector } = useAccount();

    const updateProvider = async () => {
      if (!connector?.getChainId) return;
      setChainId(await connector.getChainId());
      const eipProvider = await connector.getProvider();
      setWalletProvider(eipProvider);
      if (eipProvider.isCIP30) {
        await CardanoEscrow.connectWallet(eipProvider?.name as string);
      }

      const ethers = new BrowserProvider(eipProvider as Eip1193Provider);
      setProvider(ethers);
      setSigner(await ethers.getSigner());
    };

    useEffect(() => {
      setConnected(isConnected);
      setAccount(address);

      if (isConnected && connector?.getChainId && !chainId) updateProvider();
    }, [isConnected, address, connector]);

    return <ConnectButton />;
  };

  const Web3Connect: React.FC = () => {
    return (
      <RainbowKitWrapper>
        <Button />
      </RainbowKitWrapper>
    );
  };

  return { Web3Connect, account, provider, isConnected: connected, signer, chainId, walletProvider };
};
