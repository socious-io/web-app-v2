import { Validator } from '../../components/atoms/password-quality/password-quality.types';
import { post } from '../../core/http';

export async function changePassword(payload: { current_password: string; password: string }) {
  return post('user/change-password', payload).then(({ data }) => data);
}

export const formInitialState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

type Actions = {
  value: string;
  type: keyof typeof formInitialState;
};

export function reducer(state: typeof formInitialState, { type, value }: Actions) {
  switch (type) {
    case 'currentPassword':
      return { ...state, currentPassword: value };
    case 'newPassword':
      return { ...state, newPassword: value };
    case 'confirmPassword':
      return { ...state, confirmPassword: value };
  }
}

export const passwordQualityValidators: Validator[] = [
  { name: 'characters', amount: 7 },
  { name: 'number', amount: 1 },
];
