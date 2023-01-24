import { Avatar } from '../../../atoms/avatar/avatar';
import { Card } from '../../../atoms/card/card';
import { Dropdown } from '../../../atoms/dropdown/dropdown';
import { CardMenu } from '../../../molecules/card-menu/card-menu';
import { FeedItemProps } from '../../../molecules/feed-item/feed-item.types';
import { FeedList } from '../../../organisms/feed-list/feed-list';
import { TwoColumnCursor } from '../../../templates/two-column-cursor/two-column-cursor';
import { JobsMenuList, NetworkMenuList } from '../../jobs/jobs-cursor/jobs-cursor.services';
import css from './desktop.module.scss';

const feedList: FeedItemProps[] = [
    {
        id: '1',
        imgAvatar: '',
        img: '',
        date: '8 min',
        categories: [{ label: 'environment', value: '1' }, { label: 'charity', value: '2' }],
        text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae. ',
        name: 'sara kave',
        actionList: [{ label: 'Like', iconName: 'heart-blue' }, { label: 'Comment', iconName: 'comment-blue' }, { label: 'Share', iconName: 'share-blue' }],
    },
    {
        id: '2',
        imgAvatar: '',
        img: '',
        date: '8 min',
        categories: [{ label: 'environment', value: '1' }, { label: 'charity', value: '2' }],
        text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae. ',
        name: 'sajad abbasi',
        actionList: [{ label: 'Like', iconName: 'heart-blue' }, { label: 'Comment', iconName: 'comment-blue' }, { label: 'Share', iconName: 'share-blue' }],
    },
    {
        id: '3',
        imgAvatar: '',
        img: '',
        date: '8 min',
        categories: [{ label: 'environment', value: '1' }, { label: 'charity', value: '2' }],
        text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae. ',
        name: 'siera yun',
        actionList: [{ label: 'Like', iconName: 'heart-blue' }, { label: 'Comment', iconName: 'comment-blue' }, { label: 'Share', iconName: 'share-blue' }],
    }
];

export const Desktop = () => {

    return (
        <TwoColumnCursor>
            <div className={css.sidebar}>
                <Card>
                    <div className={css.profileHeader}>
                        <Avatar type="user" />
                        <div>
                            <div className={css.username}>Sara Kave</div>
                            <div className={css.profileLink}>View my profile</div>
                        </div>
                    </div>
                    <div className={css.profileFooter}>
                        <div className={css.connections}>Connections</div>
                        <div className={css.followers}>Followers</div>
                    </div>
                </Card>
                <CardMenu title="Network" list={NetworkMenuList} />
                <CardMenu title="Jobs" list={JobsMenuList} />
            </div>
            <>
                <div className={css.banner}>
                    <div className={css.title}>Your Feed</div>
                    <div className={css.tagline}>See what is happening in your network</div>
                </div>
                <div className={css.list}>
                    <FeedList list={feedList} />
                </div>
            </>
        </TwoColumnCursor>
    )
}