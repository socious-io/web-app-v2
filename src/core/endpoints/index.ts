import { get } from '../http';
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
};
