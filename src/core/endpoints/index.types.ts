import { NotificationSettingsRes, Pagination } from '../types';

export type GetProject = (id: string) => {
  applicants: number;
  applied: boolean;
  city: string;
};

export type Offer = {
  id: string;
  created_at: string;
  project_id: string;
  project: {
    id: string;
    description: string;
    title: string;
  };
  offerer: {
    meta: {
      image: string;
      name: string;
    };
  };
  recipient: {
    meta: {
      avatar: string | null;
      name: string;
    };
  };
};

type PostUserUpdatePayload = {
  bio: string;
  social_causes: string[];
  country: string;
  city: string;
  geoname_id: number;
  address: string;
  mobile_country_code: string;
  phone: string;
  cover_image: string;
  mission: string;
  avatar: string;
  first_name: string;
  last_name: string;
  username: string;
  skills: string[];
};

type PostOrganizationUpdatePayload = {
  bio: string;
  social_causes: string[];
  country: string;
  city: string;
  geoname_id: number;
  address: string;
  mobile_country_code: string;
  phone: string;
  cover_image: string;
  mission: string;
  name: string;
  type: string;
  email: string;
  culture: string;
  website: string;
  image: string;
};

export type PostMediaUploadResp = {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: string;
};

export type GetOtpConfirmPayload = {
  email: string;
  otp: string;
};

export type GetOtpConfirmResp = {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
};

export type PostRefreshResp = {
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
};

export type PostResendVerifyCodePayload = {
  email: string;
};

type getOfferPayload = {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'HIRED' | 'CLOSED,CANCELED,WITHDRAWN';
  page: number;
};

export type PostUpdateProfileResp = {
  username: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  geoname_id: number;
  mission: string;
  bio: string;
  impact_points: number;
  skills: string[];
  followers: number;
  followings: number;
  created_at: string;
  social_causes: string[];
  avatar: {
    id: string;
    identity_id: string;
    filename: string;
    url: string;
    created_at: string;
  };
  cover_image: {
    id: string;
    identity_id: string;
    filename: string;
    url: string;
    created_at: string;
  };
  reported: boolean;
};

export interface Endpoints {
  get: {
    auth: {
      'otp/confirm': (payload: GetOtpConfirmPayload) => Promise<GetOtpConfirmResp>;
    };
    projects: (payload: getOfferPayload) => Promise<Pagination<Offer[]>>;
    offers: unknown;
    missions: unknown;
    follows: {
      followings: () => Promise<unknown>;
      followers: () => Promise<unknown>;
    };
  };
  post: {
    auth: {
      login: unknown;
      refresh: (payload: { refresh_token: string }) => Promise<PostRefreshResp>;
      'resend-verify-code': (payload: PostResendVerifyCodePayload) => Promise<unknown>;
    };
    user: {
      '{user_id}/report': (id: string, payload: { blocked: boolean; comment: string }) => Promise<unknown>;
      '{user_id}/update_wallet': (payload: { wallet_address: string }) => Promise<unknown>;
      'update/profile': (payload: PostUserUpdatePayload) => Promise<PostUpdateProfileResp>;
    };
    media: {
      upload: (formData: FormData) => Promise<PostMediaUploadResp>;
    };
    offers: {
      '{offer_id}/approve': (id: string) => Promise<unknown>;
      '{offer_id}/hire': (id: string) => Promise<unknown>;
      '{offer_id}/withdrawn': (id: string) => Promise<unknown>;
    };
    missions: {
      '{mission_id}/complete': (id: string) => Promise<unknown>;
      '{mission_id}/cancel': (id: string) => Promise<unknown>;
      '{mission_id}/confirm': (id: string) => Promise<unknown>;
    };
    posts: {
      '{post_id}/report': (id: string, payload: { blocked: boolean; comment: string }) => Promise<unknown>;
    };
    organizations: {
      'orgs/update/{org_id}': (id: string, payload: PostOrganizationUpdatePayload) => Promise<unknown>;
    };
    payments: {
      '{offer_id/confirm}': (id: string, body: any) => Promise<unknown>;
      'add-card': (body: any) => Promise<unknown>;
      '{card_id}/update': (id: string, body: any) => Promise<unknown>;
      '{card_id}/remove': (id: string) => Promise<unknown>;
      '{mission_id}/payout': (id: string) => Promise<unknown>;
    };
    follows: {
      '{identity_id}': (id: string) => Promise<unknown>;
      '{identity_id}/unfollow': (id: string) => Promise<unknown>;
    };
    notifications: {
      settings_confirm: (formData: NotificationSettingsRes) => Promise<NotificationSettingsRes>;
    };
  };
}
