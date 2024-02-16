import { useEffect, useState } from 'react';
import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Job, JobsRes, Organization, OrganizationsRes, User, UsersRes } from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useSearchListing = () => {
  const data = useLoaderData() as JobsRes | UsersRes | OrganizationsRes;
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const q = searchParams.get('q');

  const PER_PAGE = 10;
  const isMobile = isTouchDevice();
  const [searchList, setSearchList] = useState<Array<Job | User | Organization>>([]);
  const [page, setPage] = useState(1);

  const fetchMore = async (page: number) => {
    const body = {
      filter: {},
      type,
    };
    if (q?.trim()) {
      Object.assign(body, { q });
    }
    const data = await searchReq(body, { limit: 20, page });

    if (isMobile && page > 1) setSearchList([...searchList, ...data.items]);
    else setSearchList(data?.items);
  };
  useEffect(() => {
    fetchMore(page);
  }, [page]);

  useEffect(() => {
    if (data.items.length) {
      setSearchList(data.items);
    }
  }, [data]);

  return { page, setPage, searchList, total: data.total_count, PER_PAGE, isMobile, type };
};
