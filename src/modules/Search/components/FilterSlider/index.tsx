import type { FC } from 'react';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
// import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import Accordion from 'src/modules/general/components/Accordion';
import { Button } from 'src/modules/general/components/Button';
import CheckboxGroup from 'src/modules/general/components/CheckboxGroup';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import { RadioGroup } from 'src/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import { FilterReq } from 'src/pages/search/useSearch';
import variables from 'src/styles/constants/_exports.module.scss';

import { useFilterSlider } from './useFilterSlider';

export type FilterSliderProps = {
  type: string;
  onApply: (filter: FilterReq) => void;
  onClose: () => void;
  filter: FilterReq;
};

export const FilterSlider: FC<FilterSliderProps> = ({ type, onApply, onClose, filter }) => {
  const {
    data: { filters, causesItems, skillItems, languageItems, categoriesList, paymentTypeOptions, eventItems },
    operations: {
      onSelectMultiSelect,
      onSelectCity,
      searchCities,
      onSelectCheckboxes,
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
          isClearable={!!filters.location?.value}
          icon="search-lg"
          hasDropdownIcon={!filters.location?.value}
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
          onChange={value => onSelectCheckboxes('jobLength', value)}
        />

        <CheckboxGroup
          id="experience-level"
          label="Experience level"
          items={EXPERIENCE_LEVEL_V2}
          selectedItems={filters.experienceLevel}
          onChange={value => onSelectCheckboxes('experienceLevel', value)}
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
        className="mb-6"
        icon="search-lg"
        hasDropdownIcon={true}
        placeholder="Select a location"
        onChange={onSelectCity}
      />
    );
  };

  const renderPeopleFilters = () => {
    return (
      <>
        <MultiSelect
          id="languages"
          searchTitle="Languages"
          items={languageItems}
          maxLabel=""
          max={10}
          componentValue={filters.languages}
          setComponentValue={value => onSelectMultiSelect('languages', value)}
          chipBorderColor={variables.color_grey_200}
          chipBgColor={variables.color_grey_50}
          chipFontColor={variables.color_grey_700}
          popularLabel={false}
          customHeight="135px"
          displayDefaultBadges={false}
        />
        <SearchDropdown
          id="location"
          label="Location"
          isAsync
          value={filters.location}
          loadOptions={searchCities}
          isClearable={!!filters.location?.value}
          icon="search-lg"
          hasDropdownIcon={!filters.location?.value}
          placeholder="Select a location"
          onChange={onSelectCity}
        />
        <SearchDropdown
          id="event"
          label="Event"
          icon="search-lg"
          placeholder="Select an event"
          value={filters.events}
          options={eventItems}
          isSearchable
          isClearable={!!filters.events}
          hasDropdownIcon={!filters.events}
          onChange={value => onSelectSearchDropdown('events', value)}
          controlClassName="rounded-2xl border border-solid border-Purple-200 bg-Purple-50 text-Purple-700 py-0.5 px-2"
        />
        {/* <SearchDropdown
          id="preference"
          label="Remote preference"
          value={filters.preference}
          options={PROJECT_REMOTE_PREFERENCES_V2}
          isSearchable
          icon="search-lg"
          hasDropdownIcon={true}
          onChange={value => onSelectSearchDropdown('preference', value)}
        /> */}
        {/* <CheckboxGroup
          id="experience-level"
          label="Experience level"
          items={EXPERIENCE_LEVEL_V2}
          selectedItems={filters.experienceLevel}
          onChange={value => onSelectCheckboxes('experienceLevel', value)}
        /> */}
        {/* <div className="flex gap-2">
          <ToggleButton checked={!!filters.openToVolunteer} onChange={onChangeOpenToVolunteer} size="small" />
          <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">Open to volunteer</span>
        </div> */}
      </>
    );
  };

  return (
    <>
      <div className="flex flex-col gap-6 h-auto pt-6 pb-[78px]">
        <MultiSelect
          id="social-causes"
          searchTitle="Social causes"
          max={5}
          maxLabel=""
          items={causesItems}
          componentValue={filters.causes}
          setComponentValue={value => onSelectMultiSelect('causes', value)}
          customHeight="135px"
          popularLabel={false}
          displayDefaultBadges={false}
        />
        {type !== 'organization' && (
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
        {type === 'organization' && renderOrganizationFilters()}
        {type === 'jobs' && renderJobFilters()}
        {type === 'people' && renderPeopleFilters()}
      </div>
      <div
        className="flex justify-end items-center fixed bottom-6 p-4 w-[400px] h-[78px]
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
