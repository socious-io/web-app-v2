import { User } from 'src/core/api';
import { required } from 'src/core/form';
import { minArrayLength, maxArrayLength } from 'src/core/form/customValidators/customValidators';
import { FormModel } from 'src/core/form/useForm/useForm.types';

export function generateFormModel(profile: User): FormModel {
  return {
    first_name: {
      initialValue: profile.first_name,
      validators: [
        required(),
        {
          name: 'notEmpty',
          message: 'Please enter a valid name',
          validateWith: (value: string) => value.trim().length > 0,
        },
      ],
    },
    last_name: {
      initialValue: profile.last_name,
      validators: [
        required(),
        {
          name: 'notEmpty',
          message: 'Please enter a valid name',
          validateWith: (value: string) => value.trim().length > 0,
        },
      ],
    },
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
    social_causes: {
      initialValue: profile.social_causes || [],
      validators: [
        minArrayLength({ message: 'You have to choose at least one social cause', minValue: 1 }),
        maxArrayLength({ message: 'You should not choose more than 5 items', maxValue: 5 }),
      ],
    },
    skills: {
      initialValue: profile.skills || [],
      validators: [
        minArrayLength({ message: 'You have to choose at least one skill', minValue: 1 }),
        maxArrayLength({ message: 'You should not choose more than 10 items', maxValue: 10 }),
      ],
    },
  };
}
