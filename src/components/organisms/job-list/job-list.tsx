import { useEffect } from 'react';

import { Avatar } from '@atoms/avatar/avatar';
import Card from '@atoms/card';
import { CategoriesClickable } from '@atoms/categories-clickable/categories-clickable';
import { Categories } from '@atoms/categories/categories';
import { ExpandableText } from '@atoms/expandable-text';
import { socialCausesToCategory } from '@core/adaptors';
import { toRelativeTime } from '@core/relative-time';
import { printWhen } from '@core/utils';
import { getJobStructuresData } from '@pages/job-detail/job-details.jobStructuredData';

import { COUNTRIES_DICT } from '@constants/COUNTRIES';

import css from './job-list.module.scss';
import { getCategories } from './job-list.services';
import { JobListProps } from './job-list.types';

export const JobList = (props: JobListProps): JSX.Element => {
  const { data, showMorePage, onMorePageClick, ...rest } = props;

  useEffect(() => {
    const scripts = data.map((job) => {
      const script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.textContent = getJobStructuresData(job);
      document.head.appendChild(script);
      return script;
    });
    return () => {
      scripts.forEach((script) => document.head.removeChild(script));
    };
  }, [data]);

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = (job: JobListProps['data'][0]) =>
    `${job.city}, ${getCountryName(job.country as keyof typeof COUNTRIES_DICT | undefined)}`;

  const seeMoreJSX = (
    <div className={css.seeMore} onClick={() => onMorePageClick()}>
      See more
    </div>
  );
  return (
    <div style={rest} className={css.container}>
      {data.map((job) => {
        return (
          <Card key={job.id} className="cursor-pointer" onClick={() => props.onClick(job.id)}>
            <div className={css.header}>
              <Avatar marginRight="0.5rem" type="organizations" img={job.identity_meta.image} />
              <div className={css.orgNameAndLocation}>
                <div>{job.identity_meta?.name}</div>
                <div className={css.orgLocation}>{location(job)}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.jobTitle}>{job.title}</div>
              <Categories marginBottom="1rem" list={getCategories(job)} />
              <div className={css.description}>
                <ExpandableText text={job.description} isMarkdown />
              </div>
              <CategoriesClickable marginBottom="1rem" list={socialCausesToCategory(job.causes_tags)} />
            </div>
            <div className={css.footer}>{toRelativeTime(job.updated_at)}</div>
          </Card>
        );
      })}

      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  );
};
