import React from 'react';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { CardRadioButton } from 'src/modules/general/components/cardRadioButton/cardRadioButton';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Modal } from 'src/modules/general/components/modal';

import { PaymentFiatProps } from './paymentFiat.types';
import { usePaymentFiat } from './usePaymentFiat';
import { AddCardModal } from '../addCardModal';
import { PaymentSummary } from '../paymentSummary';

export const PaymentFiat: React.FC<PaymentFiatProps> = ({ offer, open, handleClose }) => {
  const {
    cardOptionList,
    selectedCardId,
    setSelectedCardId,
    proceedFiatPayment,
    paymentDisabled,
    errorMessage,
    openErrorModal,
    setOpenErrorModal,
    openAddCardModal,
    setOpenAddCardModal,
    setCardList,
  } = usePaymentFiat(handleClose, offer?.id || '');
  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse p-4 md:p-6 gap-3">
      <Button
        variant="contained"
        color="primary"
        customStyle="flex-1"
        onClick={proceedFiatPayment}
        disabled={paymentDisabled}
      >
        {translate('cont-pay-now')}
      </Button>
      <Button variant="outlined" color="secondary" customStyle="flex-1" onClick={() => handleClose(false)}>
        {translate('cont-cancel')}
      </Button>
    </div>
  );
  const contentJsx = (
    <div className="flex flex-col gap-5 p-4 md:p-6                                                                                                                                                                                                                                                                                                                                           ">
      <CardRadioButton
        items={cardOptionList}
        selectedValue={selectedCardId}
        setSelectedValue={value => {
          setSelectedCardId(value);
        }}
      />
      <Button
        variant="text"
        color="primary"
        customStyle="flex gap-2"
        onClick={() => {
          setOpenAddCardModal(true);
        }}
      >
        <Icon name="plus" fontSize={20} className="text-Brand-700" />
        {translate('cont-add-card')}
      </Button>
      {offer && offer?.currency && (
        <PaymentSummary
          currency={offer.currency.toString()}
          amount={offer.amount || 0}
          sociousFee={offer.fee || 0}
          stripeFee={offer.stripe_fee || 0}
          total={offer.total || 0}
          hasFeeDiscount={!!offer.org_referrer_wallet}
        />
      )}
    </div>
  );
  return (
    <>
      <Modal
        title={translate('cont-escrow-payment')}
        subTitle={translate('cont-proceed-payment')}
        content={contentJsx}
        footer={footerJsx}
        open={open}
        handleClose={() => handleClose(false)}
        mobileFullHeight={false}
      />
      {openAddCardModal && offer && (
        <AddCardModal
          currency={offer?.currency?.toString()}
          open={openAddCardModal}
          handleClose={() => setOpenAddCardModal(false)}
          setCardsList={setCardList}
        />
      )}
      <AlertModal
        title={translate('cont-failed')}
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
