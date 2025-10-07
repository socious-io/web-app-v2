import { Escrow } from 'cardano-bridge';
import { Contract, parseUnits } from 'ethers';
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
