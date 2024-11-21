import React from 'react';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Job } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { toRelativeTime } from 'src/core/relative-time';
import { translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Chip } from 'src/modules/general/components/Chip';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import { Icon } from 'src/modules/general/components/Icon';
import { IconButton } from 'src/modules/general/components/iconButton';
import { Link } from 'src/modules/general/components/link';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './job-listing-card.module.scss';
import { useJobListingCard } from './useJobListingCard';

interface JobListingCardProps {
  job: Job;
  displaySave?: boolean;
  displayNotInterested?: boolean;
  saveAction?: () => void;
  page?: number;
  scrollIndex?: number;
  hasDescription?: boolean;
}

export const JobListingCard: React.FC<JobListingCardProps> = ({
  job,
  displaySave = false,
  displayNotInterested = false,
  saveAction,
  page = 1,
  scrollIndex = 0,
  hasDescription = true,
}) => {
  const { skills, handleTitleClick, handleClick, jobVal, handleBookmark, handleNotInterested } = useJobListingCard(
    job,
    page,
    scrollIndex,
    saveAction,
  );

  const renderJobFeatures = (iconName: string, feature?: string, subtitle?: string) => {
    if (!feature) return;
    return (
      <div className={css.features}>
        <Icon name={iconName} fontSize={18} color={variables.color_grey_500} /> {feature}
        {subtitle && <span className={css.featureSubtitle}>{subtitle}</span>}
      </div>
    );
  };

  return (
    <div
      className={`${css.jobCard} ${jobVal.not_interested ? '' : 'cursor-pointer md:cursor-default'}`}
      onClick={handleClick}
    >
      <div className={`${jobVal.not_interested ? 'opacity-50' : ''} ${css.cardHeader}`}>
        <div className={css.orgInfo}>
          <Avatar type="organizations" size="56px" img={job.identity_meta?.image} iconSize={32} />
          <div className={css.jobHeading}>
            <a className={css.jobTitle} onClick={handleTitleClick}>
              {job.title}
            </a>
            <div className={css.subTitle}>
              <span className={css.orgTitle}>
                {job.identity_meta?.name}
                {'\u30FB'}
                {toRelativeTime(job.updated_at?.toString() || '')}
              </span>
            </div>
          </div>
        </div>

        {displayNotInterested && !jobVal.not_interested && (
          <IconButton
            iconName="thumbs-down"
            size="medium"
            iconSize={20}
            iconColor={variables.color_grey_600}
            customStyle="md:hidden"
            onClick={e => {
              e.stopPropagation();
              handleNotInterested();
            }}
          />
        )}
        {displaySave && (
          <IconButton
            iconName={jobVal.saved ? 'bookmark-filled' : 'bookmark'}
            disabled={jobVal.not_interested}
            size="medium"
            iconSize={20}
            iconColor={jobVal.saved ? variables.color_primary_600 : variables.color_grey_600}
            onClick={e => {
              e.stopPropagation();
              handleBookmark();
            }}
          />
        )}
      </div>
      <div className={`${jobVal.not_interested ? 'opacity-50' : ''} ${css.cardInfo}`}>
        <div className={css.chips}>
          {socialCausesToCategory(job.causes_tags).map(({ label }) => (
            <Chip key={label} label={label} theme="primary" shape="round" size="md" />
          ))}
          {skills.map(({ label }) => (
            <Chip key={label} label={label} theme="grey_blue" shape="round" size="md" />
          ))}
        </div>
        {hasDescription && (
          <div className={css.jobDescription}>
            <ExpandableText
              isMarkdown
              expectedLength={isTouchDevice() ? 85 : 175}
              text={job.description || ''}
              seeMoreButton={false}
            />
          </div>
        )}
        <div className={css.jobFeatures}>
          {renderJobFeatures('marker-pin-01', job?.city ? job?.city : 'Anywhere')}
          {renderJobFeatures(
            'mouse',
            job.remote_preference ? translate(`job-preference.${job.remote_preference}`) : '',
          )}
          {renderJobFeatures('calendar', job.project_type ? translate(`job-type.${job.project_type}`) : '')}
          {renderJobFeatures('hourglass-03', job.project_length ? translate(`job-length.${job.project_length}`) : '')}
          {renderJobFeatures(
            'target-02',
            job.experience_level ? translate(`job-experience.${job.experience_level}`) : '',
          )}
          {job.payment_type === 'PAID' &&
            job.payment_range_lower &&
            job.payment_range_higher &&
            renderJobFeatures(
              'currency-dollar-circle',
              ` ${job.payment_range_lower}~${job.payment_range_higher} USD`,
              `${job.payment_scheme === 'FIXED' ? translate('job-fixed-price') : ''}`,
            )}

          {job.payment_type === 'VOLUNTEER' && renderJobFeatures('heart', translate('job-volunteer'))}

          {job.payment_type === 'VOLUNTEER' &&
            job.payment_scheme === 'HOURLY' &&
            job.commitment_hours_lower &&
            job.commitment_hours_higher &&
            renderJobFeatures('clock', ` ${job.commitment_hours_lower}~${job.commitment_hours_higher} hrs/week`)}
          {job.payment_type === 'VOLUNTEER' &&
            job.payment_scheme === 'FIXED' &&
            job.commitment_hours_lower &&
            job.commitment_hours_higher &&
            renderJobFeatures('clock', ` ${job.commitment_hours_lower}~${job.commitment_hours_higher} hrs`)}

          {/* {renderJobFeatures('cryptocurrency-01', 'Crypto OK')} */}
        </div>
      </div>
      <div className={css.cardFooter}>
        {displayNotInterested && !jobVal.not_interested && (
          <button
            className={css.notInterestedBtn}
            onClick={e => {
              e.stopPropagation();
              handleNotInterested();
            }}
          >
            {translate('job-not-interested')}
          </button>
        )}
        {jobVal.not_interested ? (
          <div className="font-medium text-sm leading-5 text-Success-700">{translate('job-not-see')}</div>
        ) : (
          <Link
            href={`/jobs/${job.id}?page=${page}&scrollIndex=${scrollIndex}`}
            label={translate('job-read-more')}
            customStyle={css.readMore}
          />
        )}
      </div>
      {jobVal.not_interested && (
        <div className={css.cardFooterMobile}>
          <div className="font-medium text-sm leading-5 text-Success-700">{translate('job-not-see')}</div>
        </div>
      )}
    </div>
  );
};
