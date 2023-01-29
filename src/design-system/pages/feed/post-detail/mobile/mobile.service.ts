import { get } from "../../../../../core/http";
import { Feed } from "../../../../organisms/feed-list/feed-list.types";

export async function getPostDetail(id: string): Promise<Feed> {
    return get(`posts/${id}`).then(({ data }) => data);
  }