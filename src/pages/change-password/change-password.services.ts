import { Validator } from 'src/components/atoms/password-quality/password-quality.types';
import { changePassword as changePasswordApi } from 'src/core/api';

export async function changePassword(payload: { current_password: string; password: string }) {
  return changePasswordApi(payload);
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
