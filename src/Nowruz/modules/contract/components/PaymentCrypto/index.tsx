import React from 'react';
import Dapp from 'src/dapp';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { PaymentCryptoProps } from './paymentCrypto.types';

export const PaymentCrypto: React.FC<PaymentCryptoProps> = ({ open, handleClose }) => {
  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary">
        Submit
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </div>
  );

  const contentJsx = (
    <div className="flex flex-col items-center">
      <Dapp.Connect />
    </div>
  );
  // return <div />;
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Escrow payment"
      subTitle="Proceed to payment"
      content={contentJsx}
      footer={footerJsx}
      mobileFullHeight={false}
    />
  );
};

export default PaymentCrypto;
