import React, { useState } from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { CardRadioButtonItem } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton.types';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { SelectBankAccountUserProps } from './selectBankAccountUser.types';

export const SelectBankAccountUser: React.FC<SelectBankAccountUserProps> = ({
  open,
  handleClose,
  accounts,
  handleAccept,
}) => {
  const accOptions = accounts.map((acc) => {
    // const iconPath = `/icons/nowruz/pay-icons/${i.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;
    return {
      value: acc.id,
      title: acc.bank_name,
      description: `Savings ••${acc.last4}`,
      // img: <img src={iconPath} alt="" />,
    };
  });
  const [options] = useState<CardRadioButtonItem[]>(accOptions);
  const [selectedCardId, setSelectedCardId] = useState('');
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      icon={<FeaturedIcon iconName="credit-card-down" size="lg" type="modern" theme="gray" />}
      mobileFullHeight={false}
      headerDivider={false}
    >
      <div className="flex flex-col p-4 md:p-6 gap-6">
        <div className="font-semibold text-lg  leading-7 text-Gray-light-mode-900">Select a payout account</div>
        <div className="flex flex-col gap-1.5">
          <div className="font-medium text-sm leading-5 text-Gray-light-mode-700">Transfer to</div>
          <CardRadioButton
            items={options}
            selectedValue={selectedCardId}
            setSelectedValue={(value) => {
              setSelectedCardId(value);
            }}
          />
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-3 md:mt-2">
          <Button variant="contained" color="primary" disabled={!selectedCardId} fullWidth onClick={handleAccept}>
            Accept offer
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
