import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { isTouchDevice } from 'src/core/device-type-detector';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { IdentityReq, Pagination } from 'src/core/types';
import { RootState } from 'src/store/store';

import { addComment, getComments, likeComment, removeCommentLike } from './feedDetail.service';
import { CommentModel } from './feedDetail.types';
import { like, unlike } from '../feed.service';

export const useFeedDetails = () => {
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const { post, comments } = useMatch().ownData as {
    post: Feed;
    comments: Pagination<CommentModel[]>;
  };
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState<CommentModel[]>(comments.items);
  const [postObj, setPostObj] = useState<Feed>(post);
  const [page, setPage] = useState(1);
  const [openMoreBox, setOpenMoreBox] = useState(false);
  const [moreOptions, setMoreOptions] = useState<{ title: string }[]>([]);
  const [feed, setFeed] = useState<Feed>();
  const totalCount = comments.total_count;

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

  const showActions = async (feed: Feed) => {
    const name = feed.identity_meta.name;
    if (isTouchDevice()) {
      const result = await ActionSheet.showActions({
        title: 'What do you want to do?',
        options: [
          { title: `Block ${name}` },
          { title: `Report ${name}` },
          { title: 'Cancel', style: ActionSheetButtonStyle.Cancel },
        ],
      });
      onMoreClick(result.index, feed);
    } else {
      const options = [{ title: `Block ${name}` }, { title: `Report ${name}` }, { title: 'Cancel' }];
      setMoreOptions(options);
      setFeed(feed);
      setOpenMoreBox(true);
    }
  };

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
  const onClickMoreOption = (index: number) => {
    onMoreClick(index, feed as Feed);
    setOpenMoreBox(false);
  };
  return {
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
  };
};
