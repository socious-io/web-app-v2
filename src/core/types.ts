// import { PaymentCurrency, PaymentMode } from './api';

// export type UserType = 'users' | 'organizations';

// export type LoginReq = {
//   email: string;
//   password: string;
// };

// export type LoginResp = {
//   error?: string;
//   access_token: string;
//   refresh_token: string;
//   token_type: 'Bearer';
// };

// export type RefreshReq = {
//   refresh_token: string;
// };

// export type ResendVerifyCode = {
//   email: string;
// };

// export type OtpConfirmReq = {
//   email: string;
//   otp: string;
// };

// export type UserIdentityMeta = {
//   address: string;
//   city: string;
//   country: string;
//   email: string;
//   id: string;
//   image: string;
//   name: string;
//   shortname: string;
//   status: string;
// };

// export type IdentityReq = {
//   created_at: string;
//   current: boolean;
//   id: string;
//   primary: boolean;
//   type: 'organizations' | 'users';
//   meta: {
//     address: string;
//     city: string;
//     country: string;
//     email: string;
//     id: string;
//     image?: string;
//     avatar?: string;
//     name: string;
//     shortname: string;
//     status: string;
//     username: string;
//   };
// };

// export type SummaryReq = {
//   items: {
//     id: string;
//     name: string;
//     unread_count: string;
//     updated_at: string;
//     last_message: {
//       text: string;
//     };
//   }[];
// };

// export type MessagesReq = {
//   chat_id: string;
//   created_at: string;
//   deleted_at: string;
//   id: string;
//   identity_id: string;
//   media: string;
//   media_url: string;
//   replied: boolean;
//   reply_id: string;
//   text: string;
//   updated_at: string;
// };

// export type IdentityMeta = {
//   address: string;
//   avatar: string;
//   image?: string;
//   shortname?: string;
//   city: string;
//   country: string;
//   email: string;
//   id: string;
//   name: string;
//   status: string;
//   username: string;
// };

// export type ParticipantsReq = {
//   all_read: boolean;
//   chat_id: string;
//   created_at: string;
//   id: string;
//   identity_id: string;
//   identity_meta: IdentityMeta;
//   identity_type: 'organizations' | 'users';
//   joined_by: string;
//   last_read_at: string;
//   last_read_id: string;
//   muted_until: string;
//   type: string;
//   updated_at: string;
// };

// export type FollowingsReq = {
//   id: string;
//   identity_id: string;
//   identity_type: 'users' | 'organizations';
//   mutual: boolean;
//   identity_meta: IdentityMeta;
//   following: boolean;
//   created_at: string;
// };

// export type Pagination<T> = {
//   items: T[];
//   limit: number;
//   page: number;
//   total_count: number;
// };

// export type PostMessagePayload = { id: string; text: string };

// export type PostMessageResp = {
//   chat_id: string;
//   created_at: string;
//   deleted_at: string;
//   id: string;
//   identity_id: string;
//   media: string;
//   replied: boolean;
//   reply_id: string;
//   text: string;
//   updated_at: string;
// };

// export type GetJobs = {
//   id: string;
//   applicants: number;
//   causes_tags: string[];
//   title: string;
//   status: 'ACTIVE' | 'DRAFT';
//   updated_at: string;
//   missions: number;
//   payment_scheme: string;
//   payment_type: string;
// };

// export type CategoriesResp = {
//   categories: {
//     created_at: string;
//     hourly_wage_dollars: number;
//     id: string;
//     name: string;
//     updated_at: string;
//   }[];
// };

// export type LikeResp = {
//   comment_id: string;
//   created_at: string;
//   id: string;
//   identity_id: string;
//   post_id: string;
// };

// export type UserApplicantResp = {
//   closed_at: string;
//   cover_letter: string;
//   created_at: string;
//   cv_link: string;
//   cv_name: string;
//   deleted_at: string;
//   feedback: string;
//   id: string;
//   offer_message: string;
//   offer_rate: string;
//   old_id: string;
//   payment_rate: string;
//   payment_type: string;
//   organization: {
//     meta: {
//       name: string;
//       image: string;
//     };
//   };
//   project: {
//     title: string;
//     id: string;
//   };
// };

// export type ApplicantResp = {
//   id: string;
//   project_id: string;
//   answers: { answer: string }[];
//   cover_letter: string;
//   created_at: string;
//   share_contact_info: string;
//   user: {
//     first_name: string;
//     last_name: string;
//     bio?: string;
//     name: string;
//     avatar: string;
//   };
//   project?: {
//     payment_scheme: string;
//     payment_type?: string;
//   };
//   attachment?: {
//     filename: string;
//     url: string;
//   };
// };

// export type MissionsResp = Pagination<
//   {
//     applicant: {
//       cover_letter: string;
//     };
//     id: string;
//     offer_id: string;
//     created_at: string;
//     project: {
//       title: string;
//       payment_scheme: string;
//       payment_type: string;
//     };
//     job_category: { name: string };
//     status: 'CLOSED' | 'COMPLETE';
//     offer: {
//       total_hours: number;
//       assignment_total: number;
//       currency: string;
//     };
//     payment?: {
//       meta: {
//         0: string;
//       };
//       service: 'STRIPE' | 'CRYPTO';
//     };
//     assignee: {
//       meta: {
//         id: string;
//         avatar: string;
//         name: string;
//         username: string;
//       };
//     };
//     assigner: {
//       meta: {
//         image: string;
//         name: string;
//         verified_impact: boolean;
//       };
//     };
//     escrow: {
//       amount: number;
//       mission_id: string;
//       release_id: string;
//       released_at: string;
//       created_at: string;
//     };
//     amount: number;
//     total: number;
//     fee: number;
//     payout: number;
//     app_fee: number;
//   }[]
// >;

// export type DeclinedApplicantListResp = Pagination<
//   {
//     id: string;
//     created_at: string;
//     project: {
//       title: string;
//       id: string;
//     };
//     organization: {
//       meta: {
//         image: string;
//         name: string;
//       };
//     };
//   }[]
// >;

// export type Offer = {
//   applicant: {
//     cover_letter: string;
//   };
//   job_category: {
//     name: string;
//   };
//   recipient: {
//     meta: {
//       name: string;
//       avatar: string | null;
//       wallet_address: string | null;
//       city: string;
//       country: string;
//       username: string;
//       id: string;
//     };
//     type: 'users' | 'organizations';
//   };
//   organization: {
//     name: string;
//     bio: string;
//   };
//   id: string;
//   created_at: string;
//   offer_message: string;
//   assignment_total: number;
//   due_date: string;
//   currency?: PaymentCurrency;
//   status: 'HIRED' | 'CLOSED' | 'APPROVED' | 'HIRED';
//   project: {
//     description: string;
//     title: string;
//     payment_type: string;
//     payment_scheme: string;
//     remote_preference: string;
//   };
//   offerer: {
//     type: UserType;
//     meta: {
//       verified_impact?: boolean;
//       image: string;
//       name: string;
//       city: string;
//       country: string;
//       shortname: string;
//     };
//   };
//   total_hours: number;
//   project_id: string;
//   escrow: {
//     address: string;
//   };
//   payment_mode: PaymentMode;
//   crypto_currency_address: string;
//   amount: number;
//   total: number;
//   fee: number;
//   stripe_fee: number;
// };

// export type GetOffer = Pagination<Offer[]>;

// export type BadgesResp = {
//   count: number;
//   social_cause_category: string;
//   total_points: number;
// }[];

// export type OfferPayload = {
//   assignment_total: number;
//   offer_message: string;
//   total_hours: string;
//   payment_mode: string;
//   crypto_currency_address?: string;
//   currency?: string;
// };

// export type CreatePostPayload = {
//   title: string;
//   description: string;
//   remote_preference: string;
//   country: string;
//   project_type: string;
//   project_length: string;
//   payment_type: string;
//   causes_tags: string[];
//   skills: string[];
//   status: string;
//   experience_level: number;
//   job_category_id: string;
//   payment_scheme: string;
//   city: string;
//   payment_currency: string;
// };

// export type SettingsRes = {
//   type: string;
//   in_app: boolean;
//   email: boolean;
//   push: boolean;
// };

// export type NotificationSettingsRes = {
//   settings: SettingsRes[];
// };

// export type CardItems = {
//   id: string;
//   meta: {
//     last4: string;
//     brand: string;
//   };
//   brand: string;
// };

// export type CardInfoResp = Pagination<CardItems[]>;

// export type StripeLinkResp = {
//   link: {
//     created: number;
//     expires_at: number;
//     object: string;
//     url: string;
//   };
// };

// export type StripeProfileResp = {
//   external_accounts: {
//     data: {
//       account: string;
//       bank_name: string;
//     }[];
//   };
// };

// export type ConnectStatus = 'ACTIVE' | 'PENDING' | 'CONNECTED' | 'BLOCKED';

// export type ConnectionItem = {
//   requested: {
//     type: UserType;
//     meta: IdentityMeta;
//   };
//   requester: {
//     type: UserType;
//     meta: IdentityMeta;
//   };
//   status: ConnectStatus;
//   text: string;
//   created_at: string;
//   id: string;
//   following: boolean;
//   follower: boolean;
// };

// export type MemberIdentity = {
//   avatar: { url: string };
//   email: string;
//   id: string;
//   first_name: string;
//   last_name: string;
//   username: string;
// };

// export type Error = { error: string };

// export type Profile = {
//   address: string;
//   avatar: null | string;
//   bio: string;
//   city: string;
//   country: string;
//   cover_image: null | string;
//   created_at: string;
//   experiences: null | string;
//   first_name: string;
//   followers: number;
//   followings: number;
//   geoname_id: null | string;
//   id: string;
//   impact_points: number;
//   languages: null | string;
//   last_name: string;
//   mission: null | string;
//   mobile_country_code: string;
//   phone: string;
//   proofspace_connect_id: null | string;
//   reported: boolean;
//   skills: string[];
//   social_causes: string[];
//   username: string;
//   wallet_address: null | string;
// };
// export type FcmListResp = Array<{ meta: { os: 'ANDROID' | 'IOS' }; user_id: string; token: string }>;
// export type CreateFcmPayload = { meta: { os: 'ANDROID' | 'IOS' }; token: string };
