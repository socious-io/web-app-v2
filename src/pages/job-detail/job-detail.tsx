import css from './job-detail.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Button } from '../../components/atoms/button/button';
import { CategoriesClickable } from '../../components/atoms/categories-clickable/categories-clickable';
import { Categories } from '../../components/atoms/categories/categories';
import { Header } from '../../components/atoms/header/header';
import { ProfileView } from '../../components/molecules/profile-view/profile-view';
import { getCategories } from './job-detail.services';
import { Divider } from '../../components/templates/divider/divider';
import { skillsToCategory, socialCausesToCategory } from '../../core/adaptors';
import { Job } from '../../components/organisms/job-list/job-list.types';
import { printWhen } from '../../core/utils';

export const JobDetail = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: job } = useMatch() as unknown as { data: Job };

  function onApply() {
    navigate({ to: './apply' });
  }

  const applicationSubmittedJSX = (
    <div className={css.appSubmitted}>
      <img src="/icons/document-check-black.svg" />
      <div>Application submitted</div>
    </div>
  );

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '/jobs' })} title={job.job_category.name} />
      {printWhen(applicationSubmittedJSX, job.applied)}
      <Divider>
        <ProfileView
          name={job.identity_meta.name}
          location={job.identity_meta.city}
          img={job.identity_meta.image}
          type={job.identity_type}
        />
        <div className={css.jobTitle}>{job.title}</div>
        <Categories marginBottom="1rem" list={getCategories(job)} />
        <Button disabled={job.applied} onClick={onApply}>
          Apply now
        </Button>
      </Divider>
      <Divider title="Social cause">
        <CategoriesClickable list={socialCausesToCategory(job.causes_tags)} />
      </Divider>
      <Divider title="Job description">{job.description}</Divider>
      <Divider title="Skills">
        <CategoriesClickable list={skillsToCategory(job.skills)} />
      </Divider>
    </div>
  );
};
