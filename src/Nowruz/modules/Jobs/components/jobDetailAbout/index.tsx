import React from 'react';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V3 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { Job } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CountryFlag } from 'src/Nowruz/modules/general/components/countryFlag';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './jobDetailAbout.module.scss';

interface JobDetailAboutProps {
  job: Job;
}

export const JobDetailAbout: React.FC<JobDetailAboutProps> = ({ job }) => {
  const url = window.location.href;
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const inputJSX = (
    <button id="copy-button" className={css.copyBtn} onClick={handleCopy}>
      <Icon name="copy-01" fontSize={20} className="text-Gray-light-mode-700" />
      <span>Copy</span>
    </button>
  );

  const renderJobFeatures = (iconName: string, feature?: string, description?: string) => {
    if (!feature) return;
    return (
      <div className="flex gap-2 ">
        <Icon name={iconName} fontSize={20} className="text-Gray-light-mode-500" />
        <span className={css.subtitle}>{feature}</span>
        {description && <span className={css.description}>{description}</span>}
      </div>
    );
  };

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }
  const renderJobLocation = () => {
    const address = job.country
      ? `${job.city}, ${getCountryName(job.country as keyof typeof COUNTRIES_DICT | undefined)}`
      : '';
    return (
      <div className="flex gap-2">
        {job.country ? <CountryFlag countryCode={job.country || ''} /> : <img src="/icons/nowruz/earth.svg" alt="" />}

        <span className={css.subtitle}>{address || 'Anywhere'}</span>
      </div>
    );
  };

  const detailJSX = (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {renderJobLocation()}
        {renderJobFeatures(
          'mouse',
          PROJECT_REMOTE_PREFERENCES_V2.find((level) => level.value === job.remote_preference)?.label,
        )}
        {renderJobFeatures('calendar', PROJECT_TYPE_V2.find((level) => level.value === job.project_type)?.label)}
        {renderJobFeatures(
          'hourglass-03',
          PROJECT_LENGTH_V3.find((level) => level.value === job.project_length)?.label,
        )}
      </div>

      {renderJobFeatures('target-02', EXPERIENCE_LEVEL_V2.find((level) => level.value === job.experience_level)?.label)}
      {job.payment_scheme === 'FIXED'
        ? renderJobFeatures(
            'currency-dollar-circle',
            ` ${job.payment_range_lower}~${job.payment_range_higher} USD`,
            '(Fixed-price)',
          )
        : renderJobFeatures('currency-dollar-circle', ` ${job.payment_range_lower}~${job.payment_range_higher} USD`)}
    </div>
  );
  return (
    <div className={css.container}>
      <span className={css.title}>About this job</span>
      <div className="hidden md:block">{detailJSX}</div>

      <Input className="hidden md:block" id="copy-url" value={url} postfix={inputJSX} />
      <Button variant="contained" color="primary" customStyle="hidden md:block">
        Apply now
      </Button>
      <div className="md:hidden flex flex-col gap-5 p-5 border border-solid border-Gray-light-mode-200 rounded-default">
        {detailJSX}
        <Input id="copy-url" value={url} postfix={inputJSX} />
      </div>
    </div>
  );
};
