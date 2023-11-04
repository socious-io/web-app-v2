import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { EmailForm } from 'src/Nowruz/modules/Auth/containers/signup/EmailForm';
import { Button } from 'src/Nowruz/modules/general/components/Button';
export const Email = () => {
  return (
    <div className={`md:pt-24 form-container`}>
      <IntroHeader
        title="Create an account"
        description="Sign up and start making an impact"
        logo={<Logo width={48} height={48} />}
      />
      <EmailForm />
    </div>
  );
};
