import { ActionList } from '../../atoms/action-list/action-list';
import { Card } from '../../atoms/card/card';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { Typography } from '../../atoms/typography/typography';
import { ProfileView } from '../profile-view/profile-view';
import css from './feed-item.module.scss';

const catList = [{ label: 'environment', value: '1' }, { label: 'charity', value: '2' }];
const actionList = [{ label: 'Like', iconName: 'heart-blue' }, { label: 'Comment', iconName: 'comment-blue' }, { label: 'Share', iconName: 'share-blue' }];

export const FeedItem = (): JSX.Element => {
    return (
        <>
            <Card>
                <ProfileView type='user' name='Name liked' />
                <div className={css.img}>
                    <img src='' />
                </div>
                <CategoriesClickable list={catList} />
                <div className={css.text}>
                    <Typography type='body' lineLimit={3} size='s2'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae.
                    </Typography>
                </div>
                <div>
                    <ActionList list={actionList} />
                </div>
            </Card>
        </>
    );
};