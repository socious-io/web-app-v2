import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { get, post } from 'src/core/http';
import { LikeResp, SearchReq } from 'src/core/types';

export function likeComment(postId: string, commentId: string): Promise<LikeResp> {
  return post(`/posts/${postId}/comments/${commentId}/like`, {}).then(({ data }) => data);
}

export function removeCommentLike(postId: string, commentId: string): Promise<LikeResp> {
  return post(`/posts/${postId}/comments/${commentId}/unlike`, {}).then(({ data }) => data);
}

export async function getPostDetail(id: string): Promise<Feed> {
  return get(`posts/${id}`).then(({ data }) => data);
}

export async function addComment(content: string, id: string): Promise<SearchReq> {
  const body = {
    content,
  };
  return post(`posts/${id}/comments`, body).then(({ data }) => data);
}

export async function getComments(id: string, page: number): Promise<SearchReq> {
  return get(`posts/${id}/comments?page=${page}`).then(({ data }) => data);
}
