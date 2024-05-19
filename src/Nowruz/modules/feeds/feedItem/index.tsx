import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { Identity } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { toRelativeTime } from 'src/core/relative-time';
import { getIdentityMeta } from 'src/core/utils';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import AvatarGroup from 'src/Nowruz/modules/general/components/avatarGroup';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';

import css from './index.module.scss';
import { FeedItemProps } from './index.types';
import { useFeedItem } from './useFeedItem';
import Comments from '../comments';
import CreatePostModal from '../createPostModal';
import FeedActions from '../feedActions';
import RemovePost from '../removePost';
import ReportPost from '../reportPost';
import RepostModal from '../repostModal';
import SendBox from '../sendBox';
import ThreeDotsMenu from '../threeDotsMenu';

const FeedItem: React.FC<FeedItemProps> = ({
  postId,
  userIdentity,
  date,
  cause,
  content,
  media,
  likesCount,
  commentsCount,
  liked,
  likedIdentities = [],
  sharedPost = null,
  title = '',
  updateFeedsListLiked,
  updateFeedsListRepost,
  updateFeedsListEdit,
  updateFeedsListRemove,
}) => {
  const navigate = useNavigate();
  const isMobile = isTouchDevice();
  const {
    data: {
      currentIdentity,
      showCommentSection,
      comments,
      comment,
      showReplySection,
      replyInfo,
      reply,
      replies,
      openRepostModal,
      openThreeDotsMenu,
      threeDotsMenuItems,
      actionsMenu,
    },
    operations: {
      onLikeClick,
      onCommentClick,
      onSendComment,
      setComment,
      onReplyClick,
      onReplyComment,
      setReply,
      onShowReplies,
      onSeeMoreCommentsClick,
      onSeeMoreRepliesClick,
      setOpenRepostModal,
      onRepost,
      onOpenThreeDotsMenu,
      setOpenThreeDotsMenu,
      handleCloseActionsMenu,
      onDeletePost,
      onReportPost,
    },
  } = useFeedItem(postId, updateFeedsListLiked, updateFeedsListRepost, updateFeedsListRemove, userIdentity);
  const { profileImage: currentProfileImage } = getIdentityMeta(currentIdentity);
  const { name, username, usernameVal, profileImage } = getIdentityMeta(userIdentity);
  const {
    userIdentity: sharedUserIdentity,
    date: sharedDate,
    cause: sharedCause,
    content: sharedContent,
    media: sharedMedia,
    title: sharedTitle,
  } = sharedPost || {};
  const {
    profileImage: sharedAvatar,
    name: sharedName,
    username: sharedUsername,
  } = getIdentityMeta(sharedUserIdentity as Identity);
  const repostedData = {
    profileImage: (profileImage as string) || '',
    username,
    name,
    date,
    cause: cause || '',
    title,
    content,
    media: media?.url || '',
  };
  const editPostData = {
    postId,
    cause: Object.values(SOCIAL_CAUSES).find(social => social.label === cause) || null,
    title,
    file: media || null,
    content,
  };

  const sharedJSX = (
    <>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="3rem" type="users" img={(sharedAvatar as string) || ''} />
          <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
            {sharedName}
            <span className="font-normal text-Gray-light-mode-500">{sharedUsername}</span>
          </div>
        </div>
        <span className="text-sm text-Gray-light-mode-600">{toRelativeTime(sharedDate || '')}</span>
      </div>
      <div className="w-full flex flex-col items-start gap-6">
        {sharedCause && <Chip theme="primary" size="md" label={sharedCause} />}
        {sharedTitle && <div className="text-xl font-semibold emoji-font break-all">{sharedTitle}</div>}
        <ExpandableText
          text={sharedContent || ''}
          seeMoreText="See more"
          isMarkdown
          seeMoreButton
          expectedLength={isMobile ? 225 : 450}
          customStyle="flex flex-col gap-4 text-sm text-Gray-light-mode-700 leading-5 emoji-font break-all"
        />
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex self-center">
          <img src={sharedMedia?.url || ''} alt="image-post" className="rounded-lg" />
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={css.card}>
        <div className="px-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar
              size="3rem"
              type="users"
              img={(profileImage as string) || ''}
              onClick={() => navigate(`/profile/users/${usernameVal}/view`)}
            />
            <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
              {name}
              <span className="font-normal text-Gray-light-mode-500">{username}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-Gray-light-mode-600">{toRelativeTime(date)}</span>
            <Icon
              name="dots-vertical"
              fontSize={20}
              className="text-Gray-light-mode-700"
              cursor="pointer"
              onClick={onOpenThreeDotsMenu}
            />
          </div>
        </div>
        <div className="px-6 w-full flex flex-col items-start gap-6">
          {cause && <Chip theme="primary" size="md" label={cause} />}
          {title && <div className="text-xl font-semibold emoji-font break-all">{title}</div>}
          <ExpandableText
            text={content}
            seeMoreText="See more"
            isMarkdown
            seeMoreButton
            expectedLength={isMobile ? 225 : 450}
            customStyle="flex flex-col gap-4 text-sm text-Gray-light-mode-700 leading-5 emoji-font break-all"
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          {sharedPost === null && (
            <div className="px-6 flex self-center">
              <img src={media?.url || ''} alt="image-post" className="rounded-lg" />
            </div>
          )}
          {sharedPost !== null && (
            <div className="mx-6 p-6 flex flex-col gap-6 border border-solid border-Gray-light-mode-200 rounded-default">
              {sharedJSX}
            </div>
          )}
          <div className="px-6 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-Gray-light-mode-600">
              {!!likedIdentities?.length && <AvatarGroup identities={likedIdentities} length={3} />}
              {likesCount} likes
            </div>
            <span className="text-sm text-Gray-light-mode-600">{commentsCount} comments</span>
          </div>
          <div className="px-6 pt-4 flex flex-col border-0 border-t border-solid border-Gray-light-mode-200">
            <FeedActions
              liked={liked}
              onLikeClick={onLikeClick}
              onCommentClick={() => onCommentClick(commentsCount)}
              onRepostClick={() => setOpenRepostModal(true)}
              hasRepostAction={sharedUserIdentity === null || (sharedUserIdentity?.id || '') !== currentIdentity?.id}
            />
            <div className="flex flex-col gap-6">
              {showCommentSection && (
                <div className="mt-10 flex flex-col gap-6">
                  {comments?.[postId] && (
                    <Comments
                      postId={postId}
                      list={comments[postId].items}
                      onReply={onReplyClick}
                      replies={replies}
                      onShowReplies={onShowReplies}
                      showSeeMoreComments={comments[postId].items.length < comments[postId].total_count}
                      onSeeMoreCommentsClick={onSeeMoreCommentsClick}
                      onSeeMoreRepliesClick={onSeeMoreRepliesClick}
                    />
                  )}
                  <SendBox
                    name="comment"
                    userImg={(currentProfileImage as string) || ''}
                    placeholder="Comment..."
                    value={comment}
                    onChange={value => setComment(value)}
                    onEmojiSelect={emoji => setComment(prev => prev + emoji)}
                    onSend={onSendComment}
                  />
                </div>
              )}
              {showReplySection && (
                <SendBox
                  name="reply"
                  buttonText="Reply"
                  userImg={(currentProfileImage as string) || ''}
                  placeholder={`Reply to ${replyInfo?.replyTo}...`}
                  value={reply}
                  onChange={value => setReply(value)}
                  onEmojiSelect={emoji => setReply(prev => prev + emoji)}
                  onSend={onReplyComment}
                />
              )}
            </div>
          </div>
        </div>
        <ThreeDotsMenu
          open={openThreeDotsMenu}
          handleClose={() => setOpenThreeDotsMenu(false)}
          menuItems={threeDotsMenuItems}
        />
      </div>
      {repostedData && (
        <RepostModal
          data={repostedData}
          open={openRepostModal}
          handleClose={() => setOpenRepostModal(false)}
          onRepost={onRepost}
        />
      )}
      {editPostData && (
        <CreatePostModal
          open={actionsMenu.name === 'edit' && actionsMenu.open}
          handleClose={handleCloseActionsMenu}
          onCreatePost={editedData => editedData && updateFeedsListEdit(editedData)}
          data={editPostData}
        />
      )}
      <RemovePost
        open={actionsMenu.name === 'remove' && actionsMenu.open}
        handleClose={handleCloseActionsMenu}
        onDeletePost={onDeletePost}
      />
      <ReportPost
        open={actionsMenu.name === 'report' && actionsMenu.open}
        handleClose={handleCloseActionsMenu}
        onReportPost={onReportPost}
      />
    </>
  );
};

export default FeedItem;
