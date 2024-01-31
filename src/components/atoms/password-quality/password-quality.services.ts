import { ValidatorsRecord } from './password-quality.types';

export const validatorsRecord: ValidatorsRecord = {
  characters: (value: string, amount: number) => {
    return value.length >= amount;
  },
  number: (value: string, amount = 1) => {
    return /\d/.test(value);
  },
};
