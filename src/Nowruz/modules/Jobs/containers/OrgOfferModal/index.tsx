import { Divider, Modal } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { PROJECT_PAYMENT_MODE } from 'src/constants/PROJECT_PAYMENT_MODE';
import { PROJECT_PAYMENT_SCHEME } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import Dapp from 'src/dapp';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Calender } from 'src/Nowruz/modules/general/components/Calender';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './org-offer-modal.module.scss';
import { useOrgOffer } from './useOrgOffer';
export const OrgOfferModal = ({ open, onClose }) => {
  const { register, handleSubmit, onSubmit, errors, onSelectPaymentType, onSelectPaymentTerm } = useOrgOffer();
  const renderfieldInfo = (title: string, description: string) => {
    return (
      <div className="mb-1.5">
        <div className={css.title}>{title}</div>
        <div className={css.description}>{description}</div>
      </div>
    );
  };
  return (
    <Modal open={open} onClose={onClose} className={css.container}>
      <div className={css.content}>
        <div className={css.header}>
          <span>Send an offer</span>
        </div>
        <div className={css.body}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={css.row}>
              {renderfieldInfo('Title', '')}
              <Input
                id="title"
                autoComplete="Email"
                name="title"
                register={register}
                placeholder="eg. Product Manager"
                errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
              />
            </div>
            <div className={css.row}>
              {renderfieldInfo('Payment type', 'Is it a paid or volunteer job?')}

              <RadioGroup
                items={PROJECT_PAYMENT_TYPE}
                errors={errors['paymentType']?.message ? [errors['paymentType']?.message.toString()] : undefined}
                onChange={(type) => onSelectPaymentType(type.value)}
                // onChange={(option) => onSelectPaymentType(option.value)}
              />
            </div>
            <div className={css.row}>
              {renderfieldInfo('Payment terms', 'Is it a fixed or hourly job?')}
              <RadioGroup
                // onChange={(option) => onSelectPaymentScheme(option.value)}
                items={PROJECT_PAYMENT_SCHEME}
                onChange={(term) => onSelectPaymentTerm(term.value)}
                errors={errors['paymentTerm']?.message ? [errors['paymentTerm']?.message.toString()] : undefined}
              />
            </div>
            <div className={css.time}>
              <div>
                <div className={`${css.title} mb-1.5`}>Due date</div>
                <Calender />
              </div>
              <div>
                <div className={`${css.title} mb-1.5`}>Estimated total hours</div>
                <Input
                  name="hours"
                  //  register={register}
                  placeholder="0"
                  type="number"
                />
              </div>
            </div>
            <div className={css.row}>
              {renderfieldInfo('Payment method', 'Payment in fiat or crypto?')}
              <RadioGroup
                // onChange={(option) => onSelectPaymentScheme(option.value)}
                items={PROJECT_PAYMENT_MODE}
                // errors={errors['paymentScheme']?.message ? [errors['paymentScheme']?.message.toString()] : undefined}
              />
            </div>
            <div className={css.row}>
              {renderfieldInfo('Your wallet', 'Connect wallet to send an offer')}
              <div className="flex justify-center my-5">
                <Dapp.Connect />
              </div>
              <div>
                <div className={css.title}>Total</div>
                <Input name="hours" register={register} placeholder="0" />
              </div>
              <div>
                <div className={css.title}>Currency</div>
                <SearchDropdown
                  placeholder="Select a Currency"
                  options={[
                    { label: 'USD', value: 'USD', subtitle: 'USD' },
                    { label: 'JPY', value: 'JPY', subtitle: 'JPY' },
                  ]}
                  isSearchable={false}
                  // onChange={(value) => onSelectSize(value)}
                />
              </div>
            </div>
            <div className={css.row}>
              {renderfieldInfo('Description', '')}
              <Input
                name="description"
                // register={register}
                customHeight="128px"
                placeholder="eg."
                multiline
                // errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
              />
            </div>
          </form>
        </div>
        <div className={css.footer}>
          <Button color="secondary" variant="outlined" block>
            Cancel
          </Button>
          <Button color="primary" variant="contained" onClick={handleSubmit(onSubmit)} block>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};
