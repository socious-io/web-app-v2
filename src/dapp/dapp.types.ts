import { Chain } from 'wagmi/chains';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export interface Token {
  name: string;
  symbol: string;
  address: string;
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
    escrow: AbiItem[];
    token: AbiItem[];
  };
}

export interface EscrowParams {
  web3: Web3;
  totalAmount: number;
  escrowAmount: number;
  contributor: string;
  projectId: string;
  token?: string;
  verifiedOrg: boolean;
}
