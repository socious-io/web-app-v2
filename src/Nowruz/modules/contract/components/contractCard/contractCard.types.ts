import { Contract } from 'src/core/api';

export interface ContractCardProps {
  contract: Contract;
  setOpenOverlay: (val: boolean) => void;
}
