import {
  FollowingsReq,
  IdentityMeta,
  IdentityReq,
  MessagesReq,
  Pagination,
  ParticipantsReq,
  SummaryReq,
  UserType,
} from '../../../core/types';

export type MessageLoader = MakeGenerics<{
  LoaderData: {
    messages: Pagination<MessagesReq[]>;
    participants: Pagination<ParticipantsReq[]>;
    summery: Pagination<SummaryReq[]>;
    followings: Pagination<FollowingsReq[]>;
  };
}>;

export type OnPostMessageParams = {
  id: string;
  identity: IdentityReq;
  text: string;
};

export interface ParticipantDetail extends IdentityMeta {
  type: UserType;
}
