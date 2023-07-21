import css from './desktop.module.scss';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { BackLink } from 'src/components/molecules/back-link';
import { useJobDetailShared } from '../job-detail.shared';
import { JobDetailCard } from '../components/job-detail-card/job-detail-card';

export const Desktop = (): JSX.Element => {
  const { identity, job, location, screeningQuestions } = useJobDetailShared();

  return (
    <>
      <TwoColumnCursor visibleSidebar={!!identity}>
        <div className={css.sidebar}>
          <BackLink title="Jobs"/>
        </div>
        <JobDetailCard
          job={job}
          screeningQuestions={screeningQuestions}
          location={location}
          userType={identity?.type || 'users'}
        />
      </TwoColumnCursor>
    </>
  );
};
