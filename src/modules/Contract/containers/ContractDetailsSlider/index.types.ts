import { Contract } from 'src/core/adaptors';

export interface ContractSliderProps {
  contract: Contract;
  disableMessage: boolean;
  redirectToChat: () => void;
  alertMessage?: string;
}
