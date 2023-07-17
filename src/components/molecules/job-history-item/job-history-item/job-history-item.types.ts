export type JobHistoryItemProps = {
  data: {
    jobTitle: string;
    date: string;
    total: string;
    percent: string;
    amount: string;
    organizationName: string;
    dataStart: string;
    dataEnd: string;
    avatarUrl?: string;
  };
};
