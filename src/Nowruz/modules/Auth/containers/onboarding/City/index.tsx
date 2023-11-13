import { Button } from 'src/Nowruz/modules/general/components/Button';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import css from './city.module.scss';
import { useCity } from './useCity';
export const City = () => {
  const { searchCities, options, onSelectCity, updateSelectedStep, isFormValid, city } = useCity();
  return (
    <div className="md:pt-24 px-4 flex flex-col">
      <div className={css.header}>
        <div className={css.title}>
          <h1>Where are you located?</h1>
        </div>
        <div className={css.description}>
          <h2>Add your location</h2>
        </div>
      </div>
      <SearchDropdown
        value={city}
        onChange={searchCities}
        className="mt-6 mb-4"
        placeholder="Search for a city"
        options={options}
        onInputChange={(event, newValue) => {
          searchCities(newValue);
        }}
        onChange={(event, newValue) => {
          onSelectCity(newValue);
        }}
        label="Location*"
        disableClearable={true}
      />
      <div className="flex-grow"></div>
      <div className="mt-6">
        <Button disabled={!isFormValid} color="primary" block onClick={() => updateSelectedStep(4)}>
          Next: Photo
        </Button>
      </div>
    </div>
  );
};
