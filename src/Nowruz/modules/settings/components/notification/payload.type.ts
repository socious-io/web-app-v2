import { NotificationType } from 'src/core/api';

export type Payload = {
  [x in NotificationType]: {
    in_app: boolean;
    email: boolean;
    push: boolean;
  };
};