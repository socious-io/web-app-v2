import { useLoaderData, useNavigate } from 'react-router-dom';
import { rejectApplicant } from 'src/core/api';

import { Resolver } from './applicant-detail.types';

export const useApplicantDetailShared = () => {
  const navigate = useNavigate();
  const { screeningQuestions, applicantDetail } = useLoaderData() as Resolver;

  function navigateToOverview() {
    navigate('..');
  }

  function onReject(id: string) {
    return () => rejectApplicant(id).then(navigateToOverview);
  }

  return { navigate, screeningQuestions, applicantDetail, onReject };
};
