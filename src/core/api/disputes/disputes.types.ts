import { Media } from '../media/media.types';
import { Identity } from '../site/site.types';
import { PaginateRes } from '../types';

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
}

export interface Dispute {
  id: string;
  title: string;
  state:
    | 'AWAITING_RESPONSE'
    | 'JUROR_SELECTION'
    | 'JUROR_RESELECTION'
    | 'PENDING_REVIEW'
    | 'WITHDRAWN'
    | 'DECISION_SUBMITTED';
  code: string;
  direction: 'received' | 'submitted' | 'juror';
  claimant: Identity;
  respondent: Identity;
  events: DisputeEvent[];
  created_at: Date;
  updated_at: Date;
}

export interface DisputesRes extends PaginateRes {
  items: Dispute[];
}
