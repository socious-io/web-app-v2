import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { PaymentFiatProps } from './paymentFiat.types';
import { usePaymentFiat } from './usePaymentFiat';
import { AddCardModal } from '../addCardModal';
import { PaymentSummary } from '../paymentSummary';

export const PaymentFiat: React.FC<PaymentFiatProps> = ({ offerId, open, handleClose, currency, amount }) => {
  const {
    cardOptionList,
    selectedCardId,
    setSelectedCardId,
    proceedFiatPayment,
    process,
    errorMessage,
    openErrorModal,
    setOpenErrorModal,
    openAddCardModal,
    setOpenAddCardModal,
    setCardList,
  } = usePaymentFiat(offerId, handleClose);

  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 pb-4 md:px-6 md:pb-6 gap-3">
      <Button variant="contained" color="primary" customStyle="flex-1" onClick={proceedFiatPayment} disabled={process}>
        Pay now
      </Button>
      <Button variant="outlined" color="secondary" customStyle="flex-1" onClick={() => handleClose(false)}>
        Cancel
      </Button>
    </div>
  );
  const contentJsx = (
    <div className="flex flex-col gap-5 px-4 pt-4 md:px-6 md:pt-6                                                                                                                                                                                                                                                                                                                                                   ">
      <CardRadioButton
        items={cardOptionList}
        selectedValue={selectedCardId}
        setSelectedValue={(value) => {
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
        Add a new card
      </Button>
      <PaymentSummary offerAmount={amount} currency={currency} />
    </div>
  );
  return (
    <>
      <Modal
        title="Escrow payment"
        subTitle="Proceed to payment"
        content={contentJsx}
        footer={footerJsx}
        open={open}
        handleClose={handleClose}
        mobileFullHeight={false}
      />
      {openAddCardModal && (
        <AddCardModal
          currency={currency}
          open={openAddCardModal}
          handleClose={() => setOpenAddCardModal(false)}
          setCardsList={setCardList}
        />
      )}
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
