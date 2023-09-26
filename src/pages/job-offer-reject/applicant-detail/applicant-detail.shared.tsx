import { Resolver } from './applicant-detail.types';
import { rejectApplicant } from '../job-offer-reject.services';

export const useApplicantDetailShared = () => {
  const navigate = {};
  const { screeningQuestions, applicantDetail } = useMatch().ownData as Resolver;

  function navigateToOverview() {
    navigate({ to: '..' });
  }

  function onReject(id: string) {
    return () => rejectApplicant(id).then(navigateToOverview);
  }

  return { navigate, screeningQuestions, applicantDetail, onReject };
};
