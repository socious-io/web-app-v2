import { get } from '../../../core/http';

export function getBadges() {
  // return get('/user/badges');
  return get('/user/impact-points');
}
