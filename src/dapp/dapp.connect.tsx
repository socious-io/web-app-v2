import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal, Web3Button } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig, useAccount, Connector, Address, ConnectorData } from 'wagmi';
import EventEmitter from 'eventemitter3';
import { switchNetwork } from '@wagmi/core';
import { Chain } from 'wagmi/chains';
import { config } from 'src/config';
import { dappConfig } from './dapp.config';
import { Network } from './dapp.types';
import FlintWallet from './wallets/flint';
import TronLinkWallet from './wallets/tronlink';

export const NETWORKS: Network[] = config.dappENV === 'mainet' ? dappConfig.mainet : dappConfig.testnet;

const chains: Chain[] = NETWORKS.map((n) => n.chain);

const projectId = dappConfig.walletConnetProjectId;

const chainConf = configureChains(chains, [w3mProvider({ projectId })]);

const connectors = [...w3mConnectors({ projectId, version: 2, chains }), new FlintWallet({ chains, options: {} }), new TronLinkWallet({ chains, options: {} })];

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
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
      const chainId = await web3Instance.eth.getChainId();
      const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];
      if (!selectedNetwork) await switchNetwork({ chainId: chains[0].id });
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

      <Web3Modal
        walletImages={{
          flint: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkwIiBoZWlnaHQ9IjE5MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJub25lIj4KIDxnPgogIDx0aXRsZT5MYXllciAxPC90aXRsZT4KICA8cGF0aCBkPSJtNTYuMDExLDU5LjM4NWw0My40NjIyLC00NC4wODMzYzIuOTcwOCwtMy4yNTM0IDQuMDMxOCwtMi45MzY1IDUuMDQ0OCwwLjc4NzJsMC4zODgsMzEuNDg4MWMtMC4xMDgsNC45MTM2IC0wLjQ2NSw3LjAzMjYgLTEuOTQsOS4wNTI4bC0yNi4zODgxLDI3LjE1ODVjLTMuNDUwNCw0LjI2NjcgLTIuOTc2OSw1Ljk2OTggLTMuMTA0NCw3Ljg3MmMtMC4xMjc2LDEuOTAyMiAzLjM1NzQsNy40NDg0IDkuMzEzMyw3Ljg3MjFjMCwwIDE2LjE1MDUsMC4wMDMzIDE3Ljg1MDIsMGMxLjcsLTAuMDAzNCAyLjg5MSwyLjczNDYgMCw1LjUxMDZsLTM2LjQ3NjksMzYuNjA1Yy00LjUxNDMsNC4yNTIgLTcuMDY4LDQuMjQgLTExLjY0MTYsMi43NTVjLTcuMDE5NiwtMy45MzUgLTcuMTQ1LC03LjU2NyAtNy4zNjM4LC0xMy45MDFsLTAuMDA5MywtMC4yNjlsMCwtNDAuMTQ3MWMtMC4yNDMxLC0xMi43OTgzIDEuNTg2NiwtMTkuNjE4MSAxMC44NjU2LC0zMC43MDA5eiIgZmlsbD0iI0ZGNjEwMCIgaWQ9InN2Z18xIi8+CiAgPHBhdGggZD0ibTEzNC43MSwxMzEuNTlsLTQ0Ljc3ODgsNDQuMDgzYy0zLjA2MTEsMy4yNTQgLTQuMTU0LDIuOTM3IC01LjE5NzYsLTAuNzg3bC0wLjM5OTgsLTMxLjQ4OGMwLjExMDcsLTQuOTEzIC0wLjA3NTMsLTIuOTk4NTcgNi4zNTAyNiwtMTAuOTI0MjRsMjIuODM1OTQsLTI1LjI4Njc2YzMuNTU1LC00LjI2NyAzLjA2NywtNS45NyAzLjE5OSwtNy44NzIyYzAuMTMxLC0xLjkwMjIgLTMuNDU5LC03LjQ0ODQgLTkuNTk2LC03Ljg3MjFjMCwwIC0xNi42Mzk3LC0wLjAwMzMgLTE4LjM5MTMsMGMtMS43NTE1LDAuMDAzNCAtMi45Nzg3LC0yLjczNSAwLC01LjUxMDRsMzcuNTgyMywtMzYuNjA1YzQuNjUxLC00LjI1MjMgNy4yODMsLTQuMjQwNSAxMS45OTUsLTIuNzU1MmM3LjIzMiwzLjkzNSA3LjM2MSw3LjU2NzQgNy41ODcsMTMuOTAxM2wwLjAwOSwwLjI2ODRsMCw0MC4xNDcyYzAuMjUxLDEyLjc5OSAtMS42MzQsMTkuNjE4IC0xMS4xOTUsMzAuNzAxeiIgZmlsbD0iI0ZGNjEwMCIgaWQ9InN2Z18yIi8+CiA8L2c+Cgo8L3N2Zz4=`,
        }}
        projectId={dappConfig.walletConnetProjectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
};
