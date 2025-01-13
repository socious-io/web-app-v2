import { bscTestnet, bsc, sepolia } from 'wagmi/chains';

import { DappConfig } from './dapp.types';

export const dappConfig: DappConfig = {
  walletConnetProjectId: '40ce0f320baccb067909071c983ca357',
  testnet: [
    {
      chain: bscTestnet,
      escrow: '0xE6b7fdf37b4D297d7E4BcB055Df06AF5DDbf82Ce',
      logic: '0xE6b7fdf37b4D297d7E4BcB055Df06AF5DDbf82Ce',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0x082A2027DC16F42d6e69bE8FA13C94C17c910EbE',
          decimals: 18,
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0x337610d27c682E347C9cD60BD4b3b107C9d34dDd',
          decimals: 18,
        },
      ],
    },
    {
      chain: sepolia,
      escrow: '0x383fdB2917B1bB02841116811f94159D9263D53d',
      logic: '0x383fdB2917B1bB02841116811f94159D9263D53d',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0x06666b1DbFb62613515cEAE861CAd3d8A9d88451',
          decimals: 18,
        },
      ],
    },
  ],
  mainet: [
    {
      chain: bsc,
      escrow: '0x2Bdf475Bf5353cF52Aa4339A0FA308B4e1e22C3A',
      logic: '0x2Bdf475Bf5353cF52Aa4339A0FA308B4e1e22C3A',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
          decimals: 18,
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0x55d398326f99059fF775485246999027B3197955',
          decimals: 18,
        },
      ],
    },
  ],

  abis: {
    escrow: [
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'organization',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'string',
            name: 'jobId',
            type: 'string',
          },
          {
            indexed: false,
            internalType: 'contract IERC20',
            name: 'token',
            type: 'address',
          },
        ],
        name: 'EscrowAction',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: 'address',
            name: 'previousOwner',
            type: 'address',
          },
          {
            indexed: true,
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'uint256',
            name: 'escrowId',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'TransferAction',
        type: 'event',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'addToken',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_refund',
            type: 'bool',
          },
        ],
        name: 'escrowDecision',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_verifiedOrg',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: '_addressReferringOrg',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_addressReferringCont',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_applyOrgFeeDiscount',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: '_applyContFeeDiscount',
            type: 'bool',
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'newEscrow',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_address',
            type: 'address',
          },
        ],
        name: 'setBeneficiary',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_addressReferringCont',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: '_applyContFeeDiscount',
            type: 'bool',
          },
        ],
        name: 'setContributor',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setDecisionRetentionFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setImpactContFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setImpactOrgFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setNoImpactContFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setNoImpactOrgFee',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newDiscount',
            type: 'uint256',
          },
        ],
        name: 'setReferredContFeeDiscount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newDiscount',
            type: 'uint256',
          },
        ],
        name: 'setReferredOrgFeeDiscount',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setReferringContBonus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_newFee',
            type: 'uint256',
          },
        ],
        name: 'setReferringOrgBonus',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'destination',
            type: 'address',
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'transferAssets',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: 'newOwner',
            type: 'address',
          },
        ],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
        ],
        name: 'withdrawn',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [],
        name: 'beneficiaryAddress',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'collectIncomeValue',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'escrowHistory',
        outputs: [
          {
            internalType: 'address',
            name: 'organization',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'verifiedOrg',
            type: 'bool',
          },
          {
            internalType: 'address',
            name: 'addressReferringOrg',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'addressReferringCont',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'applyOrgFeeDiscount',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'applyContFeeDiscount',
            type: 'bool',
          },
          {
            internalType: 'enum Escrow.EscrowStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'contract IERC20',
            name: 'token',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'escrowHistoryLength',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getDecisionRetentionFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
        ],
        name: 'getEscrow',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'organization',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'contributor',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'jobId',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
              },
              {
                internalType: 'uint256',
                name: 'fee',
                type: 'uint256',
              },
              {
                internalType: 'bool',
                name: 'verifiedOrg',
                type: 'bool',
              },
              {
                internalType: 'address',
                name: 'addressReferringOrg',
                type: 'address',
              },
              {
                internalType: 'address',
                name: 'addressReferringCont',
                type: 'address',
              },
              {
                internalType: 'bool',
                name: 'applyOrgFeeDiscount',
                type: 'bool',
              },
              {
                internalType: 'bool',
                name: 'applyContFeeDiscount',
                type: 'bool',
              },
              {
                internalType: 'enum Escrow.EscrowStatus',
                name: 'status',
                type: 'uint8',
              },
              {
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
              },
            ],
            internalType: 'struct Escrow.EscrowData',
            name: '',
            type: 'tuple',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '_organization',
            type: 'address',
          },
          {
            internalType: 'address',
            name: '_contributor',
            type: 'address',
          },
          {
            internalType: 'string',
            name: '_jobId',
            type: 'string',
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256',
          },
        ],
        name: 'getEscrowId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getImpactContFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getImpactOrgFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getNoImpactContFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getNoImpactOrgFee',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getReferredContFeeDiscount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getReferredOrgFeeDiscount',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getReferringContBonus',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'getReferringOrgBonus',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'owner',
        outputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'tokensLength',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'transactionsHistory',
        outputs: [
          {
            internalType: 'uint256',
            name: 'escrowId',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'fee',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        name: 'validTokens',
        outputs: [
          {
            internalType: 'contract IERC20',
            name: '',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [],
        name: 'version',
        outputs: [
          {
            internalType: 'string',
            name: '',
            type: 'string',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    token: [
      {
        constant: true,
        inputs: [],
        name: 'name',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_spender',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'approve',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_from',
            type: 'address',
          },
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transferFrom',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'decimals',
        outputs: [
          {
            name: '',
            type: 'uint8',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: true,
        inputs: [],
        name: 'symbol',
        outputs: [
          {
            name: '',
            type: 'string',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        constant: false,
        inputs: [
          {
            name: '_to',
            type: 'address',
          },
          {
            name: '_value',
            type: 'uint256',
          },
        ],
        name: 'transfer',
        outputs: [
          {
            name: '',
            type: 'bool',
          },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        constant: true,
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
          {
            name: '_spender',
            type: 'address',
          },
        ],
        name: 'allowance',
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
      {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'owner',
            type: 'address',
          },
          {
            indexed: true,
            name: 'spender',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Approval',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: 'from',
            type: 'address',
          },
          {
            indexed: true,
            name: 'to',
            type: 'address',
          },
          {
            indexed: false,
            name: 'value',
            type: 'uint256',
          },
        ],
        name: 'Transfer',
        type: 'event',
      },
    ],
  },
};
