import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';

interface NotVerifiedAlertProps {
  handleOpenVerifyModal: () => void;
}

export const NotVerifiedAlert: React.FC<NotVerifiedAlertProps> = ({ handleOpenVerifyModal }) => {
  return (
    <div className="w-full p-4 md:px-8 md:py-0 bg-Warning-25 border border-solid border-x-0 border-t-0 border-b-Warning-300 flex flex-col md:flex-row md:items-center">
      <div className="w-fit h-fit mb-1 md:mb-0 md:mr-4">
        <FeaturedIconOutlined theme="warning" iconName="alert-circle" size="md" />
      </div>
      <div className="flex flex-col md:flex-row gap-[2px] md:gap-1.5">
        <span className="text-sm font-semibold leading-5 text-Warning-700">Verify your identity</span>
        <span className="text-sm font-normal leading-5 text-Warning-700">
          In order to claim your certificates, please verify your identity.
        </span>
      </div>
      <div className="md:mr-0 md:ml-auto flex gap-2">
        <Button variant="text" color="error" customStyle="text-Warning-600 p-0">
          Learn more
        </Button>
        <Button
          variant="text"
          color="error"
          customStyle="text-Warning-700 flex gap-2 items-center"
          onClick={handleOpenVerifyModal}
        >
          Verify now
          <Icon name="arrow-right" fontSize={20} className="text-Warning-700 p-0" />
        </Button>
      </div>
    </div>
  );
};
