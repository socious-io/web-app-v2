import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { get, post } from 'src/core/http';
import { BADGES } from 'src/constants/constants';
import { ImpactBadgeProps } from 'src/components/atoms/impact-badge/impact-badge.types';

export async function getUserDetail(username: string) {
  return get(`/user/by-username/${username}/profile`).then(({ data }) => data);
}

export async function getOrganizationDetail(shortname: string) {
  return get(`/orgs/by-shortname/${shortname}`).then(({ data }) => data);
}

export function getConnectStatus(requester_id: string, requested_id: string) {
  return endpoint.get.connections['filtered_connections']({ requested_id, requester_id });
}

export function sendRequestConnection(id: string, text: string) {
  return post(`/connections/${id}`, {
    text,
  }).then(({ data }) => data);
}

export const showActions = async (id: string) => {
  const result = await ActionSheet.showActions({
    title: 'What do you want to do?',
    message: 'Select an option to perform',
    options: [{ title: 'Block' }, { title: 'Report' }, { title: 'Cancel', style: ActionSheetButtonStyle.Cancel }],
  });

  switch (result.index) {
    case 0:
      endpoint.post.user['{user_id}/report'](id, { blocked: true, comment: 'comment' }).then(() => {
        dialog.alert({ title: 'Blocked', message: 'You successfully blocked the user' });
      });
      break;
    case 1:
      endpoint.post.user['{user_id}/report'](id, { blocked: false, comment: 'comment' }).then(() => {
        dialog.alert({ title: 'Report', message: 'You successfully Reported the user' });
      });
      break;
  }
};

export function badgesList(badges: unknown[]): ImpactBadgeProps[] {
  const filter = ([key, value], i: number) => {
    return badges.some((item) => item.social_cause_category === key && i <= 4);
  };

  return Object.entries(BADGES)
    .filter(filter)
    .map(([, value]) => {
      return {
        iconUrl: `/sdg/${value.value}.svg`,
        color: value.color,
      };
    });
}
