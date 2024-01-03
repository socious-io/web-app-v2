import React, { useState, useEffect } from 'react';
import { config } from 'src/config';
import { createWeb3Modal, defaultConfig, useWeb3ModalAccount, useWeb3ModalProvider } from '@web3modal/ethers/react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';

import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

const chains = NETWORKS.map((n) => n.chain);

const projectId = dappConfig.walletConnetProjectId;

const metadata = {
  name: 'Socious',
  description: 'Socious Dapp',
  url: 'https://socious.io',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains,
  projectId,
});

export const useWeb3 = () => {
  const [provider, setProvier] = useState<BrowserProvider | undefined>();
  const { address, isConnected, chainId } = useWeb3ModalAccount();
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    if (isConnected && walletProvider) {
      const ethers = new BrowserProvider(walletProvider);
      setProvier(ethers);
      ethers.getSigner().then((s) => setSigner(s));
    }
  }, [address, isConnected, walletProvider]);

  return { account: address, provider, isConnected, signer, chainId };
};

export const Connect: React.FC = () => {
  return (
    <>
      <w3m-button />
    </>
  );
};
