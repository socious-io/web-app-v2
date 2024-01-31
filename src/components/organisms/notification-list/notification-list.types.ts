import { Notification } from 'src/core/api';

export interface NotificationListProps {
  list: Notification[];
  onMorePageClick: () => void;
  showSeeMore: boolean;
  switchAccount: (id: string) => void;
}
