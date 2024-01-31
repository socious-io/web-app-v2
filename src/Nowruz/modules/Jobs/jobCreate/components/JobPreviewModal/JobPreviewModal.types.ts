import { JobPayload } from '../JobInfoCard/jobInfoCard.types';

type Company = {
  name: string;
  description: string;
  image: string;
  mission: string;
};

export interface JobPreviewModalProps {
  open: boolean;
  onClose: () => void;
  company: Company;
  job: JobPayload;
}
