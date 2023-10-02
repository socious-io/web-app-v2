import React from 'react';
import { Card } from 'src/components/atoms/card/card';
import { JobIntroCard } from 'src/components/templates/job-into-card';
import { OrganizationIntroCard } from 'src/components/templates/organization-intro-card/organization-intro-card';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { toRelativeTime } from 'src/core/relative-time';
import { printWhen } from 'src/core/utils';

import css from './desktop.module.scss';
import { useJobsIndexShared } from '../jobs-index.shared';

export const Desktop = () => {
  const { jobList, data, showMorePageBtn, onMorePage, identities } = useJobsIndexShared();

  const hires = (missions: string) =>
    identities.some((identity) => identity?.id === data.user?.id) ? `, hires ${missions}` : '';
  return (
    <TwoColumnCursor visibleSidebar={true}>
      <div>
        <OrganizationIntroCard
          title={data.user?.name}
          description={data.user?.bio}
          logo={data.user.image?.url}
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
            description={`applicants ${job.applicants} ${hires(job.missions)}`}
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
            showMorePageBtn,
          )}
        </div>
      </>
    </TwoColumnCursor>
  );
};
