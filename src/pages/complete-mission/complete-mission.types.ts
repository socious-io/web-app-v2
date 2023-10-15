import { Mission, Offer, PostMediaUploadRes } from 'src/core/api';

export type Loader = {
  offer: Offer;
  mission: Mission;
  media: PostMediaUploadRes;
};
