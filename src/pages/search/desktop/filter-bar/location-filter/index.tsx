import { Modal } from 'src/components/templates/modal/modal';
import css from './location-filter.module.scss';
import { useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { LocationFilterProps } from './location-filter.types';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { citiesToCategories } from 'src/core/adaptors';
import { getCityList } from 'src/pages/job-create/info/info.services';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';

export const LocationFilter = (props: LocationFilterProps): JSX.Element => {
  const [selectedCountry, setSelectedCountry] = useState<{ label: string; value: string }>();
  const [selectedCity, setSelectedCity] = useState<Array<{ label: string; value: string }>>();

  const [cities, setCities] = useState<DropdownItem[]>([]);

  function onSubmit() {
    props.onSubmit(selectedCountry, selectedCity);
    props.onClose();
  }
  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }
  return (
    <Modal height="45rem" maxHeight="35vh" width="400px" open={props.open} onClose={props.onClose}>
      <div className={css.body}>
        <div>
          <div className={css.country}>
            <Dropdown
              label="Country"
              placeholder="country"
              name="country"
              list={COUNTRIES}
              value={selectedCountry?.label}
              onValueChange={(option) => {
                setSelectedCountry({ value: option.value as string, label: option.label });
                updateCityList(option.value as string);
              }}
            />
          </div>
          <div className={css.city}>
            <Dropdown
              label="City"
              placeholder="city"
              name="city"
              value={selectedCity?.label}
              list={cities}
              onValueChange={(option) => {
                setSelectedCity({ value: option.value as string, label: option.label });
              }}
            />
          </div>
        </div>
        <div className={css.footer}>
          <Button disabled={!(selectedCity && selectedCountry)} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
