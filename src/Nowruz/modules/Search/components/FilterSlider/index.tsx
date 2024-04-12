import type { FC } from 'react';
import variables from 'src/components/_exports.module.scss';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
// import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import Accordion from 'src/Nowruz/modules/general/components/Accordion';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import CheckboxGroup from 'src/Nowruz/modules/general/components/CheckboxGroup';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
import { FilterReq } from 'src/Nowruz/pages/search/useSearch';

import { useFilterSlider } from './useFilterSlider';

export type FilterSliderProps = {
  type: string;
  onApply: (filter: FilterReq) => void;
  onClose: () => void;
  filter: FilterReq;
};

export const FilterSlider: FC<FilterSliderProps> = ({ type, onApply, onClose, filter }) => {
  const {
    data: { filters, causesItems, skillItems, categoriesList, paymentTypeOptions },
    operations: {
      onSelectMultiSelect,
      onSelectCity,
      searchCities,
      onSelectCheckboxs,
      onSelectSearchDropdown,
      onSelectPaymentType,
      handleApply,
    },
  } = useFilterSlider(onApply, filter, type);

  const renderJobFilters = () => {
    return (
      <Accordion title="Job Preferences" expand={true} contentClassName="flex flex-col gap-6">
        <SearchDropdown
          id="location"
          label="Location"
          isAsync
          value={filters.location}
          loadOptions={searchCities}
          defaultOptions
          isClearable
          icon="search-lg"
          hasDropdownIcon={true}
          placeholder="Select a location"
          onChange={onSelectCity}
        />

        <SearchDropdown
          id="preference"
          label="Remote preference"
          value={filters.preference}
          options={PROJECT_REMOTE_PREFERENCES_V2}
          isSearchable
          icon="search-lg"
          hasDropdownIcon={true}
          onChange={value => onSelectSearchDropdown('preference', value)}
        />

        <SearchDropdown
          id="job-category"
          label="Job category"
          value={filters.jobCategory}
          options={categoriesList}
          isSearchable
          icon="search-lg"
          hasDropdownIcon={true}
          placeholder="Select a category"
          onChange={value => onSelectSearchDropdown('jobCategory', value)}
        />

        <CheckboxGroup
          id="job-length"
          label="Job length"
          items={PROJECT_LENGTH_V2}
          selectedItems={filters.jobLength}
          onChange={value => onSelectCheckboxs('jobLength', value)}
        />

        <CheckboxGroup
          id="experience-level"
          label="Experience level"
          items={EXPERIENCE_LEVEL_V2}
          selectedItems={filters.experienceLevel}
          onChange={value => onSelectCheckboxs('experienceLevel', value)}
        />

        <RadioGroup
          id="payment-type"
          label="Payment type"
          items={paymentTypeOptions}
          selectedItem={filters.paymentType}
          onChange={onSelectPaymentType}
        />
      </Accordion>
    );
  };

  const renderOrganizationFilters = () => {
    return (
      <SearchDropdown
        id="location"
        label="Location"
        isAsync
        value={filters.location}
        loadOptions={searchCities}
        defaultOptions
        className="mb-6"
        icon="search-lg"
        hasDropdownIcon={true}
        placeholder="Select a location"
        onChange={onSelectCity}
      />
    );
  };

  return (
    <>
      <div className="h-auto py-6">
        <div className="pb-4">
          <MultiSelect
            id="social-causes"
            searchTitle="Social causes"
            max={5}
            maxLabel=""
            items={causesItems.slice(0, 30)}
            componentValue={filters.causes}
            setComponentValue={value => onSelectMultiSelect('causes', value)}
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
              componentValue={filters.skills}
              setComponentValue={value => onSelectMultiSelect('skills', value)}
              chipBorderColor={variables.color_grey_blue_200}
              chipBgColor={variables.color_grey_blue_50}
              chipFontColor={variables.color_grey_blue_700}
              popularLabel={false}
              customHeight="135px"
              displayDefaultBadges={false}
            />
          </div>
        )}
        {/* <Accordion title="Organization Preferences" expand={true} contentClassName="flex flex-col gap-5">
          <CheckboxGroup
            id="organization-size"
            label="Organization size"
            items={ORGANIZATION_SIZE}
            selectedItems={filters.organizationSize}
            onChange={(value) => onSelectCheckboxs('organizationSize', value)}
          />
        </Accordion> */}
        {type !== 'organization' ? renderJobFilters() : renderOrganizationFilters()}
      </div>
      <div
        className="flex justify-end items-center sticky bottom-0 p-4
      bg-Base-White border-t border-0 border-solid border-Gray-light-mode-200 text-Brand-700 font-semibold m-[-24px]"
      >
        {/* Save search */}
        <div className="flex flex-row gap-2 w-1/2">
          <Button color="secondary" variant="outlined" block onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" block onClick={handleApply}>
            Apply
          </Button>
        </div>
      </div>
    </>
  );
};
