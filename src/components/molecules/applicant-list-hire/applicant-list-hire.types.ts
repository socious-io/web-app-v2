export type Applicant = {
  id: string;
  name: string;
  image: string;
  username?: string;
  profileLink?: string;
  applyDate: string;
  coverLetter: string;
};

export type ApplicantListProps = {
  list: Applicant[];
  hireable?: boolean;
  required_payment?: boolean;
  onHireClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
  onMessageClick?: (id: string) => void;
  onApplicantClick?: (applicantId: string) => void;
};
