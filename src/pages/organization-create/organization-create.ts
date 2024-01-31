import { OrganizationReq } from 'src/core/api';
import { CreateOrgWizard } from 'src/store/reducers/createOrgWizard.reducer';

export function wizardFormToPayloadAdaptor(wizardForm: CreateOrgWizard): OrganizationReq {
  const optionalProps: Record<string, keyof CreateOrgWizard> = {
    phone: 'phoneNumber',
    mission: 'mission',
    culture: 'culture',
    mobile_country_code: 'countryMobileCode',
    address: 'address',
    website: 'website',
  };
  const obj = {
    type: wizardForm.type,
    social_causes: wizardForm.socialCauses,
    name: wizardForm.organizationName,
    bio: wizardForm.bio,
    email: wizardForm.organizationEmail,
    country: wizardForm.country,
    city: wizardForm.city,
    geoname_id: wizardForm.geoname_id,
  };
  Object.entries(optionalProps).forEach(([key, value]) => {
    if (wizardForm[value]) {
      Object.assign(obj, { [key]: wizardForm[value] });
    }
  });
  return obj;
}
