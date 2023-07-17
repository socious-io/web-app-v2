import { Pagination, UserApplicantResp } from '../../../../../core/types';

export type ApplicantsProps = {
  toReviewList: Pagination<UserApplicantResp[]>;
  declinedList: Pagination<UserApplicantResp[]>;
  onOfferClick?:(id: string) => void;
  onRejectClick?: (id: string) => void;
};
