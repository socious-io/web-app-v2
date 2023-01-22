import { ActionList } from '../../atoms/action-list/action-list';
import { Card } from '../../atoms/card/card';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { Typography } from '../../atoms/typography/typography';
import { ProfileView } from '../profile-view/profile-view';
import css from './feed-item.module.scss';
import { FeedItemProps } from './feed-item.types';


export const FeedItem = (props: FeedItemProps): JSX.Element => {
    return (
        <Card>
            <ProfileView type='user' name={props.name} img={props.imgAvatar} />
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