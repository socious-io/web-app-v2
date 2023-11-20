import { useContext, useState } from 'react';
import { Location, searchLocation } from 'src/core/api';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';

export const useCity = () => {
  const [options, setOptions] = useState([]);
  const { state, updateUser } = useUser();
  const { updateSelectedStep } = useContext(StepsContext);

  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      label: `${city.name}, ${city.region_name}`,
      countryCode: city.country_code,
    }));
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
  const onSelectCity = (location) => {
    updateUser({ ...state, city: location.label, country: location.value });
  };

  const isFormValid = state?.city;
  const city = state.city;
  return { options, onSelectCity, updateSelectedStep, isFormValid, city, searchCities };
};
