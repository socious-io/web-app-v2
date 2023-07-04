import css from './search.module.scss';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { PeopleList } from '../components/people-list/people-list';
import { printWhen } from 'src/core/utils';
import { useSearchShared } from '../search.shared';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';

export const Search = () => {
  const {
    onMorePageClick,
    menu,
    onTypeChange,
    location,
    list,
    result,
    findLabelByValue,
    onPostLike,
    onPostRemoveLike,
  } = useSearchShared();

  const feedListJSX = (
    <FeedList
      data={list}
    //   onMoreClick={onMorePageClick}
      onLike={onPostLike}
      onRemoveLike={onPostRemoveLike}
      onMorePageClick={onMorePageClick}
    />
  );

  return (
    <div className={css.container}>
      <div className={css.filterBar}>
        <div className={css.filterBarContent}>
          <DropdownBtn
            onValueChange={onTypeChange}
            placeholder="Type"
            menus={menu}
            value={findLabelByValue(location.current.search.type, 'Type')}
          />
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
          {printWhen(feedListJSX, location.current.search.type === 'posts')}
        </div>
      </div>
    </div>
  );
};
