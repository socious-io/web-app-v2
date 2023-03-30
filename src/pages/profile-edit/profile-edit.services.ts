import { Dispatch, SetStateAction } from 'react';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { citiesToCategories } from 'src/core/adaptors';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { getCityList } from '../job-create/info/info.services';
import { ProfileReq } from '../profile/profile.types';

// {
//     "bio": "Error 400: Bio unavailable.",
//     "social_causes": [
//         "DEMOCRACY",
//         "CLIMATE_CHANGE",
//         "CRIME_PREVENTION"
//     ],
//     "country": "IR",
//     "city": "Isfahan, Isfahan Province",
//     "geoname_id": 418863,
//     "address": "asdfasfd",
//     "mobile_country_code": "+98",
//     "phone": "23232323",
//     "cover_image": "68b75c9b-dd4e-4f35-9072-04910bea99c2",
//     "mission": "My mission in life is to exercise my freedom to think as I choose to think",
//     "avatar": "efcb0b45-90bf-494e-bba4-aaa3a9eb28c8",
//     "first_name": "Azin",
//     "last_name": "z",
//     "username": "testazintest46089",
//     "skills": [
//         "AGILE_METHODOLOGIES"
//     ]
// }

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

export function updateCityList(countryCode: string, setCities: Dispatch<SetStateAction<DropdownItem[]>>) {
  getCityList(countryCode)
    .then(({ items }) => citiesToCategories(items))
    .then(setCities);
}
