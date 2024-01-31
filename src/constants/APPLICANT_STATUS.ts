export const APPLICANT_STATUS = {
  PENDING: 'PENDING',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHRAWN: 'WITHDRAWN',
  APPROVED: 'APPROVED',
  HIRED: 'HIRED',
};

export const APPLICANT_STATUS_DICT = {
  PENDING: 'Offer received',
  OFFERED: 'OFFERED',
  REJECTED: 'REJECTED',
  WITHRAWN: 'WITHDRAWN',
  APPROVED: 'Waiting confirmation',
  HIRED: 'HIRED',
};

export type StatusKeys = keyof typeof APPLICANT_STATUS_DICT;
export type Values = (typeof APPLICANT_STATUS_DICT)[StatusKeys];

export function setApplicantStatusLabel(status: keyof typeof APPLICANT_STATUS): Values {
  if (!APPLICANT_STATUS_DICT[status]) {
    return 'Status undefined';
  }
  return APPLICANT_STATUS_DICT[status];
}
