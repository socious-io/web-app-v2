import React from 'react';
import { Contract } from 'src/core/api';
import { translate } from 'src/core/utils';
import { AlertMessage } from 'src/modules/general/components/alertMessage';
import { Button } from 'src/modules/general/components/Button';

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
              {translate('cont-message')}
            </Button>
          )}

          <Button variant="outlined" color="secondary" fullWidth onClick={withdrawOfferByOP}>
            {translate('cont-withdraw')}
          </Button>
        </div>

        <Button variant="contained" color="primary" onClick={handleOpenPaymentModal}>
          {translate('cont-proceed-payment')}
        </Button>

        <AlertMessage
          theme="warning"
          iconName="alert-circle"
          title={translate('cont-payment-required')}
          subtitle={translate('cont-payment-required-msg', { name: name })}
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
