// ----------------------- Requests -------------------------------
export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
}

export interface PreRegisterReq {
  email?: string;
  username?: string;
  shortname?: string;
}

export interface RefreshReq {
  refresh_token: string;
}

export interface OtpReq {
  email: string;
}

export interface OtpConfirmReq {
  email: string;
  code: string;
}

export interface AuthStripeReq {
  country: string;
  redirect_url?: string;
  is_jp?: boolean;
}

export interface SrtipeProfileReq {
  is_jp?: boolean;
}

// ----------------------- Responses -------------------------------
export interface AuthRes {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
}

export interface GoogleAuthRes extends AuthRes {
  registered?: boolean;
}

export interface PreRegisterRes {
  email?: 'EXISTS' | null;
  username?: 'EXISTS' | null;
  shortname?: 'EXISTS' | null;
}

export interface StripeLinkRes {
  link: {
    object: string;
    created: number;
    expires_at: number;
    url: string;
  };
}

export interface StripeAccount {
  id: string;
  object: string;
  account: string;
  account_holder_name: string;
  account_holder_type: null;
  account_type: string;
  available_payout_methods: string[];
  bank_name: string;
  country: string;
  currency: string;
  default_for_currency: boolean;
  fingerprint: string;
  last4: string;
  routing_number: string;
  status: string;
}

export interface StripeProfileRes {
  mui: string;
  id: string;
  object: string;
  business_profile: {
    mcc: string;
    name: string | null;
    support_address: string | null;
    support_email: string | null;
    support_phone: string | null;
    support_url: string | null;
    url: string;
  };
  capabilities: {
    card_payments: string;
    transfers: string;
  };
  charges_enabled: boolean;
  country: string;
  created: number;
  default_currency: string;
  details_submitted: boolean;
  email: null;
  external_accounts: {
    object: string;
    data: StripeAccount[];
    has_more: boolean;
    total_count: number;
    url: string;
  };
  future_requirements: {
    alternatives: any[];
    current_deadline: null;
    currently_due: any[];
    disabled_reason: null;
    errors: any[];
    eventually_due: any[];
    past_due: any[];
    pending_verification: any[];
  };
  payouts_enabled: boolean;
  type: string;
  status: string;
}

export interface AppleAuthResponse {
  user: string | null;
  email: string | null;
  givenName: string | null;
  familyName: string | null;
  identityToken: string;
  authorizationCode: string;
}
