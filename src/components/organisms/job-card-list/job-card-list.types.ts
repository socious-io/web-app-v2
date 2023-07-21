import { JobCardProps } from '../../molecules/job-card/job-card.types';

export type JobCardListProps = {
  list: JobCardProps[];
  /** @deprecated  use onClick instead */
  onItemClick?: (id?: string) => void;
  onSeeMoreClick: (page: number) => void;
  onClick?: (job: JobCardProps) => void;
  totalCount?: number;
  /** @deprecated  showMore prop should no longer be used */
  showMore?: boolean;
};
