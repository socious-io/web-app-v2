import { Pagination } from "../../../core/types";
import { Feed } from "../../../components/organisms/feed-list/feed-list.types";

export type FeedsMobileProps = {
    list: Pagination<Feed[]>;
};