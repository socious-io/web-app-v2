import { Validator } from '../../../components/atoms/password-quality/password-quality.types';

export const passwordQualityValidators: Validator[] = [
  { name: 'characters', amount: 7 },
  { name: 'number', amount: 1 },
];

