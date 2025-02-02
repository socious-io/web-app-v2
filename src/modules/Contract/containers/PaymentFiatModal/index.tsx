import { translate } from 'src/core/utils';
import PaymentSummary from 'src/modules/Contract/components/PaymentSummary';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import CardRadioButton from 'src/modules/general/components/CardRadioButton';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Modal } from 'src/modules/general/components/modal';
import AddCardModal from 'src/modules/general/containers/AddCardModal';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { PaymentFiatModalProps } from './index.types';
import { usePaymentFiatModal } from './usePaymentFiatModal';

const PaymentFiatModal: React.FC<PaymentFiatModalProps> = ({ open, handleClose, contract, onSucceedPayment }) => {
  const {
    data: { cardsList, selectedCardId, openAddCardModal, paymentDisabled, errorMessage },
    operations: {
      setCardsList,
      setSelectedCardId,
      onRemoveCard,
      setOpenAddCardModal,
      onProceedFiatPayment,
      setErrorMessage,
    },
  } = usePaymentFiatModal(contract, onSucceedPayment);

  const cardsOptionList = cardsList.map(card => {
    const iconPath = `/icons/pay-icons/${card.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      value: card.id,
      title: `${card.meta.brand} ${translate('general-card.ending')} ${card.meta.last4}`,
      description: `${translate('general-card.expiry')} ${card.meta.exp_month}/${card.meta.exp_year}`,
      img: <img src={iconPath} alt="" />,
      content: (
        <Button
          color="secondary"
          variant="text"
          customStyle={styles['card__remove']}
          onClick={() => onRemoveCard(card.id)}
        >
          {translate('general-card.remove')}
        </Button>
      ),
    };
  });

  const contentJsx = (
    <>
      <CardRadioButton items={cardsOptionList} selectedValue={selectedCardId} setSelectedValue={setSelectedCardId} />
      <Button
        color="primary"
        variant="text"
        startIcon={<Icon name="plus" color={variables.color_primary_700} />}
        onClick={() => setOpenAddCardModal(true)}
        customStyle="flex gap-2"
      >
        {translate('cont-add-card')}
      </Button>
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
      <Button color="secondary" variant="outlined" fullWidth onClick={handleClose}>
        {translate('cont-cancel')}
      </Button>
      <Button color="primary" variant="contained" onClick={onProceedFiatPayment} disabled={paymentDisabled} fullWidth>
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
      <AddCardModal
        open={openAddCardModal}
        handleClose={() => setOpenAddCardModal(false)}
        setCardsList={setCardsList}
        currency={contract.currency.name}
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

export default PaymentFiatModal;
