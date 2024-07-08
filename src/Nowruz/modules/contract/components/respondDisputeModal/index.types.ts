import { Dispute } from 'src/core/api';

export type Form = {
  message: string;
  evidences: string[];
  confirmInfo: boolean;
  sharedInfo: boolean;
};

export interface RespondDisputeModalProps {
  open: boolean;
  handleClose: () => void;
  disputeId: string;
  onSubmitRespond: (newDispute: Dispute) => void;
}
