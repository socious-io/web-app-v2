import { Organization } from 'src/core/api';
import { AdditionalRes } from 'src/core/api/additionals/additionals.types';

export interface OptionType {
  value: string;
  label: string;
}

export interface VerifyEducationModalProps {
  open: boolean;
  handleClose: () => void;
  education: AdditionalRes;
  organization: Organization;
  onSendRequest: (id: string, message?: string, exact_info?: boolean) => void;
}
