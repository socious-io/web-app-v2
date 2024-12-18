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
import { LaceButton } from 'src/modules/wallet/components/connectButton';

import { dappConfig } from './dapp.config';
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
  const [isLaceConnected, setIsLaceConnected] = useState<boolean>(false);
  const [laceAccount, setLaceAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
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
    console.log('Checknetwork defined');

    const checkIsLaceConnected = async () => {
      console.log('checkIsLaceConnected invoked');
      const lace = window?.cardano?.eternl;
      if (lace === undefined) {
        setIsLaceConnected(false);
        return;
      }
      const isEnabled = await lace.isEnabled();
      await setIsLaceConnected(isEnabled);

      if (isLaceConnected || isEnabled) {
        //FIXME(Elaine): deduplicate with LaceButton
        const api = await lace.enable(); // should definitionally return instantly because isLaceEnabled
        const usedAddresses = await api.getUsedAddresses();
        const unusedAddresses = await api.getUnusedAddresses();
        // get the first address in usedAddresses, if usedAddresses is non-empty
        // otherwise, get the first address in unusedAddresses

        const address = usedAddresses.length > 0 ? usedAddresses[0] : unusedAddresses[0];

        setLaceAddress(address as string); //FIXME(Elaine): types
      }
    };
    checkIsLaceConnected();

    if (isConnected && walletProvider) {
      const ethers = new BrowserProvider(walletProvider);
      setProvier(ethers);
      ethers.getSigner().then(s => setSigner(s));
      checkNetwork(ethers);
    }
  }, [address, laceAccount, isConnected, isLaceConnected, walletProvider]);

  console.log('useWeb3, isLaceConnected: ', isLaceConnected);
  //FIXME(Elaine): Figure out what to do if the user enables both
  return {
    account: address || laceAccount,
    laceAccount,
    provider,
    isConnected,
    isLaceConnected,
    signer,
    chainId,
    open,
    close,
  };
};

export const Connect: React.FC = () => {
  return (
    <>
      <w3m-button />
      <LaceButton handleClick={() => undefined} />
    </>
  );
};
