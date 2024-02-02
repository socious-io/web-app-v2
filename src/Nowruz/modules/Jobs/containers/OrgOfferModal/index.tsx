import { Modal } from '@mui/material';
import React from 'react';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import Dapp from 'src/dapp';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';

import css from './org-offer-modal.module.scss';
import { OrgOfferModalProps } from './OrgOfferModal.types';
import { useOrgOffer } from './useOrgOffer';

export const OrgOfferModal: React.FC<OrgOfferModalProps> = ({ open, onClose, applicant, onSuccess }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    onSelectPaymentType,
    onSelectPaymentTerm,
    onSelectPaymentMethod,
    isCrypto,
    isNonPaid,
    paymentMethodOptions,
    setSelectedCurrency,
  } = useOrgOffer(applicant, onClose, onSuccess);

  const renderfieldInfo = (title: string, description: string) => {
    return (
      <div className="mb-1.5">
        <div className={css.title}>{title}</div>
        <div className={css.description}>{description}</div>
      </div>
    );
  };
  return (
    <>
      <Modal open={open} onClose={onClose} className={css.container}>
        <div className={css.content}>
          <div className={css.header}>
            <h1 className={css.title}>Send an offer</h1>
            <div className="mt-1">
              <h2 className={css.subtitle}>An offer will be sent to {applicant.user.name}</h2>
            </div>
          </div>
          <div className={css.body}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={css.row}>
                {renderfieldInfo('Contract title*', '')}
                <Input
                  id="title"
                  name="title"
                  register={register}
                  placeholder="e.g. Product Manager"
                  errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
                />
              </div>
              <div className={css.row}>
                {renderfieldInfo('Payment type', 'Is it a paid or volunteer job?')}

                <RadioGroup
                  defaultValue={PROJECT_PAYMENT_TYPE[1].value}
                  items={PROJECT_PAYMENT_TYPE}
                  errors={errors['paymentType']?.message ? [errors['paymentType']?.message.toString()] : undefined}
                  onChange={(type) => onSelectPaymentType(type.value)}
                />
              </div>
              <div className={css.row}>
                {renderfieldInfo('Payment terms', 'Is it a fixed or hourly job?')}
                <RadioGroup
                  defaultValue={PROJECT_PAYMENT_SCHEME[1].value}
                  items={PROJECT_PAYMENT_SCHEME}
                  onChange={(term) => onSelectPaymentTerm(term.value)}
                  errors={errors['paymentTerm']?.message ? [errors['paymentTerm']?.message.toString()] : undefined}
                />
              </div>
              <div className={css.row}>
                {renderfieldInfo('Estimated total hours*', '')}
                <Input
                  name="hours"
                  register={register}
                  placeholder="0"
                  type="number"
                  errors={errors['hours']?.message ? [errors['hours']?.message.toString()] : undefined}
                />
              </div>
              {!isNonPaid && (
                <div className={css.row}>
                  {renderfieldInfo('Payment method', 'Payment in fiat or crypto?')}
                  <RadioGroup
                    onChange={(option) => onSelectPaymentMethod(option.value)}
                    items={PROJECT_PAYMENT_MODE}
                    defaultValue={PROJECT_PAYMENT_MODE[1].value}
                    errors={
                      errors['paymentMethod']?.message ? [errors['paymentMethod']?.message.toString()] : undefined
                    }
                  />
                </div>
              )}
              {!isNonPaid && (
                <div className={css.row}>
                  {isCrypto && renderfieldInfo('Your wallet', 'Connect wallet to send an offer')}
                  {isCrypto && (
                    <div className="flex justify-center my-5">
                      <Dapp.Connect />
                    </div>
                  )}
                  <div>
                    <div className={css.title}>Offer amount</div>
                    <Input
                      name="total"
                      register={register}
                      type="number"
                      placeholder={'0'}
                      errors={errors['total']?.message ? [errors['total']?.message.toString()] : undefined}
                      postfixDropdown={{
                        options: paymentMethodOptions,
                        onChange: (currency) => setSelectedCurrency(currency),
                      }}
                    />
                  </div>
                </div>
              )}
              <div className={`${css.row} border-b-none`}>
                {renderfieldInfo('Description', '')}
                <Input
                  name="description"
                  register={register}
                  customHeight="128px"
                  placeholder="e.g. “Lead product development from idea to launch...”."
                  multiline
                  errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
                />
              </div>
            </form>
          </div>
          <div className={css.footer}>
            <Button color="secondary" variant="outlined" onClick={() => onClose()} block>
              Cancel
            </Button>
            <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)} block>
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
