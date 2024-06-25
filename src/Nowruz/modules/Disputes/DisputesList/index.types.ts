import { DisputeDirection, DisputesRes } from 'src/core/api';

export interface DisputesListProps {
  list: DisputesRes;
  mode: DisputeDirection;
}
