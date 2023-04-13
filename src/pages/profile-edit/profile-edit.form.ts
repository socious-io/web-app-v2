import { required } from 'src/core/form';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { ProfileReq } from '../profile/profile.types';

export function generateFormModel(profile: ProfileReq): FormModel {
  return {
    first_name: { initialValue: profile.first_name, validators: [required()] },
    last_name: { initialValue: profile.last_name, validators: [required()] },
    bio: { initialValue: profile.bio },
    username: { initialValue: profile.username, validators: [required()] },
    mission: { initialValue: profile.mission },
    country: { initialValue: profile.country },
    city: { initialValue: profile.city },
    address: { initialValue: profile.address },
    geoname_id: { initialValue: profile.geoname_id },
    mobile_country_code: { initialValue: profile.mobile_country_code },
    phone: { initialValue: profile.phone },
    cover_image: { initialValue: profile?.cover_image?.id },
    avatar: { initialValue: profile?.avatar?.id },
    social_causes: { initialValue: profile.social_causes, validators: [required()] },
    skills: { initialValue: profile.skills, validators: [required()] },
  };
}
