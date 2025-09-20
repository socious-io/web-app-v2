import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { ZKConfigProvider } from '@midnight-ntwrk/midnight-js-types';
import { Escrow } from 'cardano-bridge';
import { Contract, parseUnits } from 'ethers';
import {
  EscrowContractAPI,
  createEscrowAPI,
  hexToBytes32,
  hexToPublicKey,
  createCoinInfo,
  TESTNET_CONTRACT_ADDRESS,
} from 'socious-midnight/escrow-cli/src/browser-api';
import { MIDNIGHT_DECIMAL_FACTOR } from 'socious-midnight/escrow-cli/src/wallet-types';
import { config } from 'src/config';

import { dappConfig } from './dapp.config';
import { AllowanceParams, EscrowParams, FlattenToken, WithdrawnParams } from './dapp.types';

// Fee constants
const VERIFIED_ORG_FEE_PERCENT = 0.05; // 5% fee for verified organizations
const UNVERIFIED_ORG_FEE_PERCENT = 0.1; // 10% fee for unverified organizations
const CARDANO_DECIMAL_FACTOR = 1_000_000; // Lovelace conversion factor

let cardanoEscrow: Escrow | null = null;
export const getCardanoEscrow = () => {
  if (config.blockfrostProjectId && !cardanoEscrow) {
    cardanoEscrow = new Escrow({ blockfrost: config.blockfrostProjectId });
  }

  return cardanoEscrow;
};

// Midnight escrow helper
let midnightEscrowAPI: EscrowContractAPI | null = null;

export const getMidnightEscrow = () => {
  // Initialize the Midnight escrow API if not already done
  const initializeAPI = async () => {
    console.log('[Midnight Init] Starting API initialization...');

    if (midnightEscrowAPI) {
      console.log('[Midnight Init] API already initialized, returning cached instance');
      return midnightEscrowAPI;
    }

    // Get wallet provider from window.midnight
    console.log('[Midnight Init] Checking for Midnight wallet...');
    const midnightWallet = window.midnight?.mnLace;
    if (!midnightWallet) {
      console.error('[Midnight Init] Midnight wallet not found in window.midnight');
      throw new Error('Midnight wallet not found. Please connect your wallet first.');
    }
    console.log('[Midnight Init] Midnight wallet found');

    // Enable wallet if needed
    console.log('[Midnight Init] Checking if wallet is enabled...');
    if (midnightWallet.enable) {
      const isEnabled = await midnightWallet.isEnabled();
      console.log('[Midnight Init] Wallet enabled status:', isEnabled);

      if (!isEnabled) {
        console.log('[Midnight Init] Enabling wallet...');
        await midnightWallet.enable();
        console.log('[Midnight Init] Wallet enabled successfully');
      }
    }

    console.log('[Midnight Init] Getting wallet API...');
    const walletApi = await midnightWallet.enable();
    console.log('[Midnight Init] Wallet API obtained');

    // Set up providers for testnet
    const indexerUrl = 'https://indexer.testnet-02.midnight.network/api/v1/graphql';
    const indexerWsUrl = 'wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws';
    const nodeUrl = 'https://rpc.testnet-02.midnight.network';
    // Use Socious-hosted proof server
    const proofServerUrl = 'https://midnight-proofserver.socious.io';

    console.log('[Midnight Init] Setting up providers...');
    console.log('[Midnight Init] Indexer URL:', indexerUrl);
    console.log('[Midnight Init] Node URL:', nodeUrl);
    console.log('[Midnight Init] Proof Server URL:', proofServerUrl);

    // Note: In development, you may need to accept the SSL certificate for the indexer
    // by visiting https://indexer.testnet.midnight.network/api/v1/graphql in your browser
    const publicDataProvider = indexerPublicDataProvider(indexerUrl, indexerWsUrl);
    console.log('[Midnight Init] Public data provider created');

    // Create a browser-compatible ZK config provider
    const zkConfigProvider: ZKConfigProvider = {
      getZkConfig: async (contractAddress: string) => {
        console.log(`[Midnight Init] Fetching ZK config for contract: ${contractAddress}`);
        const response = await fetch(`${nodeUrl}/api/v1/zk-config/${contractAddress}`);
        if (!response.ok) {
          console.error(`[Midnight Init] Failed to fetch ZK config: ${response.statusText}`);
          throw new Error(`Failed to fetch ZK config: ${response.statusText}`);
        }
        const config = await response.json();
        console.log('[Midnight Init] ZK config fetched successfully');
        return config;
      },
    };

    console.log('[Midnight Init] Creating proof provider...');
    const proofProvider = httpClientProofProvider(proofServerUrl);
    console.log('[Midnight Init] Proof provider created');

    console.log('[Midnight Init] Creating private state provider...');
    const privateStateProvider = await levelPrivateStateProvider({
      privateStateStoreName: 'socious-escrow-private-state',
    });
    console.log('[Midnight Init] Private state provider created');

    const providers = {
      publicDataProvider,
      zkConfigProvider,
      proofProvider,
      privateStateProvider,
      walletProvider: walletApi,
    };

    console.log('[Midnight Init] Creating escrow API with contract address:', TESTNET_CONTRACT_ADDRESS);

    // Create the API instance with the testnet contract address
    try {
      // Increase timeout to 60 seconds and add retry logic
      const maxRetries = 2;
      let lastError;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`[Midnight Init] Attempt ${attempt} of ${maxRetries} to create escrow API...`);

          const timeoutPromise = new Promise((_, reject) => {
            setTimeout(
              () => reject(new Error(`Escrow API creation timed out after 60 seconds (attempt ${attempt})`)),
              60000,
            );
          });

          const apiPromise = createEscrowAPI(
            providers as any,
            TESTNET_CONTRACT_ADDRESS,
            {}, // No witnesses required
          );

          midnightEscrowAPI = (await Promise.race([apiPromise, timeoutPromise])) as EscrowContractAPI;
          console.log('[Midnight Init] Escrow API created successfully');
          break; // Success, exit retry loop
        } catch (error) {
          lastError = error;
          console.error(`[Midnight Init] Attempt ${attempt} failed:`, error);

          if (attempt < maxRetries) {
            console.log(`[Midnight Init] Retrying in 2 seconds...`);
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      if (!midnightEscrowAPI) {
        console.error('[Midnight Init] Failed to create escrow API after all retries');
        console.error('[Midnight Init] This might be due to:');
        console.error('  - Network connectivity issues with Midnight testnet');
        console.error('  - The contract may need to be deployed or synchronized');
        console.error('  - Wallet provider issues');
        console.error(
          '  - You may need to visit https://indexer.testnet-02.midnight.network/api/v1/graphql to accept SSL certificate',
        );
        throw lastError;
      }
    } catch (error) {
      console.error('[Midnight Init] Final error:', error);
      throw error;
    }

    return midnightEscrowAPI;
  };

  return {
    create: async (params: {
      contributor: string;
      feeAddress: string;
      org: string;
      fee: number;
      amount: number;
      token: string;
    }) => {
      console.log('[Midnight] Starting escrow creation with params:', params);

      try {
        console.log('[Midnight] Initializing API...');
        const api = await initializeAPI();
        console.log('[Midnight] API initialized successfully');

        // Generate a random nonce for the coin
        const nonce = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        console.log('[Midnight] Generated nonce:', nonce);

        // Create the escrow parameters
        const createParams = {
          contributor: hexToPublicKey(params.contributor),
          feeAddress: hexToPublicKey(params.feeAddress),
          org: hexToBytes32(params.org),
          fee: BigInt(params.fee),
          coin: createCoinInfo(nonce, BigInt(params.amount)),
        };
        console.log('[Midnight] Created params for escrow:', createParams);

        console.log('[Midnight] Calling api.createEscrow...');
        const result = await api.createEscrow(createParams);
        console.log('[Midnight] Escrow creation result:', result);

        const response = {
          id: result.escrowId.toString(),
          txHash: result.txData.transactionHash || '',
        };
        console.log('[Midnight] Returning response:', response);

        return response;
      } catch (error) {
        console.error('[Midnight] Failed to create escrow:', error);
        console.error('[Midnight] Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          fullError: error,
        });
        throw error;
      }
    },
    release: async (escrowId: string) => {
      try {
        const api = await initializeAPI();
        const txData = await api.releaseEscrow(BigInt(escrowId));

        return {
          txHash: txData.transactionHash || '',
        };
      } catch (error) {
        console.error('Failed to release Midnight escrow:', error);
        throw error;
      }
    },
    getEscrow: async (escrowId: string) => {
      try {
        const api = await initializeAPI();
        return await api.getEscrowById(Number(escrowId));
      } catch (error) {
        console.error('Failed to get Midnight escrow:', error);
        throw error;
      }
    },
  };
};

export const allowance = async (params: AllowanceParams) => {
  const { token, signer, amount, decimals, network: selectedNetwork } = params;

  if (!selectedNetwork) throw new Error('No network selected');

  const contract = new Contract(token, dappConfig.abis.token, signer);
  const tokenDecimals = decimals || (await contract.decimals());
  const parsedAmount = parseUnits(amount.toString(), tokenDecimals);

  const tx = await contract.approve(selectedNetwork.escrow, parsedAmount);
  await tx.wait();

  return {
    tx,
    amount: parsedAmount,
    decimals: tokenDecimals,
  };
};

export const escrow = async (params: EscrowParams) => {
  const {
    token: inputToken,
    signer,
    network: selectedNetwork,
    verifiedOrg,
    contributor,
    totalAmount,
    escrowAmount,
    projectId,
    addressReferringOrg,
    addressReferringCont,
    applyOrgFeeDiscount,
    applyContFeeDiscount,
  } = params;

  if (!selectedNetwork) throw new Error('No network selected');

  // Default token
  const token = inputToken || selectedNetwork.tokens[0].address;
  if (!token) throw new Error('No token specified or available in selected network');

  // Handle Cardano
  if (selectedNetwork.name === 'cardano') {
    const cardanoEscrow = getCardanoEscrow();
    if (!cardanoEscrow) {
      throw new Error('Cardano escrow service not available');
    }

    const txHash = await cardanoEscrow.deposit({
      unit: token || 'lovelace',
      quantity: `${totalAmount * CARDANO_DECIMAL_FACTOR}`,
    });

    // Store metadata for release
    return {
      txHash,
      id: txHash,
      token,
      verified: verifiedOrg,
      contributor,
      amount: totalAmount,
      fee: totalAmount - escrowAmount,
    };
  }

  // Handle Midnight
  if (selectedNetwork.name === 'midnight') {
    console.log('[Midnight Escrow] Starting Midnight escrow creation');
    console.log('[Midnight Escrow] Total amount:', totalAmount);
    console.log('[Midnight Escrow] Escrow amount:', escrowAmount);
    console.log('[Midnight Escrow] Contributor:', contributor);
    console.log('[Midnight Escrow] Project ID:', projectId);

    const midnightEscrow = getMidnightEscrow();

    const feeAmount = totalAmount - escrowAmount;
    console.log('[Midnight Escrow] Fee amount calculated:', feeAmount);

    // Convert addresses to hex format (remove prefix if exists)
    const contributorHex = contributor.startsWith('0x') ? contributor.slice(2) : contributor;
    const feeAddressHex = config.midnightFeeAddress?.startsWith('mn_')
      ? config.midnightFeeAddress.slice(3) // Remove 'mn_' prefix if it's a Midnight address
      : config.midnightFeeAddress || '';

    // Convert project ID to hex (pad to 32 bytes)
    const projectIdHex = projectId.padStart(64, '0');

    console.log('[Midnight Escrow] Prepared parameters:');
    console.log('  - Contributor hex:', contributorHex);
    console.log('  - Fee address hex:', feeAddressHex);
    console.log('  - Project ID hex:', projectIdHex);
    console.log('  - Fee (in smallest units):', Math.floor(feeAmount * MIDNIGHT_DECIMAL_FACTOR));
    console.log('  - Amount (in smallest units):', Math.floor(totalAmount * MIDNIGHT_DECIMAL_FACTOR));

    // Validate that we have a Midnight address, not a Cardano address
    if (contributor.startsWith('addr_')) {
      console.error('[Midnight Escrow] ERROR: Cardano address provided instead of Midnight address');
      throw new Error(
        'Invalid address: A Cardano address was provided but Midnight network requires a Midnight address. Please connect a Midnight wallet.',
      );
    }

    // Validate project ID format and convert properly
    const cleanProjectId = projectId.replace(/-/g, ''); // Remove hyphens from UUID
    if (cleanProjectId.length > 64) {
      console.error('[Midnight Escrow] Project ID too long after cleaning:', cleanProjectId);
      throw new Error('Project ID is too long for Midnight network');
    }

    try {
      console.log('[Midnight Escrow] Calling midnight escrow create...');

      // Try using the real API with Socious proof server
      const USE_MOCK = false; // Using real API with Socious proof server

      let result;
      if (USE_MOCK) {
        console.warn('[Midnight Escrow] MOCK MODE: Using simulated response');
        console.warn('[Midnight Escrow] To use real API, ensure proof server is accessible');

        // Generate mock escrow ID and transaction hash
        const mockEscrowId = Date.now().toString();
        const mockTxHash =
          '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        result = {
          id: mockEscrowId,
          txHash: mockTxHash,
        };

        console.log('[Midnight Escrow] Mock escrow created:', result);
      } else {
        result = await midnightEscrow.create({
          contributor: contributorHex,
          feeAddress: feeAddressHex,
          org: projectIdHex,
          fee: Math.floor(feeAmount * MIDNIGHT_DECIMAL_FACTOR),
          amount: Math.floor(totalAmount * MIDNIGHT_DECIMAL_FACTOR),
          token: token || 'dust',
        });
        console.log('[Midnight Escrow] Create completed successfully:', result);
      }

      const response = {
        txHash: result.txHash,
        id: result.id,
        token: token || 'dust',
        verified: verifiedOrg,
        contributor,
        amount: totalAmount,
        fee: feeAmount,
      };

      console.log('[Midnight Escrow] Returning response:', response);
      return response;
    } catch (error) {
      console.error('[Midnight Escrow] Failed to create escrow:', error);
      console.error('[Midnight Escrow] Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      // Re-throw with more context
      throw new Error(`Midnight escrow creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Handle EVM
  const tokenConfig = selectedNetwork.tokens.find(t => t.address === token);
  if (!tokenConfig) throw new Error("Offered token is not exists on this network you'd selected!");

  // First need allowance to verify that transaction is possible for smart contract
  const approved = await allowance({
    network: selectedNetwork,
    signer,
    token: token || '',
    amount: totalAmount,
    decimals: tokenConfig.decimals,
  });

  const contract = new Contract(selectedNetwork.escrow, dappConfig.abis.escrow, signer);

  // TODO right way is getting events but on huge network it wont works properly with current version
  /* const event = new Promise<EscrowActionEventData>((resolve, reject) => {
    contract.once('EscrowAction', (id: BigInt, fee: BigInt, amount: BigInt, org, jobId, token) => {
      resolve({ id: id.toString(), fee: fee.toString(), amount: amount.toString(), org, jobId, token }); // Resolve with event data
    });
  }); */

  const tmpAddress = '0x0000000000000000000000000000000000000000';

  const tx = await contract.newEscrow(
    contributor,
    projectId,
    parseUnits(`${escrowAmount}`, approved?.decimals),
    verifiedOrg,
    addressReferringOrg || tmpAddress,
    addressReferringCont || tmpAddress,
    applyOrgFeeDiscount,
    applyContFeeDiscount,
    token,
  );

  await tx.wait();

  const length: bigint = await contract.escrowHistoryLength();

  return {
    txHash: tx.hash,
    id: (length - BigInt(1)).toString(),
    token,
  };
};

export const withdrawnEscrow = async (params: WithdrawnParams) => {
  const { meta, escrowId, signer, network: selectedNetwork } = params;

  if (!selectedNetwork) throw new Error('No network selected');

  // Handle Cardano
  if (selectedNetwork.name === 'cardano') {
    try {
      // Determine fee percentage based on organization verification status
      const feePercent = meta.verifiedOrg ? VERIFIED_ORG_FEE_PERCENT : UNVERIFIED_ORG_FEE_PERCENT;

      // FIXED: Calculate fee correctly (percentage of amount + any additional fees)
      const platformFee = meta.amount * feePercent;
      const totalFee = platformFee + (meta?.fee || 0);
      const contributorAmount = meta.amount - totalFee;

      // Validate amounts
      if (contributorAmount <= 0) {
        throw new Error('Invalid amount: fee exceeds total amount');
      }

      const cardanoEscrow = getCardanoEscrow();
      if (!cardanoEscrow) {
        throw new Error('Cardano escrow service not available');
      }

      const tx = await cardanoEscrow.release({
        tx: escrowId,
        payouts: [
          {
            address: config.cardanoPayoutFeeAddress,
            amount: Math.trunc(totalFee * CARDANO_DECIMAL_FACTOR),
          },
          {
            address: meta.contributor,
            amount: Math.trunc(contributorAmount * CARDANO_DECIMAL_FACTOR),
          },
        ],
      });

      return tx;
    } catch (error) {
      console.error('Cardano escrow release failed:', error);
      throw new Error(`Failed to release Cardano escrow: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Handle Midnight
  if (selectedNetwork.name === 'midnight') {
    try {
      const midnightEscrow = getMidnightEscrow();
      const result = await midnightEscrow.release(escrowId);
      return result.txHash;
    } catch (error) {
      console.error('Midnight escrow release failed:', error);
      throw new Error(`Failed to release Midnight escrow: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // Handle EVM
  const contract = new Contract(selectedNetwork.escrow, dappConfig.abis.escrow, signer);
  const tx = await contract.withdrawn(escrowId);

  await tx.wait();

  return tx.hash;
};

export const getSelectedTokenDetail = (address: string) => {
  // Special handling for Midnight's tDUST token
  if (address === 'dust') {
    return {
      name: 'Test DUST',
      symbol: 'tDUST',
      address: 'dust',
    };
  }

  const flattenedTokens: FlattenToken[] = [];

  for (const [network, chainArray] of Object.entries(dappConfig)) {
    if (network === 'testnet' || network === 'mainet') {
      chainArray.forEach(chain => {
        chain.tokens.forEach(token => {
          flattenedTokens.push({
            network,
            chain: chain.chain,
            escrow: chain.escrow,
            logic: chain.logic,
            ...token,
          });
        });
      });
    }
  }
  const selectedToken = flattenedTokens.find(token => token.address === address);

  return {
    name: selectedToken?.name || '',
    symbol: selectedToken?.symbol || '',
    address: selectedToken?.address || '',
  };
};
