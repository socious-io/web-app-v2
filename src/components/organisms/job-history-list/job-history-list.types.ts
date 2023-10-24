import { CSSProperties } from 'react';

import { JobHistoryItemProps } from '../../molecules/job-history-item/job-history-item.types';

export interface JobHistoryListProps extends CSSProperties {
  data: JobHistoryItemProps[];
}
