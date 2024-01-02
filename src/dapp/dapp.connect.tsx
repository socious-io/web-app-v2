import React, { useState, useEffect } from 'react';
import { config } from 'src/config';
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import Web3 from 'web3';

import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

const chains = NETWORKS.map((n) => n.chain);

const projectId = dappConfig.walletConnetProjectId;

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains,
  projectId,
});

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected) {
      const web3Instance = new Web3(walletProvider);
      web3Instance.defaultAccount = address;
      web3Instance.eth.defaultAccount = address;
      setWeb3(web3Instance);
    }
  }, [address, isConnected]);

  return { web3, account: address, provider: walletProvider, isConnected };
};

export const Connect: React.FC = () => {
  return (
    <>
      <w3m-button />
    </>
  );
};
