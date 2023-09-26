import { AddOrganizationPayload } from './organization-create.types';
import { post } from '../../core/http';
import { createOrgWizardSlice } from '../../store/reducers/createOrgWizard.reducer';
import { CreateOrgWizard } from '../../store/reducers/createOrgWizard.reducer';

export async function addOrganization(payload: AddOrganizationPayload) {
  return post('/orgs', payload).then(({ data }) => data);
}

export function wizardFormToPayloadAdaptor(wizardForm: CreateOrgWizard): AddOrganizationPayload {
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
