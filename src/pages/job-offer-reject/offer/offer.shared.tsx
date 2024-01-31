import { useEffect, useState } from 'react';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';
import Dapp from 'src/dapp';

import { findTokenRate } from './offer.services';

export const useOfferShared = () => {
  const { isConnected, chainId } = Dapp.useWeb3();
  const [openModal, setOpenModal] = useState(false);
  const [tokens, setTokens] = useState<Item[]>([]);
  const [selectedToken, setSelectedToken] = useState<{ address: string; symbol?: string }>();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [tokenRate, setTokenRate] = useState(1);

  useEffect(() => {
    const getTokens = async () => {
      if (isConnected) {
        const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.chainId === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map((token) => {
          return {
            value: token.address,
            title: token.name,
            subtitle: token.symbol,
          };
        });
        setTokens(mapTokens);
        const { rate } = await findTokenRate(mapTokens[0].value);
        setTokenRate(rate);
      }
    };
    getTokens();
  }, [isConnected]);

  function onSelectTokens({ value, subtitle }: Item) {
    setSelectedToken({ address: value, symbol: subtitle });
    setOpenModal(false);
    findTokenRate(value).then(({ rate }) => setTokenRate(rate));
  }

  function onSelectCurrency({ value }: Item) {
    setSelectedCurrency(value);
    setOpenModal(false);
  }

  function equivalentUSD(amount: ControlPrimitiveValue) {
    return Math.round(Number(amount) * tokenRate * 100) / 100;
  }

  return {
    tokens,
    openModal,
    setOpenModal,
    selectedToken,
    selectedCurrency,
    onSelectTokens,
    onSelectCurrency,
    equivalentUSD,
    isConnected,
  };
};
