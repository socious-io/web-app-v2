import { Education, Experience, LanguageReq } from 'src/core/api';
import { UserType } from 'src/core/types';

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
