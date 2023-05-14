import { useState } from 'react';
import { ProfileCard } from 'src/components/templates/profile-card';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Modal } from 'src/components/templates/modal/modal';
import { FeedItem } from 'src/components/molecules/feed-item/feed-item';
import { Card } from 'src/components/atoms/card/card';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Comment } from 'src/components/molecules/comment/comment';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { usePostDetailShared } from '../post-detail.shared';
import css from './desktop.module.scss';

export const Desktop = () => {
  const {
    postObj,
    actionList,
    changeMessageHandler,
    sendMessage,
    message,
    commentList,
    onCommentLike,
    onCommentLikeRemove,
    onMorePage,
    onShowSeeMore,
    onMoreClick,
    identity,
  } = usePostDetailShared();

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
    <>
      <TwoColumnCursor>
        <div>
          <ProfileCard />
        </div>
        <div className={css.main}>
          <FeedItem
            key={postObj.id}
            type={postObj.identity_type}
            img={postObj.media != null && postObj.media.length > 0 ? postObj.media[0]?.url : ''}
            imgAvatar={postObj.identity_meta.avatar}
            text={postObj.content}
            name={postObj.identity_meta.name}
            actionList={actionList(postObj.likes, postObj.liked)}
            lineLimit="none"
            date={postObj.created_at}
            categories={socialCausesToCategory(postObj.causes_tags)}
            onMoreClick={() => showActions(postObj)}
          />
          <Card className={css.sendBox}>
            <Avatar size="2rem" img={identity.meta.image} type={identity.type} />
            <SendBox className={css.input} onValueChange={changeMessageHandler} onSend={sendMessage} value={message} />
          </Card>
          <div className={css.messages}>
          <Comment
            list={commentList}
            onLike={onCommentLike}
            onLikeRemove={onCommentLikeRemove}
            onMorePageClick={onMorePage}
            showSeeMore={onShowSeeMore(commentList.length)}
          />
        </div> 
        </div>
      </TwoColumnCursor>
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
    </>
  );
};
