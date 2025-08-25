import { Interface, InterfaceAbi, JsonRpcSigner } from 'ethers';
import { Chain } from 'viem';

export interface Token {
  name: string;
  symbol: string;
  address?: string;
  decimals?: number;
}

export interface Network {
  chain: Chain;
  name: string;
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
  signer: JsonRpcSigner | null;
  network?: Network;
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
  signer: JsonRpcSigner | null;
  network?: Network;
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
  signer: JsonRpcSigner | null;
  network?: Network;
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
