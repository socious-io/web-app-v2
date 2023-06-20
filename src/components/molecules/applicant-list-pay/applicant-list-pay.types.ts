export type Applicant = {
  id: string;
  name: string;
  image: string;
  category: string;
  username?: string;
  profileLink?: string;
  hireDate: string;
  status: 'CLOSED' | 'COMPLETE' | 'CONFIRMED';
  paymentType: string;
  paymentMode: string;
  totalHour: number;
  totalMission: string;
  user_id: string;
  payment?: {
    meta: {
      id?: string;
    };
  };
};

export type ApplicantListPayProps = {
  list: Applicant[];
  onConfirm?: (id: string, escorwId?: string) => void;
  confirmable?: boolean;
  //   onOfferClick?: (id: string) => void;
  //   onRejectClick?: (id: string) => void;
  onMessageClick?: (id: string) => void;
  onApplicantClick?: (applicantId: string) => void;
  isPaidCrypto?: boolean;
};
