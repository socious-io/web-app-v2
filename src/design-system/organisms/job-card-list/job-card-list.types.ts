import { JobCardProps } from './../../molecules/job-card/job-card.types';

export type JobCardListProps = {
  list: JobCardProps[];
  onClick: (id?: string) => void;
  showMore: boolean;
};
