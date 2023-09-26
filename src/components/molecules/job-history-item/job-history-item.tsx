import { JobHistoryItem as JobHistoryItemNormal } from './job-history-item/job-history-item';
import { JobHistoryItemProps } from './job-history-item.types';

export const JobHistoryItem = (props: JobHistoryItemProps): JSX.Element => {
  const data = props as Required<JobHistoryItemProps>;

  const isDonation = !!data.amount;

  if (isDonation) {
    return <JobHistoryItemNormal data={data} />;
    // return <JobHistoryItemDonation data={data} />;
  }
  return <JobHistoryItemNormal data={data} />;

  // return <JobHistoryItemDonation data={data} />;
};
