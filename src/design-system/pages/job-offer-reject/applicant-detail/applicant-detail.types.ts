import { ApplicantResp, QuestionsRes } from '../../../../core/types';

export type Resolver = {
  applicantDetail: ApplicantResp;
  screeningQuestions: QuestionsRes;
};
