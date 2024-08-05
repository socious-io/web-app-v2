import React from 'react';

export const EmptyList = () => {
  return (
    <div className="px-4 md:px-8">
      <div className="w-full border border-solid border-Gray-light-mode-200 rounded-xl flex items-center justify-center py-5 px-6 shadow-Shadows/shadow-sm">
        <div className="flex flex-col gap-4">
          <img src="/images/cloud.svg" />
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold leading-6 text-Gray-light-mode-900">No disputes found</span>
            <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">
              Here are all your latest disputes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
