import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { Button } from 'src/modules/general/components/Button';

import css from './welcome.module.scss';
export const OpWelcome = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { t: translate } = useTranslation();
  return (
    <div className="flex flex-col items-center max-w-md py-5 px-6">
      <h1 className={css.title}>{translate('onboarding-welcome')}</h1>
      <h2 className={css.description}>{translate('onboarding-org-welcome-desc')}</h2>
      <img src="/images/welcome.svg" className="mb-12" />
      <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 ">
        <Button color="primary" block onClick={() => updateSelectedStep(1)}>
          {translate('onboarding-create-org')}
        </Button>
      </div>
    </div>
  );
};
