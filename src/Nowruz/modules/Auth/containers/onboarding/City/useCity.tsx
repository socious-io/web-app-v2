import { useContext, useState } from 'react';
import { Location, searchLocation } from 'src/core/api';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

export const useCity = () => {
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);
  const [selectedOption, setSelectedOption] = useState();
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
    updateUser({ ...state, city: location.label, country: location.countryCode });
  };
  const isFormValid = state?.city;
  const value = state?.city === null ? null : { label: state.city };
  return {
    onSelectCity,
    updateSelectedStep,
    isFormValid,
    searchCities,
    selectedOption,
    setSelectedOption,
    value,
  };
};
