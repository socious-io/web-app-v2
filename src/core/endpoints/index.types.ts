import { LoginPayload } from 'src/pages/sign-in/sign-in.types';
import { Job } from 'src/components/organisms/job-list/job-list.types';
import {
  ConnectStatus,
  ConnectionItem,
  FollowingsReq,
  LoginResp,
  MemberIdentity,
  NotificationSettingsRes,
  Pagination,
  UserType,
} from '../types';

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

export type UserImpactPointsResp = {
  id: string;
  job_category: {
    name: string;
  };
  mission: {
    created_at: string;
  };
  created_at: string;
  total_points: number;

  organization: {
    meta: {
      image: string;
      name: string;
    };
  };
};

export type ImpactPointResp = Pagination<UserImpactPointsResp>;

export interface Endpoints {
  get: {
    auth: {
      'otp/confirm': (payload: GetOtpConfirmPayload) => Promise<GetOtpConfirmResp>;
    };
    // projects: (payload: getOfferPayload) => Promise<Pagination<Offer[]>>;
    projects: {
      project_id: (id: string) => Promise<Job>;
    };
    media: {
      media_id: (id: string) => Promise<PostMediaUploadResp>;
    };
    offers: unknown;
    missions: unknown;
    follows: {
      followings: (payload?: { page?: number; name: string; type?: UserType }) => Promise<Pagination<FollowingsReq[]>>;
      followers: () => Promise<unknown>;
    };
    connections: {
      filtered_connections: (payload: {
        page?: number;
        status?: ConnectStatus;
        requester_id?: string;
        requested_id?: string;
      }) => Promise<Pagination<ConnectionItem[]>>;
      connection_status: (id: string) => Promise<{ connect: ConnectionItem }>;
    };
    members: {
      org_id: (id: string, payload: { page: number }) => Promise<Pagination<MemberIdentity[]>>;
    };
    users: {
      'user/impact-points': () => Promise<ImpactPointResp>;
    };
  };
  post: {
    auth: {
      login: (payload: LoginPayload) => Promise<LoginResp>;
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
      '{mission_id}/feedback': (id: string, payload: { content: string }) => Promise<unknown>;
      '{mission_id}/contest': (id: string, payload: { content: string }) => Promise<unknown>;
      '{mission_id}/submitworks': (id: string, payload: { content: string }) => Promise<unknown>;
      '{mission_id}/confirm/{work_id}': (id: string, work_id:string) => Promise<unknown>;
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
    connections: {
      '{connect_id}/accept': (id: string) => Promise<unknown>;
      '{connect_id}/block': (id: string) => Promise<unknown>;
    };
    notifications: {
      settings_confirm: (formData: NotificationSettingsRes) => Promise<NotificationSettingsRes>;
    };
    members: {
      '{org_id}/add/{user_id}': (org_id: string, user_id: string) => Promise<unknown>;
      '{org_id}/remove/{user_id}': (org_id: string, user_id: string) => Promise<unknown>;
    };
  };
}
