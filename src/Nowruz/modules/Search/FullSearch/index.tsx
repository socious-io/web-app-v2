import React, { ReactNode } from 'react';
import { Job, Organization, User } from 'src/core/api';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

import css from './job-listing.module.scss';
import { useSearchListing } from './useSearchListing';
import ProfileCard from '../../general/components/profileCard';
import { JobListingCard } from '../../Jobs/components/JobListingCard';

export const SearchListing = () => {
  const { page, setPage, total, PER_PAGE, searchList, isMobile, type } = useSearchListing();

  const cardJSX = (item: Job | Organization | User) => {
    let card: ReactNode = <JobListingCard job={item as Job} />;
    switch (type) {
      case 'users':
      case 'organizations':
        card = <ProfileCard identity={item as User | Organization} labelShown={false} />;
        break;

      case 'projects':
        card = <JobListingCard job={item as Job} />;
        break;
    }
    return card;
  };

  return (
    <div className={css.container}>
      {searchList.map((item) => (
        <div className="mt-6">{cardJSX(item)}</div>
      ))}
      {!isMobile && (
        <div className="mt-11">
          <Pagination count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {isMobile && (
        <div className="mt-5 flex items-center justify-center">
          <Button color="primary" variant="text" onClick={() => setPage(page + 1)}>
            See more
          </Button>
        </div>
      )}
    </div>
  );
};
