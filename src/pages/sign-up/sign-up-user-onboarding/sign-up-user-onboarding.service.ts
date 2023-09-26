import { get } from 'src/core/http';
import { Profile } from 'src/core/types';

export async function getProfileRequest(identity: string): Promise<Profile> {
  return get(`/user/profile`).then(({ data }) => data);
}
export const isValidArrayRange = (value: string[] | null, min: number, max: number) => {
  if (value === null) {
    return false;
  }

  if (Array.isArray(value)) {
    return value.length > min && value.length <= max;
  }

  return true;
};
