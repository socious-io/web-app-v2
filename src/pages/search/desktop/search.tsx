import css from './search.module.scss';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { PeopleList } from '../components/people-list/people-list';
import { printWhen } from 'src/core/utils';
import { useSearchShared } from '../search.shared';

export const Search = () => {
  const { onMorePageClick, menu, onTypeChange, location, list, result } = useSearchShared();

  return (
    <div className={css.container}>
      <div className={css.filterBar}>
        <div className={css.filterBarContent}>
          <DropdownBtn onValueChange={onTypeChange} placeholder="Type" menus={menu} />
        </div>
      </div>
      <div className={css.main}>
        <div className={css.mainContent}>
          <div className={css.results}>{result} Results</div>
          {printWhen(
            <PeopleList data={list} onMorePageClick={onMorePageClick} />,
            location.current.search.type === 'users'
          )}
          {printWhen(
            <JobList data={list} onMorePageClick={onMorePageClick} />,
            location.current.search.type === 'projects'
          )}
        </div>
      </div>
    </div>
  );
};
