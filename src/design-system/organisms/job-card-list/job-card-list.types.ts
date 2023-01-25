import { JobCardProps } from './../../molecules/job-card/job-card.types';

export type JobCardListProps = {
  list: JobCardProps[];
  onItemClick: (id?: string) => void;
  onSeeMoreClick: () => void;
  showMore: boolean;
};
