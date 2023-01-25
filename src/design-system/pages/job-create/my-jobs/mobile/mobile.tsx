import css from './mobile.module.scss';
import { Accordion } from '../../../../atoms/accordion/accordion';
import { Header } from '../../../../atoms/header/header';
import { Tabs } from '../../../../atoms/tabs/tabs';
import { JobCard } from '../../../../molecules/job-card/job-card';
import { useMatch } from '@tanstack/react-location';
import { GetJobs, Pagination } from '../../../../../core/types';

export const Mobile = (): JSX.Element => {
  const resolver = useMatch().ownData;
  const activeJobs = resolver.activeJobs as Pagination<GetJobs>;
  const draftJobs = resolver.draftJobs as Pagination<GetJobs>;
  const onGoingTitle = `On-Going (${activeJobs.total_count})`;
  const draftTitle = `Drafts (${draftJobs.total_count})`;

  const tabs = [
    {
      name: 'Created',
      content: (
        <>
          <Accordion id="on-going" title={onGoingTitle}>
            <div style={{ background: 'red' }}>
              {/* <JobCard id="1" title="" date="" body="" /> */}
            </div>
          </Accordion>
          <Accordion id="drafts" title={draftTitle}>
            {/* <JobCard id="1" title="" date="" body="" /> */}
          </Accordion>
        </>
      ),
      default: true,
    },
    {
      name: 'archived',
      content: <></>,
    },
  ];

  return (
    <div className={css.container}>
      <Header border="0" paddingTop={'var(--safe-area)'} title="My Jobs" />
      <Tabs tabs={tabs} />
    </div>
  );
};
