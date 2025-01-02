import { translate } from 'src/core/utils';
import Dapp from 'src/dapp';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';
import { CardRadioButton } from 'src/modules/general/components/cardRadioButton/cardRadioButton';
import FileUploader from 'src/modules/general/components/FileUploader';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import ProgressStep from 'src/modules/general/components/ProgressStep';
import AddCardModal from 'src/modules/general/containers/AddCardModal';
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
      register,
      errors,
      attachments,
      isValidPayStep,
      isValidSendStep,
    },
    operations: {
      onPay,
      setCardsList,
      setSelectedCardId,
      setOpenAddCardModal,
      openConnect,
      onDropFiles,
      onDeleteFiles,
      handleSubmit,
      onSubmit,
    },
  } = useServicePaymentFlow();

  const renderSteps = {
    1: (
      <>
        <div className={styles['pay__header']}>
          <>
            {paymentIsFiat
              ? translate('service-detail.order.card-header')
              : translate('service-detail.order.wallet-header')}
          </>
          {paymentIsFiat && (
            <span className={styles['pay__header--lighter']}>{translate('service-detail.order.card-subheader')}</span>
          )}
        </div>
        <div className={styles['pay__option']}>
          {paymentIsFiat ? (
            <>
              <CardRadioButton
                items={cardsOptionList}
                selectedValue={selectedCardId}
                setSelectedValue={setSelectedCardId}
              />
              <Button
                color="primary"
                variant="text"
                startIcon={<Icon name="plus" color={variables.color_primary_700} />}
                onClick={() => setOpenAddCardModal(true)}
                customStyle="self-center"
              >
                {translate('service-detail.order.card-new')}
              </Button>
              <AddCardModal
                open={openAddCardModal}
                handleClose={() => setOpenAddCardModal(false)}
                setCardsList={setCardsList}
                currency={service.currency.name}
              />
            </>
          ) : (
            <>
              {isConnected ? (
                <div className={styles['dapp']}>
                  <Dapp.Connect />
                </div>
              ) : (
                <ConnectButton handleClick={() => openConnect()} />
              )}
            </>
          )}
        </div>
      </>
    ),
    2: (
      <form className={styles['submit']} onSubmit={handleSubmit(onSubmit)}>
        <AlertMessage
          theme="primary"
          iconName="check-circle"
          title={translate('service-detail.order.success-payment')}
          containerClassName="!items-center !p-2"
        />
        <div className={styles['field']}>
          <div className={styles['field__label']}>{translate('service-detail.order.requirements-description')}</div>
          <Input
            register={register}
            name="description"
            id="description"
            placeholder={translate('service-detail.order.requirements-description-placeholder')}
            multiline
            customHeight="180px"
            errors={errors['description']?.message ? [errors['description'].message.toString()] : undefined}
          />
        </div>
        <div className={styles['field']}>
          <div className={styles['field__label']}>
            {translate('service-detail.order.requirements-files')}
            <span className={styles['field__description']}>
              {translate('service-detail.order.requirements-files-desc', { max: 1 })}
            </span>
          </div>
          <FileUploader
            files={attachments}
            onDropFiles={onDropFiles}
            fileTypes={['DOC', 'DOCX', 'PDF']}
            deleteOnFileName
            onDeleteFiles={onDeleteFiles}
            customStyle="h-[126px]"
          />
        </div>
        <div className={styles['field']}>
          <Button type="submit" color="primary" variant="contained" customStyle="self-end" disabled={!isValidSendStep}>
            {translate('service-detail.order.send-button')}
          </Button>
        </div>
      </form>
    ),
  };

  return (
    <div className={styles['content']}>
      <div className={styles['content__left']}>
        <ProgressStep
          titles={[
            translate('service-detail.order.step-1'),
            translate('service-detail.order.step-2'),
            translate('service-detail.order.step-3'),
          ]}
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
          disabledButton={isValidPayStep}
          onButtonClick={onPay}
        />
      </div>
    </div>
  );
};

export default ServicePaymentFlow;
