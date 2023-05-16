import { Feed } from "src/components/organisms/feed-list/feed-list.types";

export type DialogReviewProps = {
    onClose: () => void;
    soucialValue: string,
    imgFile: string;
    text: string,
    imgUrl: string,
    setFeedList: (feed: Feed[]) => void;
}