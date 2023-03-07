/** @description this file mimics swagger */
import { get, post } from '../http';
import { GetOffer, GetProject } from './index.types';

export const endpoint = {
  get: {
    projects: {
      project_id: (id: string) => get(`projects/${id}`).then(({ data }) => data) as Promise<GetProject>,
    },
    offers: {
      offer_id: (id: string) => get(`offers/${id}`).then(({ data }) => data) as Promise<GetOffer>,
    },
  },
  post: {
    offers: {
      '{offer_id}/approve': (id: string) => post(`offers/${id}/approve`, {}).then(({ data }) => data) as Promise<unknown>,
      '{offer_id}/withdrawn': (id: string) =>
        post(`offers/${id}/withdrawn`, {}).then(({ data }) => data) as Promise<unknown>,
    },
  },
};
