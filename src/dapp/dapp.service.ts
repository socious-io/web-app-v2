import Web3 from 'web3';

import { dappConfig } from './dapp.config';
import { NETWORKS } from './dapp.connect';
import { EscrowParams } from './dapp.types';

const makeAmount = async (web3: Web3, token: string, amount: number, decimals?: number): Promise<string> => {
  if (!decimals) {
    const erc20Contract = new web3.eth.Contract(dappConfig.abis.token, token);
    decimals = await erc20Contract.methods.decimals().call();
    if (!decimals) decimals = 18;
  }

  const parts = amount.toString().split('.');
  let fraction = parts[1] || '0';
  while (fraction.length < decimals) {
    fraction += '0';
  }
  const units = (parts[0] || '0') + fraction;
  return units;

  // return web3.utils.toBN(amount*100).mul(web3.utils.toBN(Math.pow(10, decimals-2))).toString();
};

export const allowance = async (web3: Web3, token: string, amount: number, decimals?: number) => {
  // TODO: we may configure this fee ratio later
  const allowanceAmount = await makeAmount(web3, token, amount, decimals);
  const erc20Contract = new web3.eth.Contract(dappConfig.abis.token, token);

  const chainId = await web3.eth.getChainId();
  const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];

  const approved = await erc20Contract.methods
    .approve(selectedNetwork.escrow, allowanceAmount)
    .send({ from: web3.eth.defaultAccount });

  if (!approved) throw new Error('Allowance not approved for escorw');
};

export const balance = async (web3: Web3, token: string) => {
  const erc20Contract = new web3.eth.Contract(dappConfig.abis.token, token);
  const result = await erc20Contract.methods.balanceOf(web3.eth.defaultAccount);

  return web3.utils.fromWei(result);
};

export const withdrawnEscrow = async (web3: Web3, escrowId: string) => {
  const chainId = await web3.eth.getChainId();
  const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];
  const escrowContract = new web3.eth.Contract(dappConfig.abis.escrow, selectedNetwork.escrow);
  const result = await escrowContract.methods.withdrawn(escrowId).send({ from: web3.eth.defaultAccount });

  return result.transactionHash;
};

export const escrow = async (params: EscrowParams) => {
  const chainId = await params.web3.eth.getChainId();
  const selectedNetwork = NETWORKS.filter((n) => n.chain.id === chainId)[0];
  let token = params.token;
  if (!token) token = selectedNetwork.tokens[0].address;
  const tokenConfig = selectedNetwork.tokens.find((t) => t.address === token);
  if (!tokenConfig) throw new Error("Offered token is not exists on this network you'd selected!");
  // First need allowance to verify that transaction is possible for smart contract
  await allowance(params.web3, token, params.totalAmount, tokenConfig?.decimals);
  const escrowContract = new params.web3.eth.Contract(dappConfig.abis.escrow, selectedNetwork.escrow);

  const result = await escrowContract.methods
    .newEscrow(
      params.contributor,
      params.projectId,
      await makeAmount(params.web3, token, params.escrowAmount, tokenConfig?.decimals),
      params.verifiedOrg,
      token,
    )
    .send({ from: params.web3.eth.defaultAccount });

  // Need to share <txHash> to backend on Payment API to verify and create Escrow on BE side too
  const txHash = result.transactionHash;
  return {
    // Escrow Action will trigger right after success Escrow
    ...result.events.EscrowAction.returnValues,
    txHash,
  };
};
