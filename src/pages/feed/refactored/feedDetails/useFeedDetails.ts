import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import {
  createPostComment,
  likePost,
  likePostComment,
  postComments,
  unlikePost,
  unlikePostComment,
  Post,
  CommentsRes,
  CurrentIdentity,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { block, report } from 'src/pages/feed/refactored/feed.service';
import { RootState } from 'src/store';

export const useFeedDetails = () => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const avatarImg = useSelector<RootState, string>((state) => {
    return state.identity.avatarImage;
  });
  const { post, comments } = useLoaderData() as {
    post: Post;
    comments: CommentsRes;
  };
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState(comments.items);
  const [postObj, setPostObj] = useState<Post>(post);
  const [page, setPage] = useState(1);
  const [openMoreBox, setOpenMoreBox] = useState(false);
  const [moreOptions, setMoreOptions] = useState<{ title: string }[]>([]);
  const [feed, setFeed] = useState<Post>();
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
        postObj.liked ? onRemoveLike(postObj.id) : onLike(postObj.id);
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
    likePost(id).then(() => {
      const clone = { ...postObj };
      clone.liked = true;
      clone.likes = clone.likes + 1;
      setPostObj(clone);
    });
  };

  const onRemoveLike = (id: string) => {
    unlikePost(id).then(() => {
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
    createPostComment(postObj.id, { content: message }).then(() => {
      postComments(postObj.id, { page: 1 }).then((resp) => {
        setCommentList(resp.items);
        setMessage('');
      });
    });
  };

  function onMorePage() {
    postComments(postObj.id, { page: page + 1 }).then((resp) => {
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
    likePostComment(postId, commentId).then(updateHeartIcon(commentId, 'like'));
  }

  function onCommentLikeRemove(postId: string, commentId: string) {
    unlikePostComment(postId, commentId).then(updateHeartIcon(commentId, 'removeLike'));
  }

  const showActions = async (feed: Post) => {
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

  function onMoreClick(index: number, feed: Post) {
    switch (index) {
      case 0:
        if (feed?.id) {
          report(feed?.id);
        }
        break;
      case 1:
        if (feed?.id) {
          block(feed?.id);
        }
        break;
    }
  }
  const onClickMoreOption = (index: number) => {
    onMoreClick(index, feed as Post);
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
    avatarImg,
  };
};
