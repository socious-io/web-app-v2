import { yupResolver } from '@hookform/resolvers/yup';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrganization, getIndustries, Location, preRegister, searchLocation,identities } from 'src/core/api';
import { CurrentIdentity, uploadMedia } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { checkUsernameConditions, removeValuesFromObject } from 'src/core/utils';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import * as yup from 'yup';

type Inputs = {
  email: string;
  username: string;
};
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter a correct email')
    .required('Email is required'),
  username: yup.string().required('username is required'),
});

export const useOrganizationContact = () => {
  const { state, updateUser, reset } = useUser();
  const [isUsernameValid, setIsusernameValid] = useState(false);
  const isMobile = isTouchDevice();
  const [isShortnameValid, setIsShortnameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const currentIdentity = useSelector<RootState, CurrentIdentity>((state) => {
    const current = state.identity.entities.find((identity) => identity.current);
    return current as CurrentIdentity;
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { orgName, orgType, social_causes, bio, image, city, country, email, website, size, shortname, industry } =
      state;
    try {
      const new_identities = await identities();
      const websiteUrl = state.website ? 'https://' + state.website : '';
      await createOrganization(
        removeValuesFromObject(
          {
            name: orgName,
            type: orgType.value,
            size: size.value,
            social_causes,
            bio,
            email,
            website: websiteUrl,
            city,
            country,
            shortname: shortname.toLowerCase(),
            industry,
          },
          ['', null],
        ),
      );
      localStorage.removeItem('registerFor');
      reset();
      dispatch(setIdentityList(new_identities));
      if (isMobile) {
        navigate(`/sign-up/user/notification`, {
          state: {
            username: shortname,
          },
        });
      }

      else navigate(`/profile/organizations/${shortname}/view`);
    } catch (error) {}
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
  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      label: JSON.stringify({ label: `${city.name}, ${city.country_name}`, description: city.timezone_utc }),
      value: city.country_code,
      city: city.name,
    }));
  };
  const searchIndustries = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await getIndustries(searchText, { page: 1, limit: 20 });
        cb(response.items.map((i) => ({ value: i.name, label: i.name })));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };
  const onSelectIndustry = (industry) => {
    updateUser({ ...state, industry: industry.value });
  };

  const checkUsernameAvailability = async (shortname: string) => {
    const checkUsername = await preRegister({ shortname });
    if (checkUsername.shortname === null) {
      setIsusernameValid(true);
      clearErrors('username');
      setIsShortnameValid(true);
    } else {
      setIsusernameValid(false);
      setError('username', {
        type: 'manual',
        message: 'Username is not available',
      });
      setIsShortnameValid(false);
    }
  };
  const debouncedCheckUsername = debounce(checkUsernameAvailability, 800);

  useEffect(() => {
    const usernameConditionErrors = checkUsernameConditions(state.shortname);
    clearErrors('username');
    setIsusernameValid(false);
    if (usernameConditionErrors) {
      setIsusernameValid(false);
      setError('username', {
        type: 'manual',
        message: usernameConditionErrors,
      });
    } else if (!usernameConditionErrors && state.shortname) {
      debouncedCheckUsername(state.shortname);
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
  }, [state.shortname]);

  const onSelectCity = (location) => {
    updateUser({ ...state, city: location.city, country: location.value, cityLabel: location.label });
  };

  const onSelectSize = (size) => {
    updateUser({ ...state, size });
  };

  const updateEmail = (email: string) => updateUser({ ...state, email });
  const updateUsername = (shortname: string) => updateUser({ ...state, shortname });

  const updateWebsite = (website: string) => {
    updateUser({ ...state, website });
  };
  const isFormValid =
    state.city !== '' && state.size !== null && state.emali !== '' && state.industry !== '' && state.shortname !== '';

  const cityValue = state?.cityLabel ? { label: state.cityLabel } : state?.city ? { label: state.city } : null;
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    control,
    setValue,
    searchCities,
    updateEmail,
    updateWebsite,
    onSelectCity,
    onSelectSize,
    isFormValid,
    isUsernameValid,
    updateUsername,
    isShortnameValid,
    searchIndustries,
    onSelectIndustry,
    industry: state.industry,
    cityValue,
    email: state.email,
    username: state.shortname,
    website: state.website,
  };
};
