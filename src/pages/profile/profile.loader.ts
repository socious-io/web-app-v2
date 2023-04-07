import { UserType } from 'src/core/types';
import { getUserDetail, getOrganizationDetail } from './profile.services';
import { getBadges } from '../achievements/achievements.services';

export async function ProfilePageLoader({ params }) {
  const requests = [getUserDetail(params.id), getBadges()];
  const userType = params.userType as UserType;
  if (userType === 'users') {
    const [user, badges] = await Promise.all(requests);
    return { user, badges };
  } else {
    const user = await getOrganizationDetail(params.id);
    const badges = await getBadges();
    return { user, badges };
  }
}
