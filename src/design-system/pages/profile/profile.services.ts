import { get } from '../../../core/http';
import { getUserDetailReq } from './profile.types';

export async function getUserDetail(payload: getUserDetailReq) {
  return get(`/orgs/by-shortname/${payload.id}`).then(({ data }) => data);
  //   return get(`/${payload.userType}/by-username/${payload.id}/profile`).then(({ data }) => data);
}
