export interface NotificationListProps {
  list: Notifications[];
  onMorePageClick: () => void;
  showSeeMore: boolean;
  route: 'd' | 'm';
}

export type Notifications = {
  created_at: string;
  data: DataObj;
  id: string;
};

export type DataObj = {
  body: BodyObj;
  identity: IdentityObj;
  type: string;
  parentId: string;
  refId: string;
};

export type BodyObj = {
  body: string;
  title: string;
};

export type IdentityObj = {
  meta: MetaObj;
  type: string;
};

export type MetaObj = {
  avatar?: string;
  image?: string;
  name: string;
  shortname: string;
  username: string;
};
