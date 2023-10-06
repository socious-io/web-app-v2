import { useLoaderData, useNavigate } from 'react-router-dom';

import { Resolver } from './applicant-detail.types';
import { rejectApplicant } from '../job-offer-reject.services';

export const useApplicantDetailShared = () => {
  const navigate = useNavigate();
  const { screeningQuestions, applicantDetail } =  useLoaderData() as Resolver;

  function navigateToOverview() {
    navigate('..');
  }

  function onReject(id: string) {
    return () => rejectApplicant(id).then(navigateToOverview);
  }

  return { navigate, screeningQuestions, applicantDetail, onReject };
};
