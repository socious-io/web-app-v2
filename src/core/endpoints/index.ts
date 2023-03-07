/** @description this file mimics swagger */
import { get, post } from '../http';
import { Pagination } from '../types';
import { Offer, GetProject } from './index.types';

type offerPayload = {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'HIRED' | 'CLOSED,CANCELED,WITHDRAWN';
  page: number;
};

function getDataProp<T = unknown>(resp: { data: T }) {
  return resp.data;
}

export const endpoint = {
  get: {
    projects: {
      project_id: (id: string) => get(`projects/${id}`).then(getDataProp) as Promise<GetProject>,
      '{project_id}/offers': (payload: offerPayload) =>
        get(`projects/${payload.id}/offers?filter.status=${payload.status}&page=${payload.page}`).then(
          getDataProp
        ) as Promise<Pagination<Offer[]>>,
    },
    offers: {
      offer_id: (id: string) => get(`offers/${id}`).then(getDataProp) as Promise<Offer>,
    },
  },
  post: {
    offers: {
      '{offer_id}/approve': (id: string) => post(`offers/${id}/approve`, {}).then(getDataProp),
      '{offer_id}/withdrawn': (id: string) => post(`offers/${id}/withdrawn`, {}).then(getDataProp),
    },
  },
};
// https://dev.socious.io/api/v2/projects/5df3e0f1-896d-4c02-b8be-ce0f1e70aaaf/offers?filter.status=PENDING&page=1
