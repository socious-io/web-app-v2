import { useState } from 'react';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Modal } from 'src/components/templates/modal/modal';
import { ModalCreate } from '../modal-create';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { JobsMenuList, NetworkMenuList } from '../feed.service';
import { useFeedShared } from '../feed.shared';
import css from './desktop.module.scss';

export const Desktop = () => {
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
  const [openMoreBox, setOpenMoreBox] = useState(false);
  const [moreOptions, setMoreOptions] = useState<{ title: string }[]>([]);
  const [feed, setFeed] = useState<Feed>();

  const showActions = async (feed: Feed) => {
    const name = feed.identity_meta.name;
    const options = [{ title: `Block ${name}` }, { title: `Report ${name}` }, { title: 'Cancel' }];
    setMoreOptions(options);
    setFeed(feed);
    setOpenMoreBox(true);
  };

  const onClickMoreOption = (index: number) => {
    onMoreClick(index, feed as Feed);
    setOpenMoreBox(false);
  };

  return (
    <TwoColumnCursor>
      <div className={css.sidebar}>
        <ProfileCard />
        <CardMenu title="Network" list={NetworkMenuList} />
        <CardMenu title="Jobs" list={JobsMenuList} />
      </div>
      <>
        <div className={css.banner}>
          <div className={css.title}>Your Feed</div>
          <div className={css.tagline}>See what is happening in your network</div>
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
        <div className={css.list}>
          <FeedList
            data={feedList}
            onMoreClick={(feed) => showActions(feed)}
            onLike={onLike}
            onRemoveLike={onRemoveLike}
            onMorePageClick={onMorePage}
            showSeeMore={onShowSeeMore(feedList.length)}
          />
          <Modal open={openMoreBox} onClose={() => setOpenMoreBox(false)}>
            <div className={css.moreBox}>
              <div className={css.moreHeader}>What do you want to do?</div>
              {moreOptions?.map((option, index) => (
                <div key={option.title} className={css.moreOption} onClick={() => onClickMoreOption(index)}>
                  {option.title}
                </div>
              ))}
            </div>
          </Modal>
        </div>
        <ModalCreate open={openDialog} onClose={handleClose} setFeedList={setFeedList} />
      </>
    </TwoColumnCursor>
  );
};
