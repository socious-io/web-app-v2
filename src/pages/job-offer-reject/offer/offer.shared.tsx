import { useEffect, useState } from 'react';
import Dapp from 'src/dapp';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';

export const useOfferShared = () => {
  const { web3 } = Dapp.useWeb3();
  const [openModal, setOpenModal] = useState(false);
  const [tokens, setTokens] = useState<Item[]>([]);
  const [selectedToken, setSelectedToken] = useState<{ address: string; symbol?: string }>();

  useEffect(() => {
    const getTokens = async () => {
      if (web3) {
        const chainId = await web3.eth.getChainId();
        const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.id === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map((token) => {
          return {
            value: token.address,
            title: token.name,
            subtitle: token.symbol,
          };
        });
        setTokens(mapTokens);
      }
    };
    getTokens();
  }, [web3]);

  return {
    tokens,
    openModal,
    setOpenModal,
    selectedToken,
    setSelectedToken,
    web3,
  };
};
