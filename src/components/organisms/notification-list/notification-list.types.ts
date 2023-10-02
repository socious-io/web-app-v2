import { Notification } from 'src/core/api';

export interface NotificationListProps {
  list: Notification[];
  onMorePageClick: () => void;
  showSeeMore: boolean;
  route: 'd' | 'm';
}
