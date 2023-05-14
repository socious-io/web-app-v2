import { useNavigate } from '@tanstack/react-location';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Comment } from 'src/components/molecules/comment/comment';
import { FeedItem } from 'src/components/molecules/feed-item/feed-item';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { Header } from 'src/components/atoms/header/header';
import { usePostDetailShared } from '../post-detail.shared';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import css from './mobile.module.scss';

export const Mobile = () => {
  const navigate = useNavigate();
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
  } = usePostDetailShared();

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
        <Header onBack={() => navigate({ to: '/feeds' })} title="Post" />
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
        <div className={css.sendBox}>
          <SendBox onValueChange={changeMessageHandler} onSend={sendMessage} value={message} />
        </div>
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
    </div>
  );
};
