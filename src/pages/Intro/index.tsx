import { Typography } from '@mui/material';
import { Logo } from 'public/icons/dynamic/logo';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/modules/Auth/containers/ServiceIntro';
import { reviews, onboardingOptions } from 'src/modules/Auth/statics/intro';
import { Button } from 'src/modules/general/components/Button';
import CardRadioButton from 'src/modules/general/components/CardRadioButton';
import { LanguageSwitcher } from 'src/modules/general/components/LanguageSwitcher';
import { Link } from 'src/modules/general/components/link';
import { RootState } from 'src/store';

import css from './intro.module.scss';
import { useIntro } from './useIntro';

export const Intro = () => {
  const status = useSelector((state: RootState) => state.identity.status);
  const [selectedOnboarding, setSelectedOnboarding] = useState<'user' | 'organization'>('user');
  const {
    operations: { onContinue },
  } = useIntro();
  const { t: translate } = useTranslation();

  const renderIntro = () => {
    if (selectedOnboarding === 'user')
      return (
        <ServiceIntro
          name={reviews.user.name}
          position={reviews.user.position}
          review={reviews.user.review}
          avatar={reviews.user.image}
        />
      );
    return (
      <ServiceIntro
        name={reviews.organization.name}
        position={reviews.organization.position}
        review={reviews.organization.review}
        avatar={reviews.organization.image}
      />
    );
  };
  if (status === 'loading') return <div></div>;

  if (status === 'succeeded') return <Navigate to="/jobs" />;
  return (
    <div className="flex h-screen px-4 sm:p-0">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between">
        <div className="form-container">
          <IntroHeader
            title={translate('intro-title')}
            description={translate('intro-description')}
            logo={<Logo width={48} height={48} />}
          />
          <div className="mt-7">
            <CardRadioButton
              items={onboardingOptions}
              selectedValue={selectedOnboarding}
              setSelectedValue={value => {
                setSelectedOnboarding(value as 'user' | 'organization');
              }}
            />
            <div className="mt-6">
              <Button color="primary" block onClick={onContinue}>
                {translate('intro-continue')}
              </Button>
            </div>
          </div>
          {/* <div className="my-5 text-center">
            <Typography variant="caption" className={css.signupTitle}>
              {translate('intro-have-account')}
            </Typography>
            <Link href="/sign-in" label={translate('intro-login')} customStyle="!font-semibold" />
          </div> */}
          <div className="md:absolute md:top-0 md:left-0 md:transform-none flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
        <div className={css.copy}>
          <div>
            <span className={css.copyText}>© Socious Global Inc. 2023</span>
          </div>
        </div>
      </div>

      <div className="w-1/2 items-center justify-center hidden md:block">
        <div className={`${css.review} `}>
          <div className="px-8">{renderIntro()}</div>
        </div>
      </div>
    </div>
  );
};
