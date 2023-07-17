import css from './mobile.module.scss';
import { Search } from 'src/components/atoms/search/search';
import { useSearchShared } from '../search.shared';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { useLocation, useNavigate } from '@tanstack/react-location';
import { PayloadModel } from '../desktop/search.types';
import { SocialCausesFilter } from '../desktop/filter-bar/social-causes-filter/social-causes-filter';
import { SkillsFilter } from '../desktop/filter-bar/skills-filter/skills-filter';
import { printWhen } from 'src/core/utils';
import { PeopleList } from '../components/people-list/people-list';
import { JobList } from 'src/components/organisms/job-list/job-list';

export const Mobile = (): JSX.Element => {
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
  } = useSearchShared();
  const navigate = useNavigate();

  const paramTypeIsProjects = location.current.search.type === 'projects';
  const paramTypeIsUsers = location.current.search.type === 'users';

  function onListItemClick(type: PayloadModel['type']) {
    return (id: string) => {
      switch (type) {
        case 'projects':
          navigate({ to: `/jobs/${id}` });
          break;
        case 'users':
          navigate({ to: `/profile/users/${id}/view` });
          break;
      }
    };
  }

  function navigateToSearch(q: string) {
    navigate({
      to: '/m/search',
      search: (p: PayloadModel) => {
        const type = p.type ?? 'projects';
        const page = p.page ?? 1;
        return { type, q, page };
      },
    });
  }

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

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.searchBox}>
          <div onClick={() => history.back()} className={css.back}>
            <img src="/icons/chevron-left.svg" />
          </div>
          <div className={css.searchContainer}>
            <Search placeholder="Search" onEnter={navigateToSearch} defaultValue={location.current?.search?.q} />
            <div className={css.results}>{result} Results</div>
          </div>
        </div>
        <div className={css.filterBar}>
          <div className={css.filterBar}>
            <div className={css.filterBarContent}>
              <DropdownBtn
                onValueChange={onTypeChange}
                placeholder="Type"
                menus={menu}
                value={findLabelByValue(location.current.search.type, 'Type')}
              />
              <SocialCausesFilter onSubmit={onSocialCausesChange} />
              <SkillsFilter onSubmit={onSkillsChange} />
            </div>
          </div>
        </div>
      </div>
      <div className={css.listContainer}>
        <div className={css.listContainerContent}>
          {printWhen(peopleListJSX, paramTypeIsUsers)}
          {printWhen(jobListJSX, paramTypeIsProjects)}
        </div>
      </div>
    </div>
  );
};
