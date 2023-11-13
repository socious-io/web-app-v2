import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { steps } from 'src/Nowruz/modules/Auth/statics/sign-up-steps';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Stepper } from 'src/Nowruz/modules/general/components/stepper/stepper';

export const Congrats = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto flex flex-col h-screen pb-16 md:pt-24 pt-12 px-4">
      <div className={` md:pt-24 form-container`}>
        <IntroHeader
          title="Congratulations"
          description="Your account has been successfully created"
          logo={<FeaturedIcon src="/icons/check-circle.svg" />}
        />
        <div className="mt-8">
          <Button onClick={() => navigate('/sign-up/user/welcome')} color="primary" block>
            Continue
          </Button>
        </div>
      </div>
      <div className="flex-1"></div>
      <Stepper activeStep={3} steps={steps} />
    </div>
  );
};
