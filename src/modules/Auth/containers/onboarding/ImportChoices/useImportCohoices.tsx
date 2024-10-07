export const useImportChoices = () => {
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

  return { steps };
};
