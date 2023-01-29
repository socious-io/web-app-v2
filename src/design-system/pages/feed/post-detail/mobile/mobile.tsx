import { socialCausesToCategory } from '../../../../../core/adaptors';
import { useEffect, useState } from 'react';
import { Comment } from '../../../../molecules/comment/comment';
import { FeedItem } from '../../../../molecules/feed-item/feed-item';
import { SendBox } from '../../../../molecules/send-box/send-box';
import css from './mobile.module.scss';
import { addComment } from './mobile.service';
import { CommentModel } from './mobile.types';
import { useMatch } from '@tanstack/react-location';
import { Feed } from '../../../../organisms/feed-list/feed-list.types';
import { Pagination } from '../../../../../core/types';

export const Mobile = () => {
  const resolver = useMatch();
  const { post, comments } = resolver.ownData as {
    post: Feed;
    comments: Pagination<CommentModel[]>;
  };
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState<CommentModel[]>(comments.items);

  const actionList = (likes: number, liked: boolean) => [
    { label: 'Like', iconName: 'heart-blue', like: likes, isLiked: liked },
    { label: 'Comment', iconName: 'comment-blue' },
  ];

  const changeMessageHandler = (value: string) => {
    console.log('value ==> ', value);
    setMessage(value);
  };

  const sendMessage = () => {
    addComment(message, post.id).then();
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div>
          <img src="/icons/chevron-left.svg" />
        </div>
        <span className={css.title}>Post</span>
        <span></span>
      </div>
      <FeedItem
        key={post.id}
        type={post.identity_type}
        img={post.media != null && post.media.length > 0 ? post.media[0]?.url : ''}
        imgAvatar={post.identity_meta.avatar}
        text={post.content}
        name={post.identity_meta.name}
        actionList={actionList(post.likes, post.liked)}
        date={post.created_at}
        categories={socialCausesToCategory(post.causes_tags)}
      />
      <div className={css.sendBox}>
        <SendBox onValueChange={changeMessageHandler} onSend={sendMessage} />
      </div>
      <div className={css.messages}>
        <Comment list={commentList} />
      </div>
    </div>
  );
};
