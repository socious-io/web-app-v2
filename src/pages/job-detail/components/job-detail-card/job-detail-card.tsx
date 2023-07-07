import { Categories } from 'src/components/atoms/categories/categories';
import css from './job-detail-card.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { printWhen } from 'src/core/utils';
import { ApplyModal } from 'src/pages/job-apply/apply/apply-modal';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Button } from 'src/components/atoms/button/button';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { getCategories } from '../../job-detail.services';
import { JobDetailCardProps } from './job-detail-card.types';
import { useState } from 'react';

export function JobDetailCard(props: JobDetailCardProps) {
  const [openApplyModal, setOpenApplyModal] = useState(false);

  function onApply() {
    setOpenApplyModal(true);
  }

  const buttonJSX = (
    <Button disabled={props.job.applied} onClick={onApply}>
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
      <CategoriesClickable list={skillsToCategory(props.job.skills)} />
    </Divider>
  );

  const socialCausesJSX = (
    <Divider title="Social cause">
      <CategoriesClickable list={socialCausesToCategory(props.job.causes_tags)} />
    </Divider>
  );

  const aboutOrgJSX = (
    <Divider title="About the organization">
      <ExpandableText text={props.job.identity_meta.mission} />
    </Divider>
  );

  const jobCategoryJSX = <Divider title="Job Category">{props.job.job_category?.name || ''}</Divider>;

  const screeningQuestionsJSX = (
    <Divider title="Screening question">
      <ul className={css.questions}>
        {props.screeningQuestions.map((q) => {
          return <li className={css.questionItem}>{q.question}</li>;
        })}
      </ul>
    </Divider>
  );

  return (
    <Card className={css.card} padding={0}>
      <ApplyModal open={openApplyModal} onClose={() => setOpenApplyModal(false)} />
      {printWhen(applicationSubmittedJSX, props.job.applied && props.userType === 'users')}
      <Divider>
        <div className={css.firstRow}>
          <ProfileView
            name={props.job.identity_meta.name}
            username={props.job.identity_meta.shortname}
            location={props.location}
            img={props.job.identity_meta.image}
            type={props.job.identity_type}
          />
          <div className={css.jobTitle}>{props.job.title}</div>
          <Categories marginBottom="1rem" list={getCategories(props.job)} />
          <div className={css.btnContainer}>{printWhen(buttonJSX, props.userType === 'users')}</div>
        </div>
      </Divider>
      {printWhen(socialCausesJSX, !!props.job.causes_tags)}
      {printWhen(jobCategoryJSX, !!props.job.job_category?.name)}
      <Divider title="Job description">
        <ExpandableText text={props.job.description} isMarkdown />
      </Divider>
      {printWhen(skillsJSX, !!props.job.skills)}
      {printWhen(screeningQuestionsJSX, props.screeningQuestions.length > 0)}
      {printWhen(aboutOrgJSX, !!props.job.identity_meta?.mission)}
    </Card>
  );
}
