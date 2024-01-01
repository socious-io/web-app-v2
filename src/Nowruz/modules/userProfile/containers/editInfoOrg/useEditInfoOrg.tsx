import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Location, Organization, User, getIndustries, preRegister, searchLocation } from 'src/core/api';
import { checkUsernameConditions } from 'src/core/utils';
import { MultiSelectItem } from 'src/Nowruz/modules/general/components/multiSelect/multiSelect.types';
import { RootState } from 'src/store';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Organization name is required'),
    username: yup.string().required('Username is required'),
    city: yup.object().shape({
      label: yup.string(),
      value: yup.string().required('City is required'),
    }),
    country: yup.string(),
    industry: yup.object().shape({
      label: yup.string(),
      value: yup.string().required('Industry is required'),
    }),
    summary: yup.string().required('Summary is required'),
    socialCauses: yup.array().of(yup.string()).min(1, 'Select at least one social cause'),
  })
  .required();

export const useEditInfoOrg = (handleClose: () => void) => {
  const org = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as Organization;

  const [isUsernameValid, setIsusernameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const keyItems = Object.keys(SOCIAL_CAUSES);
  const socialCauseItems = keyItems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });

  const [socialCauses, setSocialCauses] = useState<MultiSelectItem[]>(socialCausesToCategory(org?.social_causes));

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: org.name,
      username: org.shortname,
      city: { label: org.city, value: '' },
      country: org.country,
      summary: org.mission,
      socialCauses: org.social_causes,
    },
  });

  const username = watch('username');
  const checkUsernameAvailability = async (username: string) => {
    const checkUsername = await preRegister({ username });
    if (checkUsername.username === null) {
      setIsusernameAvailable(true);
    }
  };
  const debouncedCheckUsername = debounce(checkUsernameAvailability, 800);

  useEffect(() => {
    const usernameConditionErrors = checkUsernameConditions(username);
    clearErrors('username');
    setIsusernameValid(false);
    if (usernameConditionErrors) {
      setIsusernameValid(false);
      setError('username', {
        type: 'manual',
        message: usernameConditionErrors,
      });
    } else if (!usernameConditionErrors && username) {
      debouncedCheckUsername(username);
      if (isUsernameAvailable) {
        setIsusernameValid(true);
        clearErrors('username');
      } else {
        setIsusernameValid(false);
        setError('username', {
          type: 'manual',
          message: 'Username is not available',
        });
      }
    }
  }, [username, isUsernameAvailable]);

  useEffect(() => {
    setValue(
      'socialCauses',
      socialCauses.map((item) => item.value),
      { shouldValidate: true },
    );
  }, [socialCauses]);

  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      value: city.id,
      label: `${city.name}, ${city.region_name}`,
      countryCode: city.country_code,
    }));
  };

  const searchCities = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cb(cityToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };
  const onSelectCity = (location) => {
    setValue('city', { value: location.label, label: location.label }, { shouldValidate: true });
    setValue('country', location.countryCode, { shouldValidate: true });
  };

  const searchIndustries = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await getIndustries(searchText, { page: 1, limit: 20 });
        cb(response.items.map((i) => ({ value: i.name, label: i.name })));
      }
    } catch (error) {
      console.error('Error fetching industry data:', error);
    }
  };

  const onSelectIndustry = (industry) => {
    setValue('industry', { value: industry.label, label: industry.label }, { shouldValidate: true });
  };

  const saveOrg = () => {
    return;
  };

  const closeModal = () => {
    handleClose();
  };

  return {
    org,
    register,
    handleSubmit,
    errors,
    isUsernameValid,
    searchCities,
    onSelectCity,
    city: getValues().city,
    socialCauses,
    setSocialCauses,
    socialCauseItems,
    searchIndustries,
    onSelectIndustry,
    industry: getValues().industry,
    saveOrg,
    closeModal,
  };
};
