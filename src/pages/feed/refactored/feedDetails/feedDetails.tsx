import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { Header } from 'src/components/atoms/header/header';
import { Comment } from 'src/components/molecules/comment/comment';
import { FeedItem } from 'src/components/molecules/feed-item/feed-item';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { Modal } from 'src/components/templates/modal/modal';
import { ProfileCard } from 'src/components/templates/profile-card';
import { socialCausesToCategory } from 'src/core/adaptors';
import { isTouchDevice } from 'src/core/device-type-detector';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { IdentityReq, Pagination } from 'src/core/types';
import { RootState } from 'src/store/store';

import { addComment, getComments, likeComment, removeCommentLike } from './feedDetail.service';
import { CommentModel } from './feedDetail.types';
import { useFeedDetails } from './useFeedDetails';
import feedcss from '../feed.module.scss';
import css from '../feed.module.scss';
import { like, unlike } from '../feed.service';

const FeedDetails = () => {
  const navigate = {};
  const {
    postObj,
    actionList,
    showActions,
    identity,
    changeMessageHandler,
    sendMessage,
    message,
    commentList,
    onCommentLike,
    onCommentLikeRemove,
    onMorePage,
    onShowSeeMore,
    openMoreBox,
    setOpenMoreBox,
    moreOptions,
    onClickMoreOption,
  } = useFeedDetails();

  return (
    <div className="w-full h-full">
      <div className="md:hidden">
        <Header onBack={() => navigate({ to: '/feeds' })} title="Post" />
      </div>
      <div className={`${feedcss.container} p-4 md:p-0`}>
        <div className={`${feedcss.boundaries} md:mt-10 md:mr-10 md:mb-0 md:ml-10`}>
          <div className="w-[20rem] hidden md:block">
            <div className="grid grid-cols-1 gap-4">
              <ProfileCard />
            </div>
          </div>

          <div className="w-full max-w-[38.5rem] flex flex-col">
            <div>
              <FeedItem
                key={postObj.id}
                type={postObj.identity_type}
                img={postObj.media != null && postObj.media.length > 0 ? postObj.media[0]?.url : ''}
                imgAvatar={postObj.identity_meta.avatar || postObj.identity_meta?.image}
                text={postObj.content}
                name={postObj.identity_meta.name}
                actionList={actionList(postObj.likes, postObj.liked)}
                lineLimit="none"
                date={postObj.created_at}
                categories={socialCausesToCategory(postObj.causes_tags)}
                onMoreClick={() => showActions(postObj)}
              />

              <Card className="flex items-center gap-3 my-4 mx-0">
                <div className="hidden md:block">
                  <Avatar size="2rem" img={identity.meta.image} type={identity.type} />
                </div>
                <SendBox className="flex-1" onValueChange={changeMessageHandler} onSend={sendMessage} value={message} />
              </Card>

              <div className="w-full">
                <Comment
                  list={commentList}
                  onLike={onCommentLike}
                  onLikeRemove={onCommentLikeRemove}
                  onMorePageClick={onMorePage}
                  showSeeMore={onShowSeeMore(commentList.length)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default FeedDetails;
