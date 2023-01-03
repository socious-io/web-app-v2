import { Validator } from '../../../atoms/password-quality/password-quality.types';

export const passwordQualityValidators: Validator[] = [
  { name: 'characters', amount: 7 },
  { name: 'number', amount: 1 },
];

export const formInitialState = {
  firstName: '',
  lastName: '',
  password: '',
};

type Actions = {
  value: string;
  type: keyof typeof formInitialState;
};

export function reducer(
  state: typeof formInitialState,
  { type, value }: Actions
) {
  switch (type) {
    case 'firstName':
      return { ...state, firstName: value };
    case 'lastName':
      return { ...state, lastName: value };
    case 'password':
      return { ...state, password: value };
  }
}
