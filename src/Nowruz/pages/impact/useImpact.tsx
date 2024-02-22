export const useImpact = () => {
  const tabs = [
    { label: 'Overview', content: <div /> },
    { label: 'Achievements', content: <div /> },
    { label: 'History', content: <div /> },
  ];

  return {
    data: { tabs },
    operations: {},
  };
};
