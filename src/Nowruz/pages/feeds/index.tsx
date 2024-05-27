import { Icon } from 'src/Nowruz/general/Icon';
import { FeedsProvider } from 'src/Nowruz/modules/feeds/contexts/feeds.context';
import CreatePostModal from 'src/Nowruz/modules/feeds/createPostModal';
import FeedsList from 'src/Nowruz/modules/feeds/feedsList';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

import css from './index.module.scss';
import { UseFeeds } from './useFeeds';

export const Feeds = () => {
  const {
    data: { profileImage, openCreateModal, posts, showSeeMore },
    operations: {
      handleOpenCreateModal,
      handleCloseCreateModal,
      onCreatePost,
      onShowMoreFeeds,
      updateFeedsListLiked,
      updateFeedsListRepost,
    },
  } = UseFeeds();

  return (
    <FeedsProvider>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>Feeds</h1>
          <h2 className={css.subtitle}>See what is happening in your network</h2>
        </div>
        <div className="md:max-w-[720px] flex flex-col gap-6 pt-6 pb-8 px-4 md:p-8 md:pb-12">
          <div className={css.create}>
            <div className="w-full p-4 md:px-6 text-lg font-semibold text-Gray-light-mode-900">Post something</div>
            <div
              className="w-full border border-t border-0 border-solid border-Gray-light-mode-200 flex justify-between p-4 md:px-6 cursor-pointer"
              onClick={handleOpenCreateModal}
            >
              <div className="flex items-center gap-4">
                <Avatar size="3rem" type="users" img={(profileImage as string) || ''} />
                <div className="text-md text-Gray-light-mode-500">What’s on your mind?</div>
              </div>
              <Icon name="image-03" fontSize={20} className="text-Gray-light-mode-500" />
            </div>
          </div>
          <FeedsList
            list={posts}
            showSeeMore={showSeeMore}
            onShowMoreFeeds={onShowMoreFeeds}
            updateFeedsListLiked={updateFeedsListLiked}
            updateFeedsListRepost={updateFeedsListRepost}
          />
        </div>
      </div>
      <CreatePostModal open={openCreateModal} handleClose={handleCloseCreateModal} onCreatePost={onCreatePost} />
    </FeedsProvider>
  );
};
