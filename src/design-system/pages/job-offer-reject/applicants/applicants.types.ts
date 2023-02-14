import { Pagination, UserApplicantResp } from '../../../../core/types';

export type ApplicantsProps = {
  toReviewList: Pagination<UserApplicantResp[]>;
  declinedList: Pagination<UserApplicantResp[]>;
};
