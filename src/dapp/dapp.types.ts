import { Interface, InterfaceAbi, JsonRpcSigner } from 'ethers';
import { Chain } from 'viem';

import { CIP30ToEIP1193Provider } from './wallets/cip-30';

export interface Token {
  name: string;
  symbol: string;
  address?: string;
  decimals?: number;
}

export interface Network {
  chain: Chain;
  escrow: string;
  old?: boolean;
  logic?: string;
  tokens: Token[];
}

export interface DappConfig {
  walletConnetProjectId: string;
  mainet: Network[];
  testnet: Network[];
  abis: {
    escrow: Interface | InterfaceAbi;
    token: Interface | InterfaceAbi;
  };
}

export interface EscrowParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  walletProvider?: any;
  signer: JsonRpcSigner;
  chainId: number;
  totalAmount: number;
  escrowAmount: number;
  contributor: string;
  projectId: string;
  token?: string;
  verifiedOrg: boolean;
  addressReferringOrg?: string;
  addressReferringCont?: string;
  applyOrgFeeDiscount: boolean;
  applyContFeeDiscount: boolean;
}

export interface AllowanceParams {
  signer: JsonRpcSigner;
  chainId: number;
  token: string;
  amount: number;
  decimals?: number;
}

export interface EscrowActionEventData {
  id: string;
  fee: string;
  amount: string;
  org: string;
  jobId: string;
  token: string;
}

export interface WithdrawnParams {
  walletProvider?: CIP30ToEIP1193Provider;
  signer: JsonRpcSigner;
  chainId: number;
  escrowId: string;
  meta?: any;
}

export interface FlattenToken {
  address: string;
  chain: Chain;
  decimals: number;
  escrow: string;
  logic: string;
  name: string;
  network: 'testnet' | 'mainet';
  symbol: string;
}
