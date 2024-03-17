import { Divider } from '@mui/material';
import React from 'react';

export const UserTeam = () => {
  return (
    <div className="flex flex-col gap-6 px-4 md:px-8 ">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Team management</span>
          <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">Manage your teams</span>
        </div>
        <Divider />
        <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-Gray-light-mode-700">On teams</span>
            <span className="text-sm font-normal text-Gray-light-mode-600">You’re currently on these teams.</span>
          </div>

          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
    </div>
  );
};
