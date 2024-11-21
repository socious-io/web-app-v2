import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Identity,
  Post,
  createPostComment,
  filterFollowings,
  follow,
  getRepliesPostComment,
  likePost,
  postComments,
  removePost,
  reportPost,
  sharePost,
  unfollow,
  unlikePost,
} from 'src/core/api';
import { getIdentityMeta, translate } from 'src/core/utils';
import { RootState } from 'src/store';

import { ReplyInfo } from '../comments/index.types';
import { useFeedsContext } from '../contexts/feeds.context';

export const useFeedItem = (
  postId: string,
  updateFeedsListLiked: (postId: string) => void,
  updateFeedsListRepost: (response: Post) => void,
  updateFeedsListRemove: (postId: string) => void,
  userIdentity: Identity,
) => {
  const limit = 10;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const currentIdentityId = currentIdentity?.id;
  const { name: userIdentityName } = getIdentityMeta(userIdentity);
  const { state, dispatch } = useFeedsContext();
  const { comments, replies } = state;
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showReplySection, setShowReplySection] = useState(false);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | null>(null);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [openRepostModal, setOpenRepostModal] = useState(false);
  const [openThreeDotsMenu, setOpenThreeDotsMenu] = useState(false);
  const [actionsMenu, setActionsMenu] = useState<{ name: 'edit' | 'remove' | 'report'; open: boolean }>({
    name: 'edit',
    open: false,
  });
  const [currentPage, setCurrentPage] = useState<{ comments: number; replies: number }>({
    comments: 1,
    replies: 1,
  });
  const [followed, setFollowed] = useState(false);

  const onLikeClick = async (liked: boolean) => {
    try {
      if (liked) {
        await unlikePost(postId);
      } else {
        await likePost(postId);
      }
    } catch (error) {
      console.log('error in un/linking post', error);
    }
    updateFeedsListLiked(postId);
  };

  const onCommentClick = async (commentsCount: number) => {
    setShowCommentSection(true);
    if (commentsCount) {
      try {
        const res = await postComments(postId, { page: 1, limit: 10 });
        if (res) {
          dispatch({ type: 'comments', value: { ...comments, [postId]: res } });
          dispatch({ type: 'replies', value: {} });
        }
      } catch (error) {
        console.log('error in fetching comments', error);
      }
    }
  };

  const onSendComment = async () => {
    try {
      const res = await createPostComment(postId, { content: comment });
      if (res) {
        dispatch({
          type: 'comments',
          value: {
            ...comments,
            [postId]: {
              limit,
              page: currentPage.comments,
              total_count: (comments?.[postId]?.total_count || 0) + 1,
              items: [res, ...(comments?.[postId]?.items || [])],
            },
          },
        });
      }
      setComment('');
    } catch (error) {
      console.log('error in commenting', error);
    }
  };

  const onReplyClick = (userInfo: ReplyInfo) => {
    setShowReplySection(true);
    setReplyInfo(userInfo);
  };

  const onReplyComment = async () => {
    const commentId = replyInfo?.commentId || '';
    try {
      const res = await createPostComment(postId, { content: reply, reply_id: commentId });
      if (commentId && res) {
        dispatch({
          type: 'replies',
          value: {
            ...replies,
            [commentId]: {
              limit,
              page: currentPage.replies,
              total_count: (replies?.[commentId]?.total_count || 0) + 1,
              items: [res, ...(replies?.[commentId]?.items || [])],
              showed: replies?.[commentId]?.showed || false,
            },
          },
        });
      }
      setShowReplySection(false);
      setReply('');
    } catch (error) {
      console.log('error in replying', error);
    }
  };

  const onRepost = async (content: string) => {
    try {
      const res = await sharePost(postId, { content });
      if (res) updateFeedsListRepost(res);
      setOpenRepostModal(false);
    } catch (error) {
      console.log('error in sharing post', error);
    }
  };

  const onOpenThreeDotsMenu = async () => {
    if (currentIdentityId !== userIdentity.id) {
      try {
        const { items } = (await filterFollowings({ id: userIdentity.id, type: 'users', page: 1, limit: 10 })) || [];
        setFollowed(!!items.length);
      } catch (error) {
        console.log('error in fetching following', error);
      }
    }
    setOpenThreeDotsMenu(true);
  };

  const onShowReplies = async (commentId: string) => {
    try {
      const res = await getRepliesPostComment(commentId, { page: 1, limit: 10 });
      if (res) dispatch({ type: 'replies', value: { ...replies, [commentId]: { ...res, showed: true } } });
    } catch (error) {
      console.log('error in fetching replies', error);
    }
  };

  const onSeeMoreCommentsClick = async () => {
    try {
      const res = await postComments(postId, { page: currentPage.comments + 1, limit: 10 });
      dispatch({
        type: 'comments',
        value: {
          ...comments,
          [postId]: {
            limit,
            page: currentPage.comments + 1,
            total_count: comments?.[postId]?.total_count || 0,
            items: comments?.[postId]?.items ? [...comments[postId].items, ...res.items] : res.items,
          },
        },
      });
      setCurrentPage(prev => ({ ...prev, comments: prev.comments + 1 }));
    } catch (error) {
      console.log('error in fetching more comments', error);
    }
  };

  const onSeeMoreRepliesClick = async (commentId: string) => {
    try {
      const res = await getRepliesPostComment(commentId, { page: currentPage.replies + 1, limit: 10 });
      dispatch({
        type: 'replies',
        value: {
          ...replies,
          [commentId]: {
            limit,
            page: currentPage.replies + 1,
            total_count: replies?.[commentId]?.total_count || 0,
            items: replies?.[commentId]?.items ? [...replies[commentId].items, ...res.items] : res.items,
          },
        },
      });
      setCurrentPage(prev => ({ ...prev, replies: prev.replies + 1 }));
    } catch (error) {
      console.log('error in fetching more replies', error);
    }
  };

  const handleCloseActionsMenu = () => setActionsMenu({ ...actionsMenu, open: false });

  const onDeletePost = async () => {
    try {
      await removePost(postId);
      handleCloseActionsMenu();
      updateFeedsListRemove(postId);
    } catch (error) {
      console.log('error in removing post', error);
    }
  };

  const onReportPost = async (comment: string) => {
    try {
      await reportPost(postId, { comment, blocked: true });
      handleCloseActionsMenu();
      updateFeedsListRemove(postId);
    } catch (error) {
      console.log('error in reporting post', error);
    }
  };

  const onFollowOrUnfollow = async (followed: boolean) => {
    if (followed) {
      try {
        await unfollow(userIdentity.id);
        updateFeedsListRemove(postId);
        setFollowed(false);
      } catch (error) {
        console.log('error in unfollowing ', error);
      }
    } else {
      try {
        await follow(userIdentity.id);
        setFollowed(true);
      } catch (error) {
        console.log('error in following ', error);
      }
    }
  };

  const threeDotsMenuItems =
    currentIdentityId === userIdentity.id
      ? [
          // { iconName: 'link-03', title: 'Copy link to post', onClick: () => console.log('copy post') },
          {
            iconName: 'pencil-01',
            title: translate('feeds-edit'),
            onClick: () => setActionsMenu({ name: 'edit', open: true }),
          },
          {
            iconName: 'trash-01',
            title: translate('feeds-remove'),
            onClick: () => setActionsMenu({ name: 'remove', open: true }),
          },
        ]
      : [
          // { iconName: 'link-03', title: 'Copy link to post', onClick: () => console.log('copy post') },
          {
            iconName: followed ? 'x-circle' : 'plus-circle',
            title: `${followed ? translate('feeds-menu-item-unfollow', { name: userIdentityName || '' }) : translate('feeds-menu-item-follow', { name: userIdentityName || '' })}`,
            onClick: () => onFollowOrUnfollow(followed),
          },
          {
            iconName: 'flag-02',
            title: translate('feeds-report-post'),
            onClick: () => setActionsMenu({ name: 'report', open: true }),
          },
        ];

  return {
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
  };
};
