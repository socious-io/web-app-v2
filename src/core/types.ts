export type UserIdentityMeta = {
  address: string;
  city: string;
  country: string;
  email: string;
  id: string;
  image: string;
  name: string;
  shortname: string;
  status: string;
};

export type IdentityReq = {
  created_at: string;
  current: boolean;
  id: string;
  primary: boolean;
  type: 'organizations' | 'users';
  meta: {
    address: string;
    city: string;
    country: string;
    email: string;
    id: string;
    image?: string;
    avatar?: string;
    name: string;
    shortname: string;
    status: string;
  };
};

export type SummaryReq = {
  items: {
    id: string;
    name: string;
    unread_count: string;
    updated_at: string;
    last_message: {
      text: string;
    };
  }[];
};

export type MessagesReq = {
  chat_id: string;
  created_at: string;
  deleted_at: string;
  id: string;
  identity_id: string;
  media: string;
  media_url: string;
  replied: boolean;
  reply_id: string;
  text: string;
  updated_at: string;
};

export type IdentityMeta = {
  address: string;
  avatar: string;
  image?: string;
  city: string;
  country: string;
  email: string;
  id: string;
  name: string;
  status: string;
  username: string;
};

export type ParticipantsReq = {
  all_read: boolean;
  chat_id: string;
  created_at: string;
  id: string;
  identity_id: string;
  identity_meta: IdentityMeta;
  identity_type: 'organizations' | 'users';
  joined_by: string;
  last_read_at: string;
  last_read_id: string;
  muted_until: string;
  type: string;
  updated_at: string;
};

export type FollowingsReq = {
  id: string;
  identity_id: string;
  identity_type: 'users' | 'organizations';
  mutual: boolean;
  identity_meta: IdentityMeta;
  following: boolean;
  created_at: string;
};

export type Pagination<T> = {
  items: T;
  limit: number;
  page: number;
  total_count: number;
};

export type PostMessagePayload = { id: string; text: string };

export type PostMessageResp = {
  chat_id: string;
  created_at: string;
  deleted_at: string;
  id: string;
  identity_id: string;
  media: string;
  replied: boolean;
  reply_id: string;
  text: string;
  updated_at: string;
};

export type GetJobs = {
  id: string;
  applicants: number;
  causes_tags: string[];
  title: string;
  status: 'ACTIVE' | 'DRAFT';
  updated_at: string;
};
