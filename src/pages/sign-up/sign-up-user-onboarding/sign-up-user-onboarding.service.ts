import { get } from 'src/core/http';
import { Profile } from 'src/core/types';

export async function getProfileRequest(identity: string): Promise<Profile> {
  return get(`/user/profile`).then(({ data }) => data);
}
