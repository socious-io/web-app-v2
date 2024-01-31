export interface JobPayload {
  title: string;
  description: string;
  remotePreference: string;
  isCryptoPayment: boolean;
  jobLength: string;
  jobType: string;
  // location: string;
  country: string;
  city: string;
  maxPayment: string | number;
  minPayment: string | number;
  paymentType: string;
  experienceLevel: string;
  socialCause: string;
  skills: string[];
  mission: string;
}
export interface JobInfoCardProps {
  payload: JobPayload;
}
