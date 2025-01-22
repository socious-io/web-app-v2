import { Contract } from 'src/core/adaptors';

export type Form = {
  content: string;
};

export interface ReviewModalProps {
  open: boolean;
  closeReviewModal: () => void;
  contract: Contract;
}
