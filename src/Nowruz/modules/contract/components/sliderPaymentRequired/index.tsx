import React from 'react';
import { Contract } from 'src/core/api';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { useSliderPaymentRequired } from './useSliderPaymentRequired';
import PaymentCrypto from '../PaymentCrypto';
import { PaymentFiat } from '../paymentFiat';

interface SliderPaymentRequiredProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
export const SliderPaymentRequired: React.FC<SliderPaymentRequiredProps> = ({
  contract,
  disableMessage,
  redirectToChat,
}) => {
  const {
    withdrawOfferByOP,
    handleOpenPaymentModal,
    openPaymentModal,
    displayPaymentModal,
    paymentOffer,
    handleClosePaymentModal,
    name,
  } = useSliderPaymentRequired(contract);
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          {!disableMessage && (
            <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
              Message
            </Button>
          )}

          <Button variant="outlined" color="secondary" fullWidth onClick={withdrawOfferByOP}>
            Withdraw
          </Button>
        </div>

        <Button variant="contained" color="primary" onClick={handleOpenPaymentModal}>
          Proceed to payment
        </Button>

        <AlertMessage
          theme="warning"
          iconName="alert-circle"
          title="Payment required"
          subtitle={`${name} has accepted your offer. Proceed to payment to start this job.`}
        />
      </div>
      {displayPaymentModal && contract.payment_mode === 'FIAT' ? (
        <PaymentFiat offer={paymentOffer} open={openPaymentModal} handleClose={handleClosePaymentModal} />
      ) : (
        <PaymentCrypto offer={paymentOffer} open={openPaymentModal} handleClose={handleClosePaymentModal} />
      )}
    </>
  );
};
