import React, { useContext, useState } from 'react';
import StepHeader from '../stepHeader';
import css from './location.module.scss';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { Button } from 'src/components/atoms/button/button';
import { StepsContext } from '../steper';
import { useUser } from '../../sign-up-user-onboarding.context';
import { getCityList } from 'src/pages/job-create/info/info.services';
import { citiesToCategories } from 'src/core/adaptors';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';

const Location: React.FC = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const { state, updateUser } = useUser();
  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }
  return (
    <div className={css['container']}>
      <StepHeader
        className={css['header']}
        title="What’s your location?"
        subTitle="Connect with other like-minded individuals and organizations around you"
      />

      <div className={css['form']}>
        <div className={css['form__item']}>
          <Dropdown
            label="Country"
            placeholder="country"
            name="country"
            defaultValue={state.country}
            list={COUNTRIES}
            value={country}
            onValueChange={(option) => {
              updateUser({ ...state, country: option.value });
              updateCityList(option.value as string);
            }}
          />
        </div>

        <Dropdown defaultValue={state.city} label="City" placeholder="city" name="city" value="" list={cities} />
      </div>
      <div className={css['buttons']}>
        <Button disabled={!(state.city !== '' && state.country !== '')} onClick={() => updateSelectedStep(4)}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Location;
