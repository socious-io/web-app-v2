import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction } from 'react';
import { DropdownItem } from 'src/components/atoms/dropdown/dropdown.types';
import { citiesToCategories } from 'src/core/adaptors';
import { cities as getCities } from 'src/core/api';
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
  setAgreement,
} from 'src/store/reducers/createOrgWizard.reducer';

export function updateCityList(dispatcher: Dispatch<SetStateAction<DropdownItem[]>>) {
  return (countryCode: string) => {
    getCities(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(dispatcher);
  };
}

export function formIsInvalid(isValid: boolean, formValues: CreateOrgWizard): boolean {
  return isValid === false || formValues.geoname_id === 0;
}

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
      case 'agreement':
        dispatch(setAgreement(value));
        break;
    }
  };
}
