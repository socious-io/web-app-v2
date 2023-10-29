import React from 'react';
import { JobIntroCard } from 'src/components/templates/job-into-card';
import { OrganizationIntroCard } from 'src/components/templates/organization-intro-card/organization-intro-card';
import { toRelativeTime } from 'src/core/relative-time';
import { printWhen } from 'src/core/utils';

import css from './mobile.module.scss';
import { useJobsIndexShared } from '../jobs-index.shared';

export const Mobile = () => {
  const { identities, jobList, data, showMorePageBtn, onMorePage } = useJobsIndexShared();
  console.log('data ', data);
  const hires = (missions: string) =>
    identities?.some((identity) => identity?.id === data.user?.id) ? `, hires ${missions}` : '';
  return (
    <div className={css.container}>
      <div>
        <OrganizationIntroCard
          title={data.user.name}
          description={data.user.bio}
          logo={data.user.image?.url}
          link={{ label: 'View my profile', url: '/jobs' }}
          impact={{ following: data.user.followings, followers: data.user.followers }}
        />
      </div>
      <div className={css.cardscontainer}>
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
      </div>
    </div>
  );
};
