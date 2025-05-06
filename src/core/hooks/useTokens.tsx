import { useState, useEffect } from 'react';
import Dapp from 'src/dapp';

interface Token {
  value: string;
  label: string;
  address: string;
}

export const useTokens = (isConnected: boolean, chainId: number | undefined) => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const getTokens = async () => {
      if (isConnected) {
        const selectedNetwork = Dapp.NETWORKS.find(network => network.chain.id === chainId);
        if (selectedNetwork) {
          const mapTokens = selectedNetwork.tokens.map(token => ({
            value: token?.address || '',
            label: token.name,
            address: token?.address || '',
          }));
          setTokens(mapTokens);
        } else {
          setTokens([]);
        }
      }
    };
    getTokens();
  }, [isConnected, chainId]);

  return chainId ? tokens : [];
};
