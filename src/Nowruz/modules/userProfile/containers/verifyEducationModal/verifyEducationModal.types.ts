import { Education, Organization } from 'src/core/api';

export interface OptionType {
  value: string;
  label: string;
}

export interface VerifyEducationModalProps {
  open: boolean;
  handleClose: () => void;
  onVerifyEducation: (id: string, message?: string, exact_info?: boolean) => void;
  organization: Organization;
  education: Education;
}
