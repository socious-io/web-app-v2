import { getUserDetail } from './profile-user.services';
import { getBadges } from '../achievements/achievements.services';

export async function profileUserPageLoader({ params }) {
  const requests = [getUserDetail(params.id), getBadges()];
  const [user, badges] = await Promise.all(requests);
  return { user, badges };
}
