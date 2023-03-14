import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { dialog } from '../../core/dialog/dialog';
import { endpoint } from '../../core/endpoints';
import { get } from '../../core/http';

export async function getUserDetail(username: string) {
  return get(`/user/by-username/${username}/profile`).then(({ data }) => data);
}

export async function getOrganizationDetail(shortname: string) {
  return get(`/orgs/by-shortname/${shortname}`).then(({ data }) => data);
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
