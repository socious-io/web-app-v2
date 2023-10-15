import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { ImpactBadgeProps } from 'src/components/atoms/impact-badge/impact-badge.types';
import { BADGES } from 'src/constants/constants';
import {
  connectionStatus,
  connectRequest,
  getOrganizationByShortName,
  hiring,
  otherProfileByUsername,
  report,
} from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';

export async function getUserDetail(username: string) {
  return otherProfileByUsername(username);
}

export async function getOrganizationDetail(shortname: string) {
  return getOrganizationByShortName(shortname);
}

export function getConnectStatus(identity_id: string) {
  return connectionStatus(identity_id);
}

export function sendRequestConnection(id: string, text: string) {
  return connectRequest(id, { text });
}

export async function hiringCall() {
  return hiring();
}

export const showActions = async (id: string) => {
  const result = await ActionSheet.showActions({
    title: 'What do you want to do?',
    message: 'Select an option to perform',
    options: [{ title: 'Block' }, { title: 'Report' }, { title: 'Cancel', style: ActionSheetButtonStyle.Cancel }],
  });

  switch (result.index) {
    case 0:
      report(id, { blocked: true, comment: 'comment' }).then(() => {
        dialog.alert({ title: 'Blocked', message: 'You successfully blocked the user' });
      });
      break;
    case 1:
      report(id, { blocked: false, comment: 'comment' }).then(() => {
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
