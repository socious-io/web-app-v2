import { useState } from 'react';
import { toRelativeTime } from '../../../../core/relative-time';
import { Dialog } from '@mui/material';
import { Avatar } from '../../../atoms/avatar/avatar';
import { Card } from '../../../atoms/card/card';
import { FeedItemProps } from '../../../molecules/feed-item/feed-item.types';
import { FeedList } from '../../../organisms/feed-list/feed-list';
import { DialogCreate } from '../dialog-create/dialog-create';
import css from './mobile.module.scss';

const feedList: FeedItemProps[] = [
  {
    id: '1',
    imgAvatar: '',
    img: '',
    date: '8 min',
    categories: [
      { label: 'environment', value: '1' },
      { label: 'charity', value: '2' },
    ],
    text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae. ',
    name: 'sara kave',
    actionList: [
      { label: 'Like', iconName: 'heart-blue' },
      { label: 'Comment', iconName: 'comment-blue' },
      { label: 'Share', iconName: 'share-blue' },
    ],
  },
  {
    id: '2',
    imgAvatar: '',
    img: '',
    date: '8 min',
    categories: [
      { label: 'environment', value: '1' },
      { label: 'charity', value: '2' },
    ],
    text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae. ',
    name: 'sajad abbasi',
    actionList: [
      { label: 'Like', iconName: 'heart-blue' },
      { label: 'Comment', iconName: 'comment-blue' },
      { label: 'Share', iconName: 'share-blue' },
    ],
  },
  {
    id: '3',
    imgAvatar: '',
    img: '',
    date: '8 min',
    categories: [
      { label: 'environment', value: '1' },
      { label: 'charity', value: '2' },
    ],
    text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique et earum, nisi nesciunt fuga velit vero nobis harum illum iste dignissimos distinctio culpa dicta esse placeat debitis laboriosam recusandae. ',
    name: 'siera yun',
    actionList: [
      { label: 'Like', iconName: 'heart-blue' },
      { label: 'Comment', iconName: 'comment-blue' },
      { label: 'Share', iconName: 'share-blue' },
    ],
  },
];

export const Mobile = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar size="2.25rem" type="organizations" />
          <div className={css.search}>Search Jobs</div>
          <img className={css.logo} src="icons/logo-white.svg" />
        </div>
        <div>
          <div className={css.title}>Feed</div>
          <div className={css.tagline}>See What is happening in your network</div>
        </div>
      </div>
      <div className={css.create}>
        <Card>
          <div className={css.createWrapper}>
            <Avatar size="3rem" type="users" />
            <div onClick={handleClickOpen} className={css.createButton}>
              Create a post
            </div>
          </div>
        </Card>
      </div>
      <FeedList list={feedList} />
      <Dialog fullScreen open={openDialog}>
        <DialogCreate onClose={handleClose} />
      </Dialog>
    </div>
  );
};
