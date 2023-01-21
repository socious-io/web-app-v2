import { FeedCard } from '../../../molecules/feed-card/feed-card';
import css from './mobile.module.scss';

export const Mobile = () => {
    return (
        <div className={css.container}>
            <FeedCard />
        </div>
    )
}