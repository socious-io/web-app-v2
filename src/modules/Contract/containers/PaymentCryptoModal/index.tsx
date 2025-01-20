import { translate } from 'src/core/utils';
import PaymentSummary from 'src/modules/Contract/components/PaymentSummary';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import styles from './index.module.scss';
import { PaymentCryptoModalProps } from './index.types';
import { usePaymentCryptoModal } from './usePaymentCryptoModal';

const PaymentCryptoModal: React.FC<PaymentCryptoModalProps> = ({ open, handleClose, contract, onSucceedPayment }) => {
  const {
    data: { Web3Connect, disabledPayment, errorMessage },
    operations: { setErrorMessage, onProceedCryptoPayment },
  } = usePaymentCryptoModal(contract, onSucceedPayment);

  const contentJsx = (
    <>
      <Web3Connect />
      {contract.amounts && (
        <PaymentSummary
          currency={contract.currency?.name || ''}
          amount={contract.amounts.amount || 0}
          sociousFee={contract.amounts.fee || 0}
          stripeFee={contract.amounts.stripe_fee || 0}
          total={contract.amounts.total || 0}
          hasFeeDiscount={false}
        />
      )}
    </>
  );

  const footerJsx = (
    <div className={styles['modal__footer']}>
      <Button color="secondary" variant="outlined" onClick={handleClose} fullWidth>
        {translate('cont-cancel')}
      </Button>
      <Button color="primary" variant="contained" disabled={disabledPayment} onClick={onProceedCryptoPayment} fullWidth>
        {translate('cont-pay-now')}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={translate('cont-escrow-payment')}
        subTitle={translate('cont-proceed-payment')}
        content={contentJsx}
        footer={footerJsx}
        contentClassName={styles['modal__content']}
        mobileFullHeight={false}
      />
      <AlertModal
        open={!!errorMessage}
        onClose={() => setErrorMessage('')}
        title={translate('cont-failed')}
        message={errorMessage}
        closeButtn={false}
        submitButton={false}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
      />
    </>
  );
};

export default PaymentCryptoModal;
