import {ApplicantResp, MissionsResp, QuestionsRes} from '../../../core/types';

export type Resolver = {
  applicantDetail: ApplicantResp;
  screeningQuestions: QuestionsRes;
  missions: MissionsResp;
};
