import { Comment, CommentsRes, Identity } from 'src/core/api';

export type ReplyInfo = { replyTo: string; commentId: string };

export type SelectedEmoji = {
  emoji: string;
  identities: Partial<Identity>[];
};

export interface CommentsProps {
  postId: string;
  list: Comment[];
  onReply: (userInfo: ReplyInfo) => void;
  onShowReplies?: (commentId: string) => void;
  replies?: Record<string, CommentsRes>;
  showSeeMoreComments?: boolean;
  onSeeMoreCommentsClick?: () => void;
  onSeeMoreRepliesClick?: (commentId: string) => void;
}
