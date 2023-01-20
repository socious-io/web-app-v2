
export interface NotificationListProps {
    list: Notifications[];
    onMorePageClick: () => void;
}

export type Notifications = {
    items: ItemsArr[];
    limit: number;
    page: number;
    total_count: number;
}

export type ItemsArr = {
    created_at: string;
    data: DataObj;
    id: string;
    ref_id: string;
    type: string;
    updated_at: string;
    user_id: string;
    view_at: string;
}

export type DataObj = {
    body: BodyObj;
    consolidate_number: number;
    identity: IdentityObj;
    parentId: string;
    refId: string;
    type: string;
}

export type BodyObj = {
    body: string;
    title: string;
}

export type IdentityObj ={
    created_at: string; 
    follower: boolean;
    following: boolean;
    id: string;
    meta: MetaObj;
    type: string;
}

export type MetaObj = {
    address: string;
    avatar: string;
    city: string;
    country: string;
    email: string;
    id: string;
    name: string;
    status: string;
    username: string;
}