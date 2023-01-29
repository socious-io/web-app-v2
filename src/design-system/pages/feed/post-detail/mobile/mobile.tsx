import { toCategoriesAdaptor } from '../../../../../core/adaptors';
import { FeedItem } from '../../../../molecules/feed-item/feed-item';
import css from './mobile.module.scss';
import { MobileProps } from './mobile.types';

export const Mobile = ({ data }: MobileProps) => {

    const actionList = (likes: number, liked: boolean) => [
        { label: 'Like', iconName: 'heart-blue', like: likes, isLiked: liked },
        { label: 'Comment', iconName: 'comment-blue' },
    ];

    return (

        <div className={css.container} >
            <div className={css.header}>
                <div>
                    <img src='/icons/chevron-left.svg' />
                </div>
                <span className={css.title}>Post</span>
                <span></span>
            </div>
            <FeedItem
                key={data.id}
                type={data.identity_type}
                img={data.media != null && data.media.length > 0 ? data.media[0]?.url : ''}
                imgAvatar={data.identity_meta.avatar}
                text={data.content}
                name={data.identity_meta.name}
                actionList={actionList(data.likes, data.liked)}
                date={data.created_at}
                categories={toCategoriesAdaptor(data.causes_tags)}
            />
        </div>
    )
}