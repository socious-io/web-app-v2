import '@rainbow-me/rainbowkit/styles.css';
import { connectorsForWallets, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit';
import { metaMaskWallet, walletConnectWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import React, { useState, useEffect } from 'react';
import { config } from 'src/config';
import { Chain } from 'viem';
import { useAccount, WagmiProvider, createConfig, http } from 'wagmi';
import { injected } from 'wagmi/connectors';

import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';
import { laceWallet } from './wallets/lace';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

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
      wallets: [metaMaskWallet, walletConnectWallet],
    },
    {
      groupName: 'Cardano',
      wallets: [laceWallet],
    },
  ],
  {
    appName: metadata.name,
    projectId,
  },
);

const wagmiConfig = createConfig({
  chains: chains as [Chain, ...Chain[]],
  transports: {
    [chains[0].id]: http('https://mainnet.example.com'),
  },
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
  const [provider, setProvier] = useState<BrowserProvider | undefined>();
  // const { address, isConnected } = useAccount();
  // const { open, close } =  useWeb3Modal();
  // const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  // const { walletProvider } = /useWeb3ModalProvider();

  /* useEffect(() => {
    const checkNetwork = async (ethers: BrowserProvider) => {
      const net = await ethers.getNetwork();
      const selectd = chains.filter(c => BigInt(c.chainId) === net.chainId);
      if (selectd.length < 1) {
        try {
          await ethers.send('wallet_switchEthereumChain', [{ chainId: `0x${chains[0].chainId.toString(16)}` }]);
        } catch (err: any) {
          if (err.code === 4902) {
            await ethers.send('wallet_addEthereumChain', [chains[0]]);
          }
        }
      }
    };
    if (isConnected && walletProvider) {
      const ethers = new BrowserProvider(walletProvider);
      setProvier(ethers);
      ethers.getSigner().then(s => setSigner(s));
      checkNetwork(ethers);
    }
  }, [address, isConnected, walletProvider]); */

  return { account: '', provider, isConnected: false, signer: {}, chainId: 22, open, close };
};

export const Connect: React.FC = () => {
  return (
    <RainbowKitWrapper>
      <ConnectButton />
    </RainbowKitWrapper>
  );
};
