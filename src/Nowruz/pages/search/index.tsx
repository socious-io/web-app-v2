import { useLoaderData, useSearchParams } from 'react-router-dom';
import { JobsRes, OrganizationsRes, UsersRes } from 'src/core/api';
import { SearchListing } from 'src/Nowruz/modules/Search/FullSearch';

import css from './list.module.scss';

export const Search = () => {
  const data = useLoaderData() as JobsRes | UsersRes | OrganizationsRes;
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  let type = searchParams.get('type') ?? 'projects';
  switch (type) {
    case 'projects':
      type = 'jobs';
      break;
    case 'users':
      type = 'people';
      break;
  }

  const headerClass = `${css.header}`;
  return (
    <div className={css.container}>
      <div>
        <div className={headerClass}>
          <h1 className={css.title}>{`Search for ${q}`}</h1>
          <h2 className={css.subtitle}>{`${data.items.length} ${type} found`}</h2>
        </div>
      </div>
      <div className={css.list}>{<SearchListing />}</div>
    </div>
  );
};
