import { useLinkedInContext } from 'src/modules/importLinkedIn/contexts/linkedin.context';

export const useLinkedInExperiences = () => {
  // const { state } = useFeedsContext();
  // const { comments } = state;
  const { state } = useLinkedInContext();
  const { experiences } = state;

  return { data: { experiences } };
};
