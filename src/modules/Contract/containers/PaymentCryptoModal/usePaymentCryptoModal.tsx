import { useEffect, useState } from 'react';
import { Contract, depositContractAdaptor } from 'src/core/adaptors';
import { OrgMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import dapp from 'src/dapp';

export const usePaymentCryptoModal = (contract: Contract, onSucceedPayment?: (contract: Contract) => void) => {
  const { connected, signer, network } = dapp.useWeb3();
  const [disabledPayment, setDisabledPayment] = useState(!connected);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDisabledPayment(!contract.id || !connected);
  }, [connected, contract]);

  const onProceedCryptoPayment = async () => {
    try {
      const contributor = contract.client?.meta.wallet_address;
      if (!connected) {
        setErrorMessage(translate('cont-wallet-not-connected'));
        return;
      }

      if (!contributor) {
        setErrorMessage(translate('cont-contributor-wallet-not-connected'));
        return;
      }

      setDisabledPayment(true);
      const result = await dapp.escrow({
        signer,
        network,
        totalAmount: contract.amounts?.total || 0,
        escrowAmount: contract.amounts?.amount || 0,
        contributor,
        token: contract.currency.address,
        projectId: contract?.projectId || '',
        verifiedOrg: (contract.provider?.meta as OrgMeta).verified_impact || false,
        applyOrgFeeDiscount: contract.amounts?.org_fee_discount || false,
        addressReferringOrg: contract.amounts?.org_referrer_wallet,
        applyContFeeDiscount: contract.amounts?.user_fee_discount || false,
        addressReferringCont: contract.amounts?.user_referrer_wallet,
      });
      if (!result) return;
      const { error, data } = await depositContractAdaptor(contract.id, result.txHash, contract.payment, {
        amount: result.amount,
        contributor: result.contributor,
        fee: result.fee,
        escrowId: result.id,
        token: result?.token || '',
        txHash: result.txHash,
      });
      if (error) {
        throw new Error(translate('cont-deposit-error'));
      } else if (data) {
        onSucceedPayment?.(data);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage(error.message);
    }
    setDisabledPayment(false);
  };

  return {
    data: {
      disabledPayment,
      errorMessage,
    },
    operations: {
      setErrorMessage,
      onProceedCryptoPayment,
    },
  };
};
