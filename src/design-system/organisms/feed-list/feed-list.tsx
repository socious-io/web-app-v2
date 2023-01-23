import { FeedItem } from "../../molecules/feed-item/feed-item";
import { FeedListProps } from "./feed-list.types";
import css from './feed-list.module.scss';



export const FeedList = ({ list }: FeedListProps) => {

    return (
        <div className={css.container}>
            {
                list.map((item) => <FeedItem
                    key={item.id}
                    img={item.img}
                    imgAvatar={item.imgAvatar}
                    text={item.text}
                    name={item.name}
                    actionList={item.actionList}
                    date={item.date}
                    categories={item.categories}
                />)
            }
        </div>
    );
};