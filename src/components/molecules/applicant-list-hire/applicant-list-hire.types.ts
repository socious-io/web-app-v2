export type Applicant = {
  id: string;
  name: string;
  image: string;
  profileLink?: string;
  applyDate: string;
  coverLetter: string;
};

export type ApplicantListProps = {
  list: Applicant[];
  hireable?: boolean;
  onHireClick?: (id: string) => void;
  onRejectClick?: (id: string) => void;
  onMessageClick?: (id: string) => void;
  onApplicantClick?: (applicantId: string) => void;
};
