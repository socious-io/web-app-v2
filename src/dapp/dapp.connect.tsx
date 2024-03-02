import {
  createWeb3Modal,
  defaultConfig,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react';
import { BrowserProvider, JsonRpcSigner } from 'ethers';
import React, { useState, useEffect } from 'react';
import { config } from 'src/config';

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
  const { open, close } = useWeb3Modal();
  const [signer, setSigner] = useState<JsonRpcSigner | undefined>();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    const checkNetwork = async (ethers: BrowserProvider) => {
      const net = await ethers.getNetwork();
      const selectd = chains.filter((c) => BigInt(c.chainId) === net.chainId);
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
      ethers.getSigner().then((s) => setSigner(s));
      checkNetwork(ethers);
    }
  }, [address, isConnected, walletProvider]);

  return { account: address, provider, isConnected, signer, chainId, open, close };
};

export const Connect: React.FC = () => {
  return (
    <>
      <w3m-button />
    </>
  );
};
