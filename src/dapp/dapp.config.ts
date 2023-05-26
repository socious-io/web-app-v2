import { DappConfig } from './dapp.types';
import { polygon, polygonMumbai, Chain } from 'wagmi/chains';

export const milkomeda: Chain = {
  id: 2002,
  name: 'Milkomeda',
  network: 'Milkomeda',
  nativeCurrency: {
    name: 'MILKADA',
    symbol: 'MILKADA',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://rpc-mainnet-algorand-rollup.a1.milkomeda.com'],
    },
    public: {
      http: ['https://rpc-mainnet-algorand-rollup.a1.milkomeda.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Explorer',
      url: 'https://explorer-mainnet-algorand-rollup.a1.milkomeda.com',
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
      escrow: '0x8372c3F32F1f38BcAb65947a36F5b3E867a117Da',
      tokens: [
        {
          name: 'USDC',
          symbol: 'USDC',
          address: '0x95cEc3b0a113AEf23eaFA4eD1B48489806bF6C82',
        },
      ],
    },
    {
      chain: polygonMumbai,
      escrow: '0xF2B4BCc3F1687288a8c0c06Ee720350CA09dfb23',
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
      escrow: 'MUST BE FIXED WITH DEPLOYED ESCROW ADDRESS ON MILKOMEDA',
      tokens: [
        {
          name: 'USD Coin',
          symbol: 'USDC',
          address: '0xB44a9B6905aF7c801311e8F4E76932ee959c663C',
        },
        {
          name: 'Tether',
          symbol: 'USDT',
          address: '0x80A16016cC4A2E6a2CACA8a4a498b1699fF0f844',
        },
      ],
    },
    {
      chain: polygon,
      escrow: 'MUST BE FIXED WITH DEPLOYED ESCROW ADDRESS ON POLYGON',
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
      ],
    },
  ],

  abis: {
    escrow: [
      {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
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
          {
            internalType: 'uint256',
            name: '_fee',
            type: 'uint256',
          },
          {
            internalType: 'enum Escrow.EscrowStatus',
            name: '_status',
            type: 'uint8',
          },
          {
            internalType: 'contract IERC20',
            name: '_token',
            type: 'address',
          },
        ],
        name: 'addEscrowData',
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
            name: '_escrowId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_refund',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: '_verifiedContributer',
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
        name: 'getTokens',
        outputs: [
          {
            internalType: 'contract IERC20[]',
            name: '',
            type: 'address[]',
          },
        ],
        stateMutability: 'view',
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
        name: 'renounceOwnership',
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
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '_escrowId',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: '_verifiedContributer',
            type: 'bool',
          },
        ],
        name: 'withdrawn',
        outputs: [],
        stateMutability: 'nonpayable',
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
