import { Badges, MissionsRes, User } from 'src/core/api';

export type Resolver = {
  user: User;
  badges: Badges;
  missions: MissionsRes;
};
