import { useEffect, useState } from 'react';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Header } from 'src/components/atoms/header/header';
import { SureModal } from 'src/components/templates/sure-modal';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { AuthGuard } from 'src/core/auth-guard/auth-guard';
import { useAuth } from 'src/hooks/use-auth';

import css from './mobile.module.scss';
import { Button } from '../../../components/atoms/button/button';
import { Categories } from '../../../components/atoms/categories/categories';
import { CategoriesClickable } from '../../../components/atoms/categories-clickable/categories-clickable';
import { ProfileView } from '../../../components/molecules/profile-view/profile-view';
import { Divider } from '../../../components/templates/divider/divider';
import { skillsToCategory, socialCausesToCategory } from '../../../core/adaptors';
import { printWhen } from '../../../core/utils';
import { getCategories } from '../job-detail.services';
import { useJobDetailShared } from '../job-detail.shared';
import { getJobStructuresData } from '../job-details.jobStructuredData';


export const Mobile = (): JSX.Element => {
  const { navigate, job, identity, location, screeningQuestions } = useJobDetailShared();
  const { isLoggedIn } = useAuth();
  const [openExternalModal, setOpenExternalModal] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = getJobStructuresData(job);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function onApply() {
    if (job?.other_party_id) setOpenExternalModal(true);
    else navigate({ to: './apply' });
  }

  const buttonJSX = (
    <AuthGuard>
      <Button disabled={job.applied} onClick={onApply}>
        Apply now
      </Button>
    </AuthGuard>
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

  return (
    <TopFixedMobile containsMenu>
      <Header title={job.title || 'Job detail'} onBack={() => navigate({ to: '/jobs' })} />
      <div>
        {printWhen(applicationSubmittedJSX, job.applied && identity?.type === 'users')}
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
          {printWhen(buttonJSX, identity?.type === 'users' || !isLoggedIn)}
        </Divider>
        {printWhen(socialCausesJSX, !!job.causes_tags)}
        {printWhen(jobCategoryJSX, !!job.job_category?.name)}
        <Divider title="Job description">
          <ExpandableText text={job.description} isMarkdown />
        </Divider>
        {printWhen(skillsJSX, !!job.skills)}
        {printWhen(screeningQuestionsJSX, screeningQuestions.length > 0)}
        {printWhen(aboutOrgJSX, !!job.identity_meta?.mission)}
        <SureModal
          open={openExternalModal}
          onClose={() => setOpenExternalModal(false)}
          onDone={() => {
            setOpenExternalModal(false);
            job.other_party_url && window.open(job.other_party_url, '_blank');
          }}
          modalTexts={{
            title: 'Partner job board',
            body: 'Your application for the job will continue to another site.',
            confirmButton: 'Continue',
            cancleButton: 'Cancel',
            titleColor: '#020305',
          }}
        />
      </div>
    </TopFixedMobile>
  );
};
