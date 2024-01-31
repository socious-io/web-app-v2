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
