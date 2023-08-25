import { Pagination } from 'src/core/types';
import { Feed } from '@organisms/feed-list/feed-list.types';

export type Resolver = Pagination<Feed[]>;
