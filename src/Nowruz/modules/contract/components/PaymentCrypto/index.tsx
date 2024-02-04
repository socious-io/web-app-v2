import React from 'react';
import Dapp from 'src/dapp';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { PaymentCryptoProps } from './paymentCrypto.types';
import { usePaymentCrypto } from './usePaymentCrypto';
import { PaymentSummary } from '../paymentSummary';

export const PaymentCrypto: React.FC<PaymentCryptoProps> = ({ open, handleClose, offer }) => {
  const {
    disabledPayment,
    openErrorModal,
    errorMessage,
    proceedCryptoPayment,
    setOpenErrorModal,
    isConnected,
    openConnect,
  } = usePaymentCrypto(handleClose, offer);

  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button
        customStyle="w-full md:w-fit "
        variant="contained"
        color="primary"
        disabled={disabledPayment}
        onClick={proceedCryptoPayment}
      >
        Pay now
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="secondary" onClick={() => handleClose(false)}>
        Cancel
      </Button>
    </div>
  );

  const contentJsx = (
    <div className="w-full p-4 md:p-6 flex flex-col items-center gap-5">
      {/* <Dapp.Connect /> */}
      {isConnected ? (
        <Dapp.Connect />
      ) : (
        <Button variant="text" color="primary" onClick={() => openConnect()}>
          Connect wallet
        </Button>
      )}
      <PaymentSummary
        currency={offer?.currency || ''}
        amount={offer?.amount || 0}
        sociousFee={offer?.fee || 0}
        stripeFee={offer?.stripe_fee || 0}
        total={offer?.total || 0}
      />
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={() => handleClose(false)}
        title="Escrow payment"
        subTitle="Proceed to payment"
        content={contentJsx}
        footer={footerJsx}
        mobileFullHeight={false}
      />
      <AlertModal
        title="Failed"
        message={errorMessage}
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        closeButtn={false}
        submitButton={false}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
      />
    </>
  );
};

export default PaymentCrypto;
