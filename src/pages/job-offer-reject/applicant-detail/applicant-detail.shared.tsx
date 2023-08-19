import { useMatch, useNavigate } from '@tanstack/react-location';
import { Resolver } from './applicant-detail.types';
import { rejectApplicant } from '../job-offer-reject.services';
import { endpoint } from 'src/core/endpoints';

export const useApplicantDetailShared = () => {
  const navigate = useNavigate();
  const { screeningQuestions, applicantDetail } = useMatch().ownData as Resolver;
  let unit = 'USDC';

  function navigateToOverview() {
    navigate({ to: '..' });
  }

  function onReject(id: string) {
    return () => rejectApplicant(id).then(navigateToOverview);
  }
  function submitHours(){
    // TODO check work_id
    const work_id = 'test';
    // endpoint.post.missions['{mission_id}/confirm/{work_id}'](applicantDetail.project.id,work_id).then(() => {

    // })
  }
  return { navigate, screeningQuestions, applicantDetail,submitHours, onReject,unit };
};
