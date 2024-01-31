import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { socialCausesToCategory } from 'src/core/adaptors';
import {
  Language,
  Location,
  Organization,
  User,
  addLanguage,
  identities,
  preRegister,
  removeLanguage,
  searchLocation,
  updateLanguage,
} from 'src/core/api';
import { checkUsernameConditions } from 'src/core/utils';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateUserProfile } from 'src/store/thunks/profile.thunks';
import * as yup from 'yup';

import { Error, LanguageProps } from './editInfo.types';

export const useEditInfo = (handleClose: () => void) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as User;

  const mapLanguageToItems = (languages: Language[]) => {
    const mappedObj = languages.map((item) => {
      return { id: item.id, name: item.name, level: item.level, isNew: false } as LanguageProps;
    });
    return mappedObj;
  };

  const [languages, setLanguages] = useState<LanguageProps[]>(mapLanguageToItems(user?.languages || []));
  const [isUsernameValid, setIsusernameValid] = useState(false);
  const [usernameValidError, setusernameValidError] = useState('');
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const [langErrors, setLangErrors] = useState<Error[]>([]);

  const keyItems = Object.keys(SOCIAL_CAUSES);
  const socialCauseItems = keyItems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });

  const [letterCount, setLetterCount] = useState(user?.bio?.length || 0);

  const checkUsernameAvailability = async (username: string) => {
    const checkUsername = await preRegister({ username });
    setIsusernameAvailable(checkUsername.username === null);
  };

  const debouncedCheckUsername = debounce(checkUsernameAvailability, 800);

  const schema = yup
    .object()
    .shape({
      username: yup
        .string()
        .required('Username is required')
        .test('checkUsernameValidity', usernameValidError, function (value) {
          return isUsernameValid;
        })
        .test('checkUsernameAvailabality', 'Username is not available', function (value) {
          return isUsernameAvailable;
        }),

      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      city: yup.object().shape({
        label: yup.string().required('City is required'),
        value: yup.string(),
      }),
      country: yup.string(),
      bio: yup.string().required('Headline is required'),
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
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      city: { label: user.city, value: user.city },
      country: user.country,
      bio: user.bio,
      socialCauses: socialCausesToCategory(user?.social_causes),
    },
  });

  const username = watch('username');
  useEffect(() => {
    if (username) {
      if (username === user.username) {
        setusernameValidError('');
        setIsusernameValid(true);
        setIsusernameAvailable(true);
      } else {
        debouncedCheckUsername(username);
        const checkResult = checkUsernameConditions(username);
        setusernameValidError(checkResult || '');
        setIsusernameValid(!checkResult);
      }
    }
  }, [username]);

  useEffect(() => {
    if (isUsernameAvailable) {
      clearErrors('username');
    } else {
      setError('username', { type: 'manual', message: 'Username is not available' });
    }
  }, [isUsernameAvailable]);

  const resetState = () => {
    reset({
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
      city: { label: user.city, value: user.city },
      country: user.country,
      bio: user.bio,
      socialCauses: socialCausesToCategory(user?.social_causes),
    });
  };

  useEffect(() => {
    resetState();
  }, [user]);

  const handleChangeBio = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length <= 160) {
      setValue('bio', value, { shouldValidate: true });
      setLetterCount(value.length);
    } else
      setError('bio', {
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

  async function updateIdentityList() {
    return identities().then((resp) => dispatch(setIdentityList(resp)));
  }

  const closeModal = () => {
    resetState();
    handleClose();
  };

  const saveUser = async () => {
    if (langErrors.length) return;
    const updatedUser = {
      ...user,
      first_name: getValues().firstName.trim(),
      last_name: getValues().lastName.trim(),
      username: getValues().username,
      bio: getValues().bio,
      city: getValues().city.label,
      country: getValues().country,
      social_causes: getValues().socialCauses?.map((item) => item.value),
    };

    const promises: Promise<any>[] = [];
    const newLanguages = languages.filter((l) => l.isNew);
    newLanguages.forEach((item) => {
      if (item.name && item.level) promises.push(addLanguage({ name: item.name, level: item.level }));
    });

    const updatedLanguages = languages.filter((l) => !l.isNew);
    updatedLanguages.forEach((item) => {
      if (item.name && item.level) promises.push(updateLanguage(item.id, { name: item.name, level: item.level }));
    });

    const deletedLanguages = user?.languages?.filter((item) => !languages.map((l) => l.id).includes(item.id));
    deletedLanguages?.forEach((item) => {
      promises.push(removeLanguage(item.id));
    });

    await Promise.all(promises);
    await store.dispatch(updateUserProfile(updatedUser as User));
    await updateIdentityList();
    handleClose();
  };

  const changeSocialCauses = (newVal) => {
    setValue('socialCauses', newVal, { shouldValidate: true });
  };
  return {
    register,
    user,
    isUsernameValid,
    searchCities,
    onSelectCity,
    city: getValues().city,
    socialCauseItems,
    socialCauses: getValues().socialCauses,
    changeSocialCauses,
    handleSubmit,
    saveUser,
    languages,
    setLanguages,
    errors,
    langErrors,
    setLangErrors,
    closeModal,
    letterCount,
    bio: getValues().bio,
    handleChangeBio,
    isUsernameAvailable,
  };
};
