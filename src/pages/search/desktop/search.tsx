import css from './search.module.scss';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { PeopleList } from '../components/people-list/people-list';
import { PostsList } from '../components/posts-list/posts-list';
import { OrganizationList } from '../components/organization-list/organization-list';
import { printWhen } from 'src/core/utils';
import { useSearchShared } from '../search.shared';
import { SocialCausesFilter } from './filter-bar/social-causes-filter/social-causes-filter';
import { SkillsFilter } from './filter-bar/skills-filter/skills-filter';
import { LocationFilter } from './filter-bar/location-filter';
import { PayloadModel } from './search.types';
import { useLocation, useNavigate } from '@tanstack/react-location';
import { DetailOutlet } from './detail-outlet/detail-outlet';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import { Filters } from 'src/pages/search/components/filters';
import { useState } from 'react';
import { SKILLS } from 'src/constants/SKILLS';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { Search as MobileSearch } from 'src/components/atoms/search/search';
import { isTouchDevice } from 'src/core/device-type-detector';
import { FiltersModal } from '../components/filters/FiltersModal';

export const Search = () => {
  const {
    onMorePageClick,
    menu,
    onTypeChange,
    location,
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
  } = useSearchShared();

  const navigate = useNavigate();
  const { current } = useLocation();
  const { search: params } = current as unknown as { search: { id: string; type: PayloadModel['type'] } };
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [showAllFilters, setShowAllFilters] = useState(false);
  function onListItemClick(type: PayloadModel['type']) {
    return (id: string) => {
      const isMobile = isTouchDevice();
      switch (type) {
        case 'projects':
          isMobile ? navigate({ to: `/jobs/${id}` }) : navigate({ search: (p) => ({ ...p, type: 'projects', id }) });
          break;
        case 'users':
          navigate({ search: (p) => ({ ...p, type: 'users', id }) });
          break;
        case 'organizations':
          navigate({ search: (p) => ({ ...p, type: 'organizations', id }) });
          break;
        case 'posts':
          navigate({ search: (p) => ({ ...p, type: 'posts', id }) });
          break;
      }
    };
  }
  function navigateToSearch(q: string) {
    navigate({
      to: '/d/search',
      search: (p: any) => {
        const type = p.type ?? 'projects';
        const page = p.page ?? 1;
        return { ...p, type, q, page };
      },
      replace: true,
    });
  }
  const paramTypeIsProjects = location.current.search.type === 'projects';
  const paramTypeIsUsers = location.current.search.type === 'users';
  const paramTypeIsOrganizations = location.current.search.type === 'organizations';
  const paramTypeIsPosts = location.current.search.type === 'posts';

  const peopleListJSX = (
    <PeopleList
      showMorePage={result > list.length}
      onClick={(people) => onListItemClick('users')(people.username)}
      data={list}
      onMorePageClick={onMorePageClick}
    />
  );

  const jobListJSX = (
    <JobList
      showMorePage={result > list.length}
      onClick={onListItemClick('projects')}
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
  const postsListJsx = <PostsList list={list} onMorePageClick={onMorePageClick} showMorePage={result > list.length} />;
  const organizationListJsx = (
    <OrganizationList
      data={list}
      onClick={onListItemClick('organizations')}
      showMorePage={result > list.length}
      data={list}
      onMorePageClick={onMorePageClick}
    />
  );
  const mobileSearch = (
    <div className={css.searchBox}>
      <div onClick={() => history.back()} className={css.back}>
        <img src="/icons/chevron-left.svg" />
      </div>
      <div className={css.searchContainer}>
        <MobileSearch placeholder="Search" onEnter={navigateToSearch} defaultValue={location.current?.search?.q} />
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
        },
        {
          title: 'Social causes',
          list: selectedSocialCauses,
          onEdit: () => setOpenSocialSkillsModal(true),
          onRemove: (removedItem) =>
            onSkillsChange(selectedSocialCauses.filter((skill) => skill.value !== removedItem)),
        },
        {
          title: 'Location',
          list: [...selectedCities, ...selectedCountries],
          onEdit: () => setOpenLocationsModal(true),
          onRemove: (item: string) => console.log('this is the item', item),
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
              value={findLabelByValue(location.current.search.type, 'Type')}
            />
            {filterButtonJSX(
              'Social causes',
              () => setOpenSocialSkillsModal(true),
              '/icons/arrow-down-black.svg',
              !!selectedSocialCauses.length
            )}
            {filterButtonJSX(
              'Skills',
              () => setOpenSkillsModal(true),
              '/icons/arrow-down-black.svg',
              !!selectedSkills.length
            )}
            {filterButtonJSX(
              'Location',
              () => setOpenLocationsModal(true),
              '/icons/arrow-down-black.svg',
              !!selectedCountries.length
            )}
            {filterButtonJSX(
              'All filters',
              () => {
                isTouchDevice() ? setShowFiltersModal(true) : setShowAllFilters(!showAllFilters);
              },
              '/icons/filters.svg',
              false
            )}
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
          {!showAllFilters && <DetailOutlet type={params.type} id={params.id} />}
        </div>
      </div>
      <SocialCausesFilter
        onSubmit={onSocialCausesChange}
        open={openSocialSkillsModal}
        onClose={() => setOpenSocialSkillsModal(false)}
      />
      <SkillsFilter
        selectedSkills={selectedSkills}
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
          console.log('close me');
          setShowFiltersModal(false);
        }}
      >
        {allFilters}
      </FiltersModal>
    </div>
  );
};
