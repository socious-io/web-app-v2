import {
  applyParamsToScript,
  Asset,
  BlockfrostProvider,
  BrowserWallet,
  conStr0,
  ConStr0,
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
  pubKeyAddress,
  PubKeyAddress,
  serializeAddressObj,
  serializePlutusScript,
  UTxO,
  value,
  Value,
} from '@meshsdk/core';
import plutus from 'aiken-contracts';
import { offer } from 'src/core/api';
import dapp from 'src/dapp';
import { InitiationDatum } from 'src/dapp/dapp.service';

export function PageMesh() {
  async function newWallet() {
    const mnemonic = MeshWallet.brew();
    /*
    const blockfrostKey = import.meta.env.VITE_BLOCKFROST_KEY;
    const blockchainProvider = new BlockfrostProvider('<Your-API-Key>');
    const meshTxBuilder = new MeshTxBuilder({ fetcher: blockchainProvider, submitter: blockchainProvider });
    const wallet = await BrowserWallet.enable('lace'); // FIXME(Elaine): do we rewrite everything with Mesh's own wallet provider or can we just use the stuff we've already written for lace
    const contract = new MeshEscrowContract({
      mesh: meshTxBuilder,
      fetcher: blockchainProvider,
      wallet: wallet,
      networkId: 2, //FIXME(Elaine): change so that this can be non preview
    });

    const escrowAmount: Asset[] = [
      {
        unit: 'lovelace',
        quantity: String((123|| 0) * 1_000_000),
        //FIXME(Elaine): Don't hardcode
      },
    ];
    const feeAmount: Asset[] = [
      {
        unit: 'lovelace',
        quantity: String(Math.floor((0.07 || 0) * (123 || 0) * 1_000_000)),
      },
    ];
    const feeAddress =
      'addr_test1qq76z8p3seaq052z9tjlnkxma0d4c7tw5jd4ru8x5jctjkchnel735ck8xakezvp596mdsy9vfu9khvsm0ylpmmprpssafrtcx';
    //FIXME(Elaine): change this, don't hardcode, add staking for SOCIO, etc

    const tx = await contract.initiateEscrow(escrowAmount, feeAddress, feeAmount);
    const signedTx = await wallet.signTx(tx);
    const txHash = await wallet.submitTx(signedTx);
*/

    console.log('mnemonic', mnemonic);
  }
  return (
    <>
      <h1>mesh demo</h1>
      <button onClick={newWallet}>new wallet</button>
    </>
  );
}

// export const initiateEscrowDatum = (
//   walletAddress: string,
//   amount: Asset[],
//   feeAddress: string,
//   feeAmount: Asset[],
// ): InitiationDatum => {
//   const { pubKeyHash, stakeCredentialHash } = deserializeAddress(walletAddress);
//   const { pubKeyHash: feePubKeyHash, stakeCredentialHash: feeStakeCredentialHash } = deserializeAddress(feeAddress);
//   return conStr0([
//     pubKeyAddress(pubKeyHash, stakeCredentialHash),
//     value(amount),
//     pubKeyAddress(feePubKeyHash, feeStakeCredentialHash),
//     value(feeAmount),
//   ]);
// };

// export type MeshTxInitiatorInput = {
//   mesh: MeshTxBuilder;
//   fetcher?: IFetcher;
//   wallet?: BrowserWallet | MeshWallet;
//   networkId?: number;
//   stakeCredential?: string;
//   version?: number;
// };

// export class MeshTxInitiator {
//   mesh: MeshTxBuilder;
//   fetcher?: IFetcher;
//   wallet?: BrowserWallet | MeshWallet;
//   stakeCredential?: string;
//   networkId = 0;
//   version = 2;
//   languageVersion: LanguageVersion = 'V2';

//   constructor({
//     mesh,
//     fetcher,
//     wallet,
//     networkId = 0,
//     stakeCredential = 'c08f0294ead5ab7ae0ce5471dd487007919297ba95230af22f25e575',
//     version = 2,
//   }: MeshTxInitiatorInput) {
//     this.mesh = mesh;
//     if (fetcher) {
//       this.fetcher = fetcher;
//     }
//     if (wallet) {
//       this.wallet = wallet;
//     }

//     this.networkId = networkId;
//     switch (this.networkId) {
//       case 1:
//         this.mesh.setNetwork('mainnet');
//         break;
//       default:
//         this.mesh.setNetwork('preprod');
//     }

//     this.version = version;
//     switch (this.version) {
//       case 1:
//         this.languageVersion = 'V2';
//         break;
//       default:
//         this.languageVersion = 'V3';
//     }

//     if (stakeCredential) {
//       this.stakeCredential = stakeCredential;
//     }
//   }

//   getScriptAddress = (scriptCbor: string) => {
//     const { address } = serializePlutusScript(
//       { code: scriptCbor, version: this.languageVersion },
//       this.stakeCredential,
//       this.networkId,
//     );
//     return address;
//   };

//   protected signSubmitReset = async () => {
//     const signedTx = this.mesh.completeSigning();
//     const txHash = await this.mesh.submitTx(signedTx);
//     this.mesh.reset();
//     return txHash;
//   };

//   protected queryUtxos = async (walletAddress: string): Promise<UTxO[]> => {
//     if (this.fetcher) {
//       const utxos = await this.fetcher.fetchAddressUTxOs(walletAddress);
//       return utxos;
//     }
//     return [];
//   };

//   protected getWalletDappAddress = async () => {
//     if (this.wallet) {
//       const usedAddresses = await this.wallet.getUsedAddresses();
//       if (usedAddresses.length > 0) {
//         return usedAddresses[0];
//       }
//       const unusedAddresses = await this.wallet.getUnusedAddresses();
//       if (unusedAddresses.length > 0) {
//         return unusedAddresses[0];
//       }
//     }
//     return '';
//   };

//   protected getWalletCollateral = async (): Promise<UTxO | undefined> => {
//     if (this.wallet) {
//       const utxos = await this.wallet.getCollateral();
//       return utxos[0];
//     }
//     return undefined;
//   };

//   protected getWalletUtxosWithMinLovelace = async (lovelace: number, providedUtxos: UTxO[] = []) => {
//     let utxos: UTxO[] = providedUtxos;
//     if (this.wallet && (!providedUtxos || providedUtxos.length === 0)) {
//       utxos = await this.wallet.getUtxos();
//     }
//     return utxos.filter(u => {
//       const lovelaceAmount = u.output.amount.find((a: any) => a.unit === 'lovelace')?.quantity;
//       return Number(lovelaceAmount) > lovelace;
//     });
//   };

//   protected getWalletUtxosWithToken = async (assetHex: string, userUtxos: UTxO[] = []) => {
//     let utxos: UTxO[] = userUtxos;
//     if (this.wallet && userUtxos.length === 0) {
//       utxos = await this.wallet.getUtxos();
//     }
//     return utxos.filter(u => {
//       const assetAmount = u.output.amount.find((a: any) => a.unit === assetHex)?.quantity;
//       return Number(assetAmount) >= 1;
//     });
//   };

//   protected getAddressUtxosWithMinLovelace = async (
//     walletAddress: string,
//     lovelace: number,
//     providedUtxos: UTxO[] = [],
//   ) => {
//     let utxos: UTxO[] = providedUtxos;
//     if (this.fetcher && (!providedUtxos || providedUtxos.length === 0)) {
//       utxos = await this.fetcher.fetchAddressUTxOs(walletAddress);
//     }
//     return utxos.filter(u => {
//       const lovelaceAmount = u.output.amount.find((a: any) => a.unit === 'lovelace')?.quantity;
//       return Number(lovelaceAmount) > lovelace;
//     });
//   };

//   protected getAddressUtxosWithToken = async (walletAddress: string, assetHex: string, userUtxos: UTxO[] = []) => {
//     let utxos: UTxO[] = userUtxos;
//     if (this.fetcher && userUtxos.length === 0) {
//       utxos = await this.fetcher.fetchAddressUTxOs(walletAddress);
//     }
//     return utxos.filter(u => {
//       const assetAmount = u.output.amount.find((a: any) => a.unit === assetHex)?.quantity;
//       return Number(assetAmount) >= 1;
//     });
//   };

//   protected getWalletInfoForTx = async () => {
//     const utxos = await this.wallet?.getUtxos();
//     const collateral = await this.getWalletCollateral();
//     const walletAddress = await this.getWalletDappAddress();
//     if (!utxos || utxos?.length === 0) {
//       throw new Error('No utxos found');
//     }
//     if (!collateral) {
//       throw new Error('No collateral found');
//     }
//     if (!walletAddress) {
//       throw new Error('No wallet address found');
//     }
//     return { utxos, collateral, walletAddress };
//   };

//   protected _getUtxoByTxHash = async (txHash: string, scriptCbor?: string): Promise<UTxO | undefined> => {
//     if (this.fetcher) {
//       const utxos = await this.fetcher?.fetchUTxOs(txHash);
//       let scriptUtxo = utxos[0];

//       if (scriptCbor) {
//         const scriptAddr = serializePlutusScript(
//           { code: scriptCbor, version: this.languageVersion },
//           this.stakeCredential,
//           this.networkId,
//         ).address;
//         scriptUtxo = utxos.filter(utxo => utxo.output.address === scriptAddr)[0] || utxos[0];
//       }

//       return scriptUtxo;
//     }

//     return undefined;
//   };
// }

// export type ActiveEscrowDatum = ConStr1<
//   // initiator     assets  recipient     assets   fee           assets
//   [PubKeyAddress, Value, PubKeyAddress, Value, PubKeyAddress, Value]
// >;
// export const activeEscrowDatum = (
//   initiationDatum: InitiationDatum,
//   walletAddress: string,
//   amount: Asset[],
//   feeAddress: string,
//   feeAmount: Asset[],
// ): ActiveEscrowDatum => {
//   const { pubKeyHash, stakeCredentialHash } = deserializeAddress(walletAddress);
//   const [initiator, initiatorAmount] = initiationDatum.fields;
//   const { pubKeyHash: feePubKeyHash, stakeCredentialHash: feeStakeCredentialHash } = deserializeAddress(feeAddress);
//   return conStr1([
//     initiator,
//     initiatorAmount,
//     pubKeyAddress(pubKeyHash, stakeCredentialHash),
//     value(amount),
//     pubKeyAddress(feePubKeyHash, feeStakeCredentialHash),
//     value(feeAmount),
//   ]);
// };

// export type RecipientDepositRedeemer = ConStr0<[PubKeyAddress, Value]>;
// // export const recipientDepositRedeemer = (recipient: string, depositAmount: Asset[]) =>
// // initiateEscrowDatum(recipient, depositAmount);
// //NOTE(Elaine): Previous version of this relied on the CBOR coincidentally being identical
// // between initiation datum and recipient deposit redeemer. This is no longer the case after fees

// export const recipientDepositRedeemer = (recipient: string, depositAmount: Asset[]) => {
//   const { pubKeyHash, stakeCredentialHash } = deserializeAddress(recipient);
//   return conStr0([pubKeyAddress(pubKeyHash, stakeCredentialHash), value(depositAmount)]);
// };

// export class MeshEscrowContract extends MeshTxInitiator {
//   scriptCbor: string;
//   scriptAddress: string;

//   constructor(inputs: MeshTxInitiatorInput) {
//     super(inputs);
//     this.scriptCbor = this.getScriptCbor();
//     this.scriptAddress = this.getScriptAddress(this.scriptCbor);
//   }

//   getScriptCbor = () => {
//     return applyParamsToScript(plutus.validators[0]!.compiledCode, []);
//     // switch (this.version) {
//     //   case 2:
//     //     return applyParamsToScript(plutus.validators[0]!.compiledCode, []);
//     //   default:
//     //     return applyParamsToScript(plutus.validators[0]!.compiledCode, []);
//     // }
//   };

//   initiateEscrow = async (escrowAmount: Asset[], feeAddress: string, feeAmount: Asset[]): Promise<string> => {
//     const { utxos, walletAddress } = await this.getWalletInfoForTx();

//     await this.mesh
//       .txOut(this.scriptAddress, escrowAmount)
//       .txOutInlineDatumValue(initiateEscrowDatum(walletAddress, escrowAmount, feeAddress, feeAmount), 'JSON')
//       .changeAddress(walletAddress)
//       .selectUtxosFrom(utxos)
//       .complete();
//     return this.mesh.txHex;
//   };

//   cancelEscrow = async (escrowUtxo: UTxO): Promise<string> => {
//     const { utxos, walletAddress, collateral } = await this.getWalletInfoForTx();

//     const inputDatum = deserializeDatum<InitiationDatum | ActiveEscrowDatum>(escrowUtxo.output.plutusData!);

//     if (inputDatum.constructor === 1) {
//       const [initiatorAddressObj, initiatorAmount, recipientAddressObj, recipientAmount] = inputDatum.fields;

//       const initiatorAddress = serializeAddressObj(initiatorAddressObj, this.networkId);
//       const recipientAddress = serializeAddressObj(recipientAddressObj!, this.networkId);
//       const initiatorToReceive = MeshValue.fromValue(initiatorAmount).toAssets();
//       const recipientToReceive = MeshValue.fromValue(recipientAmount!).toAssets();
//       this.mesh.txOut(initiatorAddress, initiatorToReceive).txOut(recipientAddress, recipientToReceive);
//     }

//     await this.mesh
//       .spendingPlutusScript(this.languageVersion)
//       .txIn(escrowUtxo.input.txHash, escrowUtxo.input.outputIndex, escrowUtxo.output.amount, this.scriptAddress)
//       .spendingReferenceTxInInlineDatumPresent()
//       .spendingReferenceTxInRedeemerValue(mConStr1([]))
//       .txInScript(this.scriptCbor)
//       .requiredSignerHash(deserializeAddress(walletAddress).pubKeyHash)
//       .changeAddress(walletAddress)
//       .txInCollateral(
//         collateral.input.txHash,
//         collateral.input.outputIndex,
//         collateral.output.amount,
//         collateral.output.address,
//       )
//       .selectUtxosFrom(utxos)
//       .complete();
//     return this.mesh.txHex;
//   };

//   recipientDeposit = async (escrowUtxo: UTxO, depositAmount: Asset[]): Promise<string> => {
//     const { utxos, walletAddress, collateral } = await this.getWalletInfoForTx();

//     const inputDatum = deserializeDatum<InitiationDatum>(escrowUtxo.output.plutusData!);
//     const feeAddress = inputDatum.fields[2];
//     const feeAmount = MeshValue.fromValue(inputDatum.fields[3]).toAssets();
//     const outputDatum = activeEscrowDatum(inputDatum, walletAddress, depositAmount, String(feeAddress), feeAmount);
//     //NOTE(Elaine): we can get the fee info from the inputDatum

//     const inputAssets = MeshValue.fromValue(inputDatum.fields[1]).toAssets();
//     const escrowAmount = mergeAssets([...depositAmount, ...inputAssets]);

//     await this.mesh
//       .spendingPlutusScript(this.languageVersion)
//       .txIn(escrowUtxo.input.txHash, escrowUtxo.input.outputIndex, escrowUtxo.output.amount, this.scriptAddress)
//       .spendingReferenceTxInInlineDatumPresent()
//       .txInRedeemerValue(recipientDepositRedeemer(walletAddress, depositAmount), 'JSON', DEFAULT_REDEEMER_BUDGET)
//       .txInScript(this.scriptCbor)
//       .txOut(this.scriptAddress, escrowAmount)
//       .txOutInlineDatumValue(outputDatum, 'JSON')
//       .changeAddress(walletAddress)
//       .txInCollateral(
//         collateral.input.txHash,
//         collateral.input.outputIndex,
//         collateral.output.amount,
//         collateral.output.address,
//       )
//       .selectUtxosFrom(utxos)
//       .complete();
//     return this.mesh.txHex;
//   };

//   completeEscrow = async (escrowUtxo: UTxO): Promise<string> => {
//     const { utxos, walletAddress, collateral } = await this.getWalletInfoForTx();

//     const inputDatum = deserializeDatum<ActiveEscrowDatum>(escrowUtxo.output.plutusData!);
//     const [initiatorAddressObj, initiatorAmount, recipientAddressObj, recipientAmount] = inputDatum.fields;
//     const initiatorAddress = serializeAddressObj(initiatorAddressObj, this.networkId);
//     const recipientAddress = serializeAddressObj(recipientAddressObj, this.networkId);
//     const initiatorToReceive = MeshValue.fromValue(recipientAmount).toAssets();
//     const recipientToReceive = MeshValue.fromValue(initiatorAmount).toAssets();

//     await this.mesh
//       .spendingPlutusScript(this.languageVersion)
//       .txIn(escrowUtxo.input.txHash, escrowUtxo.input.outputIndex, escrowUtxo.output.amount, this.scriptAddress)
//       .spendingReferenceTxInInlineDatumPresent()
//       .spendingReferenceTxInRedeemerValue(mConStr2([]))
//       .txInScript(this.scriptCbor)
//       .txOut(initiatorAddress, initiatorToReceive)
//       .txOut(recipientAddress, recipientToReceive)
//       .requiredSignerHash(deserializeAddress(recipientAddress).pubKeyHash)
//       .requiredSignerHash(deserializeAddress(initiatorAddress).pubKeyHash)
//       .changeAddress(walletAddress)
//       .txInCollateral(
//         collateral.input.txHash,
//         collateral.input.outputIndex,
//         collateral.output.amount,
//         collateral.output.address,
//       )
//       .selectUtxosFrom(utxos)
//       .complete();
//     return this.mesh.txHex;
//   };

//   getUtxoByTxHash = async (txHash: string): Promise<UTxO | undefined> => {
//     return await this._getUtxoByTxHash(txHash, this.scriptCbor);
//   };
// }
