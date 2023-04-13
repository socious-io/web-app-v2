import { LikeResp } from '../../../core/types';
import { post } from '../../../core/http';

export function likeComment(postId: string, commentId: string): Promise<LikeResp> {
  return post(`/posts/${postId}/comments/${commentId}/like`, {}).then(({ data }) => data);
}

export function removeCommentLike(postId: string, commentId: string): Promise<LikeResp> {
  return post(`/posts/${postId}/comments/${commentId}/unlike`, {}).then(({ data }) => data);
}
