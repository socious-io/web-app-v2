import { NewContractStatus } from 'src/core/api';
import { StatusProps } from 'src/modules/general/components/Status/index.types';

export const APPLICANT_STATUS = {
  PENDING: 'PENDING',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
  CLOSED: 'CLOSED',
  CANCELED: 'CANCELED',
};

export const APPLICANT_STATUS_DICT = {
  PENDING: 'Offer received',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'Withdrawn',
  APPROVED: 'Awaiting confirmation',
  HIRED: 'Ongoing',
  CLOSED: 'CLOSED',
  CANCELED: 'CANCELED',
};

export const ORGANIZATION_STATUS_DICT = {
  PENDING: 'Offer sent',
  OFFERED: 'Payment required',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'Withdrawn',
  APPROVED: 'Payment required',
  HIRED: 'Ongoing',
  CLOSED: 'CLOSED',
  CANCELED: 'CANCELED',
};

export type StatusKeys = keyof typeof APPLICANT_STATUS_DICT;
export type Values = (typeof APPLICANT_STATUS_DICT)[StatusKeys];

export function getApplicantStatusLabel(status: keyof typeof APPLICANT_STATUS): Values {
  if (!APPLICANT_STATUS_DICT[status]) {
    return 'Status undefined';
  }
  return APPLICANT_STATUS_DICT[status];
}

export function getOrganizationStatusLabel(status: keyof typeof APPLICANT_STATUS): Values {
  if (!ORGANIZATION_STATUS_DICT[status]) {
    return 'Status undefined';
  }
  return ORGANIZATION_STATUS_DICT[status];
}

//FIXME: semantic status key for both side
export const contractStatus: Record<NewContractStatus, StatusProps> = {
  CREATED: {
    label: 'Pending',
    theme: 'warning',
    icon: 'dot',
  },
  CLIENT_APPROVED: {
    label: 'Completed',
    theme: 'success',
    icon: '',
  },
  SIGNED: {
    label: 'Ongoing',
    theme: 'success',
    icon: 'dot',
  },
  PROVIDER_CANCELED: {
    label: 'Canceled',
    theme: 'secondary',
    icon: '',
  },
  CLIENT_CANCELED: {
    label: 'Canceled',
    theme: 'secondary',
    icon: '',
  },
  APPLIED: {
    label: 'Completed',
    theme: 'success',
    icon: '',
  },
  COMPLETED: {
    label: 'Completed',
    theme: 'success',
    icon: '',
  },
};
