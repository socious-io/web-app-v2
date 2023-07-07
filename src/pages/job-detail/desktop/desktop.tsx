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
import { JobDetailCard } from '../components/job-detail-card/job-detail-card';

export const Desktop = (): JSX.Element => {
  const { navigate, identity, job, location, screeningQuestions } = useJobDetailShared();

  function navigateToJobs() {
    navigate({ to: '/jobs' });
  }

  return (
    <>
      <TwoColumnCursor>
        <div className={css.sidebar}>
          <BackLink title="Jobs" onBack={navigateToJobs} />
        </div>
        <JobDetailCard job={job} screeningQuestions={screeningQuestions} location={location} userType={identity.type} />
      </TwoColumnCursor>
    </>
  );
};
