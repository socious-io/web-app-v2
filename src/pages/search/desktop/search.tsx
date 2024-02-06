import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { Search as MobileSearch } from 'src/components/atoms/search/search';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { isTouchDevice } from 'src/core/device-type-detector';
import { printWhen } from 'src/core/utils';
import { Filters } from 'src/pages/search/components/filters';

import { DetailOutlet } from './detail-outlet/detail-outlet';
import { LocationFilter } from './filter-bar/location-filter';
import { SkillsFilter } from './filter-bar/skills-filter/skills-filter';
import { SocialCausesFilter } from './filter-bar/social-causes-filter/social-causes-filter';
import css from './search.module.scss';
import { PayloadModel } from './search.types';
import { FiltersModal } from '../components/filters/FiltersModal';
import { OrganizationList } from '../components/organization-list/organization-list';
import { PeopleList } from '../components/people-list/people-list';
import { PostsList } from '../components/posts-list/posts-list';
import { useSearchShared } from '../search.shared';

export const Search = () => {
  const {
    onMorePageClick,
    menu,
    onTypeChange,
    list,
    result,
    findLabelByValue,
    onSocialCausesChange,
    onSkillsChange,
    selectedSkills,
    openSkillsModal,
    setOpenSkillsModal,
    openLocationsModal,
    setOpenLocationsModal,
    clearFilters,
    onLocationChange,
    selectedCities,
    selectedCountries,
    openSocialSkillsModal,
    setOpenSocialSkillsModal,
    selectedSocialCauses,
    setList,
    onLocationRemove,
    shouldShowFilterForEntity,
    getRouterFilters,
  } = useSearchShared();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(useSearchParams());
  const query = getRouterFilters();
  console.log('query', query);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  function onListItemClick(type: PayloadModel['type']) {
    return (id: string) => {
      const isMobile = isTouchDevice();
      switch (type) {
        case 'projects':
          isMobile
            ? navigate(`/jobs/${id}`)
            : setSearchParams((p) => {
                return {
                  ...query,
                  id,
                  type: 'projects',
                  filter: JSON.stringify({
                    ...query.filter,
                  }),
                };
              });
          break;
        case 'users':
          isMobile
            ? navigate(`/profile/users/${id}/view`)
            : setSearchParams(() => {
                return {
                  ...query,
                  id,
                  type: 'users',
                  filter: JSON.stringify({
                    ...query.filter,
                  }),
                };
              });
          break;
        case 'organizations':
          isMobile
            ? navigate(`/profile/organizations/${id}/view`)
            : setSearchParams(() => {
                return {
                  ...query,
                  id,
                  type: 'organizations',
                  filter: JSON.stringify({
                    ...query.filter,
                  }),
                };
              });
          break;
        case 'posts':
          setSearchParams(() => {
            return {
              ...query,
              id,
              type: 'posts',
              filter: JSON.stringify({
                ...query.filter,
              }),
            };
          });
          break;
      }
    };
  }
  function navigateToSearch(q: string) {
    setSearchParams(() => {
      return {
        ...query,
        type: query.type ?? 'projects',
        page: query.page ?? 1,
        filter: JSON.stringify({
          ...query.filter,
        }),
      };
    });
  }
  const paramTypeIsProjects = searchParams.get('type') === 'projects';
  const paramTypeIsUsers = searchParams.get('type') === 'users';
  const paramTypeIsOrganizations = searchParams.get('type') === 'organizations';
  const paramTypeIsPosts = searchParams.get('type') === 'posts';

  const peopleListJSX = (
    <PeopleList
      showMorePage={result > list.length}
      onClick={(people) => {
        onListItemClick('users')(people.username);
        setShowAllFilters(false);
      }}
      data={list}
      onMorePageClick={onMorePageClick}
    />
  );

  const jobListJSX = (
    <JobList
      showMorePage={result > list.length}
      onClick={(id) => {
        onListItemClick('projects')(id);
        setShowAllFilters(false);
      }}
      data={list}
      onMorePageClick={onMorePageClick}
    />
  );
  const filterButtonJSX = (title: string, onClick: () => void, icon: string, isSelected: boolean) => (
    <div
      className={css.btn}
      onClick={onClick}
      style={{ border: isSelected ? '1px solid var(--color-primary-01)' : '0px' }}
    >
      <span>{title}</span>
      <img className={css.chevronDown} src={icon} />
    </div>
  );
  const postsListJsx = (
    <PostsList
      list={list}
      onMorePageClick={onMorePageClick}
      showMorePage={result > list.length}
      onChangeList={(newList) => {
        setList([...newList]);
      }}
    />
  );
  const organizationListJsx = (
    <OrganizationList
      data={list}
      onClick={(id) => {
        setShowAllFilters(false);
        onListItemClick('organizations')(id);
      }}
      showMorePage={result > list.length}
      onMorePageClick={onMorePageClick}
    />
  );
  const mobileSearch = (
    <div className={css.searchBox}>
      <div onClick={() => navigate(-1)} className={css.back}>
        <img src="/icons/chevron-left.svg" />
      </div>
      <div className={css.searchContainer}>
        <MobileSearch placeholder="Search" onEnter={navigateToSearch} defaultValue={query?.q} />
        <div className={css.results}>{result} Results</div>
      </div>
    </div>
  );
  const allFilters = (
    <Filters
      onClear={clearFilters}
      filterdItems={[
        {
          title: 'Skills',
          list: selectedSkills,
          onEdit: () => setOpenSkillsModal(true),
          onRemove: (removedItem) => onSkillsChange(selectedSkills.filter((skill) => skill.value !== removedItem)),
          visible: shouldShowFilterForEntity(searchParams.get('type') as string, 'skills'),
        },
        {
          title: 'Social causes',
          list: selectedSocialCauses,
          onEdit: () => setOpenSocialSkillsModal(true),
          onRemove: (removedItem) =>
            onSocialCausesChange(selectedSocialCauses.filter((skill) => skill.value !== removedItem)),
          visible: shouldShowFilterForEntity(searchParams.get('type') as string, 'socialCauses'),
        },
        {
          title: 'Location',
          list: [...selectedCities, ...selectedCountries],
          onEdit: () => setOpenLocationsModal(true),
          onRemove: (item: string) => onLocationRemove(item),
          visible: shouldShowFilterForEntity(searchParams.get('type') as string, 'location'),
        },
      ]}
    />
  );
  return (
    <div className={css.container}>
      <div className={css.mobileHeaderContainer}>
        {mobileSearch}
        <div className={css.filterBar}>
          <div className={css.filterBarContent}>
            <div className={css.results}>{result} Results</div>
            <DropdownBtn
              onValueChange={onTypeChange}
              placeholder="Type"
              menus={menu}
              value={findLabelByValue(searchParams.get('type'), 'Type')}
            />
            {shouldShowFilterForEntity(searchParams.get('type') as string, 'socialCauses') &&
              filterButtonJSX(
                'Social causes',
                () => setOpenSocialSkillsModal(true),
                '/icons/arrow-down-black.svg',
                !!selectedSocialCauses.length,
              )}
            {shouldShowFilterForEntity(searchParams.get('type') as string, 'skills') &&
              filterButtonJSX(
                'Skills',
                () => setOpenSkillsModal(true),
                '/icons/arrow-down-black.svg',
                !!selectedSkills.length,
              )}
            {shouldShowFilterForEntity(searchParams.get('type') as string, 'location') &&
              filterButtonJSX(
                'Location',
                () => setOpenLocationsModal(true),
                '/icons/arrow-down-black.svg',
                !!selectedCountries.length,
              )}
            {filterButtonJSX(
              'All filters',
              () => {
                isTouchDevice() ? setShowFiltersModal(true) : setShowAllFilters(!showAllFilters);
              },
              '/icons/filters.svg',
              false,
            )}
            <span className={css.resetButton} onClick={clearFilters}>
              Reset
            </span>
          </div>
        </div>
      </div>
      <div className={css.listContainer}>
        <div className={css.listContainerContent}>
          {printWhen(peopleListJSX, paramTypeIsUsers)}
          {printWhen(jobListJSX, paramTypeIsProjects)}
          {printWhen(postsListJsx, paramTypeIsPosts)}
          {printWhen(organizationListJsx, paramTypeIsOrganizations)}
        </div>
        <div className={css.item}>
          {showAllFilters && allFilters}
          {!showAllFilters && <DetailOutlet type={searchParams.get('type')} id={searchParams.get('id')} />}
        </div>
      </div>
      <SocialCausesFilter
        selectedCauses={selectedSocialCauses}
        onSubmit={onSocialCausesChange}
        open={openSocialSkillsModal}
        onClose={() => setOpenSocialSkillsModal(false)}
      />
      <SkillsFilter
        selectedSkills={selectedSkills.map((item) => {
          return item.value;
        })}
        onSubmit={onSkillsChange}
        open={openSkillsModal}
        onClose={() => setOpenSkillsModal(false)}
      />
      <LocationFilter
        onClose={() => setOpenLocationsModal(false)}
        open={openLocationsModal}
        onSubmit={onLocationChange}
      />
      <FiltersModal
        open={showFiltersModal && !openSocialSkillsModal && !openLocationsModal && !openSkillsModal}
        onClose={() => {
          setShowFiltersModal(false);
        }}
      >
        {allFilters}
      </FiltersModal>
    </div>
  );
};
