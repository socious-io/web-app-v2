import { useLoaderData, useLocation, useSearchParams } from 'react-router-dom';
import { JobsRes } from 'src/core/api';
import { SearchJobListing } from 'src/Nowruz/modules/Search/Jobs';

import css from './list.module.scss';

export const Search = () => {
  const data = useLoaderData() as JobsRes;
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q');
  console.log(q);
  const headerClass = `${css.header}`;
  return (
    <div className={css.container}>
      <div>
        <div className={headerClass}>
          <h1 className={css.title}>{`Search for ${q}`}</h1>
          <h2 className={css.subtitle}>{`${data.items.length} jobs found`}</h2>
        </div>
      </div>
      <div className={css.list}>{<SearchJobListing />}</div>
    </div>
  );
};
