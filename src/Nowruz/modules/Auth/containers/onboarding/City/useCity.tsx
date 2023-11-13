import { useContext, useState } from 'react';
import { Location, searchLocation } from 'src/core/api';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

export const useCity = () => {
  const [options, setOptions] = useState([]);
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);

  const searchCities = async (searchText: string) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        setOptions(cityToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };
  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      label: `${city.name}, ${city.region_name}`,
      countryCode: city.country_code,
    }));
  };
  const onSelectCity = (option) => {
    updateUser({ ...state, city: option.label, country: option.countryCode });
  };

  const isFormValid = state?.city;
  const city = state.city;
  return { searchCities, options, onSelectCity, updateSelectedStep, isFormValid, city };
};
