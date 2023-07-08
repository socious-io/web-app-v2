import css from './search.module.scss';
import { DropdownBtn } from 'src/components/atoms/dropdown-btn/dropdown-btn';
import { JobList } from 'src/components/organisms/job-list/job-list';
import { PeopleList } from '../components/people-list/people-list';
import { printWhen } from 'src/core/utils';
import { useSearchShared } from '../search.shared';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import { SocialCausesFilter } from './filter-bar/social-causes-filter/social-causes-filter';
import { SkillsFilter } from './filter-bar/skills-filter/skills-filter';
import { useEffect, useState } from 'react';
import { JobDetailCard } from 'src/pages/job-detail/components/job-detail-card/job-detail-card';
import { PayloadModel } from './search.types';
import { useLocation, useNavigate, useRouter } from '@tanstack/react-location';
import { http } from 'src/core/http';

export const Search = () => {
  const {
    onMorePageClick,
    menu,
    onTypeChange,
    location,
    list,
    result,
    findLabelByValue,
    // onPostLike,
    // onPostRemoveLike,
    onSocialCausesChange,
    onSkillsChange,
  } = useSearchShared();

  const navigate = useNavigate();
  const { current } = useLocation();
  const { search: params } = current;

  //   const feedListJSX = (
  //     <FeedList data={list} onLike={onPostLike} onRemoveLike={onPostRemoveLike} onMorePageClick={onMorePageClick} />
  //   );

  function onListItemClick(type: PayloadModel['type']) {
    return (id: string) => {
      switch (type) {
        case 'projects':
          navigate({ search: (p) => ({ ...p, id }) });
          break;
      }
    };
  }

  useEffect(() => {
    console.log(current.search);
  }, [params.id]);

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
            <JobList onClick={onListItemClick('projects')} data={list} onMorePageClick={onMorePageClick} />,
            location.current.search.type === 'projects'
          )}
          {/* {printWhen(feedListJSX, location.current.search.type === 'posts')} */}
        </div>
        <div className={css.item}>
          {/* <JobDetailCard job={job} screeningQuestions={screeningQuestions} location={location} userType={identity.type} /> */}
        </div>
      </div>
    </div>
  );
};
