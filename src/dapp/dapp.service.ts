import { Contract, parseUnits } from 'ethers';

import { dappConfig } from './dapp.config';
import { NETWORKS } from './dapp.connect';
import { AllowanceParams, EscrowParams, FlattenToken, WithdrawnParams } from './dapp.types';

export const allowance = async (params: AllowanceParams) => {
  const contract = new Contract(params.token, dappConfig.abis.token, params.signer);
  const decimals = params.decimals || (await contract.decimals());
  const amount = parseUnits(`${params.amount}`, decimals);
  const selectedNetwork = NETWORKS.filter(n => n.chain.id === params.chainId)[0];

  const tx = await contract.approve(selectedNetwork.escrow, amount);
  await tx.wait();
  return { tx, amount, decimals };
};

export const escrow = async (params: EscrowParams) => {
  const { chainId, signer } = params;
  const selectedNetwork = NETWORKS.filter(n => n.chain.id === chainId)[0];
  let token = params.token;
  if (!token) token = selectedNetwork.tokens[0].address;
  const tokenConfig = selectedNetwork.tokens.find(t => t.address === token);
  if (!tokenConfig) throw new Error("Offered token is not exists on this network you'd selected!");

  // First need allowance to verify that transaction is possible for smart contract
  const approved = await allowance({
    chainId,
    signer,
    token,
    amount: params.totalAmount,
    decimals: tokenConfig.decimals,
  });

  const contract = new Contract(selectedNetwork.escrow, dappConfig.abis.escrow, params.signer);

  // TODO right way is getting events but on huge network it wont works properly with current version
  /* const event = new Promise<EscrowActionEventData>((resolve, reject) => {
    contract.once('EscrowAction', (id: BigInt, fee: BigInt, amount: BigInt, org, jobId, token) => {
      resolve({ id: id.toString(), fee: fee.toString(), amount: amount.toString(), org, jobId, token }); // Resolve with event data
    });
  }); */

  const tmpAddress = '0x0000000000000000000000000000000000000000';

  const tx = await contract.newEscrow(
    params.contributor,
    params.projectId,
    parseUnits(`${params.escrowAmount}`, approved.decimals),
    params.verifiedOrg,
    params.addressReferringOrg || tmpAddress,
    params.addressReferringCont || tmpAddress,
    params.applyOrgFeeDiscount,
    params.applyContFeeDiscount,
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
  const selectedNetwork = NETWORKS.filter(n => n.chain.id === params.chainId)[0];
  const contract = new Contract(selectedNetwork.escrow, dappConfig.abis.escrow, params.signer);
  const tx = await contract.withdrawn(params.escrowId);

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
