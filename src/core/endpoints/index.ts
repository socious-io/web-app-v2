import { get, post } from '../http';
import auth from './auth';
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

// https://dev.socious.io/api/v2/user/1855f594-295d-4ba3-bf21-ac8eaf0ba9fb/report
export const endpoint = {
  auth,
  get: {
    projects: {
      project_id: (id: string) =>
        get(`projects/${id}`).then(getDataProp) as Promise<GetProject>,
      '{project_id}/offers': (payload: offerPayload) =>
        get(
          `projects/${payload.id}/offers?filter.status=${payload.status}&page=${payload.page}`,
        ).then(getDataProp) as Promise<Pagination<Offer[]>>,
    },
    offers: {
      offer_id: (id: string) =>
        get(`offers/${id}`).then(getDataProp) as Promise<Offer>,
    },
    missions: {
      mission_id: (id: string) => get(`missions/${id}`).then(getDataProp),
    },
  },
  post: {
    user: {
      '{user_id}/report': (id: string, payload: { blocked: boolean; comment: string }) => post(`user/${id}/report`, payload),
      '{user_id}/update_wallet': (payload: { wallet_address: string }) => post(`user/update/wallet`, payload),
    },
    offers: {
      '{offer_id}/approve': (id: string) => post(`offers/${id}/approve`, {}).then(getDataProp),
      '{offer_id}/withdrawn': (id: string) => post(`offers/${id}/withdrawn`, {}).then(getDataProp),
      '{offer_id}/cancel': (id: string) => post(`offers/${id}/cancel`, {}).then(getDataProp),
      '{offer_id}/hire': (id: string) => post(`offers/${id}/hire`, {}).then(getDataProp),
    },
    missions: {
      '{mission_id}/complete': (id: string) => post(`missions/${id}/complete`, {}).then(getDataProp),
      '{mission_id}/cancel': (id: string) => post(`missions/${id}/cancel`, {}).then(getDataProp),
      '{mission_id}/confirm': (id: string) => post(`missions/${id}/confirm`, {}).then(getDataProp),
    },
    posts: {
      '{post_id}/report': (id: string, payload: { blocked: boolean; comment: string }) =>
        post(`posts/${id}/report`, payload).then(getDataProp),
    },
    payments: {
      '{offer_id/confirm}': (id: string, body: any) => post(`/payments/offers/${id}`, body).then(getDataProp),
    }
  },
};
