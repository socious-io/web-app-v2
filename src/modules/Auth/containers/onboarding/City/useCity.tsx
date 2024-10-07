import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Location, searchLocation } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { RootState } from 'src/store';

export const useCity = () => {
  const { t: translate } = useTranslation();
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);
  const { isImportingLinkedIn } = useSelector((state: RootState) => state.linkedin);
  const [selectedOption, setSelectedOption] = useState();
  const cityToOption = (cities: Location[]) => {
    return cities.map(city => ({
      label: JSON.stringify({ label: `${city.name}, ${city.country_name}`, description: city.timezone_utc }),
      countryCode: city.country_code,
      city: city.name,
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

  const onSelectCity = location => {
    updateUser({ ...state, city: location.city, country: location.countryCode, cityLabel: location.label });
  };

  const isFormValid = state?.city;
  const value = state?.cityLabel ? { label: state.cityLabel } : state?.city ? { label: state.city } : null;

  const onNextStep = () => updateSelectedStep(isImportingLinkedIn ? 8 : 5);

  return {
    onSelectCity,
    onNextStep,
    isFormValid,
    searchCities,
    selectedOption,
    setSelectedOption,
    value,
    translate,
  };
};
