import { getOrganizationDetail } from './profile-organization.services';

export async function profileOrganizationPageLoader({ params }) {
  const requests = [getOrganizationDetail(params.id)];
  const [user] = await Promise.all(requests);
  return { user };
}
