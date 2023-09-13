// ----------------------- Requests -------------------------------
export type LoginReq = {
  email: string;
  password: string;
};

export type RegisterReq = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  username?: string;
};

export type PreRegisterReq = {
  email?: string;
  username?: string;
};

export type RefreshReq = {
  refresh_token: string;
};

export type OtpReq = {
  email: string;
};

export type OtpConfirmReq = {
  email: string;
  otp: string;
};

export type AuthStripeReq = {
  country: string;
  redirect_url: string;
  is_jp?: boolean;
};

export type SrtipeProfileReq = {
  is_jp?: boolean;
};

// ----------------------- Responses -------------------------------
export type AuthRes = {
  error?: string;
  access_token: string;
  refresh_token: string;
  token_type: 'Bearer';
};

export type PreRegisterRes = {
  email?: 'EXIST' | null;
  username?: 'EXIST' | null;
};

export type StripeLinkRes = {
  link: {
    object: string;
    created: number;
    expires_at: number;
    url: string;
  };
};

export type StripeProfileRes = {
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
    data: {
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
    }[];
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
};
