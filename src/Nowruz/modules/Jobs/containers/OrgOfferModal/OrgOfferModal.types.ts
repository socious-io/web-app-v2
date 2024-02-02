import { Applicant } from 'src/core/api';

export interface OrgOfferModalProps {
  applicant: Applicant;
  onClose: () => void;
  open: boolean;
  onSuccess: () => void;
}
// applicant
