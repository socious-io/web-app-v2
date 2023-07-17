import { Endpoints } from 'src/core/endpoints/index.types';
import { BadgesResp, Pagination } from '../../core/types';

export type Loader = {
  badges: { badges: BadgesResp };
  //   impactPoints: Pagination<unknown[]>;
  impactPointHistory: Awaited<ReturnType<Endpoints['get']['users']['user/impact-points']>>;
};
