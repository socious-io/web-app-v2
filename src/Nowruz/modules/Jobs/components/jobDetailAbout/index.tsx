import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V3 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { CurrentIdentity, Job } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { QuestionsRes } from 'src/core/types';
import { Icon } from 'src/Nowruz/general/Icon';
import { AuthGuard } from 'src/Nowruz/modules/authGuard';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { RootState } from 'src/store';

import css from './jobDetailAbout.module.scss';
import { ApplyModal } from '../applyModal';

export const JobDetailAbout = () => {
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const [openApply, setOpenApply] = useState(false);
  const url = window.location.href;
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  useEffect(() => {
    nonPermanentStorage.get('openApplyModal').then((res) => {
      if (currentIdentity && res && !jobDetail.applied) setOpenApply(true);
      nonPermanentStorage.remove('openApplyModal');
    });
  }, []);
  const inputJSX = (
    <button id="copy-button" className={css.copyBtn} onClick={handleCopy}>
      <Icon name="copy-01" fontSize={20} className="text-Gray-light-mode-700" />
      <span>Copy</span>
    </button>
  );

  const renderJobFeatures = (iconName: string, feature?: string, description?: string) => {
    if (!feature) return;
    return (
      <div className="flex gap-2">
        <Icon name={iconName} fontSize={20} className="text-Gray-light-mode-500" />
        <span className={css.subtitle}>{feature}</span>
        {description && <span className={css.description}>{description}</span>}
      </div>
    );
  };

  const detailJSX = (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {renderJobFeatures('marker-pin-01', jobDetail?.city ? jobDetail.city : 'Anywhere')}
        {renderJobFeatures(
          'mouse',
          PROJECT_REMOTE_PREFERENCES_V2.find((level) => level.value === jobDetail.remote_preference)?.label,
        )}
      </div>

      <div className="flex gap-4">
        {renderJobFeatures('calendar', PROJECT_TYPE_V2.find((level) => level.value === jobDetail.project_type)?.label)}
        {renderJobFeatures(
          'hourglass-03',
          PROJECT_LENGTH_V3.find((level) => level.value === jobDetail.project_length)?.label,
        )}
      </div>
      {renderJobFeatures(
        'target-02',
        EXPERIENCE_LEVEL_V2.find((level) => level.value === jobDetail.experience_level)?.label,
      )}
      {jobDetail.payment_scheme === 'FIXED'
        ? renderJobFeatures(
            'currency-dollar-circle',
            ` ${jobDetail.payment_range_lower}~${jobDetail.payment_range_higher} USD`,
            '(Fixed-price)',
          )
        : renderJobFeatures(
            'currency-dollar-circle',
            ` ${jobDetail.payment_range_lower}~${jobDetail.payment_range_higher} USD`,
          )}
    </div>
  );
  return (
    <>
      <div className={css.container}>
        <span className={css.title}>About this job</span>
        <div className="hidden md:block">{detailJSX}</div>

        <Input className="hidden md:block" id="copy-url" value={url} postfix={inputJSX} />
        {!jobDetail.applied && (
          <AuthGuard>
            <Button
              variant="contained"
              color="primary"
              customStyle="hidden md:block w-full"
              onClick={() => setOpenApply(true)}
            >
              Apply now
            </Button>
          </AuthGuard>
        )}
        <div className="md:hidden flex flex-col gap-5 p-5 border border-solid border-Gray-light-mode-200 rounded-default">
          {detailJSX}
          <Input id="copy-url" value={url} postfix={inputJSX} />
        </div>
      </div>
      <ApplyModal open={openApply} handleClose={() => setOpenApply(false)} />
    </>
  );
};
