// @ts-nocheck
import css from './job-detail.module.scss';
import { useMatch } from '@tanstack/react-location';
import { Button } from '../../atoms/button/button';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { Categories } from '../../atoms/categories/categories';
import { Header } from '../../atoms/header/header';
import { ProfileView } from '../../molecules/profile-view/profile-view';
import { getCategories, toLowerCase } from './job-detail.services';
import { JobDetailProps, Loader } from './job-detail.types';
import { Divider } from '../../templates/divider/divider';

export const JobDetail = (props: JobDetailProps): JSX.Element => {
  const { data: job } = useMatch<Loader>();

  return (
    <div className={css.container}>
      <Header title="Full Stack Developer" />
      <Divider>
        <ProfileView
          name={job.identity_meta.name}
          location={job.identity_meta.city}
          img={job.identity_meta.image}
          type="organization"
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
