import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

interface StripeAccountItemProps {
  bankName: string;
  accountNumber: string;
}
export const StripeAccountItem: React.FC<StripeAccountItemProps> = ({ bankName, accountNumber }) => {
  // const iconPath = `/icons/nowruz/pay-icons/${card.meta.brand.toLowerCase().replaceAll(' ', '')}.svg`;

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-3">
        {/* <img src={iconPath} alt="" /> */}
        <div className="flex flex-col">
          <span className="font-medium text-sm leading-5 text-Gray-light-mode-900">{bankName}</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{accountNumber}</span>
        </div>
      </div>
      {/* <div className="flex">
        <IconButton
          size="medium"
          iconName="trash-01"
          iconSize={20}
          iconColor={variables.color_grey_600}
          //handleClick
        />
        <IconButton
          size="medium"
          iconName="edit-01"
          iconSize={20}
          iconColor={variables.color_grey_600}
          //handleClick
        />
      </div> */}
    </div>
  );
};
