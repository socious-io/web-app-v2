interface OptionType {
  value: string;
  label: string;
}

export type Form = {
  category: OptionType;
  title: string;
  description: string;
  evidences: string[];
  confirmInfo: boolean;
  sharedInfo: boolean;
};

export interface InitiateDisputeModalProps {
  open: boolean;
  handleClose: () => void;
  respondentId: string;
  missionId: string;
}
