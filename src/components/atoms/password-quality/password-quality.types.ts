export type PasswordQualityProps = {
  value: string;
  validators: Validator[];
};

export type Validator = {
  name: 'characters' | 'number';
  amount: number;
};

export type ValidatorsRecord = Record<Validator['name'], (value: string, amount: number) => boolean>;
