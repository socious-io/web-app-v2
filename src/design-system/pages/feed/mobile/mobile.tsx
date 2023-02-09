import { useState } from 'react';
import { Dialog } from '@mui/material';
import { Avatar } from '../../../atoms/avatar/avatar';
import { Card } from '../../../atoms/card/card';
import { FeedList } from '../../../organisms/feed-list/feed-list';
import { DialogCreate } from '../dialog-create/dialog-create';
import css from './mobile.module.scss';
import { FeedsMobileProps } from './mobile.types';
import { getFeedList, like, unlike } from './mobile.service';
import { Search } from '../../../atoms/search/search';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../../core/types';
import { RootState } from '../../../../store/store';

export const Mobile = ({ list }: FeedsMobileProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [feedList, setFeedList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalCount = list.total_count;


  function onMorePage() {
    getFeedList({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setFeedList((list) => [...list, ...resp.items]);
    });
  };

  const onShowSeeMore = (length: number): boolean => {
    if (length < totalCount) {
      return true
    }
    return false
  }

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const avatarImg = identity.meta.avatar || identity.meta.image;

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onLike = (id: string) => {
    like(id).then(() => {
      const clone = [...feedList];
      const ref = clone.find(item => item.id === id);
      ref.liked = true;
      ref.likes = ref.likes + 1;
      setFeedList(clone);
    })
  }

  const onRemoveLike = (id: string) => {
    unlike(id).then(() => {
      const clone = [...feedList];
      const ref = clone.find(item => item.id === id);
      ref.liked = false;
      ref.likes = ref.likes - 1;
      setFeedList(clone);
    })
  }

  const onChangeSearch = () => {

  }

  const navigateToChat = () => {
    // navigate({ to: './chats' });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar size="2.25rem" type={identity.type} img={avatarImg} />
          <Search placeholder='Search' onValueChange={onChangeSearch} />
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
      <FeedList data={feedList} onLike={onLike}
        onRemoveLike={onRemoveLike}
        onMorePageClick={onMorePage}
        showSeeMore={onShowSeeMore(feedList.length)} />
      <Dialog fullScreen open={openDialog}>
        <DialogCreate onClose={handleClose} />
      </Dialog>
    </div>
  );
};
