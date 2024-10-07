import { Button } from 'src/modules/general/components/Button';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import css from './city.module.scss';
import { useCity } from './useCity';
export const City = () => {
  const { searchCities, onSelectCity, updateSelectedStep, isFormValid, value } = useCity();
  return (
    <div className="md:pt-24 px-4 flex flex-col">
      <div className={css.header}>
        <div>
          <h1 className={css.title}>Where are you located?</h1>
        </div>
        <div>
          <h2 className={css.description}>Add your location</h2>
        </div>
      </div>
      <div className="mt-6 mb-4">
        <SearchDropdown
          id="city"
          placeholder="Search for a city"
          value={value}
          isAsync
          loadOptions={searchCities}
          className="my-5"
          icon="search-lg"
          hasDropdownIcon={false}
          label="Location*"
          onChange={value => {
            onSelectCity(value);
          }}
        />
      </div>
      <div className="flex-grow"></div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer}`}>
        <Button disabled={!isFormValid} color="primary" block onClick={() => updateSelectedStep(5)}>
          Next: Photo
        </Button>
      </div>
    </div>
  );
};
