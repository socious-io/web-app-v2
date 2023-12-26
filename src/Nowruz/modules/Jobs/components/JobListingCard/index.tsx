import React from 'react';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';

import css from './job-listing-card.module.scss';
export const JobListingCard = () => {
  return (
    <div className={css.container}>
      <div className={css.cardInfo}>
        <div>
          <AvatarLabelGroup
            account={{
              id: '4',
              type: 'organizations',
              name: 'first last',
              username: '@username',
            }}
          />
          <div>
            We are looking for a Product Designer able to understand our business requirements and any technical
            limitations, as well as be responsible for conceiving and conducting user...
          </div>
        </div>
      </div>
    </div>
  );
};
