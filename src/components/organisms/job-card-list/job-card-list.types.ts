import { JobCardProps } from '../../molecules/job-card/job-card.types';

export type JobCardListProps = {
  list: JobCardProps[];
  onItemClick: (id?: string) => void;
  onSeeMoreClick: (page: number) => void;
  totalCount?: number;
  /** @deprecated  showMore prop should no longer be used */
  showMore?: boolean;
};
