import { website } from './../../core/form/customValidators/customValidators';
import { required } from 'src/core/form';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { ProfileReq } from '../profile-user/profile-user.types';
import { email } from 'src/core/form/customValidators/customValidators';

export function generateFormModel(organization: ProfileReq): FormModel {
  return {
    type: { initialValue: organization.type },
    cover_image: { initialValue: organization.cover_image?.id },
    image: { initialValue: organization.image.id },
    name: { initialValue: organization.name, validators: [required()] },
    bio: { initialValue: organization.bio, validators: [required()] },
    social_causes: { initialValue: organization.social_causes, validators: [required()] },
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
