  import { BrowserWallet } from '@meshsdk/core';
  import { createSlice, PayloadAction } from '@reduxjs/toolkit';
  import { BrowserProvider, Eip1193Provider, JsonRpcSigner } from 'ethers';

  export type WalletState = {
    wallet: any | null;
    walletProvider: Eip1193Provider | BrowserWallet | null;
    provider: BrowserProvider | null;
    signer: JsonRpcSigner | null;
    account: string;
    chainId: number | null;
    connected: boolean;
    network: any;
    networkName: string;
    testnet: boolean;
    balance: { symbol: string; value: number } | null;
  };

  const initialState: WalletState = {
    wallet: null,
    walletProvider: null,
    provider: null,
    signer: null,
    account: '',
    chainId: null,
    connected: false,
    network: null,
    networkName: '',
    testnet: false,
    balance: null,
  };

  export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
      setWalletState(state, action: PayloadAction<Partial<WalletState>>) {
        return { ...state, ...action.payload };
      },
      resetWalletState() {
        return initialState;
      },
    },
  });

  export const { setWalletState, resetWalletState } = walletSlice.actions;
