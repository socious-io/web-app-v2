import { ConStr0, conStr0, PubKeyAddress, pubKeyAddress, Value, value } from '@meshsdk/common';
import {
  applyParamsToScript,
  Asset,
  BrowserWallet,
  ConStr1,
  conStr1,
  DEFAULT_REDEEMER_BUDGET,
  deserializeAddress,
  deserializeDatum,
  IFetcher,
  LanguageVersion,
  mConStr1,
  mConStr2,
  mergeAssets,
  MeshTxBuilder,
  MeshValue,
  MeshWallet,
  serializeAddressObj,
  serializePlutusScript,
  UTxO,
} from '@meshsdk/core';
import { plutus } from 'aiken-contracts';
import { Contract, parseUnits } from 'ethers';

import { dappConfig } from './dapp.config';
import { NETWORKS } from './dapp.connect';
import { AllowanceParams, EscrowParams, WithdrawnParams } from './dapp.types';

export const allowance = async (params: AllowanceParams) => {
  const contract = new Contract(params.token, dappConfig.abis.token, params.signer);
  const decimals = params.decimals || (await contract.decimals());
  const amount = parseUnits(`${params.amount}`, decimals);
  const selectedNetwork = NETWORKS.filter(n => n.chain.chainId === params.chainId)[0];

  const tx = await contract.approve(selectedNetwork.escrow, amount);
  await tx.wait();
  return { tx, amount, decimals };
};

export const escrow = async (params: EscrowParams) => {
  const { chainId, signer } = params;
  const selectedNetwork = NETWORKS.filter(n => n.chain.chainId === chainId)[0];
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
  const selectedNetwork = NETWORKS.filter(n => n.chain.chainId === params.chainId)[0];
  const contract = new Contract(selectedNetwork.escrow, dappConfig.abis.escrow, params.signer);
  const tx = await contract.withdrawn(params.escrowId);

  await tx.wait();

  return tx.hash;
};

export type InitiationDatum =
  //       initiator      assets  fee           assets
  ConStr0<[PubKeyAddress, Value, PubKeyAddress, Value]>;
// FIXME(Elaine): anything below this line will error

export const initiateEscrowDatum = (
  walletAddress: string,
  amount: Asset[],
  feeAddress: string,
  feeAmount: Asset[],
): InitiationDatum => {
  const { pubKeyHash, stakeCredentialHash } = deserializeAddress(walletAddress);
  const { pubKeyHash: feePubKeyHash, stakeCredentialHash: feeStakeCredentialHash } = deserializeAddress(feeAddress);
  return conStr0([
    pubKeyAddress(pubKeyHash, stakeCredentialHash),
    value(amount),
    pubKeyAddress(feePubKeyHash, feeStakeCredentialHash),
    value(feeAmount),
  ]);
};

export type MeshTxInitiatorInput = {
  mesh: MeshTxBuilder;
  fetcher?: IFetcher;
  wallet?: BrowserWallet | MeshWallet;
  networkId?: number;
  stakeCredential?: string;
  version?: number;
};

export class MeshTxInitiator {
  mesh: MeshTxBuilder;
  fetcher?: IFetcher;
  wallet?: BrowserWallet | MeshWallet;
  stakeCredential?: string;
  networkId = 0;
  version = 2;
  languageVersion: LanguageVersion = 'V2';

  constructor({
    mesh,
    fetcher,
    wallet,
    networkId = 0,
    stakeCredential = 'c08f0294ead5ab7ae0ce5471dd487007919297ba95230af22f25e575',
    version = 2,
  }: MeshTxInitiatorInput) {
    this.mesh = mesh;
    if (fetcher) {
      this.fetcher = fetcher;
    }
    if (wallet) {
      this.wallet = wallet;
    }

    this.networkId = networkId;
    switch (this.networkId) {
      case 1:
        this.mesh.setNetwork('mainnet');
        break;
      default:
        this.mesh.setNetwork('preprod');
    }

    this.version = version;
    switch (this.version) {
      case 1:
        this.languageVersion = 'V2';
        break;
      default:
        this.languageVersion = 'V3';
    }

    if (stakeCredential) {
      this.stakeCredential = stakeCredential;
    }
  }

  getScriptAddress = (scriptCbor: string) => {
    const { address } = serializePlutusScript(
      { code: scriptCbor, version: this.languageVersion },
      this.stakeCredential,
      this.networkId,
    );
    return address;
  };

  protected signSubmitReset = async () => {
    const signedTx = this.mesh.completeSigning();
    const txHash = await this.mesh.submitTx(signedTx);
    this.mesh.reset();
    return txHash;
  };

  protected queryUtxos = async (walletAddress: string): Promise<UTxO[]> => {
    if (this.fetcher) {
      const utxos = await this.fetcher.fetchAddressUTxOs(walletAddress);
      return utxos;
    }
    return [];
  };

  protected getWalletDappAddress = async () => {
    if (this.wallet) {
      const usedAddresses = await this.wallet.getUsedAddresses();
      if (usedAddresses.length > 0) {
        return usedAddresses[0];
      }
      const unusedAddresses = await this.wallet.getUnusedAddresses();
      if (unusedAddresses.length > 0) {
        return unusedAddresses[0];
      }
    }
    return '';
  };

  protected getWalletCollateral = async (): Promise<UTxO | undefined> => {
    if (this.wallet) {
      const utxos = await this.wallet.getCollateral();
      return utxos[0];
    }
    return undefined;
  };

  protected getWalletUtxosWithMinLovelace = async (lovelace: number, providedUtxos: UTxO[] = []) => {
    let utxos: UTxO[] = providedUtxos;
    if (this.wallet && (!providedUtxos || providedUtxos.length === 0)) {
      utxos = await this.wallet.getUtxos();
    }
    return utxos.filter(u => {
      const lovelaceAmount = u.output.amount.find((a: any) => a.unit === 'lovelace')?.quantity;
      return Number(lovelaceAmount) > lovelace;
    });
  };

  protected getWalletUtxosWithToken = async (assetHex: string, userUtxos: UTxO[] = []) => {
    let utxos: UTxO[] = userUtxos;
    if (this.wallet && userUtxos.length === 0) {
      utxos = await this.wallet.getUtxos();
    }
    return utxos.filter(u => {
      const assetAmount = u.output.amount.find((a: any) => a.unit === assetHex)?.quantity;
      return Number(assetAmount) >= 1;
    });
  };

  protected getAddressUtxosWithMinLovelace = async (
    walletAddress: string,
    lovelace: number,
    providedUtxos: UTxO[] = [],
  ) => {
    let utxos: UTxO[] = providedUtxos;
    if (this.fetcher && (!providedUtxos || providedUtxos.length === 0)) {
      utxos = await this.fetcher.fetchAddressUTxOs(walletAddress);
    }
    return utxos.filter(u => {
      const lovelaceAmount = u.output.amount.find((a: any) => a.unit === 'lovelace')?.quantity;
      return Number(lovelaceAmount) > lovelace;
    });
  };

  protected getAddressUtxosWithToken = async (walletAddress: string, assetHex: string, userUtxos: UTxO[] = []) => {
    let utxos: UTxO[] = userUtxos;
    if (this.fetcher && userUtxos.length === 0) {
      utxos = await this.fetcher.fetchAddressUTxOs(walletAddress);
    }
    return utxos.filter(u => {
      const assetAmount = u.output.amount.find((a: any) => a.unit === assetHex)?.quantity;
      return Number(assetAmount) >= 1;
    });
  };

  protected getWalletInfoForTx = async () => {
    const utxos = await this.wallet?.getUtxos();
    const collateral = await this.getWalletCollateral();
    const walletAddress = await this.getWalletDappAddress();
    if (!utxos || utxos?.length === 0) {
      throw new Error('No utxos found');
    }
    if (!collateral) {
      throw new Error('No collateral found');
    }
    if (!walletAddress) {
      throw new Error('No wallet address found');
    }
    return { utxos, collateral, walletAddress };
  };

  protected _getUtxoByTxHash = async (txHash: string, scriptCbor?: string): Promise<UTxO | undefined> => {
    if (this.fetcher) {
      const utxos = await this.fetcher?.fetchUTxOs(txHash);
      let scriptUtxo = utxos[0];

      if (scriptCbor) {
        const scriptAddr = serializePlutusScript(
          { code: scriptCbor, version: this.languageVersion },
          this.stakeCredential,
          this.networkId,
        ).address;
        scriptUtxo = utxos.filter(utxo => utxo.output.address === scriptAddr)[0] || utxos[0];
      }

      return scriptUtxo;
    }

    return undefined;
  };
}

export type ActiveEscrowDatum = ConStr1<
  // initiator     assets  recipient     assets   fee           assets
  [PubKeyAddress, Value, PubKeyAddress, Value, PubKeyAddress, Value]
>;
export const activeEscrowDatum = (
  initiationDatum: InitiationDatum,
  walletAddress: string,
  amount: Asset[],
  feeAddress: string,
  feeAmount: Asset[],
): ActiveEscrowDatum => {
  const { pubKeyHash, stakeCredentialHash } = deserializeAddress(walletAddress);
  const [initiator, initiatorAmount] = initiationDatum.fields;
  const { pubKeyHash: feePubKeyHash, stakeCredentialHash: feeStakeCredentialHash } = deserializeAddress(feeAddress);
  return conStr1([
    initiator,
    initiatorAmount,
    pubKeyAddress(pubKeyHash, stakeCredentialHash),
    value(amount),
    pubKeyAddress(feePubKeyHash, feeStakeCredentialHash),
    value(feeAmount),
  ]);
};

export type RecipientDepositRedeemer = ConStr0<[PubKeyAddress, Value]>;
// export const recipientDepositRedeemer = (recipient: string, depositAmount: Asset[]) =>
// initiateEscrowDatum(recipient, depositAmount);
//NOTE(Elaine): Previous version of this relied on the CBOR coincidentally being identical
// between initiation datum and recipient deposit redeemer. This is no longer the case after fees

export const recipientDepositRedeemer = (recipient: string, depositAmount: Asset[]) => {
  const { pubKeyHash, stakeCredentialHash } = deserializeAddress(recipient);
  return conStr0([pubKeyAddress(pubKeyHash, stakeCredentialHash), value(depositAmount)]);
};

export class MeshEscrowContract extends MeshTxInitiator {
  scriptCbor: string;
  scriptAddress: string;

  constructor(inputs: MeshTxInitiatorInput) {
    super(inputs);
    this.scriptCbor = this.getScriptCbor();
    this.scriptAddress = this.getScriptAddress(this.scriptCbor);
  }

  getScriptCbor = () => {
    return applyParamsToScript(plutus.validators[0]!.compiledCode, []);
    // switch (this.version) {
    //   case 2:
    //     return applyParamsToScript(plutus.validators[0]!.compiledCode, []);
    //   default:
    //     return applyParamsToScript(plutus.validators[0]!.compiledCode, []);
    // }
  };

  initiateEscrow = async (escrowAmount: Asset[], feeAddress: string, feeAmount: Asset[]): Promise<string> => {
    const { utxos, walletAddress } = await this.getWalletInfoForTx();

    await this.mesh
      .txOut(this.scriptAddress, escrowAmount)
      .txOutInlineDatumValue(initiateEscrowDatum(walletAddress, escrowAmount, feeAddress, feeAmount), 'JSON')
      .changeAddress(walletAddress)
      .selectUtxosFrom(utxos)
      .complete();
    return this.mesh.txHex;
  };

  cancelEscrow = async (escrowUtxo: UTxO): Promise<string> => {
    const { utxos, walletAddress, collateral } = await this.getWalletInfoForTx();

    const inputDatum = deserializeDatum<InitiationDatum | ActiveEscrowDatum>(escrowUtxo.output.plutusData!);

    if (inputDatum.constructor === 1) {
      const [initiatorAddressObj, initiatorAmount, recipientAddressObj, recipientAmount] = inputDatum.fields;

      const initiatorAddress = serializeAddressObj(initiatorAddressObj, this.networkId);
      const recipientAddress = serializeAddressObj(recipientAddressObj!, this.networkId);
      const initiatorToReceive = MeshValue.fromValue(initiatorAmount).toAssets();
      const recipientToReceive = MeshValue.fromValue(recipientAmount!).toAssets();
      this.mesh.txOut(initiatorAddress, initiatorToReceive).txOut(recipientAddress, recipientToReceive);
    }

    await this.mesh
      .spendingPlutusScript(this.languageVersion)
      .txIn(escrowUtxo.input.txHash, escrowUtxo.input.outputIndex, escrowUtxo.output.amount, this.scriptAddress)
      .spendingReferenceTxInInlineDatumPresent()
      .spendingReferenceTxInRedeemerValue(mConStr1([]))
      .txInScript(this.scriptCbor)
      .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .selectUtxosFrom(utxos)
      .complete();
    return this.mesh.txHex;
  };

  recipientDeposit = async (escrowUtxo: UTxO, depositAmount: Asset[]): Promise<string> => {
    const { utxos, walletAddress, collateral } = await this.getWalletInfoForTx();

    const inputDatum = deserializeDatum<InitiationDatum>(escrowUtxo.output.plutusData!);
    const feeAddress = inputDatum.fields[2];
    const feeAmount = MeshValue.fromValue(inputDatum.fields[3]).toAssets();
    const outputDatum = activeEscrowDatum(inputDatum, walletAddress, depositAmount, String(feeAddress), feeAmount);
    //NOTE(Elaine): we can get the fee info from the inputDatum

    const inputAssets = MeshValue.fromValue(inputDatum.fields[1]).toAssets();
    const escrowAmount = mergeAssets([...depositAmount, ...inputAssets]);

    await this.mesh
      .spendingPlutusScript(this.languageVersion)
      .txIn(escrowUtxo.input.txHash, escrowUtxo.input.outputIndex, escrowUtxo.output.amount, this.scriptAddress)
      .spendingReferenceTxInInlineDatumPresent()
      .txInRedeemerValue(recipientDepositRedeemer(walletAddress, depositAmount), 'JSON', DEFAULT_REDEEMER_BUDGET)
      .txInScript(this.scriptCbor)
      .txOut(this.scriptAddress, escrowAmount)
      .txOutInlineDatumValue(outputDatum, 'JSON')
      .changeAddress(walletAddress)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .selectUtxosFrom(utxos)
      .complete();
    return this.mesh.txHex;
  };

  completeEscrow = async (escrowUtxo: UTxO): Promise<string> => {
    const { utxos, walletAddress, collateral } = await this.getWalletInfoForTx();

    const inputDatum = deserializeDatum<ActiveEscrowDatum>(escrowUtxo.output.plutusData!);
    const [initiatorAddressObj, initiatorAmount, recipientAddressObj, recipientAmount] = inputDatum.fields;
    const initiatorAddress = serializeAddressObj(initiatorAddressObj, this.networkId);
    const recipientAddress = serializeAddressObj(recipientAddressObj, this.networkId);
    const initiatorToReceive = MeshValue.fromValue(recipientAmount).toAssets();
    const recipientToReceive = MeshValue.fromValue(initiatorAmount).toAssets();

    await this.mesh
      .spendingPlutusScript(this.languageVersion)
      .txIn(escrowUtxo.input.txHash, escrowUtxo.input.outputIndex, escrowUtxo.output.amount, this.scriptAddress)
      .spendingReferenceTxInInlineDatumPresent()
      .spendingReferenceTxInRedeemerValue(mConStr2([]))
      .txInScript(this.scriptCbor)
      .txOut(initiatorAddress, initiatorToReceive)
      .txOut(recipientAddress, recipientToReceive)
      .requiredSignerHash(deserializeAddress(recipientAddress).pubKeyHash)
      .requiredSignerHash(deserializeAddress(initiatorAddress).pubKeyHash)
      .changeAddress(walletAddress)
      .txInCollateral(
        collateral.input.txHash,
        collateral.input.outputIndex,
        collateral.output.amount,
        collateral.output.address,
      )
      .selectUtxosFrom(utxos)
      .complete();
    return this.mesh.txHex;
  };

  getUtxoByTxHash = async (txHash: string): Promise<UTxO | undefined> => {
    return await this._getUtxoByTxHash(txHash, this.scriptCbor);
  };
}
