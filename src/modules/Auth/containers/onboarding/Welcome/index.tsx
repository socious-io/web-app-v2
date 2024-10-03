import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/modules/general/components/Button';

import css from './welcome.module.scss';
export const Welcome = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { t: translate } = useTranslation();

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-md py-5 px-4">
        <h1 className={css.title}>{translate('onboarding-welcome')}</h1>
        <h2 className={css.description}>{translate('onboarding-user-subtitle')}</h2>
        <img src="/images/welcome.svg" />
        <div className={css.subtitle}> {translate('onboarding-user-complete-profile')}</div>
        <div className={css.footer}>
          <Button color="primary" block onClick={() => updateSelectedStep(1)}>
            {translate('onboarding-user-complete-profile-btn')}
          </Button>
        </div>
      </div>
    </div>
  );
};
