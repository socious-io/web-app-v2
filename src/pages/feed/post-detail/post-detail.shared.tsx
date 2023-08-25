import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { like, unlike } from '../mobile/mobile.service';
import { addComment, getComments, likeComment, removeCommentLike } from './post-detail.service';
import { Feed } from '@organisms/feed-list/feed-list.types';
import { IdentityReq, Pagination } from 'src/core/types';
import { CommentModel } from './post-detail.types';
import { endpoint } from 'src/core/endpoints';
import { dialog } from 'src/core/dialog/dialog';
import { RootState } from 'src/store/store';

export const usePostDetailShared = () => {
  const { post, comments } = useMatch().ownData as {
    post: Feed;
    comments: Pagination<CommentModel[]>;
  };
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState<CommentModel[]>(comments.items);
  const [postObj, setPostObj] = useState<Feed>(post);
  const [page, setPage] = useState(1);
  const totalCount = comments.total_count;

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const onShowSeeMore = (length: number): boolean => {
    if (length < totalCount) {
      return true;
    }
    return false;
  };

  const actionList = (likes: number, liked: boolean) => [
    {
      label: 'Like',
      iconName: 'heart-blue',
      like: likes,
      isLiked: liked,
      onClick: () => {
        hapticsImpactLight();
        postObj!.liked ? onRemoveLike(postObj.id) : onLike(postObj.id);
      },
      onLike: () => {
        hapticsImpactLight();
        return onLike(postObj.id);
      },
      onRemoveLike: () => {
        hapticsImpactLight();
        onRemoveLike(postObj.id);
      },
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

  function onMoreClick(index: number, feed: Feed) {
    switch (index) {
      case 0:
        if (feed?.id) {
          endpoint.post.posts['{post_id}/report'](feed?.id, { blocked: true, comment: 'comment' }).then(() => {
            dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
          });
        }
        break;
      case 1:
        if (feed?.id) {
          endpoint.post.posts['{post_id}/report'](feed?.id, { blocked: false, comment: 'comment' }).then(() => {
            dialog.alert({ title: 'Report', message: 'You successfully Reported the feed' });
          });
        }
        break;
    }
  }

  return {
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
  };
};
