import { Notification } from 'src/core/api';

export interface NotificationProps {
  list?: Notification[];
  handleClose: () => void;
}
