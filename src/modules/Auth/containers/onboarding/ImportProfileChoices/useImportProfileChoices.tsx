import { useContext, useState } from 'react';

import { StepsContext } from '../Stepper';

export const useImportProfileChoices = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const [openImportModal, setOpenImportModal] = useState(false);
  const steps = [
    {
      title: 'Upload your LinkedIn CV',
      subtitle: 'We will import your information, experiences, education and others',
      displayDivider: true,
    },
    {
      title: 'Add some extras',
      subtitle: 'Share your skills and the social issues you are passionate about.',
      displayDivider: true,
    },
    {
      title: 'Add your photo',
      subtitle: 'Your avatar is the first step for genuine connections.',
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
