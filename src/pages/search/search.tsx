import css from './search.module.scss';
import { Search as SearchAtom } from '../../components/atoms/search/search';
import { search } from './search.services';
import { useState } from 'react';
import { PayloadModel } from './search.types';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { JobList } from '../../components/organisms/job-list/job-list';

export const Search = () => {
  const resolver = useMatch();
  const data = resolver.ownData;
  const q = resolver.search.q as string;
  const [list, setList] = useState(data.items);
  const [result, setResult] = useState<number>(data.total_count);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const [state, setState] = useState<PayloadModel>({
    page: 1,
    filter: {},
    type: 'projects',
    q,
  });

  const getResponse = () => {
    search(state).then((resp) => {
      setResult(resp.items.length);
      setList(resp.items);
    });
  };

  const onValueChange = (value: string) => {
    setState({ ...state, q: value });
    getResponse();
  };

  const onLike = () => {};

  const onRemoveLike = () => {};

  const onMorePageClick = () => {
    search({ ...state, page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setList((list) => [...list, ...resp.items]);
    });
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div
          onClick={() => {
            navigate({ to: '../jobs' });
          }}
        >
          <img src="/icons/chevron-left.svg" />
        </div>
        <div className={css.search}>
          <SearchAtom defaultValue={q} placeholder="Search" onValueChange={onValueChange} />
        </div>
      </div>
      <div className={css.main}>
        <div className={css.result}>
          <div className={css.info}>
            <span>{result}</span>
            <span>Results</span>
          </div>
          <img src="/icons/filter-blue.svg" />
        </div>

        <div className={css.mainList}>
          {/* <FeedList data={list} onLike={onLike} onRemoveLike={onRemoveLike} onMorePageClick={onMorePage} /> */}
          <JobList data={list} onMorePageClick={onMorePageClick} />
        </div>
      </div>
    </div>
  );
};
