import type { FC } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useFilterSlider } from './useFilterSlider';

type FilterReq = {
  causes_tags?: Array<string>;
  skills?: Array<string>;
  country?: Array<string>;
  city?: Array<string>;
  label?: { value: string; label: string; countryCode: string };
};

export type FilterSliderProps = {
  type: string;
  onApply: (filter: FilterReq) => void;
  onClose: () => void;
  filter: FilterReq;
};

export const FilterSlider: FC<FilterSliderProps> = ({ type, onApply, onClose, filter }) => {
  const {
    data: { skillItems, skills, causesItems, causes, cityLabel },
    operations: { setSkills, setCauses, onSelectCity, searchCities, handleApply },
  } = useFilterSlider(onApply, filter, type);
  return (
    <div className="h-auto py-4 ">
      <div className="pb-4">
        <MultiSelect
          id={'social-causes'}
          searchTitle={'Social causes'}
          max={5}
          maxLabel=""
          items={causesItems.slice(0, 30)}
          componentValue={causes}
          setComponentValue={setCauses}
          customHeight="135px"
          popularLabel={false}
          displayDefaultBadges={false}
        />
      </div>
      {type !== 'organization' && (
        <div>
          <MultiSelect
            id="skills"
            searchTitle="Skills"
            items={skillItems}
            maxLabel=""
            max={10}
            componentValue={skills}
            setComponentValue={setSkills}
            chipBorderColor={variables.color_grey_blue_200}
            chipBgColor={variables.color_grey_blue_50}
            chipFontColor={variables.color_grey_blue_700}
            popularLabel={false}
            customHeight="135px"
            displayDefaultBadges={false}
          />
        </div>
      )}
      <div>
        <SearchDropdown
          id="location"
          value={cityLabel}
          isAsync
          loadOptions={searchCities}
          defaultOptions
          className="my-5"
          icon="search-lg"
          hasDropdownIcon={true}
          label="Location"
          onChange={(value) => {
            onSelectCity(value);
          }}
        />
      </div>
      <div className="flex justify-end sticky bottom-0">
        <div className="flex flex-row gap-2 w-1/2">
          <Button color="secondary" variant="outlined" block onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" block onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
