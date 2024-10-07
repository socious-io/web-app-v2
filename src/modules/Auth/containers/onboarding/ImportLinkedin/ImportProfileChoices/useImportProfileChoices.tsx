import { useContext, useState } from 'react';
import { translate } from 'src/core/utils';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';

export const useImportProfileChoices = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const [openImportModal, setOpenImportModal] = useState(false);
  const steps = [
    {
      title: translate('linkedin-steps.step-1-title'),
      subtitle: translate('linkedin-steps.step-1-subtitle'),
      displayDivider: true,
    },
    {
      title: translate('linkedin-steps.step-2-title'),
      subtitle: translate('linkedin-steps.step-2-subtitle'),
      displayDivider: true,
    },
    {
      title: translate('linkedin-steps.step-3-title'),
      subtitle: translate('linkedin-steps.step-3-subtitle'),
      displayDivider: false,
    },
  ];

  return {
    data: {
      steps,
      openImportModal,
    },
    operations: {
      updateSelectedStep,
      setOpenImportModal,
    },
  };
};
