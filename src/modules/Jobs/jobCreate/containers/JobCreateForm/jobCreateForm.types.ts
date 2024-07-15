export type LocationInput = {
  city?: string;
  country?: string;
  label?: string;
};

export interface OptionType {
  value: string;
  label: string;
}

export interface OptionNumber {
  value: number;
  label: string;
}

export type Inputs = {
  title: string;
  cause: OptionType;
  description: string;
  category: OptionType;
  paymentMin?: number | null;
  paymentMax?: number | null;
  commitmentHoursLower?: number | null;
  commitmentHoursHigher?: number | null;
  skills: Array<{ label?: string; value?: string }>;
  preference: OptionType;
  type: OptionType;
  length: OptionType;
  location?: LocationInput;
  paymentType: string;
  paymentScheme: string;
  experienceLevel: OptionNumber;
  jobLocation: string;
};
