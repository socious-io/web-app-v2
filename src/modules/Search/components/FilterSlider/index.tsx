import type { FC } from 'react';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
// import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { SERVICE_LENGTH } from 'src/constants/SERVICE_LENGTH';
import { translate } from 'src/core/utils'; // Added for translations
import Accordion from 'src/modules/general/components/Accordion';
import { Button } from 'src/modules/general/components/Button';
import CheckboxGroup from 'src/modules/general/components/CheckboxGroup';
import MultiSelect from 'src/modules/general/components/multiSelect/multiSelect';
import { RadioGroup } from 'src/modules/general/components/RadioGroup';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import { ToggleButton } from 'src/modules/general/components/toggleButton';
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
    data: { filters, causesItems, skillItems, categoriesList, paymentTypeOptions, eventItems },
    operations: {
      onSelectMultiSelect,
      onSelectCity,
      searchCities,
      onSelectCheckboxs,
      onSelectSearchDropdown,
      onSelectPaymentType,
      handleApply,
      onChangeOpenToVolunteer,
    },
  } = useFilterSlider(onApply, filter, type);

  const renderJobFilters = () => {
    return (
      <Accordion title={translate('filter-slider.jobPreferences')} expand={true} contentClassName="flex flex-col gap-6">
        <SearchDropdown
          id="location"
          label={translate('filter-slider.location')}
          isAsync
          value={filters.location}
          loadOptions={searchCities}
          isClearable={!!filters.location?.value}
          icon="search-lg"
          hasDropdownIcon={!filters.location?.value}
          placeholder={translate('filter-slider.selectLocation')}
          onChange={onSelectCity}
        />

        <SearchDropdown
          id="preference"
          label={translate('filter-slider.remotePreference')}
          value={filters.preference}
          options={PROJECT_REMOTE_PREFERENCES_V2}
          isSearchable
          icon="search-lg"
          hasDropdownIcon={true}
          onChange={value => onSelectSearchDropdown('preference', value)}
        />

        <SearchDropdown
          id="job-category"
          label={translate('filter-slider.jobCategory')}
          value={filters.category}
          options={categoriesList}
          isSearchable
          icon="search-lg"
          hasDropdownIcon={true}
          placeholder={translate('filter-slider.selectCategory')}
          onChange={value => onSelectSearchDropdown('category', value)}
        />

        <CheckboxGroup
          id="job-length"
          label={translate('filter-slider.jobLength')}
          items={PROJECT_LENGTH_V2}
          selectedItems={filters.length}
          onChange={value => onSelectCheckboxs('length', value)}
        />

        <CheckboxGroup
          id="experience-level"
          label={translate('filter-slider.experienceLevel')}
          items={EXPERIENCE_LEVEL_V2}
          selectedItems={filters.experienceLevel}
          onChange={value => onSelectCheckboxs('experienceLevel', value)}
        />

        <RadioGroup
          id="payment-type"
          label={translate('filter-slider.paymentType')}
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
        label={translate('filter-slider.location')}
        isAsync
        value={filters.location}
        loadOptions={searchCities}
        className="mb-6"
        icon="search-lg"
        hasDropdownIcon={true}
        placeholder={translate('filter-slider.selectLocation')}
        onChange={onSelectCity}
      />
    );
  };

  const renderPeopleFilters = () => {
    return (
      <div className="flex flex-col gap-6">
        <SearchDropdown
          id="location"
          label={translate('filter-slider.location')}
          isAsync
          value={filters.location}
          loadOptions={searchCities}
          isClearable={!!filters.location?.value}
          icon="search-lg"
          hasDropdownIcon={!filters.location?.value}
          placeholder={translate('filter-slider.selectLocation')}
          onChange={onSelectCity}
        />
        <SearchDropdown
          id="event"
          label={translate('filter-slider.event')}
          icon="search-lg"
          placeholder={translate('filter-slider.selectEvent')}
          value={filters.events}
          options={eventItems}
          isSearchable
          isClearable={!!filters.events}
          hasDropdownIcon={!filters.events}
          onChange={value => onSelectSearchDropdown('events', value)}
          controlClassName="rounded-2xl border border-solid border-Purple-200 bg-Purple-50 text-Purple-700 py-0.5 px-2"
        />
      </div>
    );
  };
  const renderServicesFilters = () => {
    return (
      <div className="flex flex-col gap-6">
        {/* <SearchDropdown
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
        /> */}

        <SearchDropdown
          id="service-category"
          label="Service category"
          value={filters.category}
          options={categoriesList}
          isSearchable
          icon="search-lg"
          hasDropdownIcon={true}
          placeholder="Select a category"
          onChange={value => onSelectSearchDropdown('category', value)}
        />

        <CheckboxGroup
          id="service-length"
          label="Delivery time"
          items={SERVICE_LENGTH}
          selectedItems={filters.length}
          onChange={value => onSelectCheckboxs('length', value)}
        />
      </div>
    );
  };
  return (
    <>
      <div className="h-auto py-6">
        {type !== 'services' && (
          <div className="pb-4">
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
          </div>
        )}
        {type !== 'organization' && (
          <div>
            <MultiSelect
              id="skills"
              searchTitle={translate('filter-slider.skills')}
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
        {type === 'organization' && renderOrganizationFilters()}
        {type === 'jobs' && renderJobFilters()}
        {type === 'people' && renderPeopleFilters()}
        {type === 'services' && renderServicesFilters()}
      </div>
      <div className="flex justify-end items-center sticky bottom-0 p-4 bg-Base-White border-t border-0 border-solid border-Gray-light-mode-200 text-Brand-700 font-semibold m-[-24px]">
        <div className="flex flex-row gap-2 w-1/2">
          <Button color="secondary" variant="outlined" block onClick={onClose}>
            {translate('filter-slider.cancel')}
          </Button>
          <Button color="primary" block onClick={handleApply}>
            {translate('filter-slider.apply')}
          </Button>
        </div>
      </div>
    </>
  );
};
