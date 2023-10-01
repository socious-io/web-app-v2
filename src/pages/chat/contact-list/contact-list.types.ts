import { Following, Summary } from 'src/core/api';
import { Pagination } from 'src/core/types';

export type Resolver = {
  summery: Pagination<Summary[]>;
  followings: Pagination<Following[]>;
};
