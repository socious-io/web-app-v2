import { DappConfig } from './dapp.types';
import { bsc, bscTestnet, polygon, polygonMumbai, Chain } from 'wagmi/chains';

export const milkomeda: Chain = {
  id: 2001,
  name: 'Milkomeda',
  network: 'Milkomeda',
  nativeCurrency: {
    name: 'MILKADA',
    symbol: 'MILKADA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet-cardano-evm.c1.milkomeda.com/'],
    },
    public: {
      http: ['https://rpc-mainnet-cardano-evm.c1.milkomeda.com/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer-mainnet-cardano-evm.c1.milkomeda.com/',
    },
  },
};

export const milkomedaTestnet: Chain = {
  id: 200101,
  name: 'Milkomeda Testnet',
  network: 'Milkomeda',
  nativeCurrency: {
    name: 'MILKTADA',
    symbol: 'MILKTADA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-devnet-cardano-evm.c1.milkomeda.com'],
    },
    public: {
      http: ['https://rpc-devnet-cardano-evm.c1.milkomeda.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer-devnet-cardano-evm.c1.milkomeda.com',
    },
  },
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
          address: '0xC12F6Ee5c853393105f29EF0310e61e6B494a70F'
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
    {
      chain: polygonMumbai,
      escrow: '0x6141408AdB801e6C657Db14b9b1410B3a4a07935',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0x057e82120fc16ddDAF8B1Fb697ab5506f8874B6e',
        },
      ],
    },
  ],
  mainet: [
    {
      chain: milkomeda,
      logic: '0x71F80cbF7de3894c4014284F3D241A825f2B0dF3',
      escrow: '0xF2B4BCc3F1687288a8c0c06Ee720350CA09dfb23',
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
      escrow: 'changeme',
      logic: 'changeme',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: 'changeme',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: 'changeme',
        },
      ],
    },
    {
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
