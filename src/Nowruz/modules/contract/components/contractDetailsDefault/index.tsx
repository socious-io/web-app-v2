import React from 'react';
import { Offer } from 'src/core/api';

import { ContractDetailsSlider } from '../contractDetailsSlider';

export interface ContractDetailsDefaultProps {
  offer: Offer;
}
export const ContractDetailsDefault: React.FC<ContractDetailsDefaultProps> = ({ offer }) => {
  return (
    <ContractDetailsSlider
      offer={offer}
      displayMessage={false}
      displayPrimaryButton={false}
      displaySecondaryButton={false}
    />
  );
};
