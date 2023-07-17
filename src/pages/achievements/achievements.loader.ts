import { endpoint } from 'src/core/endpoints';
import { getBadges, getImpactPoints } from './achievements.services';

export async function AchievementsPageLoader() {
  const requests = [getBadges(), getImpactPoints()];
  const [badges, impactPointHistory] = await Promise.all(requests);
  return { badges, impactPointHistory };
}
