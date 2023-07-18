import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import { Chain } from 'wagmi/chains';

export interface Token {
  name: string;
  symbol: string;
  address: string;
}

export interface Network {
  chain: Chain;
  escrow: string;
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
