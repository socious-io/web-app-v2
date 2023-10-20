import { useState, useEffect } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Categories } from 'src/components/atoms/categories/categories';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { SureModal } from 'src/components/templates/sure-modal';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { AuthGuard } from 'src/core/auth-guard/auth-guard';
import { printWhen } from 'src/core/utils';
import { ApplyModal } from 'src/pages/job-apply/apply/apply-modal';

import css from './job-detail-card.module.scss';
import { JobDetailCardProps } from './job-detail-card.types';
import { getCategories } from '../../job-detail.services';

export function JobDetailCard(props: JobDetailCardProps) {
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [openExternalModal, setOpenExternalModal] = useState(false);
  const [isSubmittedNow, setIsSubmittedNow] = useState(false);
  function onApply() {
    if (props.job?.other_party_id) setOpenExternalModal(true);
    else setOpenApplyModal(true);
  }
  useEffect(() => {
    setIsSubmittedNow(false);
  }, [props.job.id]);
  const buttonJSX = (
    <Button disabled={props.job.applied || isSubmittedNow} onClick={onApply}>
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
          return (
            <li key={q.id} className={css.questionItem}>
              {q.question}
            </li>
          );
        })}
      </ul>
    </Divider>
  );

  return (
    <Card className={css.card} padding={0}>
      <ApplyModal
        data={props}
        open={openApplyModal}
        onClose={() => setOpenApplyModal(false)}
        onSubmittedNow={() => setIsSubmittedNow(true)}
      />
      {printWhen(applicationSubmittedJSX, isSubmittedNow || (props.job.applied && props.userType === 'users'))}
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
          <AuthGuard>
            <div className={css.btnContainer}>{printWhen(buttonJSX, props.userType === 'users')}</div>
          </AuthGuard>
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
      <SureModal
        open={openExternalModal}
        onClose={() => setOpenExternalModal(false)}
        onDone={() => {
          setOpenExternalModal(false);
          props.job.other_party_url && window.open(props.job.other_party_url, '_blank');
        }}
        modalTexts={{
          title: 'Partner job board',
          body: 'Your application for the job will continue to another site.',
          confirmButton: 'Continue',
          cancleButton: 'Cancel',
          titleColor: '#020305',
        }}
      />
    </Card>
  );
}
