import css from './mobile.module.scss';
import { Button } from '../../../components/atoms/button/button';
import { CategoriesClickable } from '../../../components/atoms/categories-clickable/categories-clickable';
import { Categories } from '../../../components/atoms/categories/categories';
import { ProfileView } from '../../../components/molecules/profile-view/profile-view';
import { getCategories } from '../job-detail.services';
import { Divider } from '../../../components/templates/divider/divider';
import { skillsToCategory, socialCausesToCategory } from '../../../core/adaptors';
import { printWhen } from '../../../core/utils';
import { Header } from 'src/components/atoms/header-v2/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { useJobDetailShared } from '../job-detail.shared';
import { ExpandableText } from 'src/components/atoms/expandable-text';

export const Mobile = (): JSX.Element => {
  const { navigate, job, identity, location, screeningQuestions } = useJobDetailShared();

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

  const jobCategoryJSX = <Divider title="Job Category">{job.job_category?.name || ''}</Divider>;

  const screeningQuestionsJSX = (
    <Divider title="Screening question">
      <ul className={css.questions}>
        {screeningQuestions.map((q) => {
          return <li className={css.questionItem}>{q.question}</li>;
        })}
      </ul>
    </Divider>
  );

  return (
    <TopFixedMobile containsMenu>
      <Header title={job.title || 'Job detail'} onBack={() => navigate({ to: '/jobs' })} />
      <div>
        {printWhen(applicationSubmittedJSX, job.applied && identity.type === 'users')}
        <Divider>
          <ProfileView
            name={job.identity_meta.name}
            username={job.identity_meta.shortname}
            location={location}
            img={job.identity_meta.image}
            type={job.identity_type}
          />
          <div className={css.jobTitle}>{job.title}</div>
          <Categories marginBottom="1rem" list={getCategories(job)} />
          {printWhen(buttonJSX, identity.type === 'users')}
        </Divider>
        {printWhen(socialCausesJSX, !!job.causes_tags)}
        {printWhen(jobCategoryJSX, !!job.job_category?.name)}
        <Divider title="Job description">
          <ExpandableText text={job.description} />
        </Divider>
        {printWhen(skillsJSX, !!job.skills)}
        {printWhen(screeningQuestionsJSX, screeningQuestions.length > 0)}
      </div>
    </TopFixedMobile>
  );
};
