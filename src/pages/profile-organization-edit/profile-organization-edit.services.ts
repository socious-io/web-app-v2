import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Dispatch, SetStateAction } from 'react';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { citiesToCategories } from 'src/core/adaptors';
import { endpoint } from 'src/core/endpoints';
import { PostMediaUploadResp } from 'src/core/endpoints/index.types';

import { getCityList } from '../job-create/info/info.services';

export function cityDispatcher(setCities: Dispatch<SetStateAction<DropdownItem[]>>) {
  return (countryCode: string) => {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  };
}

export async function uploadImage(url: string): Promise<PostMediaUploadResp> {
  const blob = await fetch(url).then((resp) => resp.blob());
  const formData = new FormData();
  formData.append('file', blob);
  return endpoint.post.media.upload(formData);
}

export async function showActionSheet(): Promise<'upload' | 'remove' | undefined> {
  const resp = await ActionSheet.showActions({
    title: 'What do you want to do?',
    options: [
      { title: `Upload image` },
      { title: `Remove image` },
      { title: 'Cancel', style: ActionSheetButtonStyle.Cancel },
    ],
  });
  switch (resp.index) {
    case 0:
      return 'upload';
    case 1:
      return 'remove';
    default:
      return undefined;
  }
}
