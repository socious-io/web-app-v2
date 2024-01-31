import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V3 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { skillsToCategoryAdaptor, socialCausesToCategory } from 'src/core/adaptors';
import { Job } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import { Link } from 'src/Nowruz/modules/general/components/link';

import css from './job-listing-card.module.scss';

interface JobListingCardProps {
  job: Job;
}
export const JobListingCard: React.FC<JobListingCardProps> = ({ job }) => {
  const [skills, setSkills] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const renderJobFeatures = (iconName: string, feature?: string, subtitle?: string) => {
    if (!feature) return;
    return (
      <div className={css.features}>
        <Icon name={iconName} fontSize={20} className="mr-1.5" color={variables.color_grey_500} /> {feature}
        <span className={css.featureSubtitle}>{subtitle}</span>
      </div>
    );
  };
  const getOptionsFromValues = (
    values: string[],
    options: {
      value: string;
      label: string;
    }[],
  ) => options.filter((option) => values.includes(option.value));
  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      setSkills(getOptionsFromValues(job.skills || [], data));
    });
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isTouchDevice()) navigate(`/nowruz/jobs/${job.id}`);
  };
  return (
    <div className={`${css.container} cursor-pointer md:cursor-default`} onClick={handleClick}>
      <div className={css.cardInfo}>
        <div>
          <div className={css.intro}>
            <Avatar type="organizations" size="56px" img={job.identity_meta?.image} />
            <div>
              <div className={css.jobTitle}>{job.title}</div>
              <div className={css.subTitle}>
                <span className={css.orgTitle}>{job.identity_meta?.name}</span> .{' '}
                {toRelativeTime(job.updated_at?.toString() || '')}
              </div>
            </div>
          </div>
          <div className={css.info}>
            <div className={css.chips}>
              {socialCausesToCategory(job.causes_tags).map(({ label }) => (
                <Chip label={label} theme="primary" shape="round" size="md" />
              ))}
              {skills.map(({ label }) => (
                <Chip label={label} theme="grey_blue" shape="round" size="md" />
              ))}
            </div>
            <div className={css.jobDescription}>
              <ExpandableText isMarkdown expectedLength={isTouchDevice() ? 85 : 175} text={job.description} />
            </div>
            <div className={css.jobFeatures}>
              {renderJobFeatures('marker-pin-01', job?.city ? job?.city : 'Anywhere')}
              {renderJobFeatures(
                'mouse',
                PROJECT_REMOTE_PREFERENCES_V2.find((level) => level.value === job.remote_preference)?.label,
              )}
              {renderJobFeatures('calendar', PROJECT_TYPE_V2.find((level) => level.value === job.project_type)?.label)}
              {renderJobFeatures(
                'hourglass-03',
                PROJECT_LENGTH_V3.find((level) => level.value === job.project_length)?.label,
              )}
              {renderJobFeatures(
                'target-02',
                EXPERIENCE_LEVEL_V2.find((level) => level.value === job.experience_level)?.label,
              )}
              {job.payment_scheme === 'FIXED' &&
                renderJobFeatures(
                  'currency-dollar-circle',
                  ` ${job.payment_range_lower}~${job.payment_range_higher} USD`,
                  '(Fixed-price)',
                )}
              {job.payment_scheme === 'HOURLY' &&
                renderJobFeatures(
                  'currency-dollar-circle',
                  ` ${job.payment_range_lower}~${job.payment_range_higher} USD`,
                )}

              {/* {renderJobFeatures('cryptocurrency-01', 'Crypto OK')} */}
            </div>
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Link href={`/nowruz/jobs/${job.id}`} label={`Read more`} customStyle={css.readMore} />
      </div>
    </div>
  );
};
