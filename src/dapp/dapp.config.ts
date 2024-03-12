import { DappConfig, Chain } from './dapp.types';

export const milkomeda: Chain = {
  chainId: 2001,
  name: 'Milkomeda',
  currency: 'MILKADA',
  rpcUrl: 'https://rpc-mainnet-cardano-evm.c1.milkomeda.com/',
  explorerUrl: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/',
};

export const milkomedaTestnet: Chain = {
  chainId: 200101,
  name: 'Milkomeda Testnet',
  currency: 'MILKTADA',
  rpcUrl: 'https://rpc-devnet-cardano-evm.c1.milkomeda.com',
  explorerUrl: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com',
  testnet: true,
};

export const bscTestnet: Chain = {
  chainId: 97,
  name: 'BNB Smart Chain Testnet',
  currency: 'BNB',
  rpcUrl: 'https://data-seed-prebsc-2-s2.binance.org:8545/',
  explorerUrl: 'https://testnet.bscscan.com',
  testnet: true,
};

export const bsc: Chain = {
  chainId: 56,
  name: 'BNB Smart Chain',
  currency: 'BNB',
  rpcUrl: 'https://bsc-dataseed1.defibit.io',
  explorerUrl: 'https://bscscan.com',
  testnet: true,
};

export const dappConfig: DappConfig = {
  walletConnetProjectId: '40ce0f320baccb067909071c983ca357',
  testnet: [
    {
      chain: milkomedaTestnet,
      escrow: '0xAC87EDb9209E9637549c43fA9Ca267b4d4577959',
      logic: '0xAC87EDb9209E9637549c43fA9Ca267b4d4577959',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0xC12F6Ee5c853393105f29EF0310e61e6B494a70F',
        },
      ],
    },
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
  ],
  mainet: [
    {
      chain: milkomeda,
      logic: '0xA9D4e4351ca77e5a47673f13DD4d0745dE175B38',
      escrow: '0xA9D4e4351ca77e5a47673f13DD4d0745dE175B38',
      tokens: [
        {
          name: 'USD Coin',
          symbol: 'USDC',
          address: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
        },
        {
          name: 'USD Coin',
          symbol: 'mUSDC',
          address: '0x063139a927FE02B3a6A5E0d5B48c8BeDFA7de954',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
        },
        {
          name: 'Dai',
          symbol: 'DAI',
          address: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
        },
        {
          name: 'Djed',
          symbol: 'SC',
          address: '0xbfB54440448e6b702fa2A1d7033cd5fB0d9C5A27',
        },
        {
          name: 'Wrapped ADA',
          symbol: 'WADA',
          address: '0xAE83571000aF4499798d1e3b0fA0070EB3A3E3F9',
        },
      ],
    },
    {
      chain: bsc,
      escrow: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
      logic: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
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
    /* {
      chain: polygon,
      escrow: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
      tokens: [
        {
          name: 'USD Coin',
          symbol: 'USDC',
          address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        },
        {
          name: 'Dai',
          symbol: 'DAI',
          address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        },
      ],
    }, */
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
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: '_applyContFeeDiscount',
            type: 'bool'
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
            type: 'bool'
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
        stateMutability: 'nonpayable',
        type: 'constructor',
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
