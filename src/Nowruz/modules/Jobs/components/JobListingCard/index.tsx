import React, { useEffect, useState } from 'react';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { skillsToCategoryAdaptor, socialCausesToCategory } from 'src/core/adaptors';
import { toRelativeTime } from 'src/core/relative-time';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Link } from 'src/Nowruz/modules/general/components/link';

import css from './job-listing-card.module.scss';
export const JobListingCard = ({ job }) => {
  const [skills, setSkills] = useState([]);
  const renderJobFeatures = (iconName: string, feature: string) => {
    return (
      <div className='flex'>
        <Icon name={iconName} fontSize={20} className="mr-1.5" /> {feature}
      </div>
    );
  };
  const getOptionsFromValues = (values, options) => options.filter((option) => values.includes(option.value));
  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      setSkills(getOptionsFromValues(job.skills || [], data));
    });
  }, []);
  return (
    <div className={css.container}>
      <div className={css.cardInfo}>
        <div>
          <div className={css.intro}>
            <Avatar type="organizations" size="56px" img={job.identity_meta?.image} />
            <div className={css.titleTime}>
              <div className={css.jobTitle}>{job.title}</div>
              <div className={css.subTitle}>
                <span className={css.orgTitle}>{job.identity_meta?.name}</span> . {toRelativeTime(job.updated_at)}
              </div>
            </div>
          </div>
          <div className={css.info}>
            <div className={css.chips}>
              {socialCausesToCategory(job.causes_tags).map(({ label }) => (
                <div className="mr-2">
                  <Chip label={label} fontSize="14px" />
                </div>
              ))}
              {skills.map(({ label }) => (
                <div className="mr-2">
                  <Chip label={label} fontSize="14px" />
                </div>
              ))}
            </div>
            <div className={css.jobDescription}>{job.description}</div>
            <div className={css.jobFeatures}>
              {renderJobFeatures('marker-pin-01', job.identity_meta?.city ? job.identity_meta?.city : 'Anywhere')}
              {renderJobFeatures(
                'mouse',
                PROJECT_REMOTE_PREFERENCES_V2.find((level) => level.value === job.remote_preference)?.label,
              )}
              {renderJobFeatures('calendar', PROJECT_TYPE_V2.find((level) => level.value === job.project_type)?.label)}
              {renderJobFeatures(
                'hourglass-03',
                PROJECT_LENGTH_V2.find((level) => level.value === job.project_length)?.label,
              )}
              {renderJobFeatures(
                'target-02',
                EXPERIENCE_LEVEL_V2.find((level) => level.value === job.experience_level)?.label,
              )}
              {renderJobFeatures(
                'currency-dollar-circle',
                ` ${job.payment_range_lower}~${job.payment_range_higher} USD`,
              )}
              {renderJobFeatures('cryptocurrency-01', 'Crypto OK')}
            </div>
          </div>
        </div>
      </div>
      <div className={css.footer}>
        <Link href="" label={`Read more`} customStyle={css.readMore} />
      </div>
    </div>
  );
};
