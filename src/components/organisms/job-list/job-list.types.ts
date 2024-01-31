import { CSSProperties } from 'react';
import { Job } from 'src/core/api';
export interface JobListProps extends CSSProperties {
  data: Job[];
  onMorePageClick: () => void;
  onClick: (id: string) => void;
  showMorePage: boolean;
}
