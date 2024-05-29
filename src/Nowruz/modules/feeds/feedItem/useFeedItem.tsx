import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  CurrentIdentity,
  Post,
  createPostComment,
  getRepliesPostComment,
  likePost,
  postComments,
  sharePost,
  unlikePost,
} from 'src/core/api';
import { RootState } from 'src/store';

import { ReplyInfo } from '../comments/index.types';
import { useFeedsContext } from '../contexts/feeds.context';

export const useFeedItem = (
  postId: string,
  updateFeedsListLiked: () => void,
  updateFeedsListRepost: (response: Post) => void,
) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const currentIdentityId = currentIdentity?.id;
  const { state, dispatch } = useFeedsContext();
  const { comments, replies } = state;
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [showReplySection, setShowReplySection] = useState(false);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo | null>(null);
  const [comment, setComment] = useState('');
  const [reply, setReply] = useState('');
  const [openRepostModal, setOpenRepostModal] = useState(false);
  const limit = 10;
  const [currentPage, setCurrentPage] = useState<{ comments: number; replies: number }>({
    comments: 1,
    replies: 1,
  });

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
    updateFeedsListLiked();
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
    },
  };
};
