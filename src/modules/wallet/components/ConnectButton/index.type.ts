import { Wallet } from '@meshsdk/core';
import { Connector, CreateConnectorFn } from 'wagmi';

export interface ConnectButtonProps {
  defaultAddress?: string;
}

export type EVMWallet = {
  type: 'evm';
  name: string;
  icon: string;
  connector: Connector<CreateConnectorFn>;
};

export type CardanoWallet = Wallet & { type: 'cardano' };
