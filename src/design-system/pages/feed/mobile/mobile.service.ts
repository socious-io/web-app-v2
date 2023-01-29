import { get } from "../../../../core/http";

export async function getFeedList({ page } = { page: 1 }) {
    return get(`posts?page=${page}`).then(({ data }) => data);
  }