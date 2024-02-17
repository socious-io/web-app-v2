import { ReactNode, useCallback, useMemo } from 'react';
import { Job, Organization, User } from 'src/core/api';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import ProfileCard from 'src/Nowruz/modules/general/components/profileCard';
import { JobListingCard } from 'src/Nowruz/modules/Jobs/components/JobListingCard';
import { useSearch } from 'src/Nowruz/pages/search/useSearch';

import css from './list.module.scss';

export const Search = () => {
  const { page, setPage, total, PER_PAGE, searchResult, isMobile, type, q } = useSearch();

  const card = useCallback(
    (item: Job | Organization | User) => {
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
    },
    [type],
  );

  const readableType = useMemo(() => {
    if (type === 'projects') return 'jobs';
    if (type === 'users') return 'people';
    return 'organization';
  }, [type]);

  const headerClass = `${css.header}`;
  return (
    <div className={css.container}>
      <div>
        <div className={headerClass}>
          <h1 className={css.title}>{`Search for ${q}`}</h1>
          <h2 className={css.subtitle}>{`${total} ${readableType} found`}</h2>
        </div>
      </div>
      <div className={css.list}>
        {searchResult.items?.map((item) => <div className="mt-6">{card(item)}</div>)}
        {!isMobile && (
          <div className="mt-11">
            <Pagination
              count={Math.floor(total / PER_PAGE) + (total % PER_PAGE && 1)}
              onChange={(e, p) => setPage(p)}
            />
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
    </div>
  );
};
