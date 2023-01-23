export type IdentityMeta = {
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

export type FollowingsReq = {
  created_at: string;
  following: boolean;
  id: string;
  identity_id: string;
  identity_meta: IdentityMeta;
  identity_type: 'organizations' | 'user';
  mutual: boolean;
};
