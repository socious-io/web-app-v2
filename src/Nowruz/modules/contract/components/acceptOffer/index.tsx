import { Typography } from '@mui/material';
import React from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import css from './acceptOffer.module.scss';
import { AcceotOfferProps } from './acceptOffer.types';
import { useAcceptOffer } from './useAcceptOffer';

export const AcceptOffer: React.FC<AcceotOfferProps> = ({ offer }) => {
  const { profileImage, name, tabs, accepted, declined, handleAccept, handleDecline } = useAcceptOffer(offer);
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
          {!accepted && !declined && (
            <Button variant="outlined" color="secondary" fullWidth onClick={handleDecline}>
              Decline
            </Button>
          )}
          <Button variant="outlined" color="secondary" fullWidth>
            Message
          </Button>
        </div>
        {!accepted && !declined && (
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Accept offer
          </Button>
        )}
        {accepted && (
          <div className={css.acceptAlert}>
            <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
            <div className="flex flex-col gap-1">
              <Typography variant="subtitle2" className="text-Brand-700">
                You have accepted this offer
              </Typography>
              <Typography variant="subtitle1" className="text-Brand-700">
                We are just waiting for the final confirmation from Ocean Protection to start the job.
              </Typography>
            </div>
          </div>
        )}
        {declined && (
          <div className={css.declineAlert}>
            <FeaturedIconOutlined iconName="check-circle" size="md" theme="error" />

            <Typography variant="subtitle2" className="text-Error-600">
              You have declined this offer
            </Typography>
          </div>
        )}
        <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="gap-0" />
      </div>
    </div>
  );
};
