import { useEffect, useState } from 'react';
import { Offer, hireOffer, payByOffer } from 'src/core/api';
import dapp from 'src/dapp';
import store from 'src/store';
import { getMissions } from 'src/store/thunks/contracts.thunk';

export const usePaymentCrypto = (handleCloseModal: (paymentSuccess: boolean) => void, offer?: Offer) => {
  const { chainId, signer, account, isConnected, open } = dapp.useWeb3();
  const [disabledPayment, setDisabledPayment] = useState(!isConnected);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { wallet_address: contributor } = offer?.recipient?.meta || {};

  let unit = offer?.currency || '';

  if (offer?.crypto_currency_address) {
    dapp.NETWORKS.map((n) => {
      const token = n.tokens.filter((t) => offer.crypto_currency_address === t.address)[0];
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

    setDisabledPayment(true);
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
        verifiedOrg: offer.offerer.meta.verified_impact || false,
      });

      // this is paramater need to sync with backend to make Hire available
      await payByOffer(offer.id, {
        service: 'CRYPTO',
        source: account,
        txHash: result.txHash,
        meta: result,
      });
      await hireOffer(offer.id);
      await store.dispatch(getMissions());
      handleCloseModal(true);
    } catch (err: any) {
      handleCloseModal(false);
      setErrorMessage(err?.response?.data.error || err?.message);
      setOpenErrorModal(true);
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
