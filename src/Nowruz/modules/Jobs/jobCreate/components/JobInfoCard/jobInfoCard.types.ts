interface Payload {
  location: string;
  remotePreference: string;
  experienceLevel: string;
  jobType: string;
  jobLength: string;
  minPayment: string | number;
  maxPayment: string | number;
  paymentType: string;
  isCryptoPayment: boolean;
}
export interface JobInfoCardProps {
  payload: Payload;
}
