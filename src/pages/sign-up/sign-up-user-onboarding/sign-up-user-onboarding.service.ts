import { profile, User } from 'src/core/api';

export async function getProfileRequest(identity: string): Promise<User> {
  return profile();
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
