import { Dispatch, SetStateAction } from 'react';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { citiesToCategories } from 'src/core/adaptors';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { getCityList } from '../job-create/info/info.services';
import { ProfileReq } from '../profile/profile.types';

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
  };
}

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
