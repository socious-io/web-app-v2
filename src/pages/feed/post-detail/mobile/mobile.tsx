import css from './mobile.module.scss';
import { useState } from 'react';
import { socialCausesToCategory } from '../../../../core/adaptors';
import { Comment } from '../../../../components/molecules/comment/comment';
import { FeedItem } from '../../../../components/molecules/feed-item/feed-item';
import { SendBox } from '../../../../components/molecules/send-box/send-box';
import { addComment, getComments } from './mobile.service';
import { CommentModel } from './mobile.types';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Feed } from '../../../../components/organisms/feed-list/feed-list.types';
import { Pagination } from '../../../../core/types';
import { Header } from '../../../../components/atoms/header/header';
import { like, unlike } from '../../mobile/mobile.service';
import { likeComment, removeCommentLike } from '../post-detail.services';

export const Mobile = () => {
  const resolver = useMatch();
  const navigate = useNavigate();
  const { post, comments } = resolver.ownData as {
    post: Feed;
    comments: Pagination<CommentModel[]>;
  };
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState<CommentModel[]>(comments.items);
  const [postObj, setPostObj] = useState<Feed>(post);
  const [page, setPage] = useState(1);
  const totalCount = comments.total_count;

  const onShowSeeMore = (length: number): boolean => {
    if (length < totalCount) {
      return true
    }
    return false
  }

  const actionList = (likes: number, liked: boolean) => [
    {
      label: 'Like',
      iconName: 'heart-blue',
      like: likes,
      isLiked: liked,
      onClick: () => {
        postObj!.liked ? onRemoveLike(postObj.id) : onLike(postObj.id);
      },
      onLike: () => onLike(postObj.id),
      onRemoveLike: () => onRemoveLike(postObj.id),
    },
    { label: 'Comment', iconName: 'comment-blue' },
  ];

  const onLike = (id: string) => {
    like(id).then(() => {
      const clone = { ...postObj };
      clone.liked = true;
      clone.likes = clone.likes + 1;
      setPostObj(clone);
    });
  };

  const onRemoveLike = (id: string) => {
    unlike(id).then(() => {
      const clone = { ...postObj };
      clone.liked = false;
      clone.likes = clone.likes - 1;
      setPostObj(clone);
    });
  };

  const changeMessageHandler = (value: string) => {
    setMessage(value);
  };

  const sendMessage = () => {
    addComment(message, postObj.id).then(() => {
      getComments(postObj.id, 1).then((resp) => {
        setCommentList(resp.items);
        setMessage('');
      });
    });
  };

  function onMorePage() {
    getComments(postObj.id, page + 1).then((resp) => {
      setPage((v) => v + 1);
      setCommentList((list) => [...list, ...resp.items]);
    });
  }

  function updateHeartIcon(commentId: string, type: 'like' | 'removeLike') {
    return () => {
      const clone = [...commentList];
      const comment = clone.find((item) => item.id === commentId);
      if (comment) {
        comment.liked = type === 'like' ? true : false;
        comment.likes = type === 'like' ? comment.likes + 1 : comment.likes - 1;
      }
      setCommentList(clone);
    };
  }

  function onCommentLike(postId: string, commentId: string) {
    likeComment(postId, commentId).then(updateHeartIcon(commentId, 'like'));
  }

  function onCommentLikeRemove(postId: string, commentId: string) {
    removeCommentLike(postId, commentId).then(updateHeartIcon(commentId, 'removeLike'));
  }

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
