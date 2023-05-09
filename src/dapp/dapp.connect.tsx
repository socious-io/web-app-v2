import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal, Web3Button } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig, useAccount } from 'wagmi';
import { Chain } from 'wagmi/chains';
import { config } from 'src/config';
import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';

// export const NETWORKS: Network[] = config.env === 'production' ? dappConfig.mainet : dappConfig.testnet;
// FIXME: enviremental switch deployed to mainet
export const NETWORKS: Network[] = dappConfig.testnet;

const chains: Chain[] = NETWORKS.map((n) => n.chain);

const projectId = dappConfig.walletConnetProjectId;

const chainConf = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider: chainConf.provider,
});

const ethereumClient = new EthereumClient(wagmiClient, chains);

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [provider, setProvider] = useState(null);
  const { address: account, isConnected, connector } = useAccount();

  useEffect(() => {
    async function init() {

      if (!isConnected || !connector || !account) {
        setWeb3(null);
        setProvider(null);
        return;
      }

      const provider = await connector.getProvider();
      const web3Instance = new Web3(provider);
      
      if (!web3Instance) throw Error('Provider is not valid');

      web3Instance.defaultAccount = account;
      web3Instance.eth.defaultAccount = account;
      
      setWeb3(web3Instance);
      setProvider(provider);
    }

    init();
  }, [isConnected, connector, account]);

  return { web3, provider };
};


export const Connect: React.FC = () => {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Web3Button />
      </WagmiConfig>

      <Web3Modal projectId={dappConfig.walletConnetProjectId} ethereumClient={ethereumClient} />
    </>
  );
};
