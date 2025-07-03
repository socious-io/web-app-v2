import { Navigate } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/modules/Auth/containers/ServiceIntro';
import { reviews, onboardingOptions } from 'src/modules/Auth/statics/intro';
import { Button } from 'src/modules/general/components/Button';
import CardRadioButton from 'src/modules/general/components/CardRadioButton';
import LanguageSwitcher from 'src/modules/general/components/LanguageSwitcher';

import css from './intro.module.scss';
import { useIntro } from './useIntro';

export const Intro = () => {
  const {
    data: { status, selectedOnboarding },
    operations: { setSelectedOnboarding, onContinue },
  } = useIntro();

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
            logo={<img src="/images/logo/logo.svg" width={48} height={48} alt="Socious Logo" />}
          />
          <div className="mt-6">
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
          <LanguageSwitcher containerClassName="flex justify-center md:justify-start md:absolute md:top-0 md:left-0 md:transform-none mt-4 md:mt-0" />
        </div>
        <div className={css.copy}>
          <div>
            <span className={css.copyText}>{'© Socious Global Inc. 2023'}</span>
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
