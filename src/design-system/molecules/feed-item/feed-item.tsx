import { toRelativeTime } from '../../../core/relative-time';
import { ActionList } from '../../atoms/action-list/action-list';
import { Avatar } from '../../atoms/avatar/avatar';
import { Card } from '../../atoms/card/card';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { Typography } from '../../atoms/typography/typography';
import css from './feed-item.module.scss';
import { FeedItemProps } from './feed-item.types';


export const FeedItem = (props: FeedItemProps): JSX.Element => {
    return (
        <Card>
            <div className={css.header}>
                <div className={css.info}>
                    <Avatar type={props.type} size="2rem" img={props.imgAvatar} />
                    <span>{props.name}</span>
                    <span className={css.date}>{toRelativeTime(props.date)}</span>
                </div>

                <div className={css.icon}>
                    <img src="/icons/three-dots-blue.svg" />
                </div>
            </div>
            <div className={css.img}>
                <img src={props.img} />
            </div>
            <CategoriesClickable list={props.categories} />
            <div className={css.text}>
                <Typography type='body' lineLimit={3} size='s2'>{props.text}</Typography>
            </div>
            <div>
                <ActionList list={props.actionList} />
            </div>
        </Card>
    );
};