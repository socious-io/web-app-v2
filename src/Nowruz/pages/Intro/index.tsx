import { Typography } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/Nowruz/modules/Auth/containers/ServiceIntro';
import { reviews, onboardingOptons } from 'src/Nowruz/modules/Auth/statics/intro';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { Link } from 'src/Nowruz/modules/general/components/link';

import css from './intro.module.scss';

export const Intro = () => {
  const [selectedOnboarding, setSelectedOnboarding] = useState<'user' | 'organization'>('user');
  const navigate = useNavigate();
  const navigateToOnboarding = () => {
    localStorage.setItem('registerFor', selectedOnboarding);
    navigate('/sign-up/user/email');
  };
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
  return (
    <div className="flex h-screen px-4 sm:p-0">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between">
        <div className="form-container">
          <IntroHeader
            title="Get started"
            description="Select your path: Are you purpose-driven talent seeking to make an impact, or an organization driving change?"
            logo={<Logo width={48} height={48} />}
          />
          <div className="mt-7">
            <CardRadioButton
              items={onboardingOptons}
              selectedValue={selectedOnboarding}
              setSelectedValue={(value) => {
                setSelectedOnboarding(value);
                console.log(value);
              }}
            />
            <div className="mt-6">
              <Button color="primary" block onClick={navigateToOnboarding}>
                Continue
              </Button>
            </div>
          </div>
          <div className="my-5 text-center">
            <Typography variant="caption" className={css.signupTitle}>
              Already have an account?
            </Typography>
            <Link href="/sign-in" label="Log in" />
          </div>
        </div>
        <div className={css.copy}>
          <div>
            <span className={css.copyText}>© Socious Global Inc. 2023</span>
          </div>
        </div>
      </div>

      <div className="w-1/2 items-center justify-center hidden md:block">
        <div className={`${css.review} `}>{renderIntro()}</div>
      </div>
    </div>
  );
};
