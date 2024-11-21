import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import {
  createOrganization,
  getIndustries,
  Location,
  preRegister,
  searchLocation,
  identities,
  CurrentIdentity,
  OrganizationReq,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { checkUsernameConditions, removeValuesFromObject } from 'src/core/utils';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
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
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, i18next.t('onboarding-email-error'))
    .required(i18next.t('onboarding-email-required')),
  username: yup.string().required(i18next.t('onboarding-username-required')),
});

export const useOrganizationContact = () => {
  const { state, updateUser, reset } = useUser();
  const [isUsernameValid, setIsusernameValid] = useState(false);
  const isMobile = isTouchDevice();
  const [isShortnameValid, setIsShortnameValid] = useState(false);
  const [isUsernameAvailable, setIsusernameAvailable] = useState(false);
  const { t: translate } = useTranslation();

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

  const savedReferrer = localStorage.getItem('referrer');
  const referrerUser = savedReferrer ? JSON.parse(savedReferrer) : null;

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { orgName, orgType, social_causes, bio, city, country, email, size, shortname, industry } = state;
    try {
      const websiteUrl = state.website ? 'https://' + state.website : '';
      const orgReqParam = removeValuesFromObject(
        {
          name: orgName,
          type: orgType.value,
          size: size?.value,
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
      ) as OrganizationReq;
      await createOrganization(orgReqParam, true, referrerUser?.id);
      localStorage.removeItem('registerFor');
      localStorage.removeItem('referrer');
      reset();

      const new_identities = await identities();
      await dispatch(setIdentityList(new_identities));

      if (isMobile) {
        navigate(`/sign-up/user/notification`, {
          state: {
            username: shortname,
          },
        });
      } else navigate(`${currentIdentity?.type === 'users' ? '/dashboard/user' : `/dashboard/${shortname}/org`}`);
    } catch (error) {
      console.log(translate('onboarding-org-create-error'), error);
    }
  };
  const searchCities = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cb(cityToOption(response.items));
      }
    } catch (error) {
      console.error(translate('onboarding-city-get-error'), error);
    }
  };
  const cityToOption = (cities: Location[]) => {
    return cities.map(city => ({
      label: JSON.stringify({ label: `${city.name}, ${city.country_name}`, description: city.timezone_utc }),
      value: city.country_code,
      city: city.name,
    }));
  };
  const searchIndustries = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await getIndustries(searchText, { page: 1, limit: 20 });
        cb(response.items.map(i => ({ value: i.name, label: i.name })));
      }
    } catch (error) {
      console.error(translate('onboarding-industry-get-error'), error);
    }
  };
  const onSelectIndustry = industry => {
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
        message: translate('onboarding-username-not-available'),
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
          message: translate('onboarding-username-not-available'),
        });
      }
    }
  }, [state.shortname]);

  const onSelectCity = location => {
    updateUser({ ...state, city: location.city, country: location.value, cityLabel: location.label });
  };

  const onSelectSize = size => {
    updateUser({ ...state, size });
  };

  const updateEmail = (email: string) => updateUser({ ...state, email });
  const updateUsername = (shortname: string) => updateUser({ ...state, shortname });

  const updateWebsite = (website: string) => {
    updateUser({ ...state, website });
  };
  const isFormValid =
    state.city !== '' && state.size !== null && state.email !== '' && state.industry !== '' && state.shortname !== '';

  const cityValue = state?.cityLabel ? { label: state.cityLabel } : state?.city ? { label: state.city } : null;

  const orgSizeOptions = ORGANIZATION_SIZE.map(item => {
    return { value: item.value, label: translate(item.value) };
  });
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
    translate,
    orgSizeOptions,
  };
};
