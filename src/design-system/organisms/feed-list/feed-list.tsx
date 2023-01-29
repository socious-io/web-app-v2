import { FeedItem } from "../../molecules/feed-item/feed-item";
import { FeedListProps } from "./feed-list.types";
import css from './feed-list.module.scss';
import { toCategoriesAdaptor } from "../../../core/adaptors";
import { useNavigate } from "@tanstack/react-location";





export const FeedList = ({ data, onMorePageClick }: FeedListProps) => {

    const navigate = useNavigate();

    const actionList = (id: string, likes: number, liked: boolean) => [
        { label: 'Like', iconName: 'heart-blue', like: likes, isLiked: liked },
        { label: 'Comment', iconName: 'comment-blue', onClick: () => navigateTOPostDetail(id) },
    ];

    const navigateTOPostDetail = (id: string) => {
        navigate({ to: `./${id}` });
    }

    return (
        <div className={css.container}>
            {
                data.map((item) => <FeedItem
                    key={item.id}
                    type={item.identity_type}
                    img={item.media != null && item.media.length > 0 ? item.media[0]?.url : ''}
                    imgAvatar={item.identity_meta.avatar}
                    text={item.content}
                    name={item.identity_meta.name}
                    actionList={actionList(item.id, item.likes, item.liked)}
                    date={item.created_at}
                    categories={toCategoriesAdaptor(item.causes_tags)}
                />)
            }
            <div className={css.seeMore} onClick={() => onMorePageClick()}>
                See more
            </div>
        </div>
    );
};