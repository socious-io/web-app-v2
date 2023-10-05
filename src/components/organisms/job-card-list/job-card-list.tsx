import { useState } from 'react';
import { JobCardProps } from 'src/components/molecules/job-card/job-card.types';

import css from './job-card-list.module.scss';
import { JobCardListProps } from './job-card-list.types';
import { printWhen } from '../../../core/utils';
import { JobCard } from '../../molecules/job-card/job-card';

export const JobCardList = (props: JobCardListProps): JSX.Element => {
  const [page, setPage] = useState(1);

  function onSeeMoreClick() {
    const p = page + 1;
    setPage(p);
    props.onSeeMoreClick(p);
  }

  const showSeeMore = props.totalCount
    ? props.list.length === 0 || props.list.length < props.totalCount
    : props.showMore;

  const seeMoreJSX = (
    <div onClick={onSeeMoreClick} className={css.seeMore}>
      See more
    </div>
  );

  function onClick(job: JobCardProps) {
    if (props.onClick) {
      props.onClick(job);
    } else if (props.onItemClick) {
      props.onItemClick(job.id);
    }
  }

  return (
    <div className={css.container}>
      <div className={css.list}>
        {props.list.map((job) => {
          return (
            <div key={job.id} onClick={() => onClick(job)}>
              <JobCard {...job} />
            </div>
          );
        })}
      </div>
      {printWhen(seeMoreJSX, showSeeMore)}
    </div>
  );
};
