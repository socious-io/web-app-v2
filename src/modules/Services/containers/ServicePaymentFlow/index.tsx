import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import { AddCardModal } from 'src/modules/contract/components/addCardModal';
import { Button } from 'src/modules/general/components/Button';
import { CardRadioButton } from 'src/modules/general/components/cardRadioButton/cardRadioButton';
import { Icon } from 'src/modules/general/components/Icon';
import ProgressStep from 'src/modules/general/components/ProgressStep';
import ServiceOrderDetail from 'src/modules/Services/components/ServiceOrderDetail';
import { ConnectButton } from 'src/modules/wallet/components/connectButton';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useServicePaymentFlow } from './useServicePaymentFlow';

const ServicePaymentFlow = () => {
  const {
    data: {
      service,
      orderPayment,
      step,
      paymentIsFiat,
      cardsOptionList,
      selectedCardId,
      openAddCardModal,
      isConnected,
      orderStatus,
    },
    operations: { onPay, setCardsList, setSelectedCardId, setOpenAddCardModal, openConnect },
  } = useServicePaymentFlow();

  const renderSteps = {
    1: (
      <>
        <div className={styles['header']}>
          <>
            {paymentIsFiat
              ? translate('service-detail.order.card-header')
              : translate('service-detail.order.wallet-header')}
          </>
          {paymentIsFiat && (
            <span className={styles['header--lighter']}>{translate('service-detail.order.card-subheader')}</span>
          )}
        </div>
        <div className={styles['main']}>
          {paymentIsFiat ? (
            <>
              <Button
                color="primary"
                variant="text"
                startIcon={<Icon name="plus" color={variables.color_primary_700} />}
                onClick={() => setOpenAddCardModal(true)}
              >
                {translate('service-detail.order.card-new')}
              </Button>
              <CardRadioButton
                items={cardsOptionList}
                selectedValue={selectedCardId}
                setSelectedValue={setSelectedCardId}
              />
              <AddCardModal
                open={openAddCardModal}
                handleClose={() => setOpenAddCardModal(false)}
                currency={service.currency}
                setCardsList={setCardsList}
              />
            </>
          ) : (
            <>{isConnected ? <Dapp.Connect /> : <ConnectButton handleClick={() => openConnect()} />}</>
          )}
        </div>
      </>
    ),
    2: <div>step final</div>,
  };

  return (
    <div className={styles['content']}>
      <div className={styles['content__left']}>
        <ProgressStep
          titles={['Order details', 'Confirm and pay', 'Submit your requirements']}
          count={3}
          active={step}
          containerClassName="pb-3"
        />
        {renderSteps[step]}
      </div>
      <div className={styles['content__right']}>
        <ServiceOrderDetail
          service={service}
          orderPayment={orderPayment}
          orderStatus={orderStatus}
          buttonName={translate('service-detail.order.confirm-button')}
          onButtonClick={onPay}
        />
      </div>
    </div>
  );
};

export default ServicePaymentFlow;
