import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { closeJob, CurrentIdentity, Job, QuestionsRes } from 'src/core/api';
import { translate } from 'src/core/utils';
import AuthGuard from 'src/modules/Auth/containers/AuthGuard';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { CountryFlag } from 'src/modules/general/components/countryFlag';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import { RootState } from 'src/store';

import css from './jobDetailAbout.module.scss';

interface JobDetailAboutProps {
  isUser: boolean;
  applied?: boolean;
  handleOpenApplyModal?: () => void;
}

export const JobDetailAbout: React.FC<JobDetailAboutProps> = ({ isUser = true, applied, handleOpenApplyModal }) => {
  const { jobDetail } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const [openAlert, setOpenAlert] = useState(false);

  // FIXME: .env URLs should not have slash at the end
  const url = `${config.appBaseURL}jobs/${jobDetail.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const navigate = useNavigate();

  const onClose = async () => {
    const response = await closeJob(jobDetail.id);
    if (response) {
      navigate(-1);
    }
  };

  const inputJSX = (
    <button id="copy-button" className={css.copyBtn} onClick={handleCopy}>
      <Icon name="copy-01" fontSize={20} className="text-Gray-light-mode-700" />
      <span>{translate('job-copy')}</span>
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
    const address = jobDetail.country
      ? `${jobDetail.city ? `${jobDetail.city}, ` : ''}${getCountryName(
          jobDetail.country as keyof typeof COUNTRIES_DICT | undefined,
        )}`
      : '';
    return (
      <div className="flex gap-2">
        {jobDetail.country ? (
          <CountryFlag countryCode={jobDetail.country || ''} />
        ) : (
          <img src="/icons/earth.svg" alt="" />
        )}

        <span className={css.subtitle}>{address || translate('job-anywhere')}</span>
      </div>
    );
  };

  const detailJSX = (
    <div className="flex flex-row flex-wrap gap-4">
      {renderJobLocation()}
      {renderJobFeatures(
        'mouse',
        jobDetail.remote_preference ? translate(`job-preference.${jobDetail.remote_preference}`) : '',
      )}
      {renderJobFeatures('calendar', jobDetail.project_type ? translate(`job-type.${jobDetail.project_type}`) : '')}
      {renderJobFeatures(
        'hourglass-03',
        jobDetail.project_length ? translate(`job-length.${jobDetail.project_length}`) : '',
      )}

      {renderJobFeatures(
        'target-02',
        jobDetail.experience_level ? translate(`job-experience.${jobDetail.experience_level}`) : '',
      )}
      {jobDetail.payment_type === 'PAID' &&
        jobDetail.payment_range_lower &&
        jobDetail.payment_range_higher &&
        renderJobFeatures(
          'currency-dollar-circle',
          ` ${jobDetail.payment_range_lower}~${jobDetail.payment_range_higher} USD`,
          translate('job-fixed-price'),
        )}

      {jobDetail.payment_type === 'VOLUNTEER' && renderJobFeatures('heart', translate('job-volunteer'))}

      {jobDetail.payment_type === 'VOLUNTEER' &&
        jobDetail.commitment_hours_lower &&
        jobDetail.commitment_hours_higher &&
        renderJobFeatures(
          'clock',
          ` ${jobDetail.commitment_hours_lower}~${jobDetail.commitment_hours_higher} hrs/week`,
        )}
    </div>
  );
  return (
    <>
      <div className={css.container}>
        <span className={css.title}>{translate('job-about')}</span>
        <div className="hidden md:block">{detailJSX}</div>

        <Input className="hidden md:block" id="copy-url" value={url} postfix={inputJSX} />
        {!applied && currentIdentity?.type !== 'organizations' && jobDetail.status === 'ACTIVE' && (
          <AuthGuard>
            <Button
              variant="contained"
              color="primary"
              customStyle="hidden md:block w-full"
              onClick={handleOpenApplyModal}
            >
              {translate('job-apply')}
            </Button>
          </AuthGuard>
        )}
        {!isUser && jobDetail.status === 'ACTIVE' && currentIdentity?.id === jobDetail.identity_meta.id && (
          <Button
            variant="contained"
            color="error"
            customStyle="hidden md:block w-full"
            onClick={() => setOpenAlert(true)}
          >
            {translate('job-close')}
          </Button>
        )}
        <div className="md:hidden flex flex-col gap-5 p-5 border border-solid border-Gray-light-mode-200 rounded-default">
          {detailJSX}
          <Input id="copy-url" value={url} postfix={inputJSX} />
        </div>
      </div>

      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        onSubmit={onClose}
        message={translate('job-close-alert')}
        title={translate('job-close-title')}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="error"
        submitButtonLabel={translate('job-close-title')}
      />
    </>
  );
};
