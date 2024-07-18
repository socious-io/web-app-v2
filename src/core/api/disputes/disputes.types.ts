import { Media } from '../media/media.types';
import { Identity } from '../site/site.types';
import { PaginateReq, PaginateRes } from '../types';

export type DisputeState =
  | 'AWAITING_RESPONSE'
  | 'JUROR_SELECTION'
  | 'JUROR_RESELECTION'
  | 'PENDING_REVIEW'
  | 'WITHDRAWN'
  | 'DECISION_SUBMITTED'
  | 'CLOSED';

export type DisputeDirection = 'received' | 'submitted' | 'juror';

export interface DisputeReq {
  category: string;
  respondent_id: string;
  mission_id: string;
  title: string;
  description: string;
  evidences: string[];
}

export interface DisputeEvent {
  id: string;
  message: string;
  type: 'MESSAGE' | 'RESPONSE' | 'WITHDRAW' | 'VOTE';
  vote_side: null;
  evidences: Media[];
  created_at: Date;
  creator: Identity;
}

export interface Dispute {
  id: string;
  title: string;
  state: DisputeState;
  code: string;
  direction: DisputeDirection;
  claimant: Identity;
  respondent: Identity;
  events: DisputeEvent[];
  jury: {
    voted: number;
    members: number;
  };
  created_at: Date;
  updated_at: Date;
  contract: {
    id: string;
    name: string;
  };
  category: string;
}

export interface DisputesRes extends PaginateRes {
  items: Dispute[];
}

export interface RespondDisputeReq {
  message: string;
  evidences: string[];
}

export type InvitationStatus = 'INVITED' | 'ACCEPTED' | 'DECLINED' | 'EXPIRED';

export type InvitationDispute = {
  id: string;
  title: string;
  code: string;
  category: string;
  contract: { id: string; name: string };
};

export interface Invitation {
  id: string;
  dispute: InvitationDispute;
  status: InvitationStatus;
  created_at: Date;
  updated_at: Date;
}

export interface InvitationsRes extends PaginateRes {
  items: Invitation[];
}
