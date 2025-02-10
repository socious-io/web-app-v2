import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';

import { useSliderPaymentRequired } from './useSliderPaymentRequired';
import { ContractSliderProps } from '../ContractDetailsSlider/index.types';
import PaymentCryptoModal from '../PaymentCryptoModal';
import PaymentFiatModal from '../PaymentFiatModal';

const SliderPaymentRequired: React.FC<ContractSliderProps> = ({ contract, disableMessage, redirectToChat }) => {
  const {
    data: { partnerName, displayPaymentModal, openPaymentModal, paymentDetail },
    operations: { onWithdrawOffer, handleOpenPaymentModal, handleClosePaymentModal, onSucceedPayment },
  } = useSliderPaymentRequired(contract);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            {translate('cont-message')}
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={onWithdrawOffer}>
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
          subtitle={translate('cont-payment-required-msg', { name: partnerName })}
        />
      </div>
      {displayPaymentModal &&
        paymentDetail &&
        (contract.payment === 'FIAT' ? (
          <PaymentFiatModal
            contract={paymentDetail}
            open={openPaymentModal}
            handleClose={handleClosePaymentModal}
            onSucceedPayment={onSucceedPayment}
          />
        ) : (
          <PaymentCryptoModal
            contract={paymentDetail}
            open={openPaymentModal}
            handleClose={handleClosePaymentModal}
            onSucceedPayment={onSucceedPayment}
          />
        ))}
    </>
  );
};

export default SliderPaymentRequired;
