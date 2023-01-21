
import { FeedItem } from '../../../molecules/feed-item/feed-item';
import css from './mobile.module.scss';

export const Mobile = () => {
    return (
        <div className={css.container}>
            <FeedItem />
        </div>
    )
}