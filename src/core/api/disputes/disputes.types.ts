import { Media } from '../media/media.types';
import { Identity } from '../site/site.types';
import { PaginateRes } from '../types';

export type DisputeState =
  | 'AWAITING_RESPONSE'
  | 'JUROR_SELECTION'
  | 'JUROR_RESELECTION'
  | 'PENDING_REVIEW'
  | 'WITHDRAWN'
  | 'DECISION_SUBMITTED';

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
  created_at: Date;
  updated_at: Date;
  contract: {
    id: string;
    name: string;
  };
  category: string;
  jury: {
    voted: number;
    members: number;
  };
}

export interface DisputesRes extends PaginateRes {
  items: Dispute[];
}
