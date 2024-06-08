import React from 'react';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';

import { useDisputeDetail } from './useDisputeDetail';

export const DisputeDetail = () => {
  const { dispute, alertInfo } = useDisputeDetail();
  return (
    <div className="pt-8 pb-12 px-4 md:px-8 flex flex-col gap-8">
      <div className="flex flex-col">
        <div className="mb-5 w-fit">
          <BackLink
            title="Back to disputes"
            // TODO: add back to dispute list
            // onBack={}
            block={false}
            //  customStyle?: string;
          />
        </div>
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold leading-8 text-Gray-light-mode-900">{dispute.code}</span>
            <span className="text-base font-normal leading-6 text-Gray-light-mode-600">{dispute.title}</span>
          </div>
          <div className="flex flex-col gap-3 md:hidden">
            <Button variant="outlined" color="primary">
              Withdraw
            </Button>
            <Button variant="contained" color="primary">
              Message
            </Button>
          </div>
          <div
            className={`flex  flex-col md:flex-row gap-4 rounded-xl p-4 items-start border border-solid border-Gray-light-mode-300 shadow-Shadows/shadow-xs  `}
          >
            <FeaturedIconOutlined iconName="alert-circle" size="md" theme="warning" />
            <div className="flex flex-col gap-1">
              <div className="text-sm font-semibold leading-5 text-Gray-light-mode-700">{alertInfo.title}</div>
              <div className={'text-sm font-normal left-5 text-Gray-light-mode-600'}>
                <span className="text-Brand-700">{alertInfo.subtitleName}</span>
                {alertInfo.subtitle}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
