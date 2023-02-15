import { get } from "../../../core/http";

export async function getSession(accountId: string) {
    return get(`identities/set/${accountId}/session`).then(({ data }) => data);
}