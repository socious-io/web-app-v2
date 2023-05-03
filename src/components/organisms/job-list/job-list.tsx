import css from './job-list.module.scss';
import { Card } from '../../atoms/card/card';
import { JobListProps } from './job-list.types';
import { Categories } from '../../atoms/categories/categories';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { getList } from './job-list.services';
import { Avatar } from '../../atoms/avatar/avatar';
import { useNavigate } from '@tanstack/react-location';
import { toRelativeTime } from '../../../core/relative-time';
import { socialCausesToCategory } from '../../../core/adaptors';
import { convertMDToJSX } from 'src/core/convert-md-to-jsx';

export const JobList = (props: JobListProps): JSX.Element => {
  const { data, onMorePageClick, ...rest } = props;
  const navigate = useNavigate();

  function goToJobDetail(id: string) {
    return () => navigate({ to: `/jobs/${id}` });
  }

  return (
    <div style={rest} className={css.container}>
      {data.map((job) => {
        return (
          <Card key={job.id} cursor="pointer" onClick={goToJobDetail(job.id)}>
            <div className={css.header}>
              <Avatar marginRight="0.5rem" type="organizations" img={job.identity_meta.image} />
              <div className={css.orgNameAndLocation}>
                <div>{job.identity_meta?.name}</div>
                <div className={css.orgLocation}>{job.city}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.jobTitle}>{job.title}</div>
              <Categories marginBottom="1rem" list={getList(job)} />
              <div className={css.description}>{convertMDToJSX(job.description, { length: 200 })}</div>
              <CategoriesClickable marginBottom="1rem" list={socialCausesToCategory(job.causes_tags)} />
            </div>
            <div className={css.footer}>{toRelativeTime(job.updated_at)}</div>
          </Card>
        );
      })}
      <div className={css.seeMore} onClick={() => onMorePageClick()}>
        See more
      </div>
    </div>
  );
};
