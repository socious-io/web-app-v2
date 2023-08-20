import { useMatch, useNavigate } from '@tanstack/react-location';
import { Resolver } from './applicant-detail.types';
import { rejectApplicant } from '../job-offer-reject.services';
import { endpoint } from 'src/core/endpoints';

export const useApplicantDetailShared = () => {
  const navigate = useNavigate();
  const { screeningQuestions, applicantDetail,missions } = useMatch().ownData as Resolver;
  let unit = 'USDC';

  function navigateToOverview() {
    navigate({ to: '..' });
  }

  function onReject(id: string) {
    return () => rejectApplicant(id).then(navigateToOverview);
  }
  function submitHours(mission_id:string,work_id:string){
    endpoint.post.missions['{mission_id}/confirm/{work_id}'](mission_id,work_id).then(() => {

    })
  }
  return { navigate, screeningQuestions, applicantDetail,submitHours,missions, onReject,unit };
};
