import css from './job-card-list.module.scss';
import { JobCard } from '../../molecules/job-card/job-card';
import { JobCardListProps } from './job-card-list.types';
import { useState } from 'react';
import { printWhen } from '../../../utils/utils';

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

  return (
    <div className={css.container}>
      <div className={css.list}>
        {props.list.map((job) => {
          return (
            <div key={job.id} onClick={() => props.onItemClick(job?.id)}>
              <JobCard {...job} />
            </div>
          );
        })}
      </div>
      {printWhen(seeMoreJSX, showSeeMore)}
    </div>
  );
};
