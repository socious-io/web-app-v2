import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch, ChangeEvent, SetStateAction } from 'react';
import { citiesToCategories } from '../../../core/adaptors';
import {
  CreateOrgWizard,
  setAddress,
  setBio,
  setCity,
  setCountry,
  setCountryMobileCode,
  setGeonameId,
  setOrganizationEmail,
  setOrganizationName,
  setPhoneNumber,
  setWebsite,
} from '../../../store/reducers/createOrgWizard.reducer';
import { DropdownItem } from '../../../components/atoms/dropdown/dropdown.types';
import { getCityList } from '../../job-create/info/info.services';
import { ControlObjectModel, FormModel } from '../../../core/form/useForm/useForm.types';

export function updateCityList(dispatcher: Dispatch<SetStateAction<DropdownItem[]>>) {
  return (countryCode: string) => {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(dispatcher);
  };
}

export function formModel(formState: CreateOrgWizard) {
  return {
    organizationName: { initialValue: formState.organizationName },
    bio: { initialValue: formState.bio },
    organizationEmail: { initialValue: formState.organizationEmail },
    country: { initialValue: formState.country },
    address: { initialValue: formState.address },
    countryMobileCode: { initialValue: formState.countryMobileCode },
    phoneNumber: { initialValue: formState.phoneNumber },
    website: { initialValue: formState.website },
  };
}

// export const formModel: FormModel = {
//   organizationName: { initialValue: '' },
//   bio: { initialValue: '' },
//   organizationEmail: { initialValue: '' },
//   country: { initialValue: '' },
//   address: { initialValue: '' },
//   countryMobileCode: { initialValue: '' },
//   phoneNumber: { initialValue: '' },
//   website: { initialValue: '' },
// };

// export function formIsValid(isValid: boolean, formValues: CreateOrgWizard): boolean {
//   return isValid === false || formValues.geoname_id === 0;
// }

export function updateForm(dispatch: Dispatch<AnyAction>) {
  return (fieldName: keyof CreateOrgWizard, value: string | number | string[]) => {
    switch (fieldName) {
      case 'organizationName':
        dispatch(setOrganizationName(value));
        break;
      case 'bio':
        dispatch(setBio(value));
        break;
      case 'organizationEmail':
        dispatch(setOrganizationEmail(value));
        break;
      case 'country':
        dispatch(setCountry(value));
        break;
      case 'geoname_id':
        dispatch(setGeonameId(value));
        break;
      case 'city':
        dispatch(setCity(value));
        break;
      case 'address':
        dispatch(setAddress(value));
        break;
      case 'countryMobileCode':
        dispatch(setCountryMobileCode(value));
        break;
      case 'phoneNumber':
        dispatch(setPhoneNumber(value));
        break;
      case 'website':
        dispatch(setWebsite(value));
        break;
    }
  };
}
