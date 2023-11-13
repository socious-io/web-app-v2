import { Link, Typography } from '@mui/material';
import { Logo } from 'public/icons/nowruz/logo';
import { User01 } from 'public/icons/nowruz/user-01';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import ServiceIntro from 'src/Nowruz/modules/Auth/containers/ServiceIntro';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';

import css from './intro.module.scss';
const items = [
  {
    title: 'I am seeking impact work',
    description: 'Discover roles that matter and join forces with changemakers',
    // icon: <Icon name="user-01" fontSize={16} color={variables.color_grey_600} />,
    icon: User01,
    value: 'User',
  },
  {
    title: 'I am hiring purpose-driven talent',
    description: 'List opportunities and connect with talent who share your mission',
    // icon: <Icon name="building-05" color={variables.color_grey_600} />,
    icon: User01,

    value: 'Organization',
  },
];
export const Intro = () => {
  const [selectedOnboarding, setSelectedOnboarding] = useState<'User' | 'Organization'>('User');
  const navigate = useNavigate();
  const navigateToOnboarding = () => {
    if (selectedOnboarding === 'User') navigate('/sign-up/user/onboarding');
    else navigate('/sign-up/organization/onboarding');
  };
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className="flex md:flex-row flex-col">
        <div className={`w-full md:w-1/2 md:pt-24`}>
          <div className="form-container">
            <IntroHeader
              title="Create an account"
              description="Sign up and start making an impact"
              logo={<Logo width={48} height={48} />}
            />
            <div className="mt-7">
              <CardRadioButton
                items={items}
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
              <Link href="/sign-in" className={`${css.link} mt-5`}>
                Log in
              </Link>
            </div>
            <div className="text-center">
              <Typography variant="caption" className={css.signupTitle}>
                By continuing, you accept our
              </Typography>
              <Link href="/terms-conditions" className={css.link}>
                Terms of Use
              </Link>
              <Typography variant="caption" className={css.signupTitle}>
                and
              </Typography>
              <Link href="/privacy-policy" className={css.link}>
                Privacy Policy.
              </Link>
            </div>
          </div>
        </div>
        <div className={`${css.review} hidden md:block w-full md:w-1/2 md:pt-24 px-16`}>
          <ServiceIntro
            name="Masaki Mashiko"
            position="Head of Sales, Climate Startup"
            review="Socious not only helped me secure my dream environmental job, but also boosted my salary and enabled me to make a positive impact."
            avatar="/images/review-avatar.png"
          />
        </div>
      </div>
      <div className="flex-1"></div>
      <div className={css.copy}>© Socious Global Inc. 2023</div>
    </div>
  );
};
