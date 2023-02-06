import { CommentModel } from "../../pages/feed/post-detail/mobile/mobile.types";

export type CommentProps = {
    list: CommentModel[];
    onMorePageClick: () => void;
    showSeeMore: boolean;
}