import { endpoint } from 'src/core/endpoints';
import { toRelativeTime } from 'src/core/relative-time';
import { ConnectStatus, ConnectionItem } from 'src/core/types';

export function getConnections(payload: {
  page: number;
  status?: ConnectStatus;
  requester_id?: string;
  requested_id?: string;
}) {
  return endpoint.get.connections['filtered_connections'](payload);
}

export function connectionListAdaptor(list: ConnectionItem, currentId: string | undefined) {
  return list.requester.meta.id === currentId
    ? {
        connect_id: list?.id,
        name: list?.requested.meta.name,
        avatar: list?.requested.meta.avatar,
        id: list?.requested.meta.id,
        type: list?.requested.type,
      }
    : {
        connect_id: list?.id,
        name: list?.requester.meta.name,
        avatar: list?.requester.meta.avatar,
        id: list?.requester.meta.id,
        type: list.requester.type,
      };
}

export function sentRequestsAdaptor(list: ConnectionItem) {
  return {
    connect_id: list?.id,
    name: list?.requested.meta.name,
    avatar: list?.requested.meta.avatar,
    id: list?.requested.meta.id,
    type: list?.requested.type,
  };
}

export function receivedRequestsAdaptor(list: ConnectionItem) {
  return {
    connect_id: list?.id,
    name: list?.requester.meta.name,
    avatar: list?.requester.meta.avatar,
    id: list?.requester.meta.id,
    type: list.requester.type,
    date: toRelativeTime(list?.created_at),
    text: list?.text,
  };
}

export const moreOptions = [
  {
    icon: 'close-circle',
    label: 'Unfollow',
  },
  {
    icon: 'block',
    label: 'Block user account',
  },
];
