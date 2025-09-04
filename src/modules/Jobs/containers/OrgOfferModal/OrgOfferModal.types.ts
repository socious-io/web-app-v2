import { Applicant } from 'src/core/api';

export type Form = {
  title: string;
  paymentMethod?: string;
  hours: number;
  total?: number;
  currency?: string;
  description: string;
};

export interface OrgOfferModalProps {
  applicant: Applicant;
  onClose: () => void;
  open: boolean;
  onSuccess: () => void;
}
