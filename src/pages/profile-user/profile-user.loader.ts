import { getUserDetail } from './refactored/profileUser.services';
import { getBadges } from '../achievements/achievements.services';

export async function profileUserPageLoader({ params }) {
  const user = await getUserDetail(params.id);
  const badges = await getBadges().catch(console.log);
  return { user, badges };
}
