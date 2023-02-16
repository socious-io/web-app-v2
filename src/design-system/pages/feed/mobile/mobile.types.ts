import { Pagination } from "../../../../core/types";
import { Feed } from "../../../organisms/feed-list/feed-list.types";

export type FeedsMobileProps = {
    list: Pagination<Feed[]>;
};