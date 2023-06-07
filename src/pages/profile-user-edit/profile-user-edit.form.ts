import { required } from 'src/core/form';
import { ControlPrimitiveValue, FormModel, Validator } from 'src/core/form/useForm/useForm.types';
import { ProfileReq } from '../profile-user/profile-user.types';

export const maxArrayLength = (max: number): Validator => ({
  name: 'maxArrayLength',
  message: 'array length incorrect',
  validateWith: (value: ControlPrimitiveValue) => {
    console.log('vlidatewith: ', value);
    if ((value as string[]).length > max) {
      return false;
    } else {
      return true;
    }
  },
});

const arrayRequired = () => {
  return {
    name: 'arrReq',
    message: 'array should be less than 5',
    validateWith: (value) => {
      console.log('validating...');
      return value.length < 5;
    },
  };
};

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
    social_causes: { initialValue: profile.social_causes, validators: [arrayRequired()] },
    skills: { initialValue: profile.skills, validators: [required()] },
  };
}
