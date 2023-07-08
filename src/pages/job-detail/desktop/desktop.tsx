import css from './desktop.module.scss';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { BackLink } from 'src/components/molecules/back-link';
import { useJobDetailShared } from '../job-detail.shared';
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
