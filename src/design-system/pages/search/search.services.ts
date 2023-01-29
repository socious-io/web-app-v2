import { post } from "../../../core/http";
import { SearchReq } from "../../../core/types";
import { PayloadModel } from "./search.types";

export async function search(payload: PayloadModel): Promise<SearchReq> {
    const body = {
        filter: payload.filter,
        q: payload.q,
        type: payload.type
    }
    return post(`search?page=${payload.page}&limit=50`, body).then(({ data }) => data);
}