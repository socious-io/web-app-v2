import { UserType } from 'src/core/types';
import { getUserDetail, getOrganizationDetail } from './profile.services';
import { getBadges } from '../achievements/achievements.services';

export async function profileUserPageLoader({ params }) {
  const requests = [getUserDetail(params.id), getBadges()];
  //   const userType = params.userType as UserType;
  const [user, badges] = await Promise.all(requests);
  return { user, badges };
  //   if (userType === 'users') {
  //     return { user, badges };
  //   } else {
  //     const user = await getOrganizationDetail(params.id);
  //     const badges = await getBadges();
  //     return { user, badges };
  //   }
}
