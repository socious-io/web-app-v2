import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { socialCausesToCategory } from 'src/core/adaptors';
import {
  Language,
  Location,
  User,
  addLanguage,
  identities,
  preRegister,
  searchLocation,
  updateLanguage,
} from 'src/core/api';
import { checkUsernameConditions } from 'src/core/utils';
import { MultiSelectItem } from 'src/Nowruz/modules/general/components/multiSelect/multiSelect.types';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateUserProfile } from 'src/store/thunks/profile.thunks';
import * as yup from 'yup';

import { Error, LanguageProps } from './editInfo.types';

const schema = yup
  .object()
  .shape({
    username: yup.string().required('username is required'),
    firstName: yup.string().required('first name is required'),
    lastName: yup.string().required('last name is required'),
    summary: yup.string().required('summary is required'),
  })
  .required();

export const useEditInfo = (closeModal: () => void) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });

  const mapLanguageToItems = (languages: Language[]) => {
    const mappedObj = languages.map((item) => {
      return { id: item.id, name: item.name, level: item.level, isNew: false } as LanguageProps;
    });
    return mappedObj;
  };
  const [cityVal, setCityVal] = useState(!user || !user.city ? null : { label: user.city });
  const [selectedCity, setSelectedCity] = useState(user?.city);
  const [languages, setLanguages] = useState<LanguageProps[]>(mapLanguageToItems(user?.languages || []));
  const [isUsernameValid, setIsusernameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const [langErrors, setLangErrors] = useState<Error[]>([]);
  const [causesErrors, setCausesErrors] = useState<string[]>([]);
  const isFormValid = selectedCity;

  const keyItems = Object.keys(SOCIAL_CAUSES);
  const socialCauseItems = keyItems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });

  const [SocialCauses, setSocialCauses] = useState<MultiSelectItem[]>(socialCausesToCategory(user?.social_causes));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
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
    if (!SocialCauses.length) setCausesErrors(['Please select atleast one cause']);
    else setCausesErrors([]);
  }, [SocialCauses]);

  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
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
    setSelectedCity(location.label);
    setCityVal({ label: location.label });
  };
  async function updateIdentityList() {
    return identities().then((resp) => dispatch(setIdentityList(resp)));
  }

  const saveUser = () => {
    if (langErrors.length || causesErrors.length) return;
    const updatedUser = {
      ...user,
      first_name: getValues().firstName.trim(),
      last_name: getValues().lastName.trim(),
      username: getValues().username,
      mission: getValues().summary,
      city: selectedCity,
      social_causes: SocialCauses.map((item) => item.value),
    };

    const addPromises: Promise<Language>[] = [];
    const newLanguages = languages.filter((l) => l.isNew);
    newLanguages.forEach((item) => {
      if (item.name && item.level) addPromises.push(addLanguage({ name: item.name, level: item.level }));
    });

    const updatePromises: Promise<Language>[] = [];
    const updatedLanguages = languages.filter((l) => !l.isNew);
    updatedLanguages.forEach((item) => {
      if (item.name && item.level) updatePromises.push(updateLanguage(item.id, { name: item.name, level: item.level }));
    });

    store.dispatch(updateUserProfile(updatedUser as User)).then(async () => {
      Promise.all(addPromises);
      Promise.all(updatePromises);
      await updateIdentityList();
      closeModal();
    });
  };

  return {
    register,
    user,
    isUsernameValid,
    searchCities,
    onSelectCity,
    cityVal,
    isFormValid,
    socialCauseItems,
    SocialCauses,
    setSocialCauses,
    handleSubmit,
    saveUser,
    languages,
    setLanguages,
    errors,
    langErrors,
    setLangErrors,
    causesErrors,
  };
};
