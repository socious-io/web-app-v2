import { GetProject } from '../../core/endpoints/index.types';
import { CardInfoResp, Offer } from '../../core/types';

export type Resolver = { offer: Offer; job: GetProject, cardInfo: CardInfoResp };
