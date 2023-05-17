import css from './mobile.module.scss';
import { Button } from '../../../components/atoms/button/button';
import { CategoriesClickable } from '../../../components/atoms/categories-clickable/categories-clickable';
import { Categories } from '../../../components/atoms/categories/categories';
import { ProfileView } from '../../../components/molecules/profile-view/profile-view';
import { getCategories } from '../job-detail.services';
import { Divider } from '../../../components/templates/divider/divider';
import { skillsToCategory, socialCausesToCategory } from '../../../core/adaptors';
import { printWhen } from '../../../core/utils';
import { convertMDToJSX } from 'src/core/convert-md-to-jsx';
import { Header } from 'src/components/atoms/header-v2/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { useJobDetailShared } from '../job-detail.shared';

export const Mobile = (): JSX.Element => {
  const { navigate, job, identity } = useJobDetailShared();

  function onApply() {
    navigate({ to: './apply' });
  }

  const buttonJSX = (
    <Button disabled={job.applied} onClick={onApply}>
      Apply now
    </Button>
  );

  const applicationSubmittedJSX = (
    <div className={css.appSubmitted}>
      <img src="/icons/document-check-black.svg" />
      <div>Application submitted</div>
    </div>
  );

  const skillsJSX = (
    <Divider title="Skills">
      <CategoriesClickable list={skillsToCategory(job.skills)} />
    </Divider>
  );

  const socialCausesJSX = (
    <Divider title="Social cause">
      <CategoriesClickable list={socialCausesToCategory(job.causes_tags)} />
    </Divider>
  );

  return (
    <TopFixedMobile containsMenu>
      <Header title={job.job_category?.name || 'Job detail'} onBack={() => navigate({ to: '/jobs' })} />
      <div>
        {printWhen(applicationSubmittedJSX, job.applied && identity.type === 'users')}
        <Divider>
          <ProfileView
            name={job.identity_meta.name}
            location={job.identity_meta.city}
            img={job.identity_meta.image}
            type={job.identity_type}
          />
          <div className={css.jobTitle}>{job.title}</div>
          <Categories marginBottom="1rem" list={getCategories(job)} />
          {printWhen(buttonJSX, identity.type === 'users')}
        </Divider>
        {printWhen(socialCausesJSX, !!job.causes_tags)}
        <Divider title="Job description">{convertMDToJSX(job.description, { length: null })}</Divider>
        {printWhen(skillsJSX, !!job.skills)}
      </div>
    </TopFixedMobile>
  );
};
