import { Wallet } from '@meshsdk/core';
import { WalletReq } from 'src/core/api';
import { Connector, CreateConnectorFn } from 'wagmi';

export interface ConnectButtonProps {
  defaultAddress?: string;
  onSetWallet?: (payload: WalletReq) => void;
}

export type EVMWallet = {
  type: 'evm';
  name: string;
  icon: string;
  connector: Connector<CreateConnectorFn>;
};

export type CardanoWallet = Wallet & { type: 'cardano' };
