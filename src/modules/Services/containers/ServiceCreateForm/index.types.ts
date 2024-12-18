import { OptionType } from 'src/core/adaptors';

export type ServiceForm = {
  name: string;
  category: OptionType;
  description: string;
  delivery: OptionType;
  hours: string;
  payment: string;
  price: string;
  currency: string;
  skills: OptionType[];
};
