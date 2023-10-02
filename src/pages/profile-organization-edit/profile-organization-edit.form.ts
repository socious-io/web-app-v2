import { required } from 'src/core/form';
import { email } from 'src/core/form/customValidators/customValidators';
import { FormModel } from 'src/core/form/useForm/useForm.types';

import { maxArrayLength, minArrayLength, website } from './../../core/form/customValidators/customValidators';
import { ProfileReq } from '../profile-user/profile-user.types';

export function generateFormModel(organization: ProfileReq): FormModel {
  return {
    type: { initialValue: organization.type },
    cover_image: { initialValue: organization.cover_image?.id },
    image: { initialValue: organization?.image?.id },
    name: { initialValue: organization.name, validators: [required()] },
    bio: { initialValue: organization.bio, validators: [required()] },
    social_causes: {
      initialValue: organization.social_causes,
      validators: [
        minArrayLength({ message: 'You have to choose at least one social cause', minValue: 1 }),
        maxArrayLength({ message: 'You should not choose more than 5 items', maxValue: 5 }),
      ],
    },
    email: { initialValue: organization.email, validators: [required(), email()] },
    country: { initialValue: organization.country },
    city: { initialValue: organization.city },
    geoname_id: { initialValue: organization.geoname_id },
    address: { initialValue: organization.address },
    mobile_country_code: { initialValue: organization.mobile_country_code },
    phone: { initialValue: organization.phone },
    website: { initialValue: organization.website, validators: [website()] },
    mission: { initialValue: organization.mission },
    culture: { initialValue: organization.culture },
  };
}
