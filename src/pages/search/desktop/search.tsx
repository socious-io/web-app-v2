import css from './search.module.scss';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { PeopleList } from '../components/people-list/people-list';
import { printWhen } from 'src/core/utils';
import { useSearchShared } from '../search.shared';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import { SocialCausesFilter } from './filter-bar/social-causes-filter/social-causes-filter';
import { SkillsFilter } from './filter-bar/skills-filter/skills-filter';
import { useState } from 'react';

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
    onSocialCausesChange,
    onSkillsChange,
  } = useSearchShared();

  const feedListJSX = (
    <FeedList data={list} onLike={onPostLike} onRemoveLike={onPostRemoveLike} onMorePageClick={onMorePageClick} />
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
          <SocialCausesFilter onSubmit={onSocialCausesChange} />
          <SkillsFilter onSubmit={onSkillsChange} />
        </div>
      </div>
      <div></div>
      <div className={css.results}>{result} Results</div>
      <div className={css.listContainer}>
        <div className={css.listContainerContent}>
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
        <div className={css.item}>
          asdf Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore illum minus temporibus nostrum laborum
          quod dignissimos commodi. Ipsa molestiae architecto nihil, porro sint accusantium, ducimus temporibus
          consequuntur rem nesciunt qui.
        </div>
      </div>
    </div>
  );
};
