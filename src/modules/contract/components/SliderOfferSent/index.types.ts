import { Contract } from 'src/core/adaptors';

export interface SliderOfferSentProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
