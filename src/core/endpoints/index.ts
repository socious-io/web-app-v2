import { get } from '../http';
import auth from './auth';
import { GetOffer, GetProject } from './index.types';

export const endpoint = {
  auth,
  get: {
    projects: {
      project_id: (id: string) =>
        get(`projects/${id}`).then(({ data }) => data) as Promise<GetProject>,
    },
    offers: {
      offer_id: (id: string) =>
        get(`offers/${id}`).then(({ data }) => data) as Promise<GetOffer>,
    },
  },
};
