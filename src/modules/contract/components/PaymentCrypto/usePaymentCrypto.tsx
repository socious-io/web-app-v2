import { Asset, BlockfrostProvider, BrowserWallet, MeshTxBuilder } from '@meshsdk/core';
import { useEffect, useState } from 'react';
import { Offer, OrgMeta, hireOffer, payByOffer } from 'src/core/api';
import dapp from 'src/dapp';

export const usePaymentCrypto = (handleCloseModal: (paymentSuccess: boolean) => void, offer?: Offer) => {
  const { chainId, signer, account, isConnected, isLaceConnected, open } = dapp.useWeb3();
  const [disabledPayment, setDisabledPayment] = useState(!isConnected);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { wallet_address: contributor } = offer?.recipient?.meta || {};

  let unit = offer?.currency || '';

  if (offer?.crypto_currency_address) {
    dapp.NETWORKS.map(n => {
      const token = n.tokens.filter(t => offer.crypto_currency_address === t.address)[0];
      if (token) unit = token.symbol;
    });
  }

  useEffect(() => {
    setDisabledPayment(!offer || !isConnected);
  }, [isConnected, offer]);

  async function proceedCryptoPayment() {
    if (!offer) return;
    if (!signer || !chainId) {
      setErrorMessage('Wallet is not connected');
      setOpenErrorModal(true);
      return;
    }

    if (!contributor) {
      setErrorMessage('Contributor wallet is not connected');
      setOpenErrorModal(true);
      return;
    }

    const applyOrgFeeDiscount = !!offer.org_referrer_wallet && offer.org_fee_discount;
    const applyContFeeDiscount = !!offer.contributor_referrer_wallet && offer.contributor_fee_discount;

    //FIXME(Elaine): here
    setDisabledPayment(true);

    if (isLaceConnected) {
      try {
        const blockfrostKey = import.meta.env.VITE_BLOCKFROST_KEY;
        const blockchainProvider = new BlockfrostProvider('<Your-API-Key>');
        const meshTxBuilder = new MeshTxBuilder({ fetcher: blockchainProvider, submitter: blockchainProvider });
        const wallet = await BrowserWallet.enable('lace'); // FIXME(Elaine): do we rewrite everything with Mesh's own wallet provider or can we just use the stuff we've already written for lace
        const contract = new dapp.MeshEscrowContract({
          mesh: meshTxBuilder,
          fetcher: blockchainProvider,
          wallet: wallet,
          networkId: 2, //FIXME(Elaine): change so that this can be non preview
        });

        const escrowAmount: Asset[] = [
          {
            unit: 'lovelace',
            quantity: String((offer.amount || 0) * 1_000_000),
            //FIXME(Elaine): Don't hardcode
          },
        ];
        const feeAmount: Asset[] = [
          {
            unit: 'lovelace',
            quantity: String(Math.floor((offer.fee || 0) * (offer.amount || 0) * 1_000_000)),
          },
        ];
        const feeAddress =
          'addr_test1qq76z8p3seaq052z9tjlnkxma0d4c7tw5jd4ru8x5jctjkchnel735ck8xakezvp596mdsy9vfu9khvsm0ylpmmprpssafrtcx';
        //FIXME(Elaine): change this, don't hardcode, add staking for SOCIO, etc

        const tx = await contract.initiateEscrow(escrowAmount, feeAddress, feeAmount);
        const signedTx = await wallet.signTx(tx);
        const txHash = await wallet.submitTx(signedTx);
      } catch (err: any) {
        console.log('Error with lace payment: ', err);
      }
    } else {
      //FIXME(Elaine): double check the control flow on this

      try {
        // put escrow on smart contract
        const result = await dapp.escrow({
          signer,
          chainId,
          totalAmount: offer.total || 0,
          escrowAmount: offer.assignment_total || 0,
          contributor,
          token: offer.crypto_currency_address,
          projectId: offer.project_id,
          verifiedOrg: (offer.offerer.meta as OrgMeta).verified_impact || false,
          addressReferringOrg: offer.org_referrer_wallet,
          addressReferringCont: offer.contributor_referrer_wallet,
          applyOrgFeeDiscount,
          applyContFeeDiscount,
        });

        // this is paramater need to sync with backend to make Hire available
        await payByOffer(offer.id, {
          service: 'CRYPTO',
          source: account?.toString() || '',
          txHash: result.txHash,
          meta: result,
        });
        await hireOffer(offer.id);
        handleCloseModal(true);
      } catch (err: any) {
        handleCloseModal(false);
        setErrorMessage(err?.response?.data.error || err?.message);
        setOpenErrorModal(true);
      }
    }

    setDisabledPayment(false);
  }
  return {
    disabledPayment,
    openErrorModal,
    errorMessage,
    proceedCryptoPayment,
    setOpenErrorModal,
    isConnected,
    openConnect: open,
    unit,
  };
};
