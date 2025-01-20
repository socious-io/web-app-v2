import { useEffect, useState } from 'react';
import { Contract, depositContractAdaptor } from 'src/core/adaptors';
import { OrgMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';

export const usePaymentCryptoModal = (contract: Contract, onSucceedPayment?: (contract: Contract) => void) => {
  const { chainId, signer, isConnected, Web3Connect } = Dapp.useWeb3();
  const [disabledPayment, setDisabledPayment] = useState(!isConnected);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setDisabledPayment(!contract.id || !isConnected);
  }, [isConnected, contract]);

  const onProceedCryptoPayment = async () => {
    try {
      const contributor = contract.client?.meta.wallet_address;
      if (!signer || !chainId) {
        setErrorMessage(translate('cont-wallet-not-connected'));
        return;
      }

      if (!contributor) {
        setErrorMessage(translate('cont-contributor-wallet-not-connected'));
        return;
      }

      setDisabledPayment(true);
      const result = await Dapp.escrow({
        signer,
        chainId,
        totalAmount: contract.amounts?.total || 0,
        escrowAmount: contract.amounts?.amount || 0,
        contributor,
        token: contract.currency.address,
        projectId: contract?.projectId || '',
        verifiedOrg: (contract.provider?.meta as OrgMeta).verified_impact || false,
        applyOrgFeeDiscount: false,
        applyContFeeDiscount: false,
      });
      const { error, data } = await depositContractAdaptor(contract.id, result.txHash, contract.payment);
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
      Web3Connect,
      disabledPayment,
      errorMessage,
    },
    operations: {
      setErrorMessage,
      onProceedCryptoPayment,
    },
  };
};
