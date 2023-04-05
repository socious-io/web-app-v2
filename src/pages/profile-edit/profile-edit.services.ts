import { Dispatch, SetStateAction } from 'react';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { citiesToCategories } from 'src/core/adaptors';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { getCityList } from '../job-create/info/info.services';
import { ProfileReq } from '../profile/profile.types';
import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import { endpoint } from 'src/core/endpoints';
import { PostMediaUploadResp } from 'src/core/endpoints/index.types';

export function generateFormModel(profile: ProfileReq): FormModel {
  return {
    first_name: { initialValue: profile.first_name },
    last_name: { initialValue: profile.last_name },
    bio: { initialValue: profile.bio },
    username: { initialValue: profile.username },
    mission: { initialValue: profile.mission },
    country: { initialValue: profile.country },
    city: { initialValue: profile.city },
    address: { initialValue: profile.address },
    geoname_id: { initialValue: profile.geoname_id },
    mobile_country_code: { initialValue: profile.mobile_country_code },
    phone: { initialValue: profile.phone },
    cover_image: { initialValue: profile?.cover_image?.id },
    avatar: { initialValue: profile?.avatar?.id },
    social_causes: { initialValue: profile.social_causes },
    skills: { initialValue: profile.skills },
  };
}

// {
//     "bio": "update bio",
//     "social_causes": [
//         "ANTI_SEMITISM",
//         "BIODIVERSITY",
//         "BULLYING"
//     ],
//     "country": "AE",
//     "city": "Isfahan, Isfahan Province",
//     "geoname_id": 418863,
//     "mobile_country_code": "+971",
//     "mission": "My mission in life is to exercise my freedom to think as I choose to think",
//     "avatar": "11c7f256-8166-4db4-b34a-c7b1e4ef9aaf",
//     "first_name": "Azin",
//     "last_name": "Z",
//     "username": "testazintest46089",
//     "skills": [
//         "ADOBE_PREMIER_PRO",
//         "ADOBE_PHOTOSHOP"
//     ]
// }

export function cityDispatcher(setCities: Dispatch<SetStateAction<DropdownItem[]>>) {
  return (countryCode: string) => {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  };
}

export function getProfileImage(data: ProfileReq): string {
  const img = data.avatar?.url ? data.avatar?.url : data.image?.url;
  return img || '';
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
