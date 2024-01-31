import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { Dispatch, SetStateAction } from 'react';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { citiesToCategories } from 'src/core/adaptors';
import { cities, PostMediaUploadRes, uploadMedia } from 'src/core/api';

export function cityDispatcher(setCities: Dispatch<SetStateAction<DropdownItem[]>>) {
  return (countryCode: string) => {
    cities(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  };
}

export async function uploadImage(url: string): Promise<PostMediaUploadRes> {
  const blob = await fetch(url).then((resp) => resp.blob());
  return uploadMedia(blob as File);
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
