import React, { createContext, useContext, useReducer } from 'react';

export type WalletType = 'cardano' | 'evm';

export type WalletState = {
  address: string;
  wallet: any;
  connected: boolean;
  balance: { symbol: string; value: number };
};

export type WalletAction = { type: 'CONNECT'; payload: WalletState } | { type: 'DISCONNECT' };

const initialState: WalletState = {
  address: '',
  wallet: null,
  connected: false,
  balance: { symbol: '', value: 0 },
};

const WalletContext = createContext<{
  state: WalletState;
  dispatch: React.Dispatch<WalletAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function walletReducer(state: WalletState, action: WalletAction): WalletState {
  switch (action.type) {
    case 'CONNECT':
      return {
        ...state,
        ...action.payload,
      };
    case 'DISCONNECT':
      return initialState;
    default:
      return state;
  }
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  return <WalletContext.Provider value={{ state, dispatch }}>{children}</WalletContext.Provider>;
};

export const useWalletContext = () => useContext(WalletContext);
