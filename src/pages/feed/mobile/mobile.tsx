import { useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Card } from '../../../components/atoms/card/card';
import { FeedList } from '../../../components/organisms/feed-list/feed-list';
import { DialogCreate } from '../dialog-create/dialog-create';
import css from './mobile.module.scss';
import { FeedsMobileProps } from './mobile.types';
import { getFeedList, like, unlike } from './mobile.service';
import { Search } from '../../../components/atoms/search/search';
import { useDispatch, useSelector } from 'react-redux';
import { IdentityReq } from '../../../core/types';
import { RootState } from '../../../store/store';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { endpoint } from '../../../core/endpoints';
import { dialog } from '../../../core/dialog/dialog';
import { visibility } from '../../../store/reducers/menu.reducer';
import { Feed } from '../../../components/organisms/feed-list/feed-list.types';

const showActions = async (feed: Feed) => {
  const name = feed.identity_meta.name;
  const result = await ActionSheet.showActions({
    title: 'What do you want to do?',
    options: [
      { title: `Block ${name}` },
      { title: `Report ${name}` },
      { title: 'Cancel', style: ActionSheetButtonStyle.Cancel },
    ],
  });

  switch (result.index) {
    case 0:
      endpoint.post.posts['{post_id}/report'](feed.id, { blocked: true, comment: 'comment' }).then(() => {
        dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
      });
      break;
    case 1:
      endpoint.post.posts['{post_id}/report'](feed.id, { blocked: false, comment: 'comment' }).then(() => {
        dialog.alert({ title: 'Report', message: 'You successfully Reported the feed' });
      });
      break;
  }
};

export const Mobile = ({ list }: FeedsMobileProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [feedList, setFeedList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalCount = list.total_count;
  const dispatch = useDispatch();

  function onMorePage() {
    getFeedList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setFeedList((list) => [...list, ...resp.items]);
    });
  }

  function openSidebar() {
    dispatch(visibility(true));
  }

  const onShowSeeMore = (length: number): boolean => {
    return length < totalCount;
  };

  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onLike = (id: string) => {
    const clone = [...feedList];
    const ref = clone.find((item) => item.id === id);
    ref.liked = true;
    ref.likes = ref.likes + 1;
    setFeedList(clone);
    like(id).then(() => {});
  };

  const onRemoveLike = (id: string) => {
    const clone = [...feedList];
    const ref = clone.find((item) => item.id === id);
    ref.liked = false;
    ref.likes = ref.likes - 1;
    setFeedList(clone);

    unlike(id).then(() => {});
  };

  const onChangeSearch = () => {};

  const navigateToChat = () => {
    // navigate({ to: './chats' });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar onClick={openSidebar} size="2.25rem" type={identity?.type} img={avatarImg} />
          <Search placeholder="Search" onValueChange={onChangeSearch} />
          <div onClick={navigateToChat}>
            <img className={css.logo} src="icons/chat-white.svg" />
          </div>
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
      <FeedList
        onMoreClick={(feed) => {
          showActions(feed);
        }}
        data={feedList}
        onLike={onLike}
        onRemoveLike={onRemoveLike}
        onMorePageClick={onMorePage}
        showSeeMore={onShowSeeMore(feedList.length)}
      />
      <Dialog fullScreen open={openDialog}>
        <DialogCreate onClose={handleClose} />
      </Dialog>
    </div>
  );
};
