import React from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import { ContractDetailsSliderProps } from './contractDetailsSlider.types';
import { useContractDetailsSlider } from './useContractDetailsSlider';

export const ContractDetailsSlider: React.FC<ContractDetailsSliderProps> = ({
  offer,
  displayMessage,
  messageComponent,
  displayPrimaryButton,
  displaySecondaryButton,
  primaryButtonAction,
  primaryButtonLabel,
  secondaryButtonAction,
  secondaryButtonLabel,
}) => {
  const { profileImage, name, tabs } = useContractDetailsSlider(offer);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 ">
          <Avatar size="72px" type="organizations" img={profileImage} />
          <div className="flex flex-col">
            <span className="font-semibold text-2xl leading-8 text-Gray-light-mode-900">{offer.project.title}</span>
            <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{name}</span>
          </div>
        </div>
        <div className="flex gap-3">
          {displaySecondaryButton && (
            <Button variant="outlined" color="secondary" fullWidth onClick={secondaryButtonAction}>
              {secondaryButtonLabel}
            </Button>
          )}

          <Button variant="outlined" color="secondary" fullWidth>
            Message
          </Button>
        </div>
        {displayPrimaryButton && (
          <Button variant="contained" color="primary" onClick={primaryButtonAction}>
            {primaryButtonLabel}
          </Button>
        )}
        {displayMessage && messageComponent}

        <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="gap-0" />
      </div>
    </div>
  );
};
