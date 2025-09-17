import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
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
    if (midnightEscrowAPI) return midnightEscrowAPI;

    // Get wallet provider from window.midnight
    const midnightWallet = window.midnight?.mnLace;
    if (!midnightWallet) {
      throw new Error('Midnight wallet not found. Please connect your wallet first.');
    }

    // Enable wallet if needed
    if (midnightWallet.enable && !(await midnightWallet.isEnabled())) {
      await midnightWallet.enable();
    }

    const walletApi = await midnightWallet.enable();

    // Set up providers for testnet
    const indexerUrl = 'https://indexer.testnet.midnight.network/api/v1/graphql';
    const indexerWsUrl = 'wss://indexer.testnet.midnight.network/api/v1/graphql/ws';
    const nodeUrl = 'https://rpc.testnet.midnight.network';
    const proofServerUrl = 'https://prover.testnet.midnight.network';

    const publicDataProvider = indexerPublicDataProvider(indexerUrl, indexerWsUrl);
    const zkConfigProvider = new NodeZkConfigProvider(nodeUrl);
    const proofProvider = httpClientProofProvider(proofServerUrl);
    const privateStateProvider = await levelPrivateStateProvider({
      privateStateStoreName: 'socious-escrow-private-state',
    });

    const providers = {
      publicDataProvider,
      zkConfigProvider,
      proofProvider,
      privateStateProvider,
      walletProvider: walletApi,
    };

    // Create the API instance with the testnet contract address
    midnightEscrowAPI = await createEscrowAPI(
      providers as any,
      TESTNET_CONTRACT_ADDRESS,
      {}, // No witnesses required
    );

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
      try {
        const api = await initializeAPI();

        // Generate a random nonce for the coin
        const nonce = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        // Create the escrow parameters
        const createParams = {
          contributor: hexToPublicKey(params.contributor),
          feeAddress: hexToPublicKey(params.feeAddress),
          org: hexToBytes32(params.org),
          fee: BigInt(params.fee),
          coin: createCoinInfo(nonce, BigInt(params.amount)),
        };

        const result = await api.createEscrow(createParams);

        return {
          id: result.escrowId.toString(),
          txHash: result.txData.transactionHash || '',
        };
      } catch (error) {
        console.error('Failed to create Midnight escrow:', error);
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
    const midnightEscrow = getMidnightEscrow();

    const feeAmount = totalAmount - escrowAmount;

    // Convert addresses to hex format (remove prefix if exists)
    const contributorHex = contributor.startsWith('0x') ? contributor.slice(2) : contributor;
    const feeAddressHex = config.midnightFeeAddress.startsWith('mn_')
      ? config.midnightFeeAddress.slice(3) // Remove 'mn_' prefix if it's a Midnight address
      : config.midnightFeeAddress;

    // Convert project ID to hex (pad to 32 bytes)
    const projectIdHex = projectId.padStart(64, '0');

    const result = await midnightEscrow.create({
      contributor: contributorHex,
      feeAddress: feeAddressHex,
      org: projectIdHex,
      fee: Math.floor(feeAmount * MIDNIGHT_DECIMAL_FACTOR),
      amount: Math.floor(totalAmount * MIDNIGHT_DECIMAL_FACTOR),
      token: token || 'dust',
    });

    return {
      txHash: result.txHash,
      id: result.id,
      token: token || 'dust',
      verified: verifiedOrg,
      contributor,
      amount: totalAmount,
      fee: feeAmount,
    };
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
