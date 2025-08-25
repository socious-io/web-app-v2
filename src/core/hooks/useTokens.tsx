import { useState, useEffect } from 'react';

interface Token {
  value: string;
  label: string;
  address: string;
}

export const useTokens = (isConnected: boolean, network: any) => {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    const getTokens = async () => {
      if (isConnected) {
        if (network) {
          const mapTokens = network.tokens.map(token => ({
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
  }, [isConnected, network]);

  return network ? tokens : [];
};
