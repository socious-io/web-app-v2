import { Contract } from 'src/core/api';

export interface SliderSentOfferProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
