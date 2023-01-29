import { Feed } from "../../../../organisms/feed-list/feed-list.types";

export type MobileProps = {
    data: Feed;
}

export type CommentModel = {
    content: string;
    created_at: string;
    id: string;
    likes: number;
    liked: boolean;
    identity_meta: IdentityMeta;
}

type IdentityMeta = {
    name: string;
    avatar: string
}