import { Identity } from '../site/site.types';
import { ConnectStatus, PaginateReq, PaginateRes } from '../types';

export interface ConnectionsRes extends PaginateRes {
  items: Connection[];
}

export interface ConnectionReq extends PaginateReq {
  status?: ConnectStatus;
  requester_id?: string;
  requested_id?: string;
}

export interface Connection {
  id: string;
  status: ConnectStatus;
  text: string;
  requester_id: string;
  requested_id: string;
  connected_at?: Date;
  relation_id: string;
  updated_at: Date;
  created_at: Date;
  following: boolean;
  follower: boolean;
  requested: Identity;
  requester: Identity;
}

export interface ConnectRequest {
  text: string;
}

export interface Following extends Identity {
  id: string;
  mutual: boolean;
  following: boolean;
}

export interface FollowingRes extends PaginateRes {
  items: Following[];
}
