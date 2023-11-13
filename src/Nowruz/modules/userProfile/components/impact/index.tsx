import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

export const Impact = () => {
  return (
    <div className="w-full h-fit p-5 flex flex-col items-start justify-center bg-Sail-100 rounded-xl">
      <div className="flex">
        <p className="text-lg font-semibold	leading-7 text-Gray-light-mode-900 mr-2">Impact points</p>
        <Icon name="help-circle" fontSize={16} />
      </div>
    </div>
  );
};
