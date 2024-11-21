import { translate } from 'src/core/utils';
import { FeedsProvider } from 'src/modules/feeds/contexts/feeds.context';
import CreatePostModal from 'src/modules/feeds/createPostModal';
import FeedsList from 'src/modules/feeds/feedsList';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { FeaturedIconOutlined } from 'src/modules/general/components/featuredIconOutlined';
import { Icon } from 'src/modules/general/components/Icon';
import CustomSnackbar from 'src/modules/general/components/Snackbar';

import css from './index.module.scss';
import { UseFeeds } from './useFeeds';

export const Feeds = () => {
  const {
    data: { profileImage, openCreateModal, posts, showSeeMore, showSnackbar },
    operations: {
      handleOpenCreateModal,
      handleCloseCreateModal,
      onCreatePost,
      onShowMoreFeeds,
      updateFeedsListLiked,
      updateFeedsListRepost,
      updateFeedsListEdit,
      updateFeedsListRemove,
      setShowSnackbar,
    },
  } = UseFeeds();

  return (
    <FeedsProvider>
      <div className={css.container}>
        <div className={css.header}>
          <h1 className={css.title}>{translate('feeds')}</h1>
          <h2 className={css.subtitle}>{translate('feeds-subtitle')}</h2>
        </div>
        <div className="md:max-w-[720px] flex flex-col gap-6 pt-6 pb-8 px-4 md:p-8 md:pb-12">
          <div className={css.create}>
            <div className="w-full p-4 md:px-6 text-lg font-semibold text-Gray-light-mode-900">
              {translate('feeds-post-sth')}
            </div>
            <div
              className="w-full border border-t border-0 border-solid border-Gray-light-mode-200 flex justify-between p-4 md:px-6 cursor-pointer"
              onClick={handleOpenCreateModal}
            >
              <div className="flex items-center gap-4">
                <Avatar size="3rem" type="users" img={(profileImage as string) || ''} />
                <div className="text-md text-Gray-light-mode-500"> {translate('feeds-post-desc')}</div>
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
            updateFeedsListEdit={updateFeedsListEdit}
            updateFeedsListRemove={updateFeedsListRemove}
          />
        </div>
      </div>
      <CreatePostModal open={openCreateModal} handleClose={handleCloseCreateModal} onCreatePost={onCreatePost} />
      <CustomSnackbar
        open={showSnackbar.create || showSnackbar.edit}
        onClose={() => setShowSnackbar({ create: false, edit: false })}
        autoHideDuration={6000}
        icon={<FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />}
      >
        <span className="text-sm font-semibold text-Gray-light-mode-900">
          {translate('feeds-post-snackbar', {
            verb: showSnackbar.create
              ? translate('feeds-post-snackbar-created')
              : translate('feeds-post-snackbar-updated'),
          })}
        </span>
      </CustomSnackbar>
    </FeedsProvider>
  );
};
