import { Modal } from '@mui/material';
import React from 'react';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { RadioGroup } from 'src/modules/general/components/RadioGroup';
import ConnectButton from 'src/modules/wallet/components/ConnectButton';

import css from './org-offer-modal.module.scss';
import { OrgOfferModalProps } from './OrgOfferModal.types';
import { useOrgOffer } from './useOrgOffer';

export const OrgOfferModal: React.FC<OrgOfferModalProps> = ({ open, onClose, applicant, onSuccess }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    onSelectValue,
    errors,
    isCrypto,
    isNonPaid,
    paymentMethodOptions,
    currency,
    preventArrow,
    disabled,
  } = useOrgOffer(applicant, onClose, onSuccess);

  const paymentMode = PROJECT_PAYMENT_MODE;
  const paymentType = [...PROJECT_PAYMENT_TYPE].reverse();
  const paymentScheme = [...PROJECT_PAYMENT_SCHEME].reverse();

  const renderFieldInfo = (title: string, description: string) => {
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
                {renderFieldInfo('Contract title*', '')}
                <Input
                  id="title"
                  name="title"
                  register={register}
                  placeholder="e.g. Product Manager"
                  errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
                />
              </div>
              <div className={css.row}>
                {renderFieldInfo('Payment type', 'Is it a paid or volunteer job?')}

                <RadioGroup
                  defaultValue={paymentType[0].value}
                  items={paymentType}
                  errors={errors['paymentType']?.message ? [errors['paymentType']?.message.toString()] : undefined}
                  onChange={type => onSelectValue('paymentType', type.value as string)}
                />
              </div>
              <div className={css.row}>
                {renderFieldInfo('Payment terms', 'Is it a fixed or hourly job?')}
                <RadioGroup
                  defaultValue={paymentScheme[0].value}
                  items={paymentScheme}
                  onChange={term => onSelectValue('paymentTerm', term.value as string)}
                  errors={errors['paymentTerm']?.message ? [errors['paymentTerm']?.message.toString()] : undefined}
                />
              </div>
              <div className={css.row}>
                {renderFieldInfo('Estimated total hours*', '')}
                <Input
                  name="hours"
                  register={register}
                  placeholder="0"
                  type="number"
                  postfix={<p>hours</p>}
                  noBorderPostfix
                  onKeyDown={preventArrow}
                  errors={errors['hours']?.message ? [errors['hours']?.message.toString()] : undefined}
                  inputProps={{ style: { textAlign: 'right' } }}
                />
              </div>
              {!isNonPaid && (
                <div className={css.row}>
                  {renderFieldInfo('Payment method', 'Payment in fiat or crypto?')}
                  <RadioGroup
                    onChange={option => onSelectValue('paymentMethod', option.value as string)}
                    items={paymentMode}
                    defaultValue={paymentMode[0].value}
                    errors={
                      errors['paymentMethod']?.message ? [errors['paymentMethod']?.message.toString()] : undefined
                    }
                  />
                </div>
              )}
              {!isNonPaid && (
                <div className={css.row}>
                  {isCrypto && renderFieldInfo('Your wallet', 'Connect wallet to send an offer')}
                  {isCrypto && (
                    <div className="flex justify-center my-5 z-30">
                      <ConnectButton />
                    </div>
                  )}
                  <div>
                    {renderFieldInfo('Offer amount*', '')}
                    <Input
                      name="total"
                      register={register}
                      type="number"
                      placeholder={'0'}
                      onKeyDown={preventArrow}
                      errors={errors['total']?.message ? [errors['total']?.message.toString()] : undefined}
                      postfixDropdown={{
                        options: paymentMethodOptions,
                        value: paymentMethodOptions.find(option => option.value === currency) || null,
                        onChange: currency => onSelectValue('currency', currency),
                      }}
                    />
                  </div>
                </div>
              )}
              <div className={`${css.row} border-b-none`}>
                {renderFieldInfo('Description*', '')}
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
            <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)} block disabled={disabled}>
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
