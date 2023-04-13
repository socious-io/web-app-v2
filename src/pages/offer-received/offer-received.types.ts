import { GetProject } from '../../core/endpoints/index.types';
import { Offer } from '../../core/types';

export type Resolver = { offer: Offer; job: GetProject };
