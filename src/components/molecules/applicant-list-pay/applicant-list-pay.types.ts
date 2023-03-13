export type Applicant = {
  id: string;
  name: string;
  image: string;
  category: string;
  profileLink?: string;
  hireDate: string;
  status: 'CLOSED' | 'COMPLETE' | 'CONFIRMED';
  paymentType: string;
  paymentMode: string;
  totalHour: number;
  totalMission: string;
};

export type ApplicantListPayProps = {
  list: Applicant[];
  onConfirm?: (id: string) => void;
  confirmable?: boolean;
  //   onOfferClick?: (id: string) => void;
  //   onRejectClick?: (id: string) => void;
  //   onMessageClick?: (id: string) => void;
  onApplicantClick?: (applicantId: string) => void;
};
