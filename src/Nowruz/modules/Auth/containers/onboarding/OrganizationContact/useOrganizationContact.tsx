import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createOrganization, Location, searchLocation } from 'src/core/api';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import * as yup from 'yup';
type Inputs = {
  email: string;
  size: string;
  website: string;
};
const schema = yup.object().shape({
  email: yup.string().email('Enter a correct email').required('Email is required'),
  size: yup.string().required('Organization size is required'),
  website: yup.string().matches(/^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid website URL'),
});

const companySizeOptions = [
  { value: 'A', label: 'Self-employed' },
  { value: 'B', label: '1-10 employees' },
  { value: 'C', label: '11-50 employees' },
  { value: 'D', label: '51-200 employees' },
  { value: 'E', label: '201-500 employees' },
  { value: 'F', label: '501-1000 employees' },
  { value: 'G', label: '1001-5000 employees' },
  { value: 'H', label: '5001-10,000 employees' },
  { value: 'I', label: '10,001+ employees' },
];
export const useOrganizationContact = () => {
  const [options, setOptions] = useState([]);
  const { state, updateUser } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const password = watch('size');

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('sumbitttin', data, password);
  };
  const searchCities = async (searchText: string, cb) => {
    console.log(searchText);
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cb(cityToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };
  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      label: `${city.name}, ${city.region_name}`,
      value: city.country_code,
      detail: city.name,
    }));
  };
  const onSelectCity = (option) => {
    updateUser({ ...state, city: option.label, country: option.countryCode });
  };
  const onCreateOrganization = async () => {
    // updateUser({ ...state, city: option.label, country: option.countryCode });
    const { orgName, orgType, social_causes, bio, image, city, country, email, website } = state;
    try {
      const response = await createOrganization({ name: orgName, type: orgType, social_causes, bio, email });
    } catch (error) {}
  };
  const updateEmail = (email: string) => updateUser({ ...state, email });
  const updateWebsite = (website: string) => updateUser({ ...state, website });
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    companySizeOptions,
    control,
    setValue,
    searchCities,
    options,
    updateEmail,
    updateWebsite,
    onSelectCity,
  };
};
