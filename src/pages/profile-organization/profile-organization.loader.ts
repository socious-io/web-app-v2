import { getOrganizationDetail } from './profile-organization.services';
import { getBadges } from '../achievements/achievements.services';

export async function profileOrganizationPageLoader({ params }) {
  const user = await getOrganizationDetail(params.id);
  const badges = await getBadges();
  return { user, badges };
}
