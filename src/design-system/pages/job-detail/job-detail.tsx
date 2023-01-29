// @ts-nocheck
import css from './job-detail.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Button } from '../../atoms/button/button';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { Categories } from '../../atoms/categories/categories';
import { Header } from '../../atoms/header/header';
import { ProfileView } from '../../molecules/profile-view/profile-view';
import { getCategories, toLowerCase } from './job-detail.services';
import { JobDetailProps, Loader } from './job-detail.types';
import { Divider } from '../../templates/divider/divider';

export const JobDetail = (props: JobDetailProps): JSX.Element => {
  const navigate = useNavigate();
  const { data: job } = useMatch<Loader>();
  console.log('xjj: ', job);

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '/jobs' })} title={job?.job_category.name} />
      <Divider>
        <ProfileView
          name={job.identity_meta.name}
          location={job.identity_meta.city}
          img={job.identity_meta.image}
          type={job?.identity_type}
        />
        <div className={css.jobTitle}>{job.title}</div>
        <Categories marginBottom="1rem" list={getCategories(job)} />
        <Button>Apply now</Button>
      </Divider>
      <Divider title="Social cause">
        <CategoriesClickable list={toLowerCase(job.causes_tags)} />
      </Divider>
      <Divider title="Job description">{job.description}</Divider>
      <Divider title="Skills">
        <CategoriesClickable list={toLowerCase(job.skills)} />
      </Divider>
    </div>
  );
};
