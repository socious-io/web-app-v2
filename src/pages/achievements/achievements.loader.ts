import { getBadges, getImpactPoints } from './achievements.services';

export async function AchievementsPageLoader() {
  const requests = [getBadges(), getImpactPoints()];
  const [badges, impactPoints] = await Promise.all(requests);
  return { badges, impactPoints };
}
