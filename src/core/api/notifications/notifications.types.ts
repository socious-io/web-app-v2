import { NotificationType, PaginateRes } from '../types';

export interface NotificationsRes extends PaginateRes {
  items: Notification[];
}

export interface Notification {
  id: string;
  type: string;
  ref_id: string;
  user_id: string;
  data: Data;
  view_at?: Date;
  read_at?: Date;
  created_at: Date;
  silent: boolean;
}

export interface Data {
  id: string;
  body: Body & { title: string };
  text: string;
  type: string;
  media?: string;
  muted: boolean;
  orgin: any;
  refId: string;
  chat_id: string;
  replied: boolean;
  identity: any;
  parentId: string;
  reply_id: null;
  created_at: Date;
  deleted_at: null;
  updated_at: Date;
  identity_id: string;
  consolidate_number: number;
}

export interface NotificationSetting {
  type: NotificationType;
  email: boolean;
  in_app: boolean;
  push: boolean;
}

export interface NotificationsSettings {
  settings: NotificationSetting[];
}
