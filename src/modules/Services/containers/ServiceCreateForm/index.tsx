import { OptionType } from 'src/core/adaptors';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import FileUploader from 'src/modules/general/components/FileUploader';
import { Input } from 'src/modules/general/components/input/input';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import { RadioGroup } from 'src/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import AddPayoutAccount from 'src/modules/general/containers/AddPayoutAccount';
import ConfirmModal from 'src/modules/general/containers/ConfirmModal';
import ServiceCreateHeader from 'src/modules/Services/components/ServiceCreateHeader';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useServiceCreateForm } from './useServiceCreateForm';

const ServiceCreateForm = () => {
  const {
    data: {
      openModal,
      isEdit,
      categories,
      serviceLength,
      paymentModes,
      paymentCurrencies,
      tokens,
      skills,
      register,
      errors,
      selectedCategory,
      selectedDelivery,
      selectedPaymentMethod,
      selectedCurrency,
      selectedSkills,
      attachments,
      errorMessage,
      disabledButton,
    },
    operations: {
      handleCloseModal,
      onCancelClick,
      onBack,
      Web3Connect,
      handleSubmit,
      onSubmit,
      onSelectSearchDropdown,
      onSelectValue,
      onSelectSkills,
      onDropFiles,
      onDeleteFiles,
    },
  } = useServiceCreateForm();

  const paymentField = {
    FIAT: (
      <>
        <div className={styles['row__left']}>{translate('service-form.payment-fiat')}</div>
        <div className={styles['row__right']}>
          <Input
            register={register}
            name="price"
            id="price"
            placeholder="0"
            errors={errors['price']?.message ? [errors['price'].message.toString()] : undefined}
            postfixDropdown={{
              options: paymentCurrencies,
              value: paymentCurrencies.find(currency => currency.value === selectedCurrency),
              onChange: currency => onSelectValue('currency', currency),
            }}
          />
        </div>
      </>
    ),
    CRYPTO: (
      <>
        <div className={styles['row__left']}>
          {translate('service-form.payment-crypto')}
          <span className={styles['row__description']}>{translate('service-form.payment-crypto-description')}</span>
        </div>
        <div className={styles['row__right']}>
          <>
            <div className="flex-1">
              <Web3Connect />
            </div>
            <Input
              register={register}
              name="price"
              id="price"
              placeholder="0"
              errors={errors['price']?.message ? [errors['price'].message.toString()] : undefined}
              postfixDropdown={{
                options: tokens,
                value: tokens.find(token => token.value === selectedCurrency),
                onChange: token => onSelectValue('currency', token),
              }}
            />
          </>
        </div>
      </>
    ),
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ServiceCreateHeader
          isEdit={isEdit}
          onPublish={handleSubmit(onSubmit)}
          onDiscard={(name: 'back' | 'cancel') => (name === 'back' ? onBack() : onCancelClick())}
          disabled={disabledButton}
        />
        <div className={styles['row']}>
          <div className={styles['row__left']}>
            {translate('service-form.name')}
            <span className={styles['row__description']}>{translate('service-form.name-description')}</span>
          </div>
          <div className={styles['row__right']}>
            <Input
              register={register}
              name="name"
              id="name"
              placeholder={translate('service-form.name-placeholder')}
              errors={errors['name']?.message ? [errors['name'].message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>{translate('service-form.category')}</div>
          <div className={styles['row__right']}>
            <SearchDropdown
              id="category"
              placeholder={translate('service-form.category-placeholder')}
              options={categories}
              isSearchable
              value={selectedCategory}
              onChange={value => onSelectSearchDropdown('category', value as OptionType)}
              errors={errors['category']?.value?.message ? [errors['category']?.value.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>
            {translate('service-form.description')}
            <span className={styles['row__description']}>{translate('service-form.description-description')}</span>
          </div>
          <div className={styles['row__right']}>
            <Input
              register={register}
              name="description"
              id="description"
              placeholder={translate('service-form.description-placeholder')}
              multiline
              customHeight="154px"
              errors={errors['description']?.message ? [errors['description'].message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>{translate('service-form.delivery')}</div>
          <div className={styles['row__right']}>
            <SearchDropdown
              id="delivery"
              placeholder={translate('service-form.delivery-placeholder')}
              options={serviceLength}
              isSearchable
              value={selectedDelivery}
              onChange={value => onSelectSearchDropdown('delivery', value as OptionType)}
              errors={errors['delivery']?.value?.message ? [errors['delivery']?.value.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>{translate('service-form.hours')}</div>
          <div className={styles['row__right']}>
            <Input
              register={register}
              name="hours"
              id="hours"
              placeholder="0"
              postfix={<p>{translate('service-form.hours-postfix')}</p>}
              noBorderPostfix
              inputProps={{ style: { textAlign: 'right' } }}
              errors={errors['hours']?.message ? [errors['hours'].message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>{translate('service-form.payment')}</div>
          <div className={styles['row__right']}>
            <RadioGroup
              name="payment"
              items={paymentModes}
              selectedItem={paymentModes.find(payment => payment.value === selectedPaymentMethod)}
              onChange={option => onSelectValue('payment', option.value as string)}
              errors={errors['payment']?.message ? [errors['payment']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>{paymentField[selectedPaymentMethod]}</div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>
            {translate('service-form.skills')}
            <span className={styles['row__description']}>{translate('service-form.skills-description')}</span>
          </div>
          <div className={styles['row__right']}>
            <MultiSelect
              id="skills"
              placeholder={translate('service-form.skills-placeholder')}
              items={skills}
              componentValue={selectedSkills}
              setComponentValue={onSelectSkills}
              max={5}
              customHeight="154px"
              chipFontColor={variables.color_grey_blue_700}
              chipBorderColor={variables.color_grey_200}
              chipBgColor={variables.color_grey_blue_50}
              chipIconColor={variables.color_grey_blue_500}
              displayDefaultBadges={false}
              errors={errors['skills']?.message ? [errors['skills']?.message.toString()] : undefined}
            />
          </div>
        </div>
        <div className={styles['row']}>
          <div className={styles['row__left']}>
            {translate('service-form.samples')}
            <span className={styles['row__description']}>{translate('service-form.samples-description')}</span>
          </div>
          <div className={styles['row__right']}>
            <FileUploader
              files={attachments}
              onDropFiles={onDropFiles}
              fileTypes={['PNG', 'JPG', 'GIF']}
              showPreviewImages
              showFileName={false}
              onDeleteFiles={onDeleteFiles}
              maxFiles={3}
              multiple={false}
              error={errorMessage}
              customStyle="h-[126px]"
            />
          </div>
        </div>
        <div className={styles['footer']}>
          <Button color="info" variant="outlined" onClick={onCancelClick}>
            {translate('service-form.cancel.button')}
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={disabledButton}>
            {translate('service-form.publish.button')}
          </Button>
        </div>
      </form>
      <ConfirmModal
        open={openModal.name === 'cancel' && openModal.open}
        handleClose={handleCloseModal}
        title={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        confirmHeader={translate('service-form.cancel.title')}
        confirmSubheader={translate('service-form.cancel.subtitle')}
        buttons={[
          {
            children: translate('service-form.cancel.button'),
            color: 'info',
            variant: 'outlined',
            onClick: handleCloseModal,
            customStyle: 'w-full',
          },
          {
            children: translate('service-form.cancel.leave-button'),
            color: 'error',
            variant: 'contained',
            onClick: onBack,
            customStyle: 'w-full',
          },
        ]}
        customStyle="md:max-w-[400px]"
      />
      <ConfirmModal
        open={openModal.name === 'publish' && openModal.open}
        handleClose={handleCloseModal}
        title={<FeaturedIcon iconName="alert-circle" size="lg" theme="success" type="light-circle-outlined" />}
        confirmHeader={translate('service-form.publish.title')}
        confirmSubheader={translate('service-form.publish.subtitle')}
        buttons={[
          {
            children: translate('service-form.publish.close-button'),
            color: 'primary',
            variant: 'contained',
            onClick: onBack,
            customStyle: 'w-full',
          },
        ]}
        customStyle="md:max-w-[400px]"
      />
      <AddPayoutAccount open={openModal.name === 'stripe' && openModal.open} handleClose={handleCloseModal} />
    </>
  );
};

export default ServiceCreateForm;
