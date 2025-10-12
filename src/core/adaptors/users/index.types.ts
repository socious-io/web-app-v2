import { Education, Experience, LanguageReq, UserType } from 'src/core/api';

import { PaginateRes } from '..';

export interface ImportLinkedInRes {
  experiences: Experience[];
  educations: Education[];
  languages: LanguageReq[];
}

export interface Review {
  id: string;
  identity: { id: string; type: UserType; name: string; username: string; usernameVal: string; img?: string };
  date: Date;
  review: string;
  job: string;
  isSatisfied: boolean;
}

export type ReviewsRes = PaginateRes<Review>;

export interface WalletReq {
  account: string;
  networkName: string;
  testnet: boolean;
}
