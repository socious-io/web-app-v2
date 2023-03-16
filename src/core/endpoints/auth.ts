import { http } from '../http';
import { Cookie } from '../../core/storage';
import { LoginReq, LoginResp, RefreshReq } from '../../core/types';
import { TOKEN } from '../../constants/AUTH';

// refreshing lock for block app from calling it duplicate
let refreshing = false;

function saveAuthParams(res: LoginResp) {
  if (!res.access_token || !res.refresh_token) return;
  Cookie.add({
    access_token: res.access_token,
    refresh_token: res.refresh_token,
    token_type: res.token_type,
  });
}

async function login(payload: LoginReq): Promise<LoginResp> {
  const { data } = await http.post('auth/login', payload);
  saveAuthParams(data);
  return data;
}

async function refreshToken() {
  if (refreshing) return;

  refreshing = true;

  const token = Cookie.get(TOKEN.refresh);  
  if (!token) return;

  const payload: RefreshReq = { refresh_token: token };

  const { data } = await http.post('auth/refresh', payload);
  Cookie.flush();
  saveAuthParams(data);
  
  refreshing = false;
}

export async function confirmOTP(email: string, otp: string): Promise<number> {
  const {data, status} = await http.get(`auth/otp/confirm?email=${email}&code=${otp}`);
  saveAuthParams(data);
  return status
}

export async function resendOTP(email: string) {
  return http.post('auth/resend-verify-code', {email});
}

export default {
  login,
  refreshToken,
  confirmOTP,
  resendOTP
};
