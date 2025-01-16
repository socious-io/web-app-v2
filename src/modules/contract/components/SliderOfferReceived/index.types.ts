import { Contract } from 'src/core/adaptors';

export interface SliderOfferReceivedProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
}
