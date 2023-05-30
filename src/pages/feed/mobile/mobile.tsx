import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import { Avatar } from '../../../components/atoms/avatar/avatar';
import { Card } from '../../../components/atoms/card/card';
import { FeedList } from '../../../components/organisms/feed-list/feed-list';
import { DialogCreate } from '../dialog-create/dialog-create';
import { Search } from 'src/components/atoms/search/search';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { visibility } from 'src/store/reducers/menu.reducer';
import { useNavigate } from '@tanstack/react-location';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { useFeedShared } from '../feed.shared';
import css from './mobile.module.scss';

export const Mobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    feedList,
    setFeedList,
    handleClickOpen,
    openDialog,
    handleClose,
    onLike,
    onRemoveLike,
    onMorePage,
    onShowSeeMore,
    onMoreClick,
  } = useFeedShared();

  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const onSearchEnter = (value: string) => {
    navigate({ to: `/search?q=${value}` });
  };

  function openSidebar() {
    dispatch(visibility(true));
  }

  const navigateToChat = () => {
    // navigate({ to: './chats' });
  };

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
    onMoreClick(result.index, feed);
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.menu}>
          <Avatar onClick={openSidebar} size="2.25rem" type={identity?.type} img={avatarImg} />
          <Search placeholder="Search" onEnter={onSearchEnter} />
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
            <Avatar size="3rem" type="users" img={avatarImg} />
            <div onClick={handleClickOpen} className={css.createButton}>
              Create a post
            </div>
          </div>
        </Card>
      </div>
      <FeedList
        data={feedList}
        onMoreClick={(feed) => showActions(feed)}
        onLike={onLike}
        onRemoveLike={onRemoveLike}
        onMorePageClick={onMorePage}
        showSeeMore={onShowSeeMore(feedList.length)}
      />
      <Dialog fullScreen open={openDialog}>
        <DialogCreate onClose={handleClose} setFeedList={setFeedList} />
      </Dialog>
    </div>
  );
};
