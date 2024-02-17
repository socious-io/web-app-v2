import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { JobsRes, OrganizationsRes, UsersRes } from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useSearch = () => {
  const data = useLoaderData() as JobsRes | UsersRes | OrganizationsRes;
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [searchResult, setSearchResult] = useState<JobsRes | UsersRes | OrganizationsRes>({});
  const [page, setPage] = useState(1);

  const fetchMore = async (page: number) => {
    const body = {
      //filter: { skills: ['BLOCKCHAIN_DEVELOPMENT', 'PLUTUS'] },
      filter: {},
      type,
    };
    if (q?.trim()) {
      Object.assign(body, { q });
    }
    const data = await searchReq(body, { limit: 20, page });

    if (isMobile && page > 1) setSearchResult({ ...searchResult, ...data });
    else setSearchResult(data);
  };

  useEffect(() => {
    fetchMore(page);
  }, [page]);

  useEffect(() => {
    if (data.items.length) {
      setSearchResult(data);
    }
  }, [data]);

  return {
    page,
    setPage,
    searchResult,
    total: searchResult.total_count ?? data.total_count,
    PER_PAGE,
    isMobile,
    type,
    q,
  };
};
