import { getOrganizationDetail } from './profile-organization.services';
import { getBadges } from '../achievements/achievements.services';

export async function profileOrganizationPageLoader({ params }) {
  const requests = [getOrganizationDetail(params.id), getBadges()];
  const [user, badges] = await Promise.all(requests);
  return { user, badges };
}
