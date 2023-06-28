import { useState } from 'react';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { BackLink } from 'src/components/molecules/back-link';
import { Card } from 'src/components/atoms/card/card';
import { Divider } from 'src/components/templates/divider/divider';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Categories } from 'src/components/atoms/categories/categories';
import { ApplyModal } from 'src/pages/job-apply/apply/apply-modal';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { printWhen } from 'src/core/utils';
import { getCategories } from '../job-detail.services';
import { useJobDetailShared } from '../job-detail.shared';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const { navigate, identity, job, location, screeningQuestions } = useJobDetailShared();
  const [openApplyModal, setOpenApplyModal] = useState(false);

  function onApply() {
    setOpenApplyModal(true);
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

  const aboutOrgJSX = (
    <Divider title="About the organization">
      <ExpandableText text={job.identity_meta.mission} />
    </Divider>
  );

  function navigateToJobs() {
    navigate({ to: '/jobs' });
  }

  return (
    <>
      <TwoColumnCursor>
        <div className={css.sidebar}>
          <BackLink title="Jobs" onBack={navigateToJobs} />
        </div>
        <Card className={css.card} padding={0}>
          {printWhen(applicationSubmittedJSX, job.applied && identity.type === 'users')}
          <Divider>
            <div className={css.firstRow}>
              <ProfileView
                name={job.identity_meta.name}
                username={job.identity_meta.shortname}
                location={location}
                img={job.identity_meta.image}
                type={job.identity_type}
              />
              <div className={css.jobTitle}>{job.title}</div>
              <Categories marginBottom="1rem" list={getCategories(job)} />
              <div className={css.btnContainer}>{printWhen(buttonJSX, identity.type === 'users')}</div>
            </div>
          </Divider>
          {printWhen(socialCausesJSX, !!job.causes_tags)}
          {printWhen(jobCategoryJSX, !!job.job_category?.name)}
          <Divider title="Job description">
            <ExpandableText text={job.description} isMarkdown />
          </Divider>
          {printWhen(skillsJSX, !!job.skills)}
          {printWhen(screeningQuestionsJSX, screeningQuestions.length > 0)}
          {printWhen(aboutOrgJSX, !!job.identity_meta?.mission)}
        </Card>
      </TwoColumnCursor>
      <ApplyModal open={openApplyModal} onClose={() => setOpenApplyModal(false)} />
    </>
  );
};
