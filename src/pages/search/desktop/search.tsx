import css from './search.module.scss';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { PeopleList } from '../components/people-list/people-list';
import { printWhen } from 'src/core/utils';
import { useSearchShared } from '../search.shared';
import { SocialCausesFilter } from './filter-bar/social-causes-filter/social-causes-filter';
import { SkillsFilter } from './filter-bar/skills-filter/skills-filter';
import { PayloadModel } from './search.types';
import { useLocation, useNavigate } from '@tanstack/react-location';
import { DetailOutlet } from './detail-outlet/detail-outlet';

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
  } = useSearchShared();

  const navigate = useNavigate();
  const { current } = useLocation();
  const { search: params } = current as unknown as { search: { id: string; type: PayloadModel['type'] } };

  function onListItemClick(type: PayloadModel['type']) {
    return (id: string) => {
      switch (type) {
        case 'projects':
          navigate({ search: (p) => ({ ...p, type: 'projects', id }) });
          break;
        case 'users':
          navigate({ search: (p) => ({ ...p, type: 'users', id }) });
          break;
      }
    };
  }

  const paramTypeIsProjects = location.current.search.type === 'projects';
  const paramTypeIsUsers = location.current.search.type === 'users';

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
      <div className={css.filterBar}>
        <div className={css.filterBarContent}>
          <div className={css.results}>{result} Results</div>
          <DropdownBtn
            onValueChange={onTypeChange}
            placeholder="Type"
            menus={menu}
            value={findLabelByValue(location.current.search.type, 'Type')}
          />
          <SocialCausesFilter  onSubmit={onSocialCausesChange} />
          <SkillsFilter onSubmit={onSkillsChange} />
        </div>
      </div>
      <div className={css.listContainer}>
        <div className={css.listContainerContent}>
          {printWhen(peopleListJSX, paramTypeIsUsers)}
          {printWhen(jobListJSX, paramTypeIsProjects)}
        </div>
        <div className={css.item}>
          <DetailOutlet type={params.type} id={params.id} />
        </div>
      </div>
    </div>
  );
};
