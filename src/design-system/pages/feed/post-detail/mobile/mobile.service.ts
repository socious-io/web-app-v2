import { get, post } from "../../../../../core/http";
import { SearchReq } from "../../../../../core/types";
import { Feed } from "../../../../organisms/feed-list/feed-list.types";

export async function getPostDetail(id: string): Promise<Feed> {
  return get(`posts/${id}`).then(({ data }) => data);
}

export async function comments(content: string, id: string): Promise<SearchReq> {
  const body = {
    content
  }
  return post(`posts/${id}/comments`, body).then(({ data }) => data);
}