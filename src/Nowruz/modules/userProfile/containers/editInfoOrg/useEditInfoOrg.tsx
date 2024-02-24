import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Location, Organization, User, getIndustries, identities, preRegister, searchLocation } from 'src/core/api';
import { checkUsernameConditions } from 'src/core/utils';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateOrgProfile } from 'src/store/thunks/profile.thunks';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Required'),
    username: yup.string().required('Required'),
    city: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    country: yup.string(),
    industry: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    size: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    summary: yup.string().required('Required'),
    socialCauses: yup
      .array()
      .of(
        yup.object().shape({
          label: yup.string(),
          value: yup.string(),
        }),
      )
      .min(1, 'Select at least one social cause'),
  })
  .required();

export const useEditInfoOrg = (handleClose: () => void) => {
  const dispatch = useDispatch();
  const org = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as Organization;

  const [isUsernameValid, setIsusernameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const [letterCount, setLetterCount] = useState(org.mission?.length);
  const keyItems = Object.keys(SOCIAL_CAUSES);
  const socialCauseItems = keyItems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
    watch,
    setValue,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: org.name,
      username: org.shortname,
      city: { label: org.city, value: org.city },
      country: org.country,
      summary: org.mission,
      industry: { label: org.industry, value: org.industry },
      size: org.size
        ? { label: ORGANIZATION_SIZE.find((item) => item.value === org.size)?.label, value: org.size }
        : { label: '', value: '' },
      socialCauses: socialCausesToCategory(org?.social_causes),
    },
  });

  const username = watch('username');
  const checkUsernameAvailability = async (username: string) => {
    const checkUsername = await preRegister({ username });
    setIsusernameAvailable(checkUsername.username === null);
  };
  const debouncedCheckUsername = debounce(checkUsernameAvailability, 800);

  useEffect(() => {
    const usernameConditionErrors = checkUsernameConditions(username);
    const hasUsernameConditionErrors = !!usernameConditionErrors;
    if (hasUsernameConditionErrors) {
      setIsusernameValid(false);
      setError('username', { type: 'manual', message: usernameConditionErrors });
      return;
    }
    if (username) {
      debouncedCheckUsername(username);
      setIsusernameValid(isUsernameAvailable);
      if (isUsernameAvailable) {
        clearErrors('username');
      } else {
        setError('username', { type: 'manual', message: 'Username is not available' });
      }
    } else {
      setIsusernameValid(false);
      setError('username', { type: 'manual', message: 'Username is required' });
    }
  }, [username, isUsernameAvailable]);

  useEffect(() => {
    reset({
      name: org.name,
      username: org.shortname,
      city: { label: org.city, value: org.city },
      country: org.country,
      summary: org.mission,
      industry: { label: org.industry, value: org.industry },
      size: org.size
        ? { label: ORGANIZATION_SIZE.find((item) => item.value === org.size)?.label, value: org.size }
        : { label: '', value: '' },
      socialCauses: socialCausesToCategory(org?.social_causes),
    });
  }, [org]);

  const handleChangeSummary = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 2600) {
      setValue('summary', value, { shouldValidate: true });
      setLetterCount(value.length);
    } else
      setError('summary', {
        type: 'manual',
        message: 'Too long',
      });
  };

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
  async function updateIdentityList() {
    return identities().then((resp) => dispatch(setIdentityList(resp)));
  }

  const onSelectSize = (orgSize) => {
    setValue('size', { value: orgSize.value, label: orgSize.label }, { shouldValidate: true });
  };
  const saveOrg = async () => {
    const { name, username, city, country, summary, socialCauses, industry, size } = getValues();
    const updatedOrg = {
      ...org,
      name: name.trim(),
      shortname: username,
      city: city.label,
      country: country,
      mission: summary,
      social_causes: socialCauses?.map((item) => item.value),
      industry: industry.label,
      size: size.value,
    };
    await store.dispatch(updateOrgProfile(updatedOrg as Organization));
    await updateIdentityList();
    handleClose();
  };

  const closeModal = () => {
    handleClose();
    reset();
  };

  const changeSocialCauses = (newVal) => {
    setValue('socialCauses', newVal, { shouldValidate: true });
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
    socialCauses: getValues().socialCauses,
    changeSocialCauses,
    socialCauseItems,
    searchIndustries,
    onSelectIndustry,
    industry: getValues().industry,
    saveOrg,
    closeModal,
    summary: getValues().summary,
    handleChangeSummary,
    letterCount,
    size: getValues().size,
    sizeOptions: ORGANIZATION_SIZE,
    onSelectSize,
  };
};
