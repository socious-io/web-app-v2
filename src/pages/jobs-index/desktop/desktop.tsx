import React from 'react';
import { useJobsIndexShared } from '../jobs-index.shared';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { JobIntroCard } from 'src/components/templates/job-into-card';
import { Card } from 'src/components/atoms/card/card';
import css from './desktop.module.scss';
import { toRelativeTime } from 'src/core/relative-time';
import { OrganizationIntroCard } from 'src/components/templates/organization-intro-card/organization-intro-card';
import { printWhen } from 'src/core/utils';

export const Desktop = () => {
  const { identity, jobList, data, showMorePageBtn, onMorePage } = useJobsIndexShared();
  return (
    <TwoColumnCursor visibleSidebar={!!identity}>
      <div>
        <OrganizationIntroCard
          title={data.user.name}
          description={data.user.bio}
          logo={data.user.image.url}
          link={{ label: 'View my profile', url: '/jobs' }}
          impact={{ following: data.user.followings, followers: data.user.followers }}
        />
      </div>
      <>
        <Card className={css.title}>jobs </Card>
        {jobList.map((job) => (
          <JobIntroCard
            title={job.title}
            icon={'/icons/multiple-avatars.svg'}
            description={`applicants ${job.applicants}, hires ${job.missions}`}
            footer={toRelativeTime(job.updated_at)}
            link={`/jobs/${job.id}`}
            customStyle={css.cards}
          />
        ))}
        <div>
          {printWhen(
            <div className={css.seeMore} onClick={onMorePage}>
              Load more
            </div>,
            showMorePageBtn
          )}
        </div>
      </>
    </TwoColumnCursor>
  );
};
