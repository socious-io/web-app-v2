import css from './job-list.module.scss';
import { Card } from '../../atoms/card/card';
import { JobListProps } from './job-list.types';
import { Categories } from '../../atoms/categories/categories';
import { Typography } from '../../atoms/typography/typography';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { getCausesList, getList } from './job-list.services';
import { Avatar } from '../../atoms/avatar/avatar';

export const JobList = (props: JobListProps): JSX.Element => {
  const { data, onMorePageClick, ...rest } = props;

  return (
    <div style={rest} className={css.container}>
      {data.map((job) => {
        return (
          <Card key={job.id} cursor="pointer">
            <div className={css.header}>
              <Avatar marginRight="0.5rem" type="organization" />
              <div className={css.orgNameAndLocation}>
                <div>{job.identity_meta?.name}</div>
                <div className={css.orgLocation}>{job.city}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.jobTitle}>{job.title}</div>
              <Categories marginBottom="1rem" list={getList(job)} />
              <Typography marginBottom="1rem" lineLimit={3} size="s2">
                {job.description}
              </Typography>
              <CategoriesClickable
                marginBottom="1rem"
                list={getCausesList(job.causes_tags)}
              />
            </div>
            <div className={css.footer}>{job.updated_at}</div>
          </Card>
        );
      })}
      <div className={css.seeMore} onClick={() => onMorePageClick()}>
        See more
      </div>
    </div>
  );
};
