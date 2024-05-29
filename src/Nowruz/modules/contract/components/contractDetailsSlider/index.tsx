import { UserType } from 'src/core/types';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import { useContractDetailsSlider } from './useContractDetailsSlider';

export const ContractDetailsSlider = () => {
  const { name, profileImage, type, tabs, sliderComponent, contract } = useContractDetailsSlider();

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6 ">
            <Avatar size="72px" type={(type || 'users') as UserType} img={profileImage} />
            <div className="flex flex-col">
              <span className="font-semibold text-2xl leading-8 text-Gray-light-mode-900">
                {contract.project.title}
              </span>
              <span className="font-normal text-base leading-6 text-Gray-light-mode-600">{name}</span>
            </div>
          </div>
          {sliderComponent}
          <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="gap-0" />
        </div>
      </div>
    </>
  );
};
