
export interface NotificationListProps {
    list: Notifications[];
    onMorePageClick: () => void;
}

export type Notifications = {
    created_at: string;
    data: DataObj;
    id: string;
    type: string;
}

export type DataObj = {
    body: BodyObj;
    identity: IdentityObj;
    type: string;
    parentId: string;
}

export type BodyObj = {
    body: string;
    title: string;
}

export type IdentityObj ={
    meta: MetaObj;
}

export type MetaObj = {
    avatar?: string;
    image?: string;
    name: string;
}