import {get} from '/utils/request';

export function getBadges() {
  // return get('/user/badges');
  return get('/user/impact-points');
}
