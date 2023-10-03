import { Identity } from '../site/site.types';
import { ConnectStatus, PaginateRes } from '../types';

export interface ConnectionsRes extends PaginateRes {
  items: Connection[];
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
  requested: any;
  requester: any;
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
