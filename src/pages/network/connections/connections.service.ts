import { Connection, OrgMeta, UserMeta } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';

export function connectionListAdaptor(list: Connection, currentId: string | undefined) {
  return list.requester.meta.id === currentId
    ? {
        connect_id: list.id,
        name: list.requested.meta.name,
        avatar: (list.requested.meta as UserMeta).avatar || (list.requested.meta as OrgMeta).image || '',
        id: list.requested.meta.id,
        type: list.requested.type,
        username: (list.requested.meta as UserMeta).username || (list.requested.meta as OrgMeta).shortname,
        following: list.following,
      }
    : {
        connect_id: list.id,
        name: list.requester.meta.name,
        avatar: (list.requested.meta as UserMeta).avatar || (list.requested.meta as OrgMeta).image || '',
        id: list.requester.meta.id,
        type: list.requester.type,
        username: (list.requested.meta as UserMeta).username || (list.requested.meta as OrgMeta).shortname,
        following: list.following,
      };
}

export function sentRequestsAdaptor(list: Connection) {
  return {
    connect_id: list.id,
    name: list.requested.meta.name,
    avatar: (list.requested.meta as UserMeta).avatar || (list.requested.meta as OrgMeta).image || '',
    id: list.requested.meta.id,
    type: list.requested.type,
    username: (list.requested.meta as UserMeta).username || (list.requested.meta as OrgMeta).shortname,
  };
}

export function receivedRequestsAdaptor(list: Connection) {
  return {
    connect_id: list?.id,
    name: list?.requester.meta.name,
    avatar: (list.requested.meta as UserMeta).avatar || (list.requested.meta as OrgMeta).image || '',
    id: list?.requester.meta.id,
    type: list.requester.type,
    date: toRelativeTime(list?.created_at.toString()),
    text: list?.text,
    username: (list.requested.meta as UserMeta).username || (list.requested.meta as OrgMeta).shortname,
  };
}
