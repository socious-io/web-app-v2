import { MissionsResp, Offer } from '../../core/types';

export type Loader = {
  offer: Offer;
  mission: MissionsResp['items'][0];
};
