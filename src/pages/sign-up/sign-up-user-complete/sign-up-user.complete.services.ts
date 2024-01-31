import { Validator } from 'src/components/atoms/password-quality/password-quality.types';
import { updateProfile as updateProfileApi } from 'src/core/api';

export function updateProfile(payload: { username: string; firstName: string; lastName: string }) {
  const adopted = {
    username: payload.username,
    first_name: payload.firstName,
    last_name: payload.lastName,
  };
  return updateProfileApi(adopted);
}

export const passwordQualityValidators: Validator[] = [
  { name: 'characters', amount: 7 },
  { name: 'number', amount: 1 },
];
