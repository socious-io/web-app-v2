import { http } from '../http';
import { Cookie } from '../../core/storage';
import { LoginReq, LoginResp, RefreshReq } from '../../core/types';
import { TOKEN } from '../../constants/AUTH';

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
  const token = Cookie.get(TOKEN.refresh);

  if (!token) return;

  const payload: RefreshReq = { refresh_token: token };
  const { data } = await http.post('auth/refresh', payload);
  saveAuthParams(data);
}

export default {
  login,
  refreshToken,
};
