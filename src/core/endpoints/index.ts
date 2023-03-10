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
    missions: {
      mission_id: (id: string) => get(`missions/${id}`).then(getDataProp),
    },
  },
  post: {
    offers: {
      '{offer_id}/approve': (id: string) => post(`offers/${id}/approve`, {}).then(getDataProp),
      '{offer_id}/withdrawn': (id: string) => post(`offers/${id}/withdrawn`, {}).then(getDataProp),
      '{offer_id}/cancel': (id: string) => post(`offers/${id}/cancel`, {}).then(getDataProp),
      '{offer_id}/hire': (id: string) => post(`offers/${id}/hire`, {}).then(getDataProp),
    },
    missions: {
      '{mission_id}/complete': (id: string) => post(`missions/${id}/complete`, {}).then(getDataProp),
      '{mission_id}/cancel': (id: string) => post(`missions/${id}/cancel`, {}).then(getDataProp),
    },
  },
};
