import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';
import CardRadioButton from 'src/modules/general/components/CardRadioButton';
import FileUploader from 'src/modules/general/components/FileUploader';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import ProgressStep from 'src/modules/general/components/ProgressStep';
import AddCardModal from 'src/modules/general/containers/AddCardModal';
import ServiceOrderDetail from 'src/modules/Services/components/ServiceOrderDetail';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useServicePaymentFlow } from './useServicePaymentFlow';

const ServicePaymentFlow = () => {
  const {
    data: {
      service,
      contractLoading,
      orderPayment,
      step,
      paymentIsFiat,
      cardsList,
      selectedCardId,
      openAddCardModal,
      Web3Connect,
      errorMessage,
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
      onRemoveCard,
      setOpenAddCardModal,
      onDropFiles,
      onDeleteFiles,
      handleSubmit,
      onSubmit,
    },
  } = useServicePaymentFlow();

  const cardsOptionList = cardsList.map(card => {
    const iconPath = `/icons/pay-icons/${card.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      value: card.id,
      title: `${card.meta.brand} ending in ${card.meta.last4}`,
      description: `Expiry ${card.meta.exp_month}/${card.meta.exp_year}`,
      img: <img src={iconPath} alt={`${card.meta.brand}-card`} />,
      content: (
        <Button
          color="secondary"
          variant="text"
          customStyle={styles['card__remove']}
          onClick={() => onRemoveCard(card.id)}
        >
          Remove
        </Button>
      ),
    };
  });

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
            <Web3Connect />
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
          disabledButton={isValidPayStep || contractLoading}
          loadingButton={contractLoading}
          onButtonClick={onPay}
        />
        {errorMessage && (
          <AlertMessage
            theme="error"
            iconName="alert-circle"
            title={errorMessage}
            containerClassName="!items-center !p-2 !mt-6"
          />
        )}
      </div>
    </div>
  );
};

export default ServicePaymentFlow;
